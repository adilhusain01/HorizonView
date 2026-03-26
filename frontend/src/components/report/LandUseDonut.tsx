"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS: Record<string, string> = {
  tree_cover: "#006400",
  shrubland: "#ffbb22",
  grassland: "#ffff4c",
  cropland: "#f096ff",
  built_up: "#fa0000",
  bare: "#b4b4b4",
  water: "#0064c8",
  wetland: "#0096a0",
  mangrove: "#00cf75",
  moss: "#fae6a0",
  snow: "#f0f0f0",
  other: "#888888",
};

const LABELS: Record<string, string> = {
  tree_cover: "Trees",
  shrubland: "Shrubs",
  grassland: "Grass",
  cropland: "Crops",
  built_up: "Built-up",
  bare: "Bare",
  water: "Water",
  wetland: "Wetland",
  mangrove: "Mangrove",
  moss: "Moss",
  snow: "Snow",
  other: "Other",
};

interface LandUseDonutProps {
  data: Record<string, number>;
}

export default function LandUseDonut({ data }: LandUseDonutProps) {
  const entries = Object.entries(data)
    .filter(([, v]) => v > 0.5)
    .sort(([, a], [, b]) => b - a);

  const chartData = entries.map(([key, value]) => ({
    name: LABELS[key] || key,
    value,
    color: COLORS[key] || "#888",
  }));

  return (
    <div className="mb-3">
      <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Land Use</div>
      <div className="flex items-center gap-2">
        <ResponsiveContainer width={100} height={100}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={25}
              outerRadius={45}
              strokeWidth={0}
            >
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "#1a1a1a", border: "1px solid #333", fontSize: 11 }}
              formatter={(v: number) => [`${v.toFixed(1)}%`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 text-[10px] space-y-0.5">
          {chartData.slice(0, 5).map((d) => (
            <div key={d.name} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-gray-300">{d.name}</span>
              <span className="text-gray-500 ml-auto">{d.value.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
