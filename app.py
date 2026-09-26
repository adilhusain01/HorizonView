#!/usr/bin/env python3
"""
HorizonView - AI-Powered Land Investment Intelligence Platform
Main Flask application integrating all services
"""

import ee
import numpy as np
from flask import Flask, render_template, request, jsonify
from concurrent.futures import ThreadPoolExecutor, as_completed
from math import radians, cos, sin, asin, sqrt
import os

from dotenv import load_dotenv

load_dotenv()

# Configuration
class Config:
    EE_ACCOUNT = os.environ['EE_ACCOUNT']
    EE_PRIVATE_KEY_FILE = os.path.join(os.path.dirname(__file__), '.private-key.json')
    MAPS_API_KEY = os.environ['MAPS_API_KEY']
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY', 'dev-only-secret')

app = Flask(__name__)
app.config.from_object(Config)

# Initialize Earth Engine
EE_CREDENTIALS = ee.ServiceAccountCredentials(
    app.config['EE_ACCOUNT'],
    app.config['EE_PRIVATE_KEY_FILE']
)
ee.Initialize(EE_CREDENTIALS)

# ============================================================================
# Constants
# ============================================================================

YEARS = list(range(2016, 2024))
PRESENCE_PALETTE = ['#440154', '#433982', '#30678D', '#218F8B', '#36B677', '#8ED542', '#FDE725']
HEIGHT_PALETTE = ['1d4877', '1b8a5a', 'fbb021', 'f68838', 'ee3e32']

ZOOM_ATT = {
    4: 0.01, 5: 0.02, 6: 0.04, 7: 0.08, 8: 0.16,
    9: 0.32, 10: 0.48, 11: 0.64, 12: 0.8, 13: 1
}

HEIGHT_MAX_VAL = 30
CONF_MAX_VAL = 1
MASK_TH = 0.01

# Fixed zoom level for visualization — tiles work at any zoom via {z}/{x}/{y}
VIS_ZOOM = 10

LOCATIONS = {
    'Mumbai, India': {'lon': 72.8777, 'lat': 19.0760, 'zoom': 12},
    'Delhi, India': {'lon': 77.2090, 'lat': 28.6139, 'zoom': 11},
    'Bangalore, India': {'lon': 77.5946, 'lat': 12.9716, 'zoom': 12},
    'Hyderabad, India': {'lon': 78.4867, 'lat': 17.3850, 'zoom': 12},
    'Chennai, India': {'lon': 80.2707, 'lat': 13.0827, 'zoom': 12},
}

# ESA WorldCover class mapping
LANDUSE_CLASSES = {
    10: 'tree_cover', 20: 'shrubland', 30: 'grassland', 40: 'cropland',
    50: 'built_up', 60: 'bare', 70: 'snow', 80: 'water',
    90: 'wetland', 95: 'mangrove', 100: 'moss'
}

# Load collections
image_collection = ee.ImageCollection('GOOGLE/Research/open-buildings-temporal/v1')

# Waitlist storage (in-memory for demo)
waitlist = []


# ============================================================================
# Helper Functions
# ============================================================================

def get_annual_mosaic(year):
    """Get the building mosaic for a specific year"""
    date_str = f'{year}-06-30'
    epoch_s = ee.Date(date_str, 'America/Los_Angeles').millis().divide(1000)
    return image_collection.filter(
        ee.Filter.eq('inference_time_epoch_s', epoch_s)
    ).mosaic()


def mask_image(image, min_presence_value):
    """Mask pixels with presence confidence below threshold"""
    building_mask = image.select('building_presence').gte(min_presence_value)
    return image.updateMask(building_mask)


# Global cumulative mask: if a building was EVER detected across any year,
# that pixel stays visible in every year's view. Buildings don't un-build.
_cumulative_mask_cache = {}

