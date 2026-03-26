"use client";

import { useState } from "react";

interface HotspotCell {
  lat: number;
  lng: number;
  growth_rate: number;
  count_2016: number;
  count_2023: number;
  rank: number;
}

interface HotspotCluster {
  center_lat: number;
  center_lng: number;
  avg_growth: number;
  cell_count: number;
}

interface DetectResult {
  cells: HotspotCell[];
  clusters: HotspotCluster[];
  top_n: HotspotCell[];
}

export default function HotspotPanel() {
  const [result, setResult] = useState<DetectResult | null>(null);
  const [loading, setLoading] = useState(false);

  const detectHotspots = async () => {
    const map = (window as any).__getMap?.() as google.maps.Map | undefined;
    if (!map) return;

    const bounds = map.getBounds();
    if (!bounds) return;

    setLoading(true);
    try {
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      const res = await fetch("/api/hotspots/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bounds: {
            north: ne.lat(),
            south: sw.lat(),
            east: ne.lng(),
            west: sw.lng(),
          },
          grid_size_km: 1,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      console.error("Hotspot detection failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const flyTo = (lat: number, lng: number) => {
    (window as any).__flyTo?.(lat, lng, 13);
  };

  return (
    <div>
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Growth Hotspots
      </div>

      <button
        onClick={detectHotspots}
        disabled={loading}
        className="w-full py-2 rounded bg-orange-600/20 border border-orange-600/50 text-orange-400 text-xs hover:bg-orange-600/30 transition-colors disabled:opacity-40"
      >
        {loading ? "Detecting..." : "Detect Hotspots in View"}
      </button>

      {result && (
        <div className="mt-3 space-y-2">
          {result.clusters.length > 0 && (
            <div className="text-[10px] text-gray-500">
              {result.clusters.length} cluster{result.clusters.length > 1 ? "s" : ""} found
            </div>
          )}

          <div className="text-[10px] text-gray-400 uppercase tracking-wider">
            Top Growth Areas
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {result.top_n.map((cell, i) => (
              <button
                key={i}
                onClick={() => flyTo(cell.lat, cell.lng)}
                className="w-full flex items-center gap-2 p-2 bg-surface-light rounded text-left hover:bg-gray-800 transition-colors"
              >
                <span className="text-[10px] text-gray-500 w-4">#{cell.rank}</span>
                <div className="flex-1">
                  <div className="text-[10px] text-gray-400">
                    {cell.lat.toFixed(3)}, {cell.lng.toFixed(3)}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {cell.count_2016.toFixed(0)} → {cell.count_2023.toFixed(0)} buildings
                  </div>
                </div>
                <span
                  className={`text-xs font-bold ${
                    cell.growth_rate > 200
                      ? "text-red-400"
                      : cell.growth_rate > 100
                      ? "text-orange-400"
                      : "text-yellow-400"
                  }`}
                >
                  +{cell.growth_rate}%
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
