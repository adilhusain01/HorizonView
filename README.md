# HorizonView — Real Estate Intelligence Platform

HorizonView turns satellite data into actionable real estate intelligence. It helps you track building development across India from 2016-2023, identify growth hotspots, compare investment opportunities, and forecast future development from the browser.

## Overview

The app uses Google Earth Engine to process satellite datasets and returns only the tiles and analytics the UI needs.

## Features

### Building Timelapse

Visualize how cities and neighborhoods have developed over 8 years using Google's Open Buildings 2.5D Temporal dataset. Play through the years and switch between building presence and building height views.

### Area Intelligence Report

Draw a polygon around any area and get a report covering:

- Building count and height trends
- Growth rate and CAGR
- Vegetation index (NDVI)
- Night light intensity
- Land use breakdown
- Elevation and flood risk
- Building density

### Growth Forecast

Polynomial regression projects building counts to 2025, 2027, and 2030 with confidence intervals.

### Growth Hotspot Detection

Spatial clustering (DBSCAN) finds contiguous high-growth corridors in the visible map area.

### Compare Two Areas

Draw two polygons to compare them side by side with an investment score based on growth, night lights, green cover, flood risk, density, and land-use diversity.

### Data Layer Overlays

Toggle overlays for vegetation, night lights, land use, population density, and growth hotspots. Each layer supports adjustable opacity.

### Search Anywhere

Use Google Places autocomplete or quick-pick buttons for major Indian cities.

## Tech Stack

- Backend: Python, Flask, Google Earth Engine API
- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS
- State: Zustand
- Maps: Google Maps API via @react-google-maps/api
- Charts: Recharts
- Algorithms: NumPy regression and custom DBSCAN clustering

## Data Sources

| Dataset                      | Provider        | Used For                                         |
| ---------------------------- | --------------- | ------------------------------------------------ |
| Open Buildings 2.5D Temporal | Google Research | Building presence, height, and count (2016-2023) |
| Sentinel-2 SR Harmonized     | Copernicus/ESA  | Vegetation index (NDVI)                          |
| VIIRS DNB Monthly            | NOAA            | Night light radiance                             |
| WorldCover v200              | ESA             | Land use / land cover classification             |
| WorldPop 100m                | WorldPop        | Population density                               |
| SRTM GL1                     | USGS            | Elevation and slope                              |

All data is processed via Google Earth Engine, so no imagery is downloaded or stored locally.

## Setup

### Prerequisites

- Python 3.9+
- Node.js 18+
- Google Earth Engine service account with credentials
- Google Maps API key with Maps JS, Drawing, and Places APIs enabled

### Clone

```bash
git clone https://github.com/adilhusain01/HorizonView.git "Horizon View"
cd "Horizon View"
```

### Backend (Flask, port 5001)

```bash
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
# Place your Google Earth Engine service account key (JSON) as .private-key.json in the project root.
cp .env.example .env   # then set MAPS_API_KEY, FLASK_SECRET_KEY and EE_ACCOUNT (service account email)
python app.py
# API server starts at http://127.0.0.1:5001
```

### Frontend (Next.js, port 3000)

```bash
cd frontend
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_MAPS_API_KEY
npm run dev
# Frontend starts at http://localhost:3000
```

Production build: `npm run build && npm run start` (inside `frontend/`).

Open http://localhost:3000/buildings to use the platform.

## API Endpoints

| Endpoint                                     | Method | Description                                       |
| -------------------------------------------- | ------ | ------------------------------------------------- |
| `/api/buildings/tiles?band=presence\|height` | GET    | Building tile URLs for all years                  |
| `/api/buildings/count`                       | POST   | Building count in polygon                         |
| `/api/area/report`                           | POST   | Full area intelligence report                     |
| `/api/predict/growth`                        | POST   | Growth forecast with confidence intervals         |
| `/api/location/summary`                      | POST   | Quick location intelligence                       |
| `/api/hotspots/tiles`                        | GET    | Growth heatmap tile overlay                       |
| `/api/hotspots/detect`                       | POST   | Grid-based hotspot detection and clustering       |
| `/api/compare`                               | POST   | Side-by-side area comparison and investment score |
| `/api/layers/ndvi/tiles`                     | GET    | NDVI vegetation overlay                           |
| `/api/layers/nightlights/tiles`              | GET    | Night lights overlay                              |
| `/api/layers/landuse/tiles`                  | GET    | Land use classification overlay                   |
| `/api/layers/population/tiles`               | GET    | Population density overlay                        |

## Coverage

The Open Buildings dataset covers South Asia, Africa, Southeast Asia, Latin America, and the Caribbean. The app includes quick-pick locations for Mumbai, Delhi, Bangalore, Hyderabad, and Chennai, but search works for any location within the dataset coverage area.
