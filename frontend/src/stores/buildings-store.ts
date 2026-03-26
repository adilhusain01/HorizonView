import { create } from "zustand";

export type Band = "presence" | "height";

export interface Location {
  lon: number;
  lat: number;
  zoom: number;
}

export const YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

export const LOCATIONS: Record<string, Location> = {
  "Mumbai, India": { lon: 72.8777, lat: 19.076, zoom: 12 },
  "Delhi, India": { lon: 77.209, lat: 28.6139, zoom: 11 },
  "Bangalore, India": { lon: 77.5946, lat: 12.9716, zoom: 12 },
  "Hyderabad, India": { lon: 78.4867, lat: 17.385, zoom: 12 },
  "Chennai, India": { lon: 80.2707, lat: 13.0827, zoom: 12 },
};

export interface AreaReport {
  building_count: { years: number[]; counts: number[] };
  building_height: { years: number[]; avg_heights: number[] };
  density: { area_sqkm: number; buildings_per_sqkm: number };
  growth: { yoy_rates: number[]; cagr: number };
  ndvi: { years: number[]; values: number[]; green_pct: number };
  nightlights: { years: number[]; values: number[] };
  landuse: Record<string, number>;
  elevation: { min: number; max: number; mean: number; slope_mean: number; flood_risk: boolean };
}

export interface PredictionData {
  actual: { years: number[]; counts: number[] };
  predicted: { years: number[]; counts: number[] };
  model: { type: string; degree: number; r_squared: number };
  confidence: { upper: number[]; lower: number[] };
}

export interface LocationSummary {
  building_density: number;
  building_growth_cagr: number;
  count_2016: number;
  count_2023: number;
  ndvi: number;
  nightlights: number;
  dominant_landuse: string;
  elevation: number;
  summary_text: string;
}

interface BuildingsState {
  currentYear: number;
  band: Band;
  selectedLocation: string | null;

  tileUrls: Record<number, string>;
  tilesLoading: boolean;
  tilesReady: boolean;

  playing: boolean;

  // Area report (replaces old countData)
  areaReport: AreaReport | null;
  reportLoading: boolean;
  drawnCoords: number[][] | null;

  // Growth prediction
  predictionData: PredictionData | null;
  predictionLoading: boolean;

  // Location summary
  locationSummary: LocationSummary | null;
  summaryLoading: boolean;

  // Actions
  setYear: (year: number) => void;
  setBand: (band: Band) => void;
  selectLocation: (key: string) => void;
  flyTo: (lat: number, lng: number, zoom: number) => void;
  setPlaying: (playing: boolean) => void;
  advanceYear: () => void;
  fetchTiles: (band: Band) => Promise<void>;
  fetchAreaReport: (coordinates: number[][]) => Promise<void>;
  fetchPrediction: (coordinates: number[][]) => Promise<void>;
  fetchLocationSummary: (lat: number, lng: number) => Promise<void>;
  clearReport: () => void;
}

export const useBuildingsStore = create<BuildingsState>((set, get) => ({
  currentYear: 2016,
  band: "presence",
  selectedLocation: null,
  tileUrls: {},
  tilesLoading: false,
  tilesReady: false,
  playing: false,
  areaReport: null,
  reportLoading: false,
  drawnCoords: null,
  predictionData: null,
  predictionLoading: false,
  locationSummary: null,
  summaryLoading: false,

  setYear: (year) => set({ currentYear: year }),
  setBand: (band) => set({ band }),
  selectLocation: (key) => set({ selectedLocation: key, locationSummary: null }),

  flyTo: (lat, lng, zoom) => {
    set({ selectedLocation: `__custom_${lat}_${lng}` });
    // The map component will read the custom location via a callback
    (window as any).__flyTo?.(lat, lng, zoom);
  },

  setPlaying: (playing) => set({ playing }),

  advanceYear: () => {
    const { currentYear } = get();
    const idx = YEARS.indexOf(currentYear);
    const next = YEARS[(idx + 1) % YEARS.length];
    set({ currentYear: next });
  },

  fetchTiles: async (band) => {
    set({ tilesLoading: true, tilesReady: false, playing: false });
    try {
      const res = await fetch(`/api/buildings/tiles?band=${band}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      set({ tileUrls: data.tiles, tilesReady: true });
    } catch (err) {
      console.error("Failed to fetch tiles:", err);
      set({ tileUrls: {} });
    } finally {
      set({ tilesLoading: false });
    }
  },

  fetchAreaReport: async (coordinates) => {
    set({ reportLoading: true, areaReport: null, predictionData: null, drawnCoords: coordinates });
    try {
      const res = await fetch("/api/area/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coordinates: [coordinates] }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      set({ areaReport: data });
    } catch (err) {
      console.error("Failed to fetch area report:", err);
    } finally {
      set({ reportLoading: false });
    }
  },

  fetchPrediction: async (coordinates) => {
    set({ predictionLoading: true, predictionData: null });
    try {
      const res = await fetch("/api/predict/growth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coordinates: [coordinates] }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      set({ predictionData: data });
    } catch (err) {
      console.error("Failed to fetch prediction:", err);
    } finally {
      set({ predictionLoading: false });
    }
  },

  fetchLocationSummary: async (lat, lng) => {
    set({ summaryLoading: true, locationSummary: null });
    try {
      const res = await fetch("/api/location/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      set({ locationSummary: data });
    } catch (err) {
      console.error("Failed to fetch location summary:", err);
    } finally {
      set({ summaryLoading: false });
    }
  },

  clearReport: () => set({ areaReport: null, predictionData: null, drawnCoords: null }),
}));
