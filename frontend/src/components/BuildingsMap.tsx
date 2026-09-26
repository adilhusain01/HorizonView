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
const CLOSE_POLYGON_PIXEL_THRESHOLD = 18;

export default function BuildingsMap({ isLoaded }: { isLoaded: boolean }) {

  const mapRef = useRef<google.maps.Map | null>(null);
  const drawnPolygonRef = useRef<google.maps.Polygon | null>(null);
  const draftLineRef = useRef<google.maps.Polyline | null>(null);
  const draftPathRef = useRef<google.maps.LatLng[]>([]);
  const mapClickListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const mapDoubleClickListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const mapMouseMoveListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const drawingActiveRef = useRef(false);
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

  const stopDrawing = useCallback(() => {
    const map = mapRef.current;

    drawingActiveRef.current = false;
    draftPathRef.current = [];
    draftLineRef.current?.setMap(null);
    draftLineRef.current = null;

    mapClickListenerRef.current?.remove();
    mapDoubleClickListenerRef.current?.remove();
    mapMouseMoveListenerRef.current?.remove();
    mapClickListenerRef.current = null;
    mapDoubleClickListenerRef.current = null;
    mapMouseMoveListenerRef.current = null;

    if (map) {
      map.setOptions({ draggable: true, draggableCursor: undefined, disableDoubleClickZoom: false });
    }
  }, []);

  const completeDraftPolygon = useCallback(() => {
    const map = mapRef.current;
    const path = [...draftPathRef.current];
    while (path.length > 1 && path[path.length - 1].equals(path[path.length - 2])) {
      path.pop();
    }

    if (!map || path.length < 3) return;

    if (drawnPolygonRef.current) drawnPolygonRef.current.setMap(null);

    const polygon = new google.maps.Polygon({
      paths: path,
      map,
      fillColor: "#669DF6",
      fillOpacity: 0.3,
      strokeWeight: 2,
      strokeColor: "#669DF6",
      editable: true,
      zIndex: 1,
    });

    drawnPolygonRef.current = polygon;
    stopDrawing();

    const coords = path.map((pt) => [pt.lng(), pt.lat()]);
    coords.push(coords[0]);

    const cMode = useCompareStore.getState().mode;
    if (cMode === "drawing_a") {
      setPolygonA(coords);
    } else if (cMode === "drawing_b") {
      setPolygonB(coords);
    } else {
      fetchAreaReport(coords);
    }
  }, [fetchAreaReport, setPolygonA, setPolygonB, stopDrawing]);

  const isNearFirstDraftPoint = useCallback((point: google.maps.LatLng) => {
    const map = mapRef.current;
    const projection = map?.getProjection();
    const firstPoint = draftPathRef.current[0];
    const zoom = map?.getZoom();
    if (!projection || !firstPoint || zoom === undefined || draftPathRef.current.length < 3) {
      return false;
    }

    const scale = 2 ** zoom;
    const firstPixel = projection.fromLatLngToPoint(firstPoint);
    const currentPixel = projection.fromLatLngToPoint(point);
    if (!firstPixel || !currentPixel) return false;

    const distance = Math.hypot(
      (firstPixel.x - currentPixel.x) * scale,
      (firstPixel.y - currentPixel.y) * scale
    );

    return distance <= CLOSE_POLYGON_PIXEL_THRESHOLD;
  }, []);

  const startDrawing = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    stopDrawing();
    drawingActiveRef.current = true;
    draftPathRef.current = [];
    map.setOptions({ draggable: false, draggableCursor: "crosshair", disableDoubleClickZoom: true });

    draftLineRef.current = new google.maps.Polyline({
      map,
      path: [],
      strokeColor: "#669DF6",
      strokeOpacity: 1,
      strokeWeight: 2,
      clickable: false,
      zIndex: 2,
    });

    mapClickListenerRef.current = map.addListener("click", (event: google.maps.MapMouseEvent) => {
      if (!drawingActiveRef.current || !event.latLng) return;
      if (isNearFirstDraftPoint(event.latLng)) {
        completeDraftPolygon();
        return;
      }

      draftPathRef.current.push(event.latLng);
      draftLineRef.current?.setPath(draftPathRef.current);
    });

    mapMouseMoveListenerRef.current = map.addListener("mousemove", (event: google.maps.MapMouseEvent) => {
      if (!drawingActiveRef.current || !event.latLng || draftPathRef.current.length === 0) return;
      const previewPoint = isNearFirstDraftPoint(event.latLng)
        ? draftPathRef.current[0]
        : event.latLng;
      draftLineRef.current?.setPath([...draftPathRef.current, previewPoint]);
    });

    mapDoubleClickListenerRef.current = map.addListener("dblclick", () => {
      completeDraftPolygon();
    });
  }, [completeDraftPolygon, isNearFirstDraftPoint, stopDrawing]);

  // ── Map loaded — set up drawing helpers + window helpers ──────────
  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;

      // Expose window helpers
      (window as any).__startDrawing = () => {
        startDrawing();
      };
      (window as any).__clearPolygon = () => {
        stopDrawing();
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
    [clearReport, startDrawing, stopDrawing]
  );

  // Cleanup window helpers
  useEffect(() => {
    return () => {
      stopDrawing();
      delete (window as any).__startDrawing;
      delete (window as any).__clearPolygon;
      delete (window as any).__flyTo;
      delete (window as any).__getMap;
    };
  }, [stopDrawing]);

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
