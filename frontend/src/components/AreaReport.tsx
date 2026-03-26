"use client";

import { useBuildingsStore } from "@/stores/buildings-store";
import StatCard from "./report/StatCard";
import TrendChart from "./report/TrendChart";
import LandUseDonut from "./report/LandUseDonut";
import PredictionChart from "./PredictionChart";

export default function AreaReport() {
  const report = useBuildingsStore((s) => s.areaReport);
  const loading = useBuildingsStore((s) => s.reportLoading);
  const drawnCoords = useBuildingsStore((s) => s.drawnCoords);
  const fetchPrediction = useBuildingsStore((s) => s.fetchPrediction);
  const predictionData = useBuildingsStore((s) => s.predictionData);
  const predictionLoading = useBuildingsStore((s) => s.predictionLoading);

  if (loading) {
    return (
      <div className="text-center py-6 text-sm text-gray-400 animate-pulse">
        Generating area intelligence report...
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-brand uppercase tracking-wider">
        Area Intelligence
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          label="Area"
          value={report.density.area_sqkm.toFixed(1)}
          unit="sq km"
        />
        <StatCard
          label="Density"
          value={Math.round(report.density.buildings_per_sqkm)}
          unit="bldg/km²"
        />
        <StatCard
          label="Growth (CAGR)"
          value={`${report.growth.cagr}%`}
          trend={report.growth.cagr > 5 ? "up" : report.growth.cagr > 0 ? "neutral" : "down"}
        />
        <StatCard
          label="Green Cover"
          value={`${report.ndvi.green_pct}%`}
          trend={report.ndvi.green_pct > 30 ? "up" : "down"}
        />
        <StatCard
          label="Elevation"
          value={report.elevation.mean}
          unit="m"
        />
        <StatCard
          label="Flood Risk"
          value={report.elevation.flood_risk ? "HIGH" : "LOW"}
          alert={report.elevation.flood_risk}
        />
      </div>

      {/* Building count trend */}
      <TrendChart
        title="Building Count"
        years={report.building_count.years}
        values={report.building_count.counts}
        type="bar"
        color="#669DF6"
      />

      {/* Building height trend */}
      <TrendChart
        title="Avg Building Height (m)"
        years={report.building_height.years}
        values={report.building_height.avg_heights}
        type="line"
        color="#f59e0b"
        unit="m"
      />

      {/* YoY growth rates */}
      <TrendChart
        title="Year-over-Year Growth %"
        years={report.building_count.years.slice(1)}
        values={report.growth.yoy_rates}
        type="bar"
        color="#10b981"
        unit="%"
      />

      {/* NDVI trend */}
      <TrendChart
        title="Vegetation Index (NDVI)"
        years={report.ndvi.years}
        values={report.ndvi.values}
        type="area"
        color="#22c55e"
      />

      {/* Night lights trend */}
      <TrendChart
        title="Night Light Intensity"
        years={report.nightlights.years}
        values={report.nightlights.values}
        type="line"
        color="#fbbf24"
      />

      {/* Land use donut */}
      <LandUseDonut data={report.landuse} />

      {/* Growth prediction */}
      <div className="border-t border-gray-700 pt-3">
        {!predictionData && !predictionLoading && drawnCoords && (
          <button
            onClick={() => fetchPrediction(drawnCoords)}
            className="w-full py-2 rounded bg-amber-600/20 border border-amber-600/50 text-amber-400 text-xs hover:bg-amber-600/30 transition-colors"
          >
            Generate Growth Forecast
          </button>
        )}
        {predictionLoading && (
          <div className="text-center py-3 text-xs text-gray-400 animate-pulse">
            Computing growth forecast...
          </div>
        )}
        {predictionData && <PredictionChart data={predictionData} />}
      </div>
    </div>
  );
}
