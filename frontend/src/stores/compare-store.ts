import { create } from "zustand";
import type { AreaReport } from "./buildings-store";

export type CompareMode = "off" | "drawing_a" | "drawing_b" | "comparing" | "done";

interface CompareState {
  mode: CompareMode;
  coordsA: number[][] | null;
  coordsB: number[][] | null;
  reportA: AreaReport | null;
  reportB: AreaReport | null;
  scoreA: number | null;
  scoreB: number | null;
  recommendation: string | null;
  loading: boolean;

  startCompare: () => void;
  setPolygonA: (coords: number[][]) => void;
  setPolygonB: (coords: number[][]) => void;
  reset: () => void;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  mode: "off",
  coordsA: null,
  coordsB: null,
  reportA: null,
  reportB: null,
  scoreA: null,
  scoreB: null,
  recommendation: null,
  loading: false,

  startCompare: () => {
    set({
      mode: "drawing_a",
      coordsA: null, coordsB: null,
      reportA: null, reportB: null,
      scoreA: null, scoreB: null,
      recommendation: null,
    });
    (window as any).__startDrawing?.();
  },

  setPolygonA: (coords) => {
    set({ coordsA: coords, mode: "drawing_b" });
    (window as any).__startDrawing?.();
  },

  setPolygonB: async (coords) => {
    set({ coordsB: coords, mode: "comparing", loading: true });
    const { coordsA } = get();
    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          area_a: { coordinates: [coordsA] },
          area_b: { coordinates: [coords] },
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      set({
        reportA: data.area_a,
        reportB: data.area_b,
        scoreA: data.investment_score.a,
        scoreB: data.investment_score.b,
        recommendation: data.recommendation,
        mode: "done",
      });
    } catch (err) {
      console.error("Compare failed:", err);
      set({ mode: "off" });
    } finally {
      set({ loading: false });
    }
  },

  reset: () => {
    (window as any).__clearPolygon?.();
    set({
      mode: "off",
      coordsA: null, coordsB: null,
      reportA: null, reportB: null,
      scoreA: null, scoreB: null,
      recommendation: null,
    });
  },
}));