def get_cumulative_mask(threshold):
    """Max building presence across all years — pixel-level 'ever built' mask"""
    if threshold not in _cumulative_mask_cache:
        all_presence = image_collection.select('building_presence').max()
        _cumulative_mask_cache[threshold] = all_presence.gte(threshold)
    return _cumulative_mask_cache[threshold]


def haversine(lon1, lat1, lon2, lat2):
    """Distance in km between two points"""
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    return 2 * asin(sqrt(a)) * 6371


# ============================================================================
# Routes
# ============================================================================

@app.route('/')
def index():
    """Landing page"""
    return render_template('index.html', maps_api_key=app.config['MAPS_API_KEY'])


@app.route('/api/waitlist', methods=['POST'])
def add_to_waitlist():
    """Add email to waitlist"""
    data = request.get_json()
    email = data.get('email', '').strip()
    if not email or '@' not in email:
        return jsonify({'error': 'Invalid email'}), 400
    if any(w['email'] == email for w in waitlist):
        return jsonify({'message': 'Already on waitlist!'}), 200
    waitlist.append({'email': email, 'timestamp': str(ee.Date(ee.Number(ee.Date.now().millis())).format())})
    return jsonify({'message': 'Successfully added to waitlist!'}), 200


# ============================================================================
# Open Buildings API
# ============================================================================

@app.route('/api/buildings/tiles')
def get_all_buildings_tiles():
    """Get tile URLs for ALL years in one call (parallel EE requests)."""
    band = request.args.get('band', 'presence')
    att = ZOOM_ATT[VIS_ZOOM]

    def fetch_year_tile(year):
        mosaic = get_annual_mosaic(year)
        mosaic = mask_image(mosaic, att * MASK_TH)
        if band == 'presence':
            vis_params = {'min': 0, 'max': att * CONF_MAX_VAL, 'palette': PRESENCE_PALETTE}
            mosaic = mosaic.select('building_presence')
        else:
            vis_params = {'min': 0, 'max': att * HEIGHT_MAX_VAL, 'palette': HEIGHT_PALETTE}
            mosaic = mosaic.select('building_height')
        map_id = mosaic.getMapId(vis_params)
        return year, map_id['tile_fetcher'].url_format

    try:
        tiles = {}
        with ThreadPoolExecutor(max_workers=len(YEARS)) as executor:
            futures = {executor.submit(fetch_year_tile, y): y for y in YEARS}
            for future in as_completed(futures):
                year, url = future.result()
                tiles[str(year)] = url
        return jsonify({'tiles': tiles})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/buildings/count', methods=['POST'])
def count_buildings():
    """Count buildings in a polygon area"""
    try:
        data = request.get_json()
        coordinates = data.get('coordinates', [])
        if not coordinates:
            return jsonify({'error': 'No coordinates provided'}), 400

        polygon = ee.Geometry.Polygon(coordinates)
        counts = []
        for year in YEARS:
            mosaic = get_annual_mosaic(year)
            scale = 2.0
            result = mosaic.select('building_fractional_count').reduceRegion(
                reducer=ee.Reducer.sum(), geometry=polygon,
                scale=scale, maxPixels=1e9
            )
            count = result.getInfo().get('building_fractional_count', 0)
            count = count * (2 * scale) ** 2
            counts.append(int(count))

        return jsonify({'years': YEARS, 'counts': counts})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# Layer Tile Endpoints
# ============================================================================

@app.route('/api/layers/ndvi/tiles')
def ndvi_tiles():
    """NDVI vegetation index from Sentinel-2"""
    year = request.args.get('year', '2023', type=int)
    try:
        s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED') \
            .filterDate(f'{year}-01-01', f'{year}-12-31') \
            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)) \
            .median()
        ndvi = s2.normalizedDifference(['B8', 'B4']).rename('NDVI')
        vis = {'min': -0.1, 'max': 0.8, 'palette': ['#d73027', '#fee08b', '#1a9850']}
        map_id = ndvi.getMapId(vis)
        return jsonify({'tile_url': map_id['tile_fetcher'].url_format})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/layers/nightlights/tiles')
