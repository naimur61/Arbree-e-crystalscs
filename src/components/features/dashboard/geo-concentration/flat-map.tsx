"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip, type TooltipData } from "./tooltip";
import { markers, type MarkerData } from "./markers-data";

// Bundled world topology (110m) — imported locally so the map renders
// instantly with no network fetch and no loading state.
import worldAtlas from "./world-atlas.json";

// ViewBox tuned to the flat world map's natural 2:1 ratio so it fills
// the canvas edge-to-edge with no extra padding.
const MAP_WIDTH = 800;
const MAP_HEIGHT = 390;
const MAP_SCALE = 146;

// Zoom / rotation limits for the interactive controls.
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const ZOOM_STEP = 1.3;

// Degrees of longitude the map rotates per pixel of horizontal drag.
const ROTATE_SENSITIVITY = 0.6;

// rAF smooth animation: eases toward the cursor while dragging, then keeps
// spinning with decaying momentum for a smooth glide.
const EASE = 0.12; // drag-follow smoothing per frame (0-1)
const INERTIA_FRICTION = 0.9; // per-frame momentum decay
const MIN_SPEED = 0.05; // stop inertia below this
const MAX_SPEED = 60; // cap initial inertia

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

// Keep the rotation bounded to [0, 360).
function normalizeRotation(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

// Country shapes are the expensive part (~200 SVG paths), so they are
// memoized: hovering a marker only re-renders the tooltip, never the map.
const CountryLayer = memo(function CountryLayer() {
  return (
    <Geographies geography={worldAtlas}>
      {({ geographies }) =>
        geographies.map((geo) => (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            fill="#A3C1AD"
            stroke="#FFFFFF"
            strokeWidth={0.5}
            style={{
              default: { outline: "none" },
              hover: { fill: "#93b1bd", outline: "none" },
              pressed: { outline: "none" },
            }}
          />
        ))
      }
    </Geographies>
  );
});

// Memoized marker; paired with the stable handlers below, hovering one
// marker no longer forces the other markers to re-render either.
const MapMarker = memo(function MapMarker({
  data,
  onEnter,
  onLeave,
}: {
  data: MarkerData;
  onEnter: (data: MarkerData) => void;
  onLeave: () => void;
}) {
  return (
    <Marker
      coordinates={data.coordinates}
      onMouseEnter={() => onEnter(data)}
      onMouseLeave={onLeave}
    >
      {/* Outer Glow Effect */}
      <circle r={6} fill="#4ade80" opacity={0.4} className="animate-ping" />
      {/* Inner Solid Green Dot */}
      <circle
        r={5}
        fill="#16a34a"
        stroke="#ffffff"
        strokeWidth={1.5}
        className="transition-transform cursor-pointer hover:scale-125"
      />
    </Marker>
  );
});

export default function FlatMap() {
  const [tooltipContent, setTooltipContent] = useState<TooltipData | null>(
    null,
  );
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0); // longitude only — no tilt

  // Refs shared with the rAF animation loop and pointer handlers.
  const rotationRef = useRef(0);
  const targetRef = useRef(0);
  const velocityRef = useRef(0);
  const dragRef = useRef<{
    x: number;
    lon: number;
    pointerId: number;
  } | null>(null);
  const draggingRef = useRef(false);
  const resettingRef = useRef(false);

  // One continuous rAF loop drives rotation, so horizontal dragging feels
  // smooth: it glides toward the cursor with easing while dragging, and
  // keeps turning with decaying momentum after you release.
  useEffect(() => {
    let raf = 0;
    let prev = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - prev) / 16.667, 3) || 1;
      prev = now;

      let r = rotationRef.current;
      let changed = false;

      if (draggingRef.current) {
        // Fluidly chase the pointer-drag target.
        r += (targetRef.current - r) * EASE;
        changed = true;
      } else if (resettingRef.current) {
        // Glide back to the default view.
        r *= 1 - EASE;
        changed = true;
        if (Math.abs(r) < 0.5) {
          r = 0;
          resettingRef.current = false;
        }
      } else if (Math.abs(velocityRef.current) > MIN_SPEED) {
        // Momentum: keep spinning, then gradually slow down.
        r += velocityRef.current * dt;
        velocityRef.current *= Math.pow(INERTIA_FRICTION, dt);
        changed = true;
      } else {
        velocityRef.current = 0;
      }

      if (changed) {
        rotationRef.current = normalizeRotation(r);
        setRotation(rotationRef.current);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Drag-to-rotate: only the longitude (x) axis spins from horizontal drag;
  // the map never tilts. Pointer capture keeps tracking outside the canvas.
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      draggingRef.current = true;
      resettingRef.current = false;
      velocityRef.current = 0;
      dragRef.current = {
        x: e.clientX,
        lon: rotationRef.current,
        pointerId: e.pointerId,
      };
      targetRef.current = rotationRef.current;
    },
    [],
  );
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;
      const next = drag.lon + (e.clientX - drag.x) * ROTATE_SENSITIVITY;
      // Snapshot per-move velocity to seed the release momentum.
      velocityRef.current = next - targetRef.current;
      targetRef.current = next;
    },
    [],
  );
  const handlePointerEnd = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragRef.current?.pointerId !== e.pointerId) return;
      dragRef.current = null;
      draggingRef.current = false;
      velocityRef.current = clamp(velocityRef.current, -MAX_SPEED, MAX_SPEED);
      if (Math.abs(velocityRef.current) < MIN_SPEED) velocityRef.current = 0;
    },
    [],
  );

  // Stable callbacks keep the memoized markers from re-rendering.
  const handleMarkerEnter = useCallback((data: MarkerData) => {
    setTooltipContent({
      name: data.name,
      suppliers: data.suppliers,
      breakdown: data.breakdown,
    });
  }, []);
  const handleMarkerLeave = useCallback(() => setTooltipContent(null), []);

  const handleZoomIn = useCallback(
    () => setZoom((z) => Math.min(MAX_ZOOM, +(z * ZOOM_STEP).toFixed(2))),
    [],
  );
  const handleZoomOut = useCallback(
    () => setZoom((z) => Math.max(MIN_ZOOM, +(z / ZOOM_STEP).toFixed(2))),
    [],
  );
  // Keep the button zoom in sync with wheel/pinch gestures.
  const handleMoveEnd = useCallback(({ zoom: z }: { zoom: number }) => {
    setZoom(z);
  }, []);

  // Refresh: glide smoothly back to the default view and reset zoom.
  const handleReset = useCallback(() => {
    setZoom(1);
    draggingRef.current = false;
    dragRef.current = null;
    velocityRef.current = 0;
    targetRef.current = 0;
    resettingRef.current = true;
  }, []);

  return (
    <div className="relative p-6 w-full font-sans bg-white rounded-lg border shadow-sm select-none">
      <h2 className="mb-2 text-xl font-bold text-slate-800">
        Geo-Concentration & Dependency Map
      </h2>

      <div
        className="overflow-hidden relative w-full bg-white rounded"
        style={{ touchAction: "none", cursor: "grab" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <ComposableMap
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          projectionConfig={{ scale: MAP_SCALE, rotate: [rotation, 0, 0] }}
        >
          <ZoomableGroup
            zoom={zoom}
            onMoveEnd={handleMoveEnd}
            // Only wheel/pinch zooms; dragging is reserved for rotation.
            filterZoomEvent={(e) => e?.type === "wheel"}
          >
            <CountryLayer />

            {/* Location Markers */}
            {markers.map((marker) => (
              <MapMarker
                key={marker.name}
                data={marker}
                onEnter={handleMarkerEnter}
                onLeave={handleMarkerLeave}
              />
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip */}
        {tooltipContent && <Tooltip data={tooltipContent} />}
      </div>

      {/* Footer controls & update indicator */}
      <div className="flex justify-between items-center mt-4">
        <span className="flex items-center gap-3 text-sm text-gray-500">
          <span>Last updated: 7 days ago</span>
          <span className="hidden sm:inline text-gray-400">
            Drag to rotate · Scroll to zoom
          </span>
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            aria-label="Reset map view"
            title="Reset rotation and zoom"
            className="py-1 px-3 text-xl font-bold text-gray-600 bg-gray-100 rounded border shadow-sm hover:bg-gray-200"
          >
            ↻
          </button>
          <button
            onClick={handleZoomOut}
            aria-label="Zoom out"
            title="Zoom out"
            className="py-1 px-3 text-xl font-bold text-gray-600 bg-gray-100 rounded border shadow-sm hover:bg-gray-200"
          >
            -
          </button>
          <button
            onClick={handleZoomIn}
            aria-label="Zoom in"
            title="Zoom in"
            className="py-1 px-3 text-xl font-bold text-white bg-emerald-600 rounded shadow hover:bg-emerald-700"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
