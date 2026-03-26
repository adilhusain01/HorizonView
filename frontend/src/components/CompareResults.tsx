"use client";

import { useCompareStore } from "@/stores/compare-store";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from "recharts";

export default function CompareResults() {
  const reportA = useCompareStore((s) => s.reportA);
  const reportB = useCompareStore((s) => s.reportB);
  const scoreA = useCompareStore((s) => s.scoreA);
  const scoreB = useCompareStore((s) => s.scoreB);
  const recommendation = useCompareStore((s) => s.recommendation);

  if (!reportA || !reportB) return null;

  // Normalize metrics to 0-100 for radar chart
  const maxCagr = Math.max(reportA.growth.cagr, reportB.growth.cagr, 1);
  const maxDensity = Math.max(
    reportA.density.buildings_per_sqkm,
    reportB.density.buildings_per_sqkm,
    1
  );
  const maxNdvi = Math.max(reportA.ndvi.green_pct, reportB.ndvi.green_pct, 1);
  const nlA = reportA.nightlights.values;
  const nlB = reportB.nightlights.values;
  const maxNl = Math.max(nlA[nlA.length - 1] || 0, nlB[nlB.length - 1] || 0, 1);

  const radarData = [
    {
      metric: "Growth",
      A: (reportA.growth.cagr / maxCagr) * 100,
      B: (reportB.growth.cagr / maxCagr) * 100,
    },
    {
      metric: "Density",
      A: (reportA.density.buildings_per_sqkm / maxDensity) * 100,
      B: (reportB.density.buildings_per_sqkm / maxDensity) * 100,
    },
    {
      metric: "Green Cover",
      A: (reportA.ndvi.green_pct / maxNdvi) * 100,
      B: (reportB.ndvi.green_pct / maxNdvi) * 100,
    },
    {
      metric: "Night Lights",
      A: ((nlA[nlA.length - 1] || 0) / maxNl) * 100,
      B: ((nlB[nlB.length - 1] || 0) / maxNl) * 100,
    },
    {
      metric: "Elevation",
      A: Math.min(reportA.elevation.mean / 5, 100),
      B: Math.min(reportB.elevation.mean / 5, 100),
    },
    {
      metric: "Safety",
      A: reportA.elevation.flood_risk ? 20 : 100,
      B: reportB.elevation.flood_risk ? 20 : 100,
    },
  ];

  const MetricRow = ({
    label,
    valA,
    valB,
    unit,
  }: {
    label: string;
    valA: string | number;
    valB: string | number;
    unit?: string;
  }) => {
    const numA = typeof valA === "number" ? valA : parseFloat(valA);
    const numB = typeof valB === "number" ? valB : parseFloat(valB);
    const winner = numA > numB ? "a" : numB > numA ? "b" : null;
    return (
      <div className="flex items-center text-[10px] py-1 border-b border-gray-800">
        <span
          className={`w-1/3 text-right pr-2 ${winner === "a" ? "text-blue-400 font-bold" : "text-gray-400"}`}
        >
          {valA}{unit || ""}
        </span>
        <span className="w-1/3 text-center text-gray-500">{label}</span>
        <span
          className={`w-1/3 pl-2 ${winner === "b" ? "text-orange-400 font-bold" : "text-gray-400"}`}
        >
          {valB}{unit || ""}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* Investment scores */}
      <div className="flex gap-2">
        <div
          className={`flex-1 text-center py-2 rounded-lg ${
            (scoreA || 0) >= (scoreB || 0)
              ? "bg-blue-900/40 border border-blue-500/50"
              : "bg-surface-light"
          }`}
        >
          <div className="text-[10px] text-blue-400 uppercase">Area A</div>
          <div className="text-xl font-bold text-white">{scoreA?.toFixed(0)}</div>
          <div className="text-[10px] text-gray-500">/ 100</div>
        </div>
        <div
          className={`flex-1 text-center py-2 rounded-lg ${
            (scoreB || 0) > (scoreA || 0)
              ? "bg-orange-900/40 border border-orange-500/50"
              : "bg-surface-light"
          }`}
        >
          <div className="text-[10px] text-orange-400 uppercase">Area B</div>
          <div className="text-xl font-bold text-white">{scoreB?.toFixed(0)}</div>
          <div className="text-[10px] text-gray-500">/ 100</div>
        </div>
      </div>

      {/* Recommendation */}
      {recommendation && (
        <div className="text-[11px] text-gray-300 bg-surface-light rounded p-2 leading-relaxed">
          {recommendation}
        </div>
      )}

      {/* Radar chart */}
      <ResponsiveContainer width="100%" height={180}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: "#888" }} />
          <Radar
            name="Area A"
            dataKey="A"
            stroke="#669DF6"
            fill="#669DF6"
            fillOpacity={0.2}
          />
          <Radar
            name="Area B"
            dataKey="B"
            stroke="#f97316"
            fill="#f97316"
            fillOpacity={0.2}
          />
          <Tooltip
            contentStyle={{ background: "#1a1a1a", border: "1px solid #333", fontSize: 10 }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Metrics comparison table */}
      <div>
        <div className="flex text-[10px] text-gray-500 uppercase tracking-wider mb-1">
          <span className="w-1/3 text-right pr-2 text-blue-400">A</span>
          <span className="w-1/3 text-center">Metric</span>
          <span className="w-1/3 pl-2 text-orange-400">B</span>
        </div>
        <MetricRow label="CAGR" valA={reportA.growth.cagr} valB={reportB.growth.cagr} unit="%" />
        <MetricRow
          label="Density"
          valA={Math.round(reportA.density.buildings_per_sqkm)}
          valB={Math.round(reportB.density.buildings_per_sqkm)}
          unit="/km²"
        />
        <MetricRow
          label="Green"
          valA={reportA.ndvi.green_pct}
          valB={reportB.ndvi.green_pct}
          unit="%"
        />
        <MetricRow
          label="Elevation"
          valA={reportA.elevation.mean}
          valB={reportB.elevation.mean}
          unit="m"
        />
        <MetricRow
          label="Flood"
          valA={reportA.elevation.flood_risk ? "HIGH" : "LOW"}
          valB={reportB.elevation.flood_risk ? "HIGH" : "LOW"}
        />
      </div>
    </div>
  );
}
