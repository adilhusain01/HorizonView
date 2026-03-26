import { create } from "zustand";

export type LayerKey = "ndvi" | "nightlights" | "landuse" | "population" | "hotspots";

interface LayerMeta {
  label: string;
  description: string;
}

export const LAYER_META: Record<LayerKey, LayerMeta> = {
  ndvi: { label: "Vegetation (NDVI)", description: "Green cover from Sentinel-2" },
  nightlights: { label: "Night Lights", description: "Economic activity (VIIRS)" },
  landuse: { label: "Land Use", description: "ESA WorldCover classification" },
  population: { label: "Population", description: "WorldPop density" },
  hotspots: { label: "Growth Hotspots", description: "Building growth 2016-2023" },
};

interface LayersState {
  activeLayers: Set<LayerKey>;
  tileUrls: Record<LayerKey, string | null>;
  loading: Record<LayerKey, boolean>;
  opacity: Record<LayerKey, number>;

  toggleLayer: (key: LayerKey) => void;
  setOpacity: (key: LayerKey, val: number) => void;
  fetchLayerTiles: (key: LayerKey) => Promise<void>;
}

const apiPaths: Record<LayerKey, string> = {
  ndvi: "/api/layers/ndvi/tiles",
  nightlights: "/api/layers/nightlights/tiles",
  landuse: "/api/layers/landuse/tiles",
  population: "/api/layers/population/tiles",
  hotspots: "/api/hotspots/tiles",
};

export const useLayersStore = create<LayersState>((set, get) => ({
  activeLayers: new Set(),
  tileUrls: { ndvi: null, nightlights: null, landuse: null, population: null, hotspots: null },
  loading: { ndvi: false, nightlights: false, landuse: false, population: false, hotspots: false },
  opacity: { ndvi: 0.7, nightlights: 0.7, landuse: 0.7, population: 0.7, hotspots: 0.7 },

  toggleLayer: (key) => {
    const current = new Set(get().activeLayers);
    if (current.has(key)) {
      current.delete(key);
    } else {
      current.add(key);
      if (!get().tileUrls[key]) get().fetchLayerTiles(key);
    }
    set({ activeLayers: current });
  },

  setOpacity: (key, val) => {
    set({ opacity: { ...get().opacity, [key]: val } });
  },

  fetchLayerTiles: async (key) => {
    set({ loading: { ...get().loading, [key]: true } });
    try {
      const res = await fetch(apiPaths[key]);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      set({ tileUrls: { ...get().tileUrls, [key]: data.tile_url } });
    } catch (err) {
      console.error(`Failed to fetch ${key} tiles:`, err);
    } finally {
      set({ loading: { ...get().loading, [key]: false } });
    }
  },
}));
