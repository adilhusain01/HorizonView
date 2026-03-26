"use client";

import { useEffect, useRef } from "react";
import { useBuildingsStore, YEARS } from "@/stores/buildings-store";

export default function YearPlayer() {
  const currentYear = useBuildingsStore((s) => s.currentYear);
  const setYear = useBuildingsStore((s) => s.setYear);
  const playing = useBuildingsStore((s) => s.playing);
  const setPlaying = useBuildingsStore((s) => s.setPlaying);
  const advanceYear = useBuildingsStore((s) => s.advanceYear);
  const tilesReady = useBuildingsStore((s) => s.tilesReady);
  const tilesLoading = useBuildingsStore((s) => s.tilesLoading);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Play/pause loop
  useEffect(() => {
    if (playing && tilesReady) {
      intervalRef.current = setInterval(advanceYear, 1500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, tilesReady, advanceYear]);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value);
    setYear(YEARS[idx]);
  };

  const togglePlay = () => setPlaying(!playing);

  const yearIdx = YEARS.indexOf(currentYear);

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-surface px-6 py-4 rounded-3xl min-w-[420px] z-[1000]">
      <div className="text-center text-2xl font-medium text-brand mb-1">
        {currentYear}
      </div>

      <input
        type="range"
        min={0}
        max={YEARS.length - 1}
        value={yearIdx}
        step={1}
        onChange={handleSlider}
        className="w-full my-2"
      />

      <div className="flex justify-center gap-3 mt-2">
        <button
          onClick={togglePlay}
          disabled={tilesLoading || !tilesReady}
          className="bg-brand text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {tilesLoading
            ? "Preparing..."
            : playing
            ? "⏸ Pause"
            : "▶ Play"}
        </button>
      </div>
    </div>
  );
}
