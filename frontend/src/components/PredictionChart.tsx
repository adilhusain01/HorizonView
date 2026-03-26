"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import type { PredictionData } from "@/stores/buildings-store";

interface PredictionChartProps {
  data: PredictionData;
}

export default function PredictionChart({ data }: PredictionChartProps) {
  const chartData = [
    ...data.actual.years.map((y, i) => ({
      year: y,
      actual: data.actual.counts[i],
      predicted: null as number | null,
      upper: null as number | null,
      lower: null as number | null,
    })),
    ...data.predicted.years.map((y, i) => ({
      year: y,
      actual: null as number | null,
      predicted: data.predicted.counts[i],
      upper: data.confidence.upper[i],
      lower: data.confidence.lower[i],
    })),
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-[11px] text-gray-400 uppercase tracking-wider">
          Growth Forecast
        </div>
        <div className="text-[10px] text-gray-500">
          R² = {data.model.r_squared} | deg {data.model.degree}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <ComposedChart data={chartData}>
          <XAxis dataKey="year" tick={{ fontSize: 9, fill: "#666" }} />
          <YAxis hide />
          <Tooltip
            contentStyle={{ background: "#1a1a1a", border: "1px solid #333", fontSize: 11 }}
            formatter={(v) => {
              if (v === null || v === undefined) return "-";
              return Number(v).toLocaleString();
            }}
          />
          <ReferenceLine x={2023} stroke="#555" strokeDasharray="3 3" />
          <Area
            dataKey="upper"
            stroke="none"
            fill="#f59e0b"
            fillOpacity={0.1}
          />
          <Area
            dataKey="lower"
            stroke="none"
            fill="#000"
            fillOpacity={0.8}
          />
          <Bar dataKey="actual" fill="#669DF6" radius={[2, 2, 0, 0]} />
          <Line
            dataKey="predicted"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "#f59e0b", r: 3 }}
            connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
