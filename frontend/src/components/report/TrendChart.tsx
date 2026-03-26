"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

interface TrendChartProps {
  title: string;
  years: number[];
  values: number[];
  color?: string;
  type?: "area" | "line" | "bar";
  unit?: string;
}

export default function TrendChart({
  title,
  years,
  values,
  color = "#669DF6",
  type = "line",
  unit = "",
}: TrendChartProps) {
  const data = years.map((y, i) => ({ year: y, value: values[i] }));

  return (
    <div className="mb-3">
      <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">{title}</div>
      <ResponsiveContainer width="100%" height={100}>
        {type === "area" ? (
          <AreaChart data={data}>
            <XAxis dataKey="year" tick={{ fontSize: 9, fill: "#666" }} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: "#1a1a1a", border: "1px solid #333", fontSize: 11 }}
              formatter={(v: number) => [`${v.toFixed(2)}${unit}`, ""]}
            />
            <Area
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        ) : type === "bar" ? (
          <BarChart data={data}>
            <XAxis dataKey="year" tick={{ fontSize: 9, fill: "#666" }} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: "#1a1a1a", border: "1px solid #333", fontSize: 11 }}
              formatter={(v: number) => [`${v.toFixed(1)}${unit}`, ""]}
            />
            <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <XAxis dataKey="year" tick={{ fontSize: 9, fill: "#666" }} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: "#1a1a1a", border: "1px solid #333", fontSize: 11 }}
              formatter={(v: number) => [`${v.toFixed(2)}${unit}`, ""]}
            />
            <Line
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 2 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
