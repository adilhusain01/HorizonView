"use client";

import { useCallback, useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useBuildingsStore, YEARS, LOCATIONS } from "@/stores/buildings-store";
import { useLayersStore, type LayerKey } from "@/stores/layers-store";
import { useCompareStore } from "@/stores/compare-store";

const MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#000000" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#444444" }] },
  { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", stylers: [{ color: "#a1a1a1" }, { weight: 0.5 }] },
  { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
];

const DEFAULT_CENTER = { lat: 20.5, lng: 78.9 };
const DEFAULT_ZOOM = 5;

export default function BuildingsMap({ isLoaded }: { isLoaded: boolean }) {

  const mapRef = useRef<google.maps.Map | null>(null);
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
  const drawnPolygonRef = useRef<google.maps.Polygon | null>(null);
  const yearLayersRef = useRef<Map<number, google.maps.ImageMapType>>(new Map());
  const prevYearRef = useRef<number>(2016);
  const extraLayersRef = useRef<Map<LayerKey, google.maps.ImageMapType>>(new Map());

  const currentYear = useBuildingsStore((s) => s.currentYear);
  const tileUrls = useBuildingsStore((s) => s.tileUrls);
  const tilesReady = useBuildingsStore((s) => s.tilesReady);
  const selectedLocation = useBuildingsStore((s) => s.selectedLocation);
  const fetchAreaReport = useBuildingsStore((s) => s.fetchAreaReport);
  const clearReport = useBuildingsStore((s) => s.clearReport);

  const activeLayers = useLayersStore((s) => s.activeLayers);
  const layerTileUrls = useLayersStore((s) => s.tileUrls);
  const layerOpacity = useLayersStore((s) => s.opacity);

  const compareMode = useCompareStore((s) => s.mode);
  const setPolygonA = useCompareStore((s) => s.setPolygonA);
  const setPolygonB = useCompareStore((s) => s.setPolygonB);

  // ── Create all 8 year overlays, toggle via opacity ─────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !tilesReady) return;

    // Remove old year overlays
    yearLayersRef.current.forEach((overlay) => {
      const idx = findOverlayIndex(map, overlay);
      if (idx >= 0) map.overlayMapTypes.removeAt(idx);
    });
    yearLayersRef.current.clear();

    YEARS.forEach((year) => {
      const url = tileUrls[year];
      if (!url) return;

      const overlay = new google.maps.ImageMapType({
        getTileUrl: (coord, z) =>
          url
            .replace("{x}", String(coord.x))
            .replace("{y}", String(coord.y))
            .replace("{z}", String(z)),
        tileSize: new google.maps.Size(256, 256),
        opacity: year === currentYear ? 1 : 0,
        name: `buildings-${year}`,
      });

      yearLayersRef.current.set(year, overlay);
      map.overlayMapTypes.push(overlay);
    });

    prevYearRef.current = currentYear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileUrls, tilesReady]);

  // ── Switch year — pure opacity toggle, zero network ────────────────
  useEffect(() => {
    const prev = prevYearRef.current;
    if (prev === currentYear) return;

    yearLayersRef.current.get(prev)?.setOpacity(0);
    yearLayersRef.current.get(currentYear)?.setOpacity(1);
    prevYearRef.current = currentYear;
  }, [currentYear]);

  // ── Manage extra data layers ────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const allKeys: LayerKey[] = ["ndvi", "nightlights", "landuse", "population", "hotspots"];

    allKeys.forEach((key) => {
      const existing = extraLayersRef.current.get(key);
      const shouldShow = activeLayers.has(key);
      const url = layerTileUrls[key];

      if (shouldShow && url) {
        if (existing) {
          existing.setOpacity(layerOpacity[key]);
        } else {
          const overlay = new google.maps.ImageMapType({
            getTileUrl: (coord, z) =>
              url
                .replace("{x}", String(coord.x))
                .replace("{y}", String(coord.y))
                .replace("{z}", String(z)),
            tileSize: new google.maps.Size(256, 256),
            opacity: layerOpacity[key],
            name: `layer-${key}`,
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
  }, [activeLayers, layerTileUrls, layerOpacity]);

  // ── Fly to selected location ───────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedLocation) return;

    const loc = LOCATIONS[selectedLocation];
    if (!loc) return;

    map.panTo({ lat: loc.lat, lng: loc.lon });
    map.setZoom(loc.zoom);
  }, [selectedLocation]);

  // ── Map loaded — set up drawing manager + window helpers ──────────
  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
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
          zIndex: 1,
        },
      });
      dm.setMap(map);
      drawingManagerRef.current = dm;

      google.maps.event.addListener(
        dm,
        "polygoncomplete",
        (polygon: google.maps.Polygon) => {
          if (drawnPolygonRef.current) drawnPolygonRef.current.setMap(null);
          drawnPolygonRef.current = polygon;
          dm.setDrawingMode(null);

          const path = polygon.getPath();
          const coords: number[][] = [];
          for (let i = 0; i < path.getLength(); i++) {
            const pt = path.getAt(i);
            coords.push([pt.lng(), pt.lat()]);
          }
          coords.push(coords[0]);

          // Check if in compare mode
          const cMode = useCompareStore.getState().mode;
          if (cMode === "drawing_a") {
            setPolygonA(coords);
          } else if (cMode === "drawing_b") {
            setPolygonB(coords);
          } else {
            fetchAreaReport(coords);
          }
        }
      );

      // Expose window helpers
      (window as any).__startDrawing = () => {
        drawingManagerRef.current?.setDrawingMode(
          google.maps.drawing.OverlayType.POLYGON
        );
      };
      (window as any).__clearPolygon = () => {
        if (drawnPolygonRef.current) {
          drawnPolygonRef.current.setMap(null);
          drawnPolygonRef.current = null;
        }
        clearReport();
      };
      (window as any).__flyTo = (lat: number, lng: number, zoom: number) => {
        map.panTo({ lat, lng });
        map.setZoom(zoom);
      };
      (window as any).__getMap = () => map;
    },
    [fetchAreaReport, clearReport, setPolygonA, setPolygonB]
  );

  // Cleanup window helpers
  useEffect(() => {
    return () => {
      delete (window as any).__startDrawing;
      delete (window as any).__clearPolygon;
      delete (window as any).__flyTo;
      delete (window as any).__getMap;
    };
  }, []);

  if (!isLoaded) return null;

  return (
    <GoogleMap
      mapContainerClassName="absolute inset-0 w-full h-full"
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      options={{
        styles: MAP_STYLE,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
      }}
      onLoad={onMapLoad}
    />
  );
}

function findOverlayIndex(map: google.maps.Map, overlay: google.maps.ImageMapType): number {
  for (let i = 0; i < map.overlayMapTypes.getLength(); i++) {
    if (map.overlayMapTypes.getAt(i) === overlay) return i;
  }
  return -1;
}