def nightlights_tiles():
    """Night light radiance from VIIRS"""
    year = request.args.get('year', '2023', type=int)
    try:
        viirs = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG') \
            .filterDate(f'{year}-01-01', f'{year}-12-31') \
            .select('avg_rad') \
            .median()
        vis = {
            'min': 0, 'max': 60,
            'palette': ['#000000', '#0d0887', '#7e03a8', '#cc4778', '#f89540', '#f0f921']
        }
        map_id = viirs.getMapId(vis)
        return jsonify({'tile_url': map_id['tile_fetcher'].url_format})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/layers/landuse/tiles')
def landuse_tiles():
    """Land use classification from ESA WorldCover"""
    try:
        lulc = ee.Image('ESA/WorldCover/v200/2021')
        vis = {
            'min': 10, 'max': 100,
            'palette': [
                '006400', 'ffbb22', 'ffff4c', 'f096ff', 'fa0000',
                'b4b4b4', 'f0f0f0', '0064c8', '0096a0', '00cf75', 'fae6a0'
            ]
        }
        map_id = lulc.getMapId(vis)
        return jsonify({'tile_url': map_id['tile_fetcher'].url_format})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/layers/population/tiles')
def population_tiles():
    """Population density from WorldPop"""
    try:
        pop = ee.ImageCollection('WorldPop/GP/100m/pop') \
            .filterDate('2020-01-01', '2020-12-31') \
            .mosaic()
        vis = {
            'min': 0, 'max': 1000,
            'palette': ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494']
        }
        map_id = pop.getMapId(vis)
        return jsonify({'tile_url': map_id['tile_fetcher'].url_format})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# Area Intelligence Report
# ============================================================================

def compute_building_counts(polygon):
    """Building count per year"""
    counts = []
    for year in YEARS:
        mosaic = get_annual_mosaic(year)
        result = mosaic.select('building_fractional_count').reduceRegion(
            reducer=ee.Reducer.sum(), geometry=polygon, scale=2.0, maxPixels=1e9
        )
        count = result.getInfo().get('building_fractional_count', 0) or 0
        counts.append(int(count * 16))  # (2 * scale)^2 = 16
    return {'years': YEARS, 'counts': counts}


def compute_building_heights(polygon):
    """Average building height per year"""
    att = ZOOM_ATT[VIS_ZOOM]
    heights = []
    for year in YEARS:
        mosaic = get_annual_mosaic(year)
        masked = mask_image(mosaic, att * MASK_TH)
        result = masked.select('building_height').reduceRegion(
            reducer=ee.Reducer.mean(), geometry=polygon, scale=4, maxPixels=1e9
        )
        h = result.getInfo().get('building_height', 0) or 0
        heights.append(round(h, 1))
    return {'years': YEARS, 'avg_heights': heights}


def compute_ndvi_trend(polygon):
    """NDVI per year from Sentinel-2 (2018-2023)"""
    ndvi_years = list(range(2018, 2024))
    values = []
    for year in ndvi_years:
        s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED') \
            .filterDate(f'{year}-01-01', f'{year}-12-31') \
            .filterBounds(polygon) \
            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)) \
            .median()
        ndvi = s2.normalizedDifference(['B8', 'B4'])
        result = ndvi.reduceRegion(
            reducer=ee.Reducer.mean(), geometry=polygon, scale=10, maxPixels=1e9
        )
        val = result.getInfo().get('nd', 0) or 0
        values.append(round(val, 3))
    green_pct = round(max(values[-1], 0) * 100, 1) if values else 0
    return {'years': ndvi_years, 'values': values, 'green_pct': green_pct}


