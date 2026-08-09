"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { ActionButton } from "@/components/common/button";
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
// Colors come from CSS vars defined on the map canvas (--geo-*) so they
// adapt to light/dark mode.
const CountryLayer = memo(function CountryLayer() {
  return (
    <Geographies geography={worldAtlas}>
      {({ geographies }) =>
        geographies.map((geo) => (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            className="stroke-[var(--geo-border)]"
            strokeWidth={0.5}
            style={{
              default: { fill: "var(--geo-land)", outline: "none" },
              hover: { fill: "var(--geo-land-hover)", outline: "none" },
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
      {/* Soft pulsing halo */}
      <circle
        r={9}
        fill="var(--bg-success-secondary)"
        opacity={0.35}
        className="animate-ping"
      />
      {/* Green border / halo ring */}
      <circle r={8} fill="var(--bg-success-secondary)" />
      {/* Gradient dot */}
      <g
        className="transition-transform cursor-pointer hover:scale-125"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <rect
          x={-5}
          y={-5}
          width={10}
          height={10}
          rx={4}
          fill="url(#geo-marker-gradient)"
          style={{ boxShadow: "var(--marker-gradient-shadow)" }}
        />
      </g>
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
    <div className="font-sans rounded-xl border shadow-sm select-none border-primary bg-primary">
      {/* Card Header */}
      <div className="flex justify-between items-center py-3 px-4">
        <div>
          <h3 className="text-sm font-semibold text-primary">
            Geo-Concentration & Dependency Map
          </h3>
        </div>
        <span className="hidden sm:inline text-[11px] text-tertiary">
          Drag to rotate · Scroll to zoom
        </span>
      </div>

      {/* Map Canvas */}
      <div className="p-4">
        <div
          className="overflow-hidden relative rounded-lg bg-primary [--geo-land:#A3C1AD] [--geo-land-hover:#93B1BD] [--geo-border:#FFFFFF] dark:[--geo-land:#0F3D2E] dark:[--geo-land-hover:#15513C] dark:[--geo-border:#0A2B20]"
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
            {/* Marker gradient — colors from design tokens */}
            <defs>
              <linearGradient
                id="geo-marker-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "var(--marker-gradient-start)" }}
                />
                <stop
                  offset="40%"
                  style={{ stopColor: "var(--marker-gradient-mid-40)" }}
                />
                <stop
                  offset="65%"
                  style={{ stopColor: "var(--marker-gradient-mid-65)" }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "var(--marker-gradient-end)" }}
                />
              </linearGradient>
            </defs>

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
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center py-3 px-4 border-t border-secondary">
        <span className="text-xs text-tertiary">Last updated: 7 days ago</span>
        <div className="flex gap-2 items-center">
          <ActionButton
            variant="outline"
            size="icon-sm"
            icon={<RotateCcw className="size-4" />}
            tooltipContent="Reset view"
            handleOpen={handleReset}
          />
          <ActionButton
            variant="outline"
            size="icon-sm"
            icon={<Minus className="size-4" />}
            tooltipContent="Zoom out"
            handleOpen={handleZoomOut}
          />
          <ActionButton
            variant="gradient"
            size="icon-sm"
            icon={<Plus className="size-4" />}
            tooltipContent="Zoom in"
            handleOpen={handleZoomIn}
          />
        </div>
      </div>
    </div>
  );
}
