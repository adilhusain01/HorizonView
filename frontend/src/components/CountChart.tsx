"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { years: number[]; counts: number[] };
}

export default function CountChart({ data }: Props) {
  const chartData = data.years.map((year, i) => ({
    year: String(year),
    count: data.counts[i],
  }));

  return (
    <div className="mt-3">
      <p className="text-xs text-gray-400 mb-1">
        Building count over time
      </p>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="year"
            tick={{ fill: "#999", fontSize: 10 }}
            axisLine={{ stroke: "#555" }}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              background: "#222",
              border: "1px solid #555",
              borderRadius: 6,
              fontSize: 12,
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#669DF6" }}
          />
          <Bar dataKey="count" fill="#669DF6" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