def compute_nightlights_trend(polygon):
    """Night light radiance per year"""
    values = []
    for year in YEARS:
        viirs = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG') \
            .filterDate(f'{year}-01-01', f'{year}-12-31') \
            .select('avg_rad').median()
        result = viirs.reduceRegion(
            reducer=ee.Reducer.mean(), geometry=polygon, scale=500, maxPixels=1e9
        )
        val = result.getInfo().get('avg_rad', 0) or 0
        values.append(round(val, 2))
    return {'years': YEARS, 'values': values}


def compute_landuse_breakdown(polygon):
    """ESA WorldCover class percentages"""
    lulc = ee.Image('ESA/WorldCover/v200/2021')
    area_image = ee.Image.pixelArea().addBands(lulc)
    stats = area_image.reduceRegion(
        reducer=ee.Reducer.sum().group(groupField=1, groupName='class'),
        geometry=polygon, scale=10, maxPixels=1e9
    )
    groups = stats.getInfo().get('groups', [])
    total = sum(g['sum'] for g in groups) if groups else 1
    breakdown = {}
    for g in groups:
        name = LANDUSE_CLASSES.get(g['class'], 'other')
        breakdown[name] = round((g['sum'] / total) * 100, 1)
    return breakdown


def compute_elevation_stats(polygon):
    """SRTM elevation and slope"""
    dem = ee.Image('USGS/SRTMGL1_003')
    slope = ee.Terrain.slope(dem)

    elev_stats = dem.reduceRegion(
        reducer=ee.Reducer.min().combine(ee.Reducer.max(), sharedInputs=True)
                .combine(ee.Reducer.mean(), sharedInputs=True),
        geometry=polygon, scale=30, maxPixels=1e9
    ).getInfo()

    slope_stats = slope.reduceRegion(
        reducer=ee.Reducer.mean(), geometry=polygon, scale=30, maxPixels=1e9
    ).getInfo()

    min_elev = elev_stats.get('elevation_min', 0) or 0
    return {
        'min': min_elev,
        'max': elev_stats.get('elevation_max', 0) or 0,
        'mean': round(elev_stats.get('elevation_mean', 0) or 0, 1),
        'slope_mean': round(slope_stats.get('slope', 0) or 0, 1),
        'flood_risk': min_elev < 10
    }


def compute_growth_metrics(counts):
    """YoY growth rates and CAGR"""
    yoy = []
    for i in range(1, len(counts)):
        if counts[i - 1] > 0:
            yoy.append(round(((counts[i] - counts[i - 1]) / counts[i - 1]) * 100, 1))
        else:
            yoy.append(0)

    cagr = 0
    if counts[0] > 0 and counts[-1] > 0:
        n = len(counts) - 1
        cagr = ((counts[-1] / counts[0]) ** (1 / n) - 1) * 100

    return {'yoy_rates': yoy, 'cagr': round(cagr, 1)}


@app.route('/api/area/report', methods=['POST'])
def area_report():
    """Full area intelligence report for a polygon"""
    try:
        data = request.get_json()
        coordinates = data.get('coordinates', [])
        if not coordinates:
            return jsonify({'error': 'No coordinates provided'}), 400

        polygon = ee.Geometry.Polygon(coordinates)

        with ThreadPoolExecutor(max_workers=6) as executor:
            futures = {
                executor.submit(compute_building_counts, polygon): 'building_count',
                executor.submit(compute_building_heights, polygon): 'building_height',
                executor.submit(compute_ndvi_trend, polygon): 'ndvi',
                executor.submit(compute_nightlights_trend, polygon): 'nightlights',
                executor.submit(compute_landuse_breakdown, polygon): 'landuse',
                executor.submit(compute_elevation_stats, polygon): 'elevation',
            }
            results = {}
            for future in as_completed(futures):
                key = futures[future]
                results[key] = future.result()

        # Derived metrics
        counts = results['building_count']['counts']
        area_sqkm = polygon.area().divide(1e6).getInfo()
        results['density'] = {
            'area_sqkm': round(area_sqkm, 2),
            'buildings_per_sqkm': round(counts[-1] / area_sqkm, 1) if area_sqkm > 0 else 0
        }
        results['growth'] = compute_growth_metrics(counts)

        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# Location Summary
