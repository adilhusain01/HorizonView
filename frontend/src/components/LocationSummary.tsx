"use client";

import { useBuildingsStore } from "@/stores/buildings-store";

export default function LocationSummary() {
  const summary = useBuildingsStore((s) => s.locationSummary);
  const loading = useBuildingsStore((s) => s.summaryLoading);

  if (loading) {
    return (
      <div className="bg-surface-light rounded-lg p-3 text-xs text-gray-400 animate-pulse">
        Analyzing location...
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="bg-surface-light rounded-lg p-3 space-y-2">
      <div className="text-[10px] text-gray-500 uppercase tracking-wider">Quick Intelligence</div>
      <p className="text-xs text-gray-300 leading-relaxed">{summary.summary_text}</p>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div>
          <div className="text-[10px] text-gray-500">Density</div>
          <div className="text-sm font-medium text-white">
            {Math.round(summary.building_density)} <span className="text-[10px] text-gray-400">bldg/km²</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500">Growth</div>
          <div className="text-sm font-medium text-white">
            {summary.building_growth_cagr}% <span className="text-[10px] text-gray-400">CAGR</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500">Land Use</div>
          <div className="text-sm font-medium text-white capitalize">
            {summary.dominant_landuse.replace(/_/g, " ")}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500">Elevation</div>
          <div className="text-sm font-medium text-white">
            {summary.elevation} <span className="text-[10px] text-gray-400">m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
