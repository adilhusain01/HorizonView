"use client";

import { useCompareStore } from "@/stores/compare-store";
import CompareResults from "./CompareResults";

export default function ComparePanel() {
  const mode = useCompareStore((s) => s.mode);
  const loading = useCompareStore((s) => s.loading);
  const startCompare = useCompareStore((s) => s.startCompare);
  const reset = useCompareStore((s) => s.reset);

  if (mode === "off") {
    return (
      <button
        onClick={startCompare}
        className="w-full py-2 rounded bg-purple-600/20 border border-purple-600/50 text-purple-400 text-xs hover:bg-purple-600/30 transition-colors"
      >
        Compare Two Areas
      </button>
    );
  }

  if (mode === "drawing_a") {
    return (
      <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3 text-center">
        <div className="text-xs text-blue-400 font-medium">Draw Area A on the map</div>
        <div className="text-[10px] text-gray-500 mt-1">Click the first point again to close</div>
        <button onClick={reset} className="text-[10px] text-gray-500 underline mt-2">
          Cancel
        </button>
      </div>
    );
  }

  if (mode === "drawing_b") {
    return (
      <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-3 text-center">
        <div className="text-xs text-orange-400 font-medium">Now draw Area B</div>
        <div className="text-[10px] text-gray-500 mt-1">Click the first point again to close</div>
        <button onClick={reset} className="text-[10px] text-gray-500 underline mt-2">
          Cancel
        </button>
      </div>
    );
  }

  if (mode === "comparing" || loading) {
    return (
      <div className="text-center py-6 text-xs text-gray-400 animate-pulse">
        Comparing areas... This may take a moment.
      </div>
    );
  }

  if (mode === "done") {
    return (
      <div>
        <CompareResults />
        <button
          onClick={reset}
          className="w-full mt-3 py-1.5 rounded bg-gray-700 text-xs text-gray-300 hover:bg-gray-600 transition-colors"
        >
          Reset Comparison
        </button>
      </div>
    );
  }

  return null;
}
