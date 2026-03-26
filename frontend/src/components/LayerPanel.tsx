"use client";

import { useLayersStore, LAYER_META, type LayerKey } from "@/stores/layers-store";

const LAYER_KEYS: LayerKey[] = ["ndvi", "nightlights", "landuse", "population", "hotspots"];

export default function LayerPanel() {
  const activeLayers = useLayersStore((s) => s.activeLayers);
  const loading = useLayersStore((s) => s.loading);
  const opacity = useLayersStore((s) => s.opacity);
  const toggleLayer = useLayersStore((s) => s.toggleLayer);
  const setOpacity = useLayersStore((s) => s.setOpacity);

  return (
    <div>
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Data Layers
      </div>
      <div className="space-y-2">
        {LAYER_KEYS.map((key) => {
          const meta = LAYER_META[key];
          const active = activeLayers.has(key);
          const isLoading = loading[key];

          return (
            <div key={key} className="bg-surface-light rounded-lg p-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLayer(key)}
                  className={`w-8 h-4 rounded-full transition-colors relative ${
                    active ? "bg-brand" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                      active ? "left-4" : "left-0.5"
                    }`}
                  />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white truncate">
                    {meta.label}
                    {isLoading && (
                      <span className="text-gray-500 ml-1 animate-pulse">loading...</span>
                    )}
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">{meta.description}</div>
                </div>
              </div>
              {active && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] text-gray-500">Opacity</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={opacity[key] * 100}
                    onChange={(e) => setOpacity(key, Number(e.target.value) / 100)}
                    className="flex-1 h-1"
                  />
                  <span className="text-[10px] text-gray-500 w-6 text-right">
                    {Math.round(opacity[key] * 100)}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
