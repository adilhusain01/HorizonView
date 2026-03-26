"use client";

import { useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import BuildingsMap from "@/components/BuildingsMap";
import ControlPanel from "@/components/ControlPanel";
import YearPlayer from "@/components/YearPlayer";
import Legend from "@/components/Legend";
import { useBuildingsStore } from "@/stores/buildings-store";

const MAPS_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY!;
const LIBRARIES: ("drawing" | "places")[] = ["drawing", "places"];

export default function BuildingsPage() {
  const fetchTiles = useBuildingsStore((s) => s.fetchTiles);
  const band = useBuildingsStore((s) => s.band);
  const tilesLoading = useBuildingsStore((s) => s.tilesLoading);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  useEffect(() => {
    fetchTiles(band);
  }, [fetchTiles, band]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <BuildingsMap isLoaded={isLoaded} />

      <a
        href="/"
        className="absolute top-5 left-5 bg-surface border border-gray-600 rounded-lg px-5 py-2.5 text-brand text-sm font-medium z-[1000] hover:bg-gray-900 hover:border-brand transition-colors no-underline"
      >
        &larr; Back to HorizonView
      </a>

      <ControlPanel isLoaded={isLoaded} />
      <YearPlayer />
      <Legend />

      {tilesLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 px-8 py-4 rounded-lg z-[2000] text-sm">
          Preparing timelapse...
        </div>
      )}
    </div>
  );
}