# ============================================================================

@app.route('/api/location/summary', methods=['POST'])
def location_summary():
    """Quick intelligence summary for a point location"""
    try:
        data = request.get_json()
        lat, lng = data['lat'], data['lng']
        radius = data.get('radius_km', 5) * 1000
        buffer = ee.Geometry.Point([lng, lat]).buffer(radius)

        def quick_buildings(geom):
            m16 = get_annual_mosaic(2016)
            m23 = get_annual_mosaic(2023)
            c16 = m16.select('building_fractional_count').reduceRegion(
                reducer=ee.Reducer.sum(), geometry=geom, scale=4, maxPixels=1e9
            ).getInfo().get('building_fractional_count', 0) or 0
            c23 = m23.select('building_fractional_count').reduceRegion(
                reducer=ee.Reducer.sum(), geometry=geom, scale=4, maxPixels=1e9
            ).getInfo().get('building_fractional_count', 0) or 0
            c16, c23 = int(c16 * 16), int(c23 * 16)
            area = geom.area().divide(1e6).getInfo()
            density = round(c23 / area, 1) if area > 0 else 0
            cagr = round(((c23 / c16) ** (1 / 7) - 1) * 100, 1) if c16 > 0 else 0
            return {'count_2016': c16, 'count_2023': c23, 'density': density, 'cagr': cagr}

        def quick_ndvi(geom):
            s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED') \
                .filterDate('2023-01-01', '2023-12-31') \
                .filterBounds(geom) \
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)) \
                .median()
            result = s2.normalizedDifference(['B8', 'B4']).reduceRegion(
                reducer=ee.Reducer.mean(), geometry=geom, scale=30, maxPixels=1e9
            ).getInfo()
            return round((result.get('nd', 0) or 0), 3)

        def quick_nightlights(geom):
            viirs = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG') \
                .filterDate('2023-01-01', '2023-12-31') \
                .select('avg_rad').median()
            result = viirs.reduceRegion(
                reducer=ee.Reducer.mean(), geometry=geom, scale=500, maxPixels=1e9
            ).getInfo()
            return round((result.get('avg_rad', 0) or 0), 2)

        def quick_landuse(geom):
            lulc = ee.Image('ESA/WorldCover/v200/2021')
            area_image = ee.Image.pixelArea().addBands(lulc)
            stats = area_image.reduceRegion(
                reducer=ee.Reducer.sum().group(groupField=1, groupName='class'),
                geometry=geom, scale=30, maxPixels=1e9
            ).getInfo()
            groups = stats.get('groups', [])
            if not groups:
                return 'unknown'
            dominant = max(groups, key=lambda g: g['sum'])
            return LANDUSE_CLASSES.get(dominant['class'], 'other')

        def quick_elevation(geom):
            dem = ee.Image('USGS/SRTMGL1_003')
            result = dem.reduceRegion(
                reducer=ee.Reducer.mean(), geometry=geom, scale=30, maxPixels=1e9
            ).getInfo()
            return round((result.get('elevation', 0) or 0), 1)

        with ThreadPoolExecutor(max_workers=5) as executor:
            fb = executor.submit(quick_buildings, buffer)
            fn = executor.submit(quick_ndvi, buffer)
            fnl = executor.submit(quick_nightlights, buffer)
            flu = executor.submit(quick_landuse, buffer)
            fe = executor.submit(quick_elevation, buffer)

            buildings = fb.result()
            ndvi = fn.result()
            nightlights = fnl.result()
            dominant_landuse = flu.result()
            elevation = fe.result()

        # Generate summary text
        cagr = buildings['cagr']
        if cagr > 15:
            growth_desc = 'rapidly developing'
        elif cagr > 8:
            growth_desc = 'actively growing'
        elif cagr > 3:
            growth_desc = 'steadily developing'
        else:
            growth_desc = 'mature/slow-growth'

        summary = (
            f"This area is {growth_desc} with {buildings['density']:.0f} buildings/sq km "
            f"and {cagr:.1f}% annual growth (CAGR). "
            f"Green cover index: {ndvi:.2f}. "
            f"Dominant land use: {dominant_landuse.replace('_', ' ')}. "
            f"Avg elevation: {elevation:.0f}m."
        )

        return jsonify({
            'building_density': buildings['density'],
            'building_growth_cagr': cagr,
            'count_2016': buildings['count_2016'],
            'count_2023': buildings['count_2023'],
            'ndvi': ndvi,
            'nightlights': nightlights,
            'dominant_landuse': dominant_landuse,
            'elevation': elevation,
            'summary_text': summary
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# Growth Prediction
# ============================================================================

@app.route('/api/predict/growth', methods=['POST'])
def predict_growth():
    """Polynomial regression growth forecast"""
    try:
        data = request.get_json()
        coordinates = data.get('coordinates', [])
        if not coordinates:
            return jsonify({'error': 'No coordinates provided'}), 400

        polygon = ee.Geometry.Polygon(coordinates)
        bc = compute_building_counts(polygon)
        counts = bc['counts']

        x = np.array(YEARS, dtype=float)
        y = np.array(counts, dtype=float)
        x_mean = x.mean()
        x_norm = x - x_mean

        best_model = None
        best_r2 = -1

        for degree in [1, 2]:
            coeffs = np.polyfit(x_norm, y, degree)
            p = np.poly1d(coeffs)
            y_pred = p(x_norm)
            ss_res = np.sum((y - y_pred) ** 2)
            ss_tot = np.sum((y - y.mean()) ** 2)
            r2 = 1 - ss_res / ss_tot if ss_tot > 0 else 0

            if r2 > best_r2:
                best_r2 = r2
                best_model = {'coeffs': coeffs.tolist(), 'poly': p, 'degree': degree, 'r2': r2}

        future_years = [2024, 2025, 2027, 2030]
        future_x = np.array(future_years) - x_mean
        future_counts = best_model['poly'](future_x)
        future_counts = np.maximum(future_counts, 0).astype(int).tolist()

        residuals = y - best_model['poly'](x_norm)
        std_err = float(np.std(residuals))
        confidence_factor = np.array([1.0 + 0.15 * (fy - 2023) for fy in future_years])
        upper = np.maximum(future_counts + 1.96 * std_err * confidence_factor, 0).astype(int).tolist()
        lower = np.maximum(np.array(future_counts) - 1.96 * std_err * confidence_factor, 0).astype(int).tolist()

        return jsonify({
            'actual': {'years': YEARS, 'counts': counts},
            'predicted': {'years': future_years, 'counts': future_counts},
            'model': {
                'type': 'polynomial',
                'degree': best_model['degree'],
                'r_squared': round(best_model['r2'], 3),
            },
            'confidence': {'upper': upper, 'lower': lower}
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# Growth Hotspot Detection
# ============================================================================

@app.route('/api/hotspots/tiles')
def hotspot_tiles():
    """Growth heatmap tile overlay (2016→2023 change)"""
    try:
        m16 = get_annual_mosaic(2016).select('building_fractional_count')
        m23 = get_annual_mosaic(2023).select('building_fractional_count')
        growth = m23.subtract(m16).divide(m16.max(0.001)).clamp(0, 5)
        vis = {
            'min': 0, 'max': 3,
            'palette': ['#000004', '#420a68', '#932667', '#dd513a', '#fca50a', '#fcffa4']
        }
        map_id = growth.getMapId(vis)
        return jsonify({'tile_url': map_id['tile_fetcher'].url_format})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def cluster_hotspots(cells, eps_km=2):
    """DBSCAN-style spatial clustering of high-growth cells"""
    if not cells:
        return []

    visited = [False] * len(cells)
    clusters = []

    for i in range(len(cells)):
        if visited[i]:
            continue
        cluster = [cells[i]]
        visited[i] = True
        queue = [i]
        while queue:
            idx = queue.pop(0)
            for j in range(len(cells)):
                if not visited[j]:
                    dist = haversine(
                        cells[idx]['lng'], cells[idx]['lat'],
                        cells[j]['lng'], cells[j]['lat']
                    )
                    if dist < eps_km:
                        visited[j] = True
                        cluster.append(cells[j])
                        queue.append(j)

        if len(cluster) >= 3:
            avg_growth = sum(c['growth_rate'] for c in cluster) / len(cluster)
            lats = [c['lat'] for c in cluster]
            lngs = [c['lng'] for c in cluster]
            clusters.append({
                'center_lat': round(sum(lats) / len(lats), 4),
                'center_lng': round(sum(lngs) / len(lngs), 4),
                'avg_growth': round(avg_growth, 1),
                'cell_count': len(cluster),
                'bounding_box': {
                    'north': max(lats), 'south': min(lats),
                    'east': max(lngs), 'west': min(lngs)
                }
            })

    clusters.sort(key=lambda c: c['avg_growth'], reverse=True)
    return clusters


@app.route('/api/hotspots/detect', methods=['POST'])
def detect_hotspots():
    """Detect growth hotspot grid cells + spatial clusters"""
    try:
        data = request.get_json()
        bounds = data['bounds']
        grid_size = data.get('grid_size_km', 1)

        region = ee.Geometry.Rectangle([
            bounds['west'], bounds['south'], bounds['east'], bounds['north']
        ])

        m16 = get_annual_mosaic(2016)
        m23 = get_annual_mosaic(2023)
        count_2016 = m16.select('building_fractional_count').rename('c16')
        count_2023 = m23.select('building_fractional_count').rename('c23')
        growth = count_2023.subtract(count_2016).divide(count_2016.max(0.001)).rename('growth')
        combined = count_2016.addBands(count_2023).addBands(growth)

        scale_meters = grid_size * 1000
        aggregated = combined.reduceResolution(
            reducer=ee.Reducer.mean(), maxPixels=65536
        ).reproject(crs='EPSG:4326', scale=scale_meters)

        samples = aggregated.sample(
            region=region, scale=scale_meters, geometries=True, numPixels=500
        )

        features = samples.getInfo().get('features', [])
        cells = []
        for f in features:
            props = f['properties']
            coords = f['geometry']['coordinates']
            gr = props.get('growth', 0)
            if gr is None or gr != gr:  # NaN check
                continue
            cells.append({
                'lng': round(coords[0], 4),
                'lat': round(coords[1], 4),
                'growth_rate': round(gr * 100, 1),
                'count_2016': round((props.get('c16', 0) or 0) * 16, 1),
                'count_2023': round((props.get('c23', 0) or 0) * 16, 1),
            })

        # Cluster high-growth cells
        hot_cells = [c for c in cells if c['growth_rate'] > 50]
        clusters = cluster_hotspots(hot_cells, eps_km=grid_size * 2)

        cells.sort(key=lambda c: c['growth_rate'], reverse=True)
        for i, c in enumerate(cells):
            c['rank'] = i + 1

        return jsonify({
            'cells': cells[:500],
            'clusters': clusters,
            'top_n': cells[:10]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# Comparative Analysis
# ============================================================================

def compute_full_report(polygon):
    """Run all area report sub-computations for a polygon"""
    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = {
            executor.submit(compute_building_counts, polygon): 'building_count',
            executor.submit(compute_building_heights, polygon): 'building_height',
            executor.submit(compute_ndvi_trend, polygon): 'ndvi',
            executor.submit(compute_nightlights_trend, polygon): 'nightlights',
            executor.submit(compute_landuse_breakdown, polygon): 'landuse',
            executor.submit(compute_elevation_stats, polygon): 'elevation',
        }
        results = {}
        for future in as_completed(futures):
            results[futures[future]] = future.result()

    counts = results['building_count']['counts']
    area_sqkm = polygon.area().divide(1e6).getInfo()
    results['density'] = {
        'area_sqkm': round(area_sqkm, 2),
        'buildings_per_sqkm': round(counts[-1] / area_sqkm, 1) if area_sqkm > 0 else 0
    }
    results['growth'] = compute_growth_metrics(counts)
    return results


def compute_investment_score(report):
    """Weighted composite investment score (0-100)"""
    score = 0

    # Building growth CAGR (30%)
    cagr = report.get('growth', {}).get('cagr', 0)
    score += min(cagr * 2, 30)

    # Night light trend (20%)
    nl = report.get('nightlights', {}).get('values', [0, 0])
    if len(nl) >= 2 and nl[0] > 0:
        nl_growth = (nl[-1] - nl[0]) / nl[0]
        score += min(nl_growth * 20, 20)

    # Green cover (10%)
    ndvi = report.get('ndvi', {}).get('green_pct', 0)
    if 20 < ndvi < 60:
        score += 10
    elif ndvi > 10:
        score += 5

    # Flood risk (10%)
    flood = report.get('elevation', {}).get('flood_risk', True)
    score += 0 if flood else 10

    # Density sweet spot (15%)
    density = report.get('density', {}).get('buildings_per_sqkm', 0)
    if 100 < density < 2000:
        score += 15
    elif 50 < density < 5000:
        score += 8

    # Land use — developing area (15%)
    built_up = report.get('landuse', {}).get('built_up', 100)
    if 20 < built_up < 60:
        score += 15
    elif built_up < 80:
        score += 8

    return min(score, 100)


@app.route('/api/compare', methods=['POST'])
def compare_areas():
    """Side-by-side area comparison with investment scores"""
    try:
        data = request.get_json()
        coords_a = data.get('area_a', {}).get('coordinates', [])
        coords_b = data.get('area_b', {}).get('coordinates', [])

        if not coords_a or not coords_b:
            return jsonify({'error': 'Both area_a and area_b coordinates required'}), 400

        poly_a = ee.Geometry.Polygon(coords_a)
        poly_b = ee.Geometry.Polygon(coords_b)

        with ThreadPoolExecutor(max_workers=2) as executor:
            fa = executor.submit(compute_full_report, poly_a)
            fb = executor.submit(compute_full_report, poly_b)
            report_a = fa.result()
            report_b = fb.result()

        score_a = compute_investment_score(report_a)
        score_b = compute_investment_score(report_b)

        if score_a > score_b:
            rec = f"Area A scores higher ({score_a:.0f} vs {score_b:.0f}), indicating stronger investment potential."
        elif score_b > score_a:
            rec = f"Area B scores higher ({score_b:.0f} vs {score_a:.0f}), indicating stronger investment potential."
        else:
            rec = f"Both areas score equally ({score_a:.0f}). Consider local factors for decision."

        return jsonify({
            'area_a': report_a,
            'area_b': report_b,
            'investment_score': {'a': round(score_a, 1), 'b': round(score_b, 1)},
            'recommendation': rec
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# Error Handlers
# ============================================================================

@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Not found'}), 404


@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Internal server error'}), 500


# ============================================================================
# Main
# ============================================================================

if __name__ == '__main__':
    print("HorizonView API Starting...")
    print("API server: http://127.0.0.1:5001")
    print("Next.js frontend: http://localhost:3000/buildings")
    print()
    app.run(host='0.0.0.0', port=5001, debug=True)
