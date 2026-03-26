"use client";

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  alert?: boolean;
}

export default function StatCard({ label, value, unit, trend, alert }: StatCardProps) {
  return (
    <div className={`bg-surface-light rounded-lg p-3 ${alert ? "border border-red-500/50" : ""}`}>
      <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-white">{value}</span>
        {unit && <span className="text-xs text-gray-400">{unit}</span>}
        {trend === "up" && <span className="text-green-400 text-xs ml-auto">▲</span>}
        {trend === "down" && <span className="text-red-400 text-xs ml-auto">▼</span>}
        {alert && <span className="text-red-400 text-[10px] ml-auto">RISK</span>}
      </div>
    </div>
  );
}
