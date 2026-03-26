module.exports = [
"[project]/Documents/Projects/horizon_view/frontend/src/stores/buildings-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LOCATIONS",
    ()=>LOCATIONS,
    "YEARS",
    ()=>YEARS,
    "useBuildingsStore",
    ()=>useBuildingsStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
const YEARS = [
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023
];
const LOCATIONS = {
    "Mumbai, India": {
        lon: 72.8777,
        lat: 19.076,
        zoom: 12
    },
    "Delhi, India": {
        lon: 77.209,
        lat: 28.6139,
        zoom: 11
    },
    "Bangalore, India": {
        lon: 77.5946,
        lat: 12.9716,
        zoom: 12
    },
    "Hyderabad, India": {
        lon: 78.4867,
        lat: 17.385,
        zoom: 12
    },
    "Chennai, India": {
        lon: 80.2707,
        lat: 13.0827,
        zoom: 12
    }
};
const useBuildingsStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        currentYear: 2016,
        band: "presence",
        selectedLocation: null,
        tileUrls: {},
        tilesLoading: false,
        tilesReady: false,
        playing: false,
        areaReport: null,
        reportLoading: false,
        drawnCoords: null,
        predictionData: null,
        predictionLoading: false,
        locationSummary: null,
        summaryLoading: false,
        setYear: (year)=>set({
                currentYear: year
            }),
        setBand: (band)=>set({
                band
            }),
        selectLocation: (key)=>set({
                selectedLocation: key,
                locationSummary: null
            }),
        flyTo: (lat, lng, zoom)=>{
            set({
                selectedLocation: `__custom_${lat}_${lng}`
            });
            // The map component will read the custom location via a callback
            window.__flyTo?.(lat, lng, zoom);
        },
        setPlaying: (playing)=>set({
                playing
            }),
        advanceYear: ()=>{
            const { currentYear } = get();
            const idx = YEARS.indexOf(currentYear);
            const next = YEARS[(idx + 1) % YEARS.length];
            set({
                currentYear: next
            });
        },
        fetchTiles: async (band)=>{
            set({
                tilesLoading: true,
                tilesReady: false,
                playing: false
            });
            try {
                const res = await fetch(`/api/buildings/tiles?band=${band}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                set({
                    tileUrls: data.tiles,
                    tilesReady: true
                });
            } catch (err) {
                console.error("Failed to fetch tiles:", err);
                set({
                    tileUrls: {}
                });
            } finally{
                set({
                    tilesLoading: false
                });
            }
        },
        fetchAreaReport: async (coordinates)=>{
            set({
                reportLoading: true,
                areaReport: null,
                predictionData: null,
                drawnCoords: coordinates
            });
            try {
                const res = await fetch("/api/area/report", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        coordinates: [
                            coordinates
                        ]
                    })
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                set({
                    areaReport: data
                });
            } catch (err) {
                console.error("Failed to fetch area report:", err);
            } finally{
                set({
                    reportLoading: false
                });
            }
        },
        fetchPrediction: async (coordinates)=>{
            set({
                predictionLoading: true,
                predictionData: null
            });
            try {
                const res = await fetch("/api/predict/growth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        coordinates: [
                            coordinates
                        ]
                    })
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                set({
                    predictionData: data
                });
            } catch (err) {
                console.error("Failed to fetch prediction:", err);
            } finally{
                set({
                    predictionLoading: false
                });
            }
        },
        fetchLocationSummary: async (lat, lng)=>{
            set({
                summaryLoading: true,
                locationSummary: null
            });
            try {
                const res = await fetch("/api/location/summary", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        lat,
                        lng
                    })
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                set({
                    locationSummary: data
                });
            } catch (err) {
                console.error("Failed to fetch location summary:", err);
            } finally{
                set({
                    summaryLoading: false
                });
            }
        },
        clearReport: ()=>set({
                areaReport: null,
                predictionData: null,
                drawnCoords: null
            })
    }));
}),
"[project]/Documents/Projects/horizon_view/frontend/src/stores/layers-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LAYER_META",
    ()=>LAYER_META,
    "useLayersStore",
    ()=>useLayersStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
const LAYER_META = {
    ndvi: {
        label: "Vegetation (NDVI)",
        description: "Green cover from Sentinel-2"
    },
    nightlights: {
        label: "Night Lights",
        description: "Economic activity (VIIRS)"
    },
    landuse: {
        label: "Land Use",
        description: "ESA WorldCover classification"
    },
    population: {
        label: "Population",
        description: "WorldPop density"
    },
    hotspots: {
        label: "Growth Hotspots",
        description: "Building growth 2016-2023"
    }
};
const apiPaths = {
    ndvi: "/api/layers/ndvi/tiles",
    nightlights: "/api/layers/nightlights/tiles",
    landuse: "/api/layers/landuse/tiles",
    population: "/api/layers/population/tiles",
    hotspots: "/api/hotspots/tiles"
};
const useLayersStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        activeLayers: new Set(),
        tileUrls: {
            ndvi: null,
            nightlights: null,
            landuse: null,
            population: null,
            hotspots: null
        },
        loading: {
            ndvi: false,
            nightlights: false,
            landuse: false,
            population: false,
            hotspots: false
        },
        opacity: {
            ndvi: 0.7,
            nightlights: 0.7,
            landuse: 0.7,
            population: 0.7,
            hotspots: 0.7
        },
        toggleLayer: (key)=>{
            const current = new Set(get().activeLayers);
            if (current.has(key)) {
                current.delete(key);
            } else {
                current.add(key);
                if (!get().tileUrls[key]) get().fetchLayerTiles(key);
            }
            set({
                activeLayers: current
            });
        },
        setOpacity: (key, val)=>{
            set({
                opacity: {
                    ...get().opacity,
                    [key]: val
                }
            });
        },
        fetchLayerTiles: async (key)=>{
            set({
                loading: {
                    ...get().loading,
                    [key]: true
                }
            });
            try {
                const res = await fetch(apiPaths[key]);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                set({
                    tileUrls: {
                        ...get().tileUrls,
                        [key]: data.tile_url
                    }
                });
            } catch (err) {
                console.error(`Failed to fetch ${key} tiles:`, err);
            } finally{
                set({
                    loading: {
                        ...get().loading,
                        [key]: false
                    }
                });
            }
        }
    }));
}),
"[project]/Documents/Projects/horizon_view/frontend/src/stores/compare-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCompareStore",
    ()=>useCompareStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
const useCompareStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        mode: "off",
        coordsA: null,
        coordsB: null,
        reportA: null,
        reportB: null,
        scoreA: null,
        scoreB: null,
        recommendation: null,
        loading: false,
        startCompare: ()=>{
            set({
                mode: "drawing_a",
                coordsA: null,
                coordsB: null,
                reportA: null,
                reportB: null,
                scoreA: null,
                scoreB: null,
                recommendation: null
            });
            window.__startDrawing?.();
        },
        setPolygonA: (coords)=>{
            set({
                coordsA: coords,
                mode: "drawing_b"
            });
            window.__startDrawing?.();
        },
        setPolygonB: async (coords)=>{
            set({
                coordsB: coords,
                mode: "comparing",
                loading: true
            });
            const { coordsA } = get();
            try {
                const res = await fetch("/api/compare", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        area_a: {
                            coordinates: [
                                coordsA
                            ]
                        },
                        area_b: {
                            coordinates: [
                                coords
                            ]
                        }
                    })
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                set({
                    reportA: data.area_a,
                    reportB: data.area_b,
                    scoreA: data.investment_score.a,
                    scoreB: data.investment_score.b,
                    recommendation: data.recommendation,
                    mode: "done"
                });
            } catch (err) {
                console.error("Compare failed:", err);
                set({
                    mode: "off"
                });
            } finally{
                set({
                    loading: false
                });
            }
        },
        reset: ()=>{
            window.__clearPolygon?.();
            set({
                mode: "off",
                coordsA: null,
                coordsB: null,
                reportA: null,
                reportB: null,
                scoreA: null,
                scoreB: null,
                recommendation: null
            });
        }
    }));
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/BuildingsMap.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BuildingsMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/@react-google-maps/api/dist/esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/stores/buildings-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$layers$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/stores/layers-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/stores/compare-store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const MAP_STYLE = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#000000"
            }
        ]
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#746855"
            }
        ]
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#242f3e"
            }
        ]
    },
    {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#444444"
            }
        ]
    },
    {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#ffffff"
            }
        ]
    },
    {
        featureType: "poi",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road",
        stylers: [
            {
                color: "#a1a1a1"
            },
            {
                weight: 0.5
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#17263c"
            }
        ]
    }
];
const DEFAULT_CENTER = {
    lat: 20.5,
    lng: 78.9
};
const DEFAULT_ZOOM = 5;
function BuildingsMap({ isLoaded }) {
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drawingManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drawnPolygonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const yearLayersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const prevYearRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(2016);
    const extraLayersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const currentYear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.currentYear);
    const tileUrls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.tileUrls);
    const tilesReady = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.tilesReady);
    const selectedLocation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.selectedLocation);
    const fetchAreaReport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.fetchAreaReport);
    const clearReport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.clearReport);
    const activeLayers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$layers$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayersStore"])((s)=>s.activeLayers);
    const layerTileUrls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$layers$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayersStore"])((s)=>s.tileUrls);
    const layerOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$layers$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayersStore"])((s)=>s.opacity);
    const compareMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"])((s)=>s.mode);
    const setPolygonA = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"])((s)=>s.setPolygonA);
    const setPolygonB = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"])((s)=>s.setPolygonB);
    // ── Create all 8 year overlays, toggle via opacity ─────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const map = mapRef.current;
        if (!map || !tilesReady) return;
        // Remove old year overlays
        yearLayersRef.current.forEach((overlay)=>{
            const idx = findOverlayIndex(map, overlay);
            if (idx >= 0) map.overlayMapTypes.removeAt(idx);
        });
        yearLayersRef.current.clear();
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YEARS"].forEach((year)=>{
            const url = tileUrls[year];
            if (!url) return;
            const overlay = new google.maps.ImageMapType({
                getTileUrl: (coord, z)=>url.replace("{x}", String(coord.x)).replace("{y}", String(coord.y)).replace("{z}", String(z)),
                tileSize: new google.maps.Size(256, 256),
                opacity: year === currentYear ? 1 : 0,
                name: `buildings-${year}`
            });
            yearLayersRef.current.set(year, overlay);
            map.overlayMapTypes.push(overlay);
        });
        prevYearRef.current = currentYear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        tileUrls,
        tilesReady
    ]);
    // ── Switch year — pure opacity toggle, zero network ────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const prev = prevYearRef.current;
        if (prev === currentYear) return;
        yearLayersRef.current.get(prev)?.setOpacity(0);
        yearLayersRef.current.get(currentYear)?.setOpacity(1);
        prevYearRef.current = currentYear;
    }, [
        currentYear
    ]);
    // ── Manage extra data layers ────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const map = mapRef.current;
        if (!map) return;
        const allKeys = [
            "ndvi",
            "nightlights",
            "landuse",
            "population",
            "hotspots"
        ];
        allKeys.forEach((key)=>{
            const existing = extraLayersRef.current.get(key);
            const shouldShow = activeLayers.has(key);
            const url = layerTileUrls[key];
            if (shouldShow && url) {
                if (existing) {
                    existing.setOpacity(layerOpacity[key]);
                } else {
                    const overlay = new google.maps.ImageMapType({
                        getTileUrl: (coord, z)=>url.replace("{x}", String(coord.x)).replace("{y}", String(coord.y)).replace("{z}", String(z)),
                        tileSize: new google.maps.Size(256, 256),
                        opacity: layerOpacity[key],
                        name: `layer-${key}`
                    });
                    extraLayersRef.current.set(key, overlay);
                    map.overlayMapTypes.push(overlay);
                }
            } else if (!shouldShow && existing) {
                const idx = findOverlayIndex(map, existing);
                if (idx >= 0) map.overlayMapTypes.removeAt(idx);
                extraLayersRef.current.delete(key);
            }
        });
    }, [
        activeLayers,
        layerTileUrls,
        layerOpacity
    ]);
    // ── Fly to selected location ───────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const map = mapRef.current;
        if (!map || !selectedLocation) return;
        const loc = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCATIONS"][selectedLocation];
        if (!loc) return;
        map.panTo({
            lat: loc.lat,
            lng: loc.lon
        });
        map.setZoom(loc.zoom);
    }, [
        selectedLocation
    ]);
    // ── Map loaded — set up drawing manager + window helpers ──────────
    const onMapLoad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((map)=>{
        mapRef.current = map;
        const dm = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: false,
            polygonOptions: {
                fillColor: "#669DF6",
                fillOpacity: 0.3,
                strokeWeight: 2,
                strokeColor: "#669DF6",
                editable: true,
                zIndex: 1
            }
        });
        dm.setMap(map);
        drawingManagerRef.current = dm;
        google.maps.event.addListener(dm, "polygoncomplete", (polygon)=>{
            if (drawnPolygonRef.current) drawnPolygonRef.current.setMap(null);
            drawnPolygonRef.current = polygon;
            dm.setDrawingMode(null);
            const path = polygon.getPath();
            const coords = [];
            for(let i = 0; i < path.getLength(); i++){
                const pt = path.getAt(i);
                coords.push([
                    pt.lng(),
                    pt.lat()
                ]);
            }
            coords.push(coords[0]);
            // Check if in compare mode
            const cMode = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"].getState().mode;
            if (cMode === "drawing_a") {
                setPolygonA(coords);
            } else if (cMode === "drawing_b") {
                setPolygonB(coords);
            } else {
                fetchAreaReport(coords);
            }
        });
        // Expose window helpers
        window.__startDrawing = ()=>{
            drawingManagerRef.current?.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        };
        window.__clearPolygon = ()=>{
            if (drawnPolygonRef.current) {
                drawnPolygonRef.current.setMap(null);
                drawnPolygonRef.current = null;
            }
            clearReport();
        };
        window.__flyTo = (lat, lng, zoom)=>{
            map.panTo({
                lat,
                lng
            });
            map.setZoom(zoom);
        };
        window.__getMap = ()=>map;
    }, [
        fetchAreaReport,
        clearReport,
        setPolygonA,
        setPolygonB
    ]);
    // Cleanup window helpers
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            delete window.__startDrawing;
            delete window.__clearPolygon;
            delete window.__flyTo;
            delete window.__getMap;
        };
    }, []);
    if (!isLoaded) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GoogleMap"], {
        mapContainerClassName: "absolute inset-0 w-full h-full",
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        options: {
            styles: MAP_STYLE,
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: false
        },
        onLoad: onMapLoad
    }, void 0, false, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/BuildingsMap.tsx",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
function findOverlayIndex(map, overlay) {
    for(let i = 0; i < map.overlayMapTypes.getLength(); i++){
        if (map.overlayMapTypes.getAt(i) === overlay) return i;
    }
    return -1;
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LayerPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$layers$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/stores/layers-store.ts [app-ssr] (ecmascript)");
"use client";
;
;
const LAYER_KEYS = [
    "ndvi",
    "nightlights",
    "landuse",
    "population",
    "hotspots"
];
function LayerPanel() {
    const activeLayers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$layers$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayersStore"])((s)=>s.activeLayers);
    const loading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$layers$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayersStore"])((s)=>s.loading);
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$layers$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayersStore"])((s)=>s.opacity);
    const toggleLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$layers$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayersStore"])((s)=>s.toggleLayer);
    const setOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$layers$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayersStore"])((s)=>s.setOpacity);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2",
                children: "Data Layers"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: LAYER_KEYS.map((key)=>{
                    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$layers$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LAYER_META"][key];
                    const active = activeLayers.has(key);
                    const isLoading = loading[key];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-surface-light rounded-lg p-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>toggleLayer(key),
                                        className: `w-8 h-4 rounded-full transition-colors relative ${active ? "bg-brand" : "bg-gray-600"}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${active ? "left-4" : "left-0.5"}`
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                                            lineNumber: 34,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                                        lineNumber: 28,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-white truncate",
                                                children: [
                                                    meta.label,
                                                    isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-500 ml-1 animate-pulse",
                                                        children: "loading..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                                                        lineNumber: 44,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                                                lineNumber: 41,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] text-gray-500 truncate",
                                                children: meta.description
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                                                lineNumber: 47,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                                        lineNumber: 40,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                                lineNumber: 27,
                                columnNumber: 15
                            }, this),
                            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-gray-500",
                                        children: "Opacity"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                                        lineNumber: 52,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: 0,
                                        max: 100,
                                        value: opacity[key] * 100,
                                        onChange: (e)=>setOpacity(key, Number(e.target.value) / 100),
                                        className: "flex-1 h-1"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                                        lineNumber: 53,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-gray-500 w-6 text-right",
                                        children: [
                                            Math.round(opacity[key] * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                                        lineNumber: 61,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                                lineNumber: 51,
                                columnNumber: 17
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                        lineNumber: 26,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/report/StatCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function StatCard({ label, value, unit, trend, alert }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-surface-light rounded-lg p-3 ${alert ? "border border-red-500/50" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[10px] text-gray-400 uppercase tracking-wider mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/StatCard.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-baseline gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg font-bold text-white",
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/StatCard.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    unit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-400",
                        children: unit
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/StatCard.tsx",
                        lineNumber: 17,
                        columnNumber: 18
                    }, this),
                    trend === "up" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-green-400 text-xs ml-auto",
                        children: "▲"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/StatCard.tsx",
                        lineNumber: 18,
                        columnNumber: 28
                    }, this),
                    trend === "down" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-400 text-xs ml-auto",
                        children: "▼"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/StatCard.tsx",
                        lineNumber: 19,
                        columnNumber: 30
                    }, this),
                    alert && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-400 text-[10px] ml-auto",
                        children: "RISK"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/StatCard.tsx",
                        lineNumber: 20,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/StatCard.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/StatCard.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TrendChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/chart/AreaChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/cartesian/Area.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/chart/LineChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/cartesian/Line.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/chart/BarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
"use client";
;
;
function TrendChart({ title, years, values, color = "#669DF6", type = "line", unit = "" }) {
    const data = years.map((y, i)=>({
            year: y,
            value: values[i]
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[11px] text-gray-400 uppercase tracking-wider mb-1",
                children: title
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: 100,
                children: type === "area" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AreaChart"], {
                    data: data,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "year",
                            tick: {
                                fontSize: 9,
                                fill: "#666"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                            hide: true
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                background: "#1a1a1a",
                                border: "1px solid #333",
                                fontSize: 11
                            },
                            formatter: (v)=>[
                                    `${v.toFixed(2)}${unit}`,
                                    ""
                                ]
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                            dataKey: "value",
                            stroke: color,
                            fill: color,
                            fillOpacity: 0.2,
                            strokeWidth: 2
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this) : type === "bar" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                    data: data,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "year",
                            tick: {
                                fontSize: 9,
                                fill: "#666"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                            hide: true
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                background: "#1a1a1a",
                                border: "1px solid #333",
                                fontSize: 11
                            },
                            formatter: (v)=>[
                                    `${v.toFixed(1)}${unit}`,
                                    ""
                                ]
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                            dataKey: "value",
                            fill: color,
                            radius: [
                                2,
                                2,
                                0,
                                0
                            ]
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                    lineNumber: 56,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineChart"], {
                    data: data,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "year",
                            tick: {
                                fontSize: 9,
                                fill: "#666"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                            hide: true
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                background: "#1a1a1a",
                                border: "1px solid #333",
                                fontSize: 11
                            },
                            formatter: (v)=>[
                                    `${v.toFixed(2)}${unit}`,
                                    ""
                                ]
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                            dataKey: "value",
                            stroke: color,
                            strokeWidth: 2,
                            dot: {
                                fill: color,
                                r: 2
                            }
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LandUseDonut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/chart/PieChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/polar/Pie.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/component/Cell.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
"use client";
;
;
const COLORS = {
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
    other: "#888888"
};
const LABELS = {
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
    other: "Other"
};
function LandUseDonut({ data }) {
    const entries = Object.entries(data).filter(([, v])=>v > 0.5).sort(([, a], [, b])=>b - a);
    const chartData = entries.map(([key, value])=>({
            name: LABELS[key] || key,
            value,
            color: COLORS[key] || "#888"
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[11px] text-gray-400 uppercase tracking-wider mb-1",
                children: "Land Use"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: 100,
                        height: 100,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieChart"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Pie"], {
                                    data: chartData,
                                    dataKey: "value",
                                    cx: "50%",
                                    cy: "50%",
                                    innerRadius: 25,
                                    outerRadius: 45,
                                    strokeWidth: 0,
                                    children: chartData.map((entry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cell"], {
                                            fill: entry.color
                                        }, i, false, {
                                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
                                            lineNumber: 66,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    contentStyle: {
                                        background: "#1a1a1a",
                                        border: "1px solid #333",
                                        fontSize: 11
                                    },
                                    formatter: (v)=>[
                                            `${v.toFixed(1)}%`,
                                            ""
                                        ]
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 text-[10px] space-y-0.5",
                        children: chartData.slice(0, 5).map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 rounded-full inline-block",
                                        style: {
                                            backgroundColor: d.color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-300",
                                        children: d.name
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-500 ml-auto",
                                        children: [
                                            d.value.toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, d.name, true, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PredictionChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/chart/ComposedChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/cartesian/Line.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/cartesian/Area.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-ssr] (ecmascript)");
"use client";
;
;
function PredictionChart({ data }) {
    const chartData = [
        ...data.actual.years.map((y, i)=>({
                year: y,
                actual: data.actual.counts[i],
                predicted: null,
                upper: null,
                lower: null
            })),
        ...data.predicted.years.map((y, i)=>({
                year: y,
                actual: null,
                predicted: data.predicted.counts[i],
                upper: data.confidence.upper[i],
                lower: data.confidence.lower[i]
            }))
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[11px] text-gray-400 uppercase tracking-wider",
                        children: "Growth Forecast"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] text-gray-500",
                        children: [
                            "R² = ",
                            data.model.r_squared,
                            " | deg ",
                            data.model.degree
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: 140,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComposedChart"], {
                    data: chartData,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "year",
                            tick: {
                                fontSize: 9,
                                fill: "#666"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                            hide: true
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                background: "#1a1a1a",
                                border: "1px solid #333",
                                fontSize: 11
                            },
                            formatter: (v)=>{
                                if (v === null || v === undefined) return "-";
                                return Number(v).toLocaleString();
                            }
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                            x: 2023,
                            stroke: "#555",
                            strokeDasharray: "3 3"
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                            dataKey: "upper",
                            stroke: "none",
                            fill: "#f59e0b",
                            fillOpacity: 0.1
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                            dataKey: "lower",
                            stroke: "none",
                            fill: "#000",
                            fillOpacity: 0.8
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                            dataKey: "actual",
                            fill: "#669DF6",
                            radius: [
                                2,
                                2,
                                0,
                                0
                            ]
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                            dataKey: "predicted",
                            stroke: "#f59e0b",
                            strokeWidth: 2,
                            strokeDasharray: "5 5",
                            dot: {
                                fill: "#f59e0b",
                                r: 3
                            },
                            connectNulls: false
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AreaReport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/stores/buildings-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$StatCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/report/StatCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$TrendChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/report/TrendChart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$LandUseDonut$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/report/LandUseDonut.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$PredictionChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/PredictionChart.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function AreaReport() {
    const report = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.areaReport);
    const loading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.reportLoading);
    const drawnCoords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.drawnCoords);
    const fetchPrediction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.fetchPrediction);
    const predictionData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.predictionData);
    const predictionLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.predictionLoading);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-6 text-sm text-gray-400 animate-pulse",
            children: "Generating area intelligence report..."
        }, void 0, false, {
            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
    if (!report) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs font-semibold text-brand uppercase tracking-wider",
                children: "Area Intelligence"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$StatCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "Area",
                        value: report.density.area_sqkm.toFixed(1),
                        unit: "sq km"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$StatCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "Density",
                        value: Math.round(report.density.buildings_per_sqkm),
                        unit: "bldg/km²"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$StatCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "Growth (CAGR)",
                        value: `${report.growth.cagr}%`,
                        trend: report.growth.cagr > 5 ? "up" : report.growth.cagr > 0 ? "neutral" : "down"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$StatCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "Green Cover",
                        value: `${report.ndvi.green_pct}%`,
                        trend: report.ndvi.green_pct > 30 ? "up" : "down"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$StatCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "Elevation",
                        value: report.elevation.mean,
                        unit: "m"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$StatCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "Flood Risk",
                        value: report.elevation.flood_risk ? "HIGH" : "LOW",
                        alert: report.elevation.flood_risk
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$TrendChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                title: "Building Count",
                years: report.building_count.years,
                values: report.building_count.counts,
                type: "bar",
                color: "#669DF6"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$TrendChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                title: "Avg Building Height (m)",
                years: report.building_height.years,
                values: report.building_height.avg_heights,
                type: "line",
                color: "#f59e0b",
                unit: "m"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$TrendChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                title: "Year-over-Year Growth %",
                years: report.building_count.years.slice(1),
                values: report.growth.yoy_rates,
                type: "bar",
                color: "#10b981",
                unit: "%"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$TrendChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                title: "Vegetation Index (NDVI)",
                years: report.ndvi.years,
                values: report.ndvi.values,
                type: "area",
                color: "#22c55e"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$TrendChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                title: "Night Light Intensity",
                years: report.nightlights.years,
                values: report.nightlights.values,
                type: "line",
                color: "#fbbf24"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$report$2f$LandUseDonut$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                data: report.landuse
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-700 pt-3",
                children: [
                    !predictionData && !predictionLoading && drawnCoords && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>fetchPrediction(drawnCoords),
                        className: "w-full py-2 rounded bg-amber-600/20 border border-amber-600/50 text-amber-400 text-xs hover:bg-amber-600/30 transition-colors",
                        children: "Generate Growth Forecast"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this),
                    predictionLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-3 text-xs text-gray-400 animate-pulse",
                        children: "Computing growth forecast..."
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this),
                    predictionData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$PredictionChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        data: predictionData
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                        lineNumber: 132,
                        columnNumber: 28
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocationSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/stores/buildings-store.ts [app-ssr] (ecmascript)");
"use client";
;
;
function LocationSummary() {
    const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.locationSummary);
    const loading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.summaryLoading);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-surface-light rounded-lg p-3 text-xs text-gray-400 animate-pulse",
            children: "Analyzing location..."
        }, void 0, false, {
            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this);
    }
    if (!summary) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-surface-light rounded-lg p-3 space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[10px] text-gray-500 uppercase tracking-wider",
                children: "Quick Intelligence"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-300 leading-relaxed",
                children: summary.summary_text
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2 pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-gray-500",
                                children: "Density"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-medium text-white",
                                children: [
                                    Math.round(summary.building_density),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-gray-400",
                                        children: "bldg/km²"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                                        lineNumber: 27,
                                        columnNumber: 52
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-gray-500",
                                children: "Growth"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-medium text-white",
                                children: [
                                    summary.building_growth_cagr,
                                    "% ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-gray-400",
                                        children: "CAGR"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                                        lineNumber: 33,
                                        columnNumber: 45
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-gray-500",
                                children: "Land Use"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-medium text-white capitalize",
                                children: summary.dominant_landuse.replace(/_/g, " ")
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-gray-500",
                                children: "Elevation"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-medium text-white",
                                children: [
                                    summary.elevation,
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-gray-400",
                                        children: "m"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                                        lineNumber: 45,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HotspotPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function HotspotPanel() {
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const detectHotspots = async ()=>{
        const map = window.__getMap?.();
        if (!map) return;
        const bounds = map.getBounds();
        if (!bounds) return;
        setLoading(true);
        try {
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            const res = await fetch("/api/hotspots/detect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    bounds: {
                        north: ne.lat(),
                        south: sw.lat(),
                        east: ne.lng(),
                        west: sw.lng()
                    },
                    grid_size_km: 1
                })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data);
        } catch (err) {
            console.error("Hotspot detection failed:", err);
        } finally{
            setLoading(false);
        }
    };
    const flyTo = (lat, lng)=>{
        window.__flyTo?.(lat, lng, 13);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2",
                children: "Growth Hotspots"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: detectHotspots,
                disabled: loading,
                className: "w-full py-2 rounded bg-orange-600/20 border border-orange-600/50 text-orange-400 text-xs hover:bg-orange-600/30 transition-colors disabled:opacity-40",
                children: loading ? "Detecting..." : "Detect Hotspots in View"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 space-y-2",
                children: [
                    result.clusters.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] text-gray-500",
                        children: [
                            result.clusters.length,
                            " cluster",
                            result.clusters.length > 1 ? "s" : "",
                            " found"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
                        lineNumber: 86,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] text-gray-400 uppercase tracking-wider",
                        children: "Top Growth Areas"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-48 overflow-y-auto space-y-1",
                        children: result.top_n.map((cell, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>flyTo(cell.lat, cell.lng),
                                className: "w-full flex items-center gap-2 p-2 bg-surface-light rounded text-left hover:bg-gray-800 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-gray-500 w-4",
                                        children: [
                                            "#",
                                            cell.rank
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
                                        lineNumber: 101,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] text-gray-400",
                                                children: [
                                                    cell.lat.toFixed(3),
                                                    ", ",
                                                    cell.lng.toFixed(3)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
                                                lineNumber: 103,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] text-gray-500",
                                                children: [
                                                    cell.count_2016.toFixed(0),
                                                    " → ",
                                                    cell.count_2023.toFixed(0),
                                                    " buildings"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
                                                lineNumber: 106,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
                                        lineNumber: 102,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-xs font-bold ${cell.growth_rate > 200 ? "text-red-400" : cell.growth_rate > 100 ? "text-orange-400" : "text-yellow-400"}`,
                                        children: [
                                            "+",
                                            cell.growth_rate,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CompareResults
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/stores/compare-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/chart/RadarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/polar/PolarGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/polar/PolarAngleAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/polar/Radar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function CompareResults() {
    const reportA = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"])((s)=>s.reportA);
    const reportB = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"])((s)=>s.reportB);
    const scoreA = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"])((s)=>s.scoreA);
    const scoreB = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"])((s)=>s.scoreB);
    const recommendation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"])((s)=>s.recommendation);
    if (!reportA || !reportB) return null;
    // Normalize metrics to 0-100 for radar chart
    const maxCagr = Math.max(reportA.growth.cagr, reportB.growth.cagr, 1);
    const maxDensity = Math.max(reportA.density.buildings_per_sqkm, reportB.density.buildings_per_sqkm, 1);
    const maxNdvi = Math.max(reportA.ndvi.green_pct, reportB.ndvi.green_pct, 1);
    const nlA = reportA.nightlights.values;
    const nlB = reportB.nightlights.values;
    const maxNl = Math.max(nlA[nlA.length - 1] || 0, nlB[nlB.length - 1] || 0, 1);
    const radarData = [
        {
            metric: "Growth",
            A: reportA.growth.cagr / maxCagr * 100,
            B: reportB.growth.cagr / maxCagr * 100
        },
        {
            metric: "Density",
            A: reportA.density.buildings_per_sqkm / maxDensity * 100,
            B: reportB.density.buildings_per_sqkm / maxDensity * 100
        },
        {
            metric: "Green Cover",
            A: reportA.ndvi.green_pct / maxNdvi * 100,
            B: reportB.ndvi.green_pct / maxNdvi * 100
        },
        {
            metric: "Night Lights",
            A: (nlA[nlA.length - 1] || 0) / maxNl * 100,
            B: (nlB[nlB.length - 1] || 0) / maxNl * 100
        },
        {
            metric: "Elevation",
            A: Math.min(reportA.elevation.mean / 5, 100),
            B: Math.min(reportB.elevation.mean / 5, 100)
        },
        {
            metric: "Safety",
            A: reportA.elevation.flood_risk ? 20 : 100,
            B: reportB.elevation.flood_risk ? 20 : 100
        }
    ];
    const MetricRow = ({ label, valA, valB, unit })=>{
        const numA = typeof valA === "number" ? valA : parseFloat(valA);
        const numB = typeof valB === "number" ? valB : parseFloat(valB);
        const winner = numA > numB ? "a" : numB > numA ? "b" : null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center text-[10px] py-1 border-b border-gray-800",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `w-1/3 text-right pr-2 ${winner === "a" ? "text-blue-400 font-bold" : "text-gray-400"}`,
                    children: [
                        valA,
                        unit || ""
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-1/3 text-center text-gray-500",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `w-1/3 pl-2 ${winner === "b" ? "text-orange-400 font-bold" : "text-gray-400"}`,
                    children: [
                        valB,
                        unit || ""
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
            lineNumber: 82,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex-1 text-center py-2 rounded-lg ${(scoreA || 0) >= (scoreB || 0) ? "bg-blue-900/40 border border-blue-500/50" : "bg-surface-light"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-blue-400 uppercase",
                                children: "Area A"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xl font-bold text-white",
                                children: scoreA?.toFixed(0)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-gray-500",
                                children: "/ 100"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex-1 text-center py-2 rounded-lg ${(scoreB || 0) > (scoreA || 0) ? "bg-orange-900/40 border border-orange-500/50" : "bg-surface-light"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-orange-400 uppercase",
                                children: "Area B"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xl font-bold text-white",
                                children: scoreB?.toFixed(0)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-gray-500",
                                children: "/ 100"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            recommendation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[11px] text-gray-300 bg-surface-light rounded p-2 leading-relaxed",
                children: recommendation
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: 180,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadarChart"], {
                    data: radarData,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PolarGrid"], {
                            stroke: "#333"
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PolarAngleAxis"], {
                            dataKey: "metric",
                            tick: {
                                fontSize: 9,
                                fill: "#888"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Radar"], {
                            name: "Area A",
                            dataKey: "A",
                            stroke: "#669DF6",
                            fill: "#669DF6",
                            fillOpacity: 0.2
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Radar"], {
                            name: "Area B",
                            dataKey: "B",
                            stroke: "#f97316",
                            fill: "#f97316",
                            fillOpacity: 0.2
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                background: "#1a1a1a",
                                border: "1px solid #333",
                                fontSize: 10
                            }
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex text-[10px] text-gray-500 uppercase tracking-wider mb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-1/3 text-right pr-2 text-blue-400",
                                children: "A"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-1/3 text-center",
                                children: "Metric"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-1/3 pl-2 text-orange-400",
                                children: "B"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricRow, {
                        label: "CAGR",
                        valA: reportA.growth.cagr,
                        valB: reportB.growth.cagr,
                        unit: "%"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricRow, {
                        label: "Density",
                        valA: Math.round(reportA.density.buildings_per_sqkm),
                        valB: Math.round(reportB.density.buildings_per_sqkm),
                        unit: "/km²"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricRow, {
                        label: "Green",
                        valA: reportA.ndvi.green_pct,
                        valB: reportB.ndvi.green_pct,
                        unit: "%"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricRow, {
                        label: "Elevation",
                        valA: reportA.elevation.mean,
                        valB: reportB.elevation.mean,
                        unit: "m"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricRow, {
                        label: "Flood",
                        valA: reportA.elevation.flood_risk ? "HIGH" : "LOW",
                        valB: reportB.elevation.flood_risk ? "HIGH" : "LOW"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComparePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/stores/compare-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$CompareResults$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/CompareResults.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function ComparePanel() {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"])((s)=>s.mode);
    const loading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"])((s)=>s.loading);
    const startCompare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"])((s)=>s.startCompare);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$compare$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompareStore"])((s)=>s.reset);
    if (mode === "off") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: startCompare,
            className: "w-full py-2 rounded bg-purple-600/20 border border-purple-600/50 text-purple-400 text-xs hover:bg-purple-600/30 transition-colors",
            children: "Compare Two Areas"
        }, void 0, false, {
            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this);
    }
    if (mode === "drawing_a") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-blue-900/30 border border-blue-500/50 rounded-lg p-3 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-blue-400 font-medium",
                    children: "Draw Area A on the map"
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[10px] text-gray-500 mt-1",
                    children: "Click to place polygon points"
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: reset,
                    className: "text-[10px] text-gray-500 underline mt-2",
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this);
    }
    if (mode === "drawing_b") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-orange-900/30 border border-orange-500/50 rounded-lg p-3 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-orange-400 font-medium",
                    children: "Now draw Area B"
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[10px] text-gray-500 mt-1",
                    children: "Click to place polygon points"
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: reset,
                    className: "text-[10px] text-gray-500 underline mt-2",
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this);
    }
    if (mode === "comparing" || loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-6 text-xs text-gray-400 animate-pulse",
            children: "Comparing areas... This may take a moment."
        }, void 0, false, {
            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this);
    }
    if (mode === "done") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$CompareResults$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: reset,
                    className: "w-full mt-3 py-1.5 rounded bg-gray-700 text-xs text-gray-300 hover:bg-gray-600 transition-colors",
                    children: "Reset Comparison"
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this);
    }
    return null;
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ControlPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/@react-google-maps/api/dist/esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/stores/buildings-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$LayerPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/LayerPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$AreaReport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/AreaReport.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$LocationSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/LocationSummary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$HotspotPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/HotspotPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$ComparePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/ComparePanel.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function ControlPanel({ isLoaded }) {
    const band = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.band);
    const setBand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.setBand);
    const selectLocation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.selectLocation);
    const areaReport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.areaReport);
    const reportLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.reportLoading);
    const clearReport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.clearReport);
    const fetchLocationSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.fetchLocationSummary);
    const [hasPolygon, setHasPolygon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const autocompleteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleBand = (b)=>setBand(b);
    const handleLocation = (key)=>{
        selectLocation(key);
        const loc = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCATIONS"][key];
        if (loc) fetchLocationSummary(loc.lat, loc.lon);
    };
    const handlePlaceChanged = ()=>{
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            window.__flyTo?.(lat, lng, 12);
            fetchLocationSummary(lat, lng);
        }
    };
    const handleDraw = ()=>{
        window.__startDrawing?.();
        setHasPolygon(true);
    };
    const handleClear = ()=>{
        window.__clearPolygon?.();
        setHasPolygon(false);
        clearReport();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-5 right-5 w-96 max-h-[calc(100vh-40px)] bg-surface rounded-lg p-5 overflow-y-auto shadow-xl z-[1000]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-lg font-medium text-brand mb-1",
                children: "HorizonView"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] leading-relaxed text-gray-500 mb-3",
                children: "Real Estate Intelligence powered by satellite data & AI analytics"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2",
                children: "Data Type"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 mb-3",
                children: [
                    "presence",
                    "height"
                ].map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleBand(b),
                        className: `flex-1 py-1.5 px-3 rounded text-xs border transition-colors ${band === b ? "bg-brand border-brand text-white" : "bg-surface-light border-gray-600 text-white hover:bg-gray-700"}`,
                        children: b === "presence" ? "Presence" : "Height"
                    }, b, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "border-gray-800 my-3"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2",
                children: "Location"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            isLoaded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Autocomplete"], {
                onLoad: (ac)=>autocompleteRef.current = ac,
                onPlaceChanged: handlePlaceChanged,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Search any location...",
                    className: "w-full p-2 rounded bg-surface-light border border-gray-600 text-white text-xs placeholder-gray-500 mb-2"
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: "Loading search...",
                disabled: true,
                className: "w-full p-2 rounded bg-surface-light border border-gray-600 text-gray-500 text-xs mb-2"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 102,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1 mb-2",
                children: Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCATIONS"]).map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleLocation(key),
                        className: "px-2 py-1 rounded bg-surface-light border border-gray-700 text-[10px] text-gray-400 hover:text-white hover:border-gray-500 transition-colors",
                        children: key.split(",")[0]
                    }, key, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$LocationSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "border-gray-800 my-3"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$LayerPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "border-gray-800 my-3"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2",
                children: "Area Intelligence"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] text-gray-500 mb-2",
                children: "Draw a polygon to get a full area report with building counts, NDVI, land use, elevation, and growth metrics."
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            !hasPolygon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleDraw,
                className: "w-full py-2 rounded bg-brand/20 border border-brand/50 text-brand text-xs hover:bg-brand/30 transition-colors",
                children: "Draw Polygon"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleClear,
                className: "w-full py-2 rounded bg-surface-light border border-gray-600 text-gray-300 text-xs hover:bg-gray-700 transition-colors",
                children: "Clear Polygon"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 145,
                columnNumber: 9
            }, this),
            reportLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-brand mt-2 animate-pulse",
                children: "Generating area report..."
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this),
            areaReport && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$AreaReport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                    lineNumber: 161,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 160,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "border-gray-800 my-3"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$HotspotPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "border-gray-800 my-3"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2",
                children: "Compare"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$ComparePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/YearPlayer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>YearPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/stores/buildings-store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function YearPlayer() {
    const currentYear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.currentYear);
    const setYear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.setYear);
    const playing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.playing);
    const setPlaying = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.setPlaying);
    const advanceYear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.advanceYear);
    const tilesReady = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.tilesReady);
    const tilesLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.tilesLoading);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Play/pause loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (playing && tilesReady) {
            intervalRef.current = setInterval(advanceYear, 1500);
        }
        return ()=>{
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [
        playing,
        tilesReady,
        advanceYear
    ]);
    const handleSlider = (e)=>{
        const idx = parseInt(e.target.value);
        setYear(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YEARS"][idx]);
    };
    const togglePlay = ()=>setPlaying(!playing);
    const yearIdx = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YEARS"].indexOf(currentYear);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bottom-8 left-1/2 -translate-x-1/2 bg-surface px-6 py-4 rounded-3xl min-w-[420px] z-[1000]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-2xl font-medium text-brand mb-1",
                children: currentYear
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/YearPlayer.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "range",
                min: 0,
                max: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YEARS"].length - 1,
                value: yearIdx,
                step: 1,
                onChange: handleSlider,
                className: "w-full my-2"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/YearPlayer.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center gap-3 mt-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: togglePlay,
                    disabled: tilesLoading || !tilesReady,
                    className: "bg-brand text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                    children: tilesLoading ? "Preparing..." : playing ? "⏸ Pause" : "▶ Play"
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/YearPlayer.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/YearPlayer.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/YearPlayer.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/components/Legend.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Legend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/stores/buildings-store.ts [app-ssr] (ecmascript)");
"use client";
;
;
function Legend() {
    const band = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.band);
    if (band !== "height") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bottom-32 right-5 bg-surface p-4 rounded-lg min-w-[200px] z-[1000]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-medium text-sm mb-2",
                children: "Building Heights (m)"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/Legend.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-5 rounded",
                style: {
                    background: "linear-gradient(to right, #1d4877, #1b8a5a, #fbb021, #f68838, #ee3e32)"
                }
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/Legend.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between text-xs text-gray-400 mt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "0"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/Legend.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "15"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/Legend.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "30"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/Legend.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/Legend.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/components/Legend.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Projects/horizon_view/frontend/src/app/buildings/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BuildingsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/node_modules/@react-google-maps/api/dist/esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$BuildingsMap$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/BuildingsMap.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$ControlPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/ControlPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$YearPlayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/YearPlayer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$Legend$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/components/Legend.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/horizon_view/frontend/src/stores/buildings-store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const MAPS_API_KEY = ("TURBOPACK compile-time value", "AIzaSyCDgtLPbgOnmBK2W1TTN7l7fuXLq9vYEJ0");
const LIBRARIES = [
    "drawing",
    "places"
];
function BuildingsPage() {
    const fetchTiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.fetchTiles);
    const band = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.band);
    const tilesLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$stores$2f$buildings$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuildingsStore"])((s)=>s.tilesLoading);
    const { isLoaded } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useJsApiLoader"])({
        googleMapsApiKey: MAPS_API_KEY,
        libraries: LIBRARIES
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchTiles(band);
    }, [
        fetchTiles,
        band
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-screen h-screen overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$BuildingsMap$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isLoaded: isLoaded
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/app/buildings/page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/",
                className: "absolute top-5 left-5 bg-surface border border-gray-600 rounded-lg px-5 py-2.5 text-brand text-sm font-medium z-[1000] hover:bg-gray-900 hover:border-brand transition-colors no-underline",
                children: "← Back to HorizonView"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/app/buildings/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$ControlPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isLoaded: isLoaded
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/app/buildings/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$YearPlayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/app/buildings/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$src$2f$components$2f$Legend$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/app/buildings/page.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            tilesLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$horizon_view$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 px-8 py-4 rounded-lg z-[2000] text-sm",
                children: "Preparing timelapse..."
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/horizon_view/frontend/src/app/buildings/page.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Projects/horizon_view/frontend/src/app/buildings/page.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Documents_Projects_horizon_view_frontend_src_d0fa1ea7._.js.map