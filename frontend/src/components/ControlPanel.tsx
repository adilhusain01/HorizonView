"use client";

import { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  useBuildingsStore,
  LOCATIONS,
  type Band,
} from "@/stores/buildings-store";
import LayerPanel from "./LayerPanel";
import AreaReport from "./AreaReport";
import LocationSummary from "./LocationSummary";
import HotspotPanel from "./HotspotPanel";
import ComparePanel from "./ComparePanel";

export default function ControlPanel({ isLoaded }: { isLoaded: boolean }) {
  const band = useBuildingsStore((s) => s.band);
  const setBand = useBuildingsStore((s) => s.setBand);
  const selectLocation = useBuildingsStore((s) => s.selectLocation);
  const areaReport = useBuildingsStore((s) => s.areaReport);
  const reportLoading = useBuildingsStore((s) => s.reportLoading);
  const clearReport = useBuildingsStore((s) => s.clearReport);
  const fetchLocationSummary = useBuildingsStore((s) => s.fetchLocationSummary);

  const [hasPolygon, setHasPolygon] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleBand = (b: Band) => setBand(b);

  const handleLocation = (key: string) => {
    selectLocation(key);
    const loc = LOCATIONS[key];
    if (loc) fetchLocationSummary(loc.lat, loc.lon);
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      (window as any).__flyTo?.(lat, lng, 12);
      fetchLocationSummary(lat, lng);
    }
  };

  const handleDraw = () => {
    (window as any).__startDrawing?.();
    setHasPolygon(true);
  };

  const handleClear = () => {
    (window as any).__clearPolygon?.();
    setHasPolygon(false);
    clearReport();
  };

  return (
    <div className="absolute top-5 right-5 w-96 max-h-[calc(100vh-40px)] bg-surface rounded-lg p-5 overflow-y-auto shadow-xl z-[1000]">
      <h1 className="text-lg font-medium text-brand mb-1">HorizonView</h1>
      <p className="text-[10px] leading-relaxed text-gray-500 mb-3">
        Real Estate Intelligence powered by satellite data &amp; AI analytics
      </p>

      {/* Band selector */}
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Data Type
      </div>
      <div className="flex gap-2 mb-3">
        {(["presence", "height"] as Band[]).map((b) => (
          <button
            key={b}
            onClick={() => handleBand(b)}
            className={`flex-1 py-1.5 px-3 rounded text-xs border transition-colors ${
              band === b
                ? "bg-brand border-brand text-white"
                : "bg-surface-light border-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            {b === "presence" ? "Presence" : "Height"}
          </button>
        ))}
      </div>

      <hr className="border-gray-800 my-3" />

      {/* Search + Location */}
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Location
      </div>
      {isLoaded ? (
        <Autocomplete
          onLoad={(ac) => (autocompleteRef.current = ac)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Search any location..."
            className="w-full p-2 rounded bg-surface-light border border-gray-600 text-white text-xs placeholder-gray-500 mb-2"
          />
        </Autocomplete>
      ) : (
        <input
          type="text"
          placeholder="Loading search..."
          disabled
          className="w-full p-2 rounded bg-surface-light border border-gray-600 text-gray-500 text-xs mb-2"
        />
      )}
      <div className="flex flex-wrap gap-1 mb-2">
        {Object.keys(LOCATIONS).map((key) => (
          <button
            key={key}
            onClick={() => handleLocation(key)}
            className="px-2 py-1 rounded bg-surface-light border border-gray-700 text-[10px] text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
          >
            {key.split(",")[0]}
          </button>
        ))}
      </div>
      <LocationSummary />

      <hr className="border-gray-800 my-3" />

      {/* Data Layers */}
      <LayerPanel />

      <hr className="border-gray-800 my-3" />

      {/* Area Intelligence */}
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Area Intelligence
      </div>
      <p className="text-[10px] text-gray-500 mb-2">
        Draw a polygon to get a full area report with building counts, NDVI, land use,
        elevation, and growth metrics.
      </p>
      {!hasPolygon ? (
        <button
          onClick={handleDraw}
          className="w-full py-2 rounded bg-brand/20 border border-brand/50 text-brand text-xs hover:bg-brand/30 transition-colors"
        >
          Draw Polygon
        </button>
      ) : (
        <button
          onClick={handleClear}
          className="w-full py-2 rounded bg-surface-light border border-gray-600 text-gray-300 text-xs hover:bg-gray-700 transition-colors"
        >
          Clear Polygon
        </button>
      )}

      {reportLoading && (
        <p className="text-xs text-brand mt-2 animate-pulse">
          Generating area report...
        </p>
      )}

      {areaReport && (
        <div className="mt-3">
          <AreaReport />
        </div>
      )}

      <hr className="border-gray-800 my-3" />

      {/* Growth Hotspots */}
      <HotspotPanel />

      <hr className="border-gray-800 my-3" />

      {/* Compare Areas */}
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Compare
      </div>
      <ComparePanel />
    </div>
  );
}
