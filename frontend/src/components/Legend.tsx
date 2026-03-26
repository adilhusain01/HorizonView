"use client";

import { useBuildingsStore } from "@/stores/buildings-store";

export default function Legend() {
  const band = useBuildingsStore((s) => s.band);

  if (band !== "height") return null;

  return (
    <div className="absolute bottom-32 right-5 bg-surface p-4 rounded-lg min-w-[200px] z-[1000]">
      <div className="font-medium text-sm mb-2">Building Heights (m)</div>
      <div
        className="h-5 rounded"
        style={{
          background:
            "linear-gradient(to right, #1d4877, #1b8a5a, #fbb021, #f68838, #ee3e32)",
        }}
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>0</span>
        <span>15</span>
        <span>30</span>
      </div>
    </div>
  );
}
