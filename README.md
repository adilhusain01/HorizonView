# HorizonView — Real Estate Intelligence Platform

HorizonView turns satellite data into actionable real estate intelligence. Track building development across India from 2016-2023, identify growth hotspots, compare investment opportunities, and forecast future development — all from your browser.

## What It Does

### Building Timelapse (2016-2023)
Visualize how cities and neighborhoods have developed over 8 years using Google's Open Buildings 2.5D Temporal dataset. Play through years and watch buildings appear in real-time. Switch between **building presence** (where buildings exist) and **building height** views.

### Area Intelligence Report
Draw a polygon around any area and get a comprehensive investment dossier:
- **Building count & height trends** — year-by-year development trajectory
- **Growth rate** — year-over-year % change and compound annual growth rate (CAGR)
- **Vegetation index (NDVI)** — green cover percentage from Sentinel-2 satellite imagery
- **Night light intensity** — economic activity proxy from VIIRS satellite data
- **Land use breakdown** — percentage of built-up, cropland, vegetation, water (ESA WorldCover)
- **Elevation & flood risk** — terrain analysis from SRTM digital elevation model
- **Building density** — buildings per square kilometer

### Growth Forecast
Polynomial regression on 8 years of building data projects future building counts to 2025, 2027, and 2030 with confidence intervals. See whether an area's growth is accelerating, linear, or plateauing.

### Growth Hotspot Detection
Scan the visible map area to find the fastest-developing micro-zones. Uses spatial clustering (DBSCAN) to identify contiguous high-growth corridors. Results ranked by growth rate — click any hotspot to fly there.

### Compare Two Areas
Draw two polygons and get a side-by-side comparison with a composite **Investment Score (0-100)** based on:
- Building growth CAGR (30% weight)
- Night light economic activity trend (20%)
- Green cover quality (10%)
- Flood risk assessment (10%)
- Development density sweet-spot (15%)
- Land use diversity (15%)

Includes a radar chart for visual multi-dimensional comparison.

### Data Layer Overlays
Toggle additional satellite layers on top of the buildings view:
- **Vegetation (NDVI)** — red-to-green heatmap of green cover
- **Night Lights** — economic activity glow from space
- **Land Use** — color-coded classification (built-up, crops, forest, water)
- **Population Density** — people per square kilometer
- **Growth Hotspots** — heatmap of building growth intensity

Each layer has adjustable opacity.

### Search Anywhere
Google Places autocomplete to search and fly to any location. Quick-pick buttons for major Indian cities. Each location selection generates an instant intelligence summary with key metrics.

## Data Sources

| Dataset | Provider | What We Use It For |
|---|---|---|
| Open Buildings 2.5D Temporal | Google Research | Building presence, height, and count (2016-2023) |
| Sentinel-2 SR Harmonized | Copernicus/ESA | Vegetation index (NDVI) |
| VIIRS DNB Monthly | NOAA | Night light radiance |
| WorldCover v200 | ESA | Land use / land cover classification |
| WorldPop 100m | WorldPop | Population density |
| SRTM GL1 | USGS | Elevation and slope |

All data is processed via Google Earth Engine — no imagery is downloaded or stored locally.

## Tech Stack

- **Backend**: Python / Flask / Google Earth Engine API
- **Frontend**: Next.js 15 / React 19 / TypeScript
- **State**: Zustand
- **Maps**: Google Maps API via @react-google-maps/api
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Algorithms**: NumPy (regression), DBSCAN clustering (custom implementation)

## Setup

### Prerequisites
- Python 3.9+
- Node.js 18+
- Google Earth Engine service account with credentials
- Google Maps API key (with Maps JS, Drawing, and Places APIs enabled)

### Backend
```bash
pip install -r requirements.txt
# Place your GEE service account key as .private-key.json in the project root
python app.py
# API server starts at http://127.0.0.1:5001
```

### Frontend
```bash
cd frontend
npm install
# Create .env.local with:
# NEXT_PUBLIC_MAPS_API_KEY=your_google_maps_api_key
npm run dev
# Frontend starts at http://localhost:3000
```

Open http://localhost:3000/buildings to use the platform.

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/buildings/tiles?band=presence\|height` | GET | Building tile URLs for all years |
| `/api/buildings/count` | POST | Building count in polygon |
| `/api/area/report` | POST | Full area intelligence report |
| `/api/predict/growth` | POST | Growth forecast with confidence intervals |
| `/api/location/summary` | POST | Quick location intelligence |
| `/api/hotspots/tiles` | GET | Growth heatmap tile overlay |
| `/api/hotspots/detect` | POST | Grid-based hotspot detection + clustering |
| `/api/compare` | POST | Side-by-side area comparison + investment score |
| `/api/layers/ndvi/tiles` | GET | NDVI vegetation overlay |
| `/api/layers/nightlights/tiles` | GET | Night lights overlay |
| `/api/layers/landuse/tiles` | GET | Land use classification overlay |
| `/api/layers/population/tiles` | GET | Population density overlay |

## Coverage

The Open Buildings dataset covers South Asia, Africa, Southeast Asia, Latin America, and the Caribbean. The platform currently features quick-pick locations for 5 major Indian cities (Mumbai, Delhi, Bangalore, Hyderabad, Chennai), but the search bar works for any location within the dataset's coverage area.
