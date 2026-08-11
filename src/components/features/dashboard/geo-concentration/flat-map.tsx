"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  useMapContext,
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

// The zoom transform applied to the map group (same semantics as d3-zoom):
// screen = translate(x, y) ∘ scale(k) ∘ projection(geo).
interface ViewTransform {
  x: number;
  y: number;
  k: number;
}

// Identity transform = the exact view the map has on first load.
const IDENTITY_VIEW: ViewTransform = { x: 0, y: 0, k: 1 };

// Transform that keeps the projection center pinned to the viewport center.
function zoomAboutCenter(k: number): ViewTransform {
  return {
    x: (MAP_WIDTH / 2) * (1 - k),
    y: (MAP_HEIGHT / 2) * (1 - k),
    k,
  };
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

// Renders nothing; just forwards the live projection (which changes with
// rotation) out of the map context so the wheel handler can compute
// cursor-anchored zoom with the exact projection being used.
function ProjectionBridge({
  onProjection,
}: {
  onProjection: (p: any) => void;
}) {
  const { projection } = useMapContext();
  const prev = useRef<any>(null);
  useEffect(() => {
    if (projection !== prev.current) {
      prev.current = projection;
      onProjection(projection);
    }
  }, [projection, onProjection]);
  return null;
}

export default function FlatMap() {
  const [tooltipContent, setTooltipContent] = useState<TooltipData | null>(
    null,
  );
  const [view, setView] = useState<ViewTransform>(IDENTITY_VIEW);
  // rotation = longitude only — the map never tilts
  const [rotation, setRotation] = useState(0);

  // Refs shared with the rAF animation loop, pointer and wheel handlers.
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
  const projRef = useRef<any>(null);
  const viewRef = useRef(view);
  useEffect(() => {
    viewRef.current = view;
  }, [view]);
  const mapCanvasRef = useRef<HTMLDivElement>(null);

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

  const handleProjection = useCallback((p: any) => {
    projRef.current = p;
  }, []);

  // Cursor-anchored wheel zoom. A native non-passive listener lets us
  // preventDefault (stop the page from scrolling under the map) and keep
  // the geographic point under the cursor fixed while zooming.
  useEffect(() => {
    const el = mapCanvasRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const proj = projRef.current;
      if (!proj) return;
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const v = viewRef.current;
      const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
      const nextK = clamp(v.k * factor, MIN_ZOOM, MAX_ZOOM);
      if (nextK === v.k) return;
      // Geographic point currently under the cursor, in projection space.
      const [gx, gy] = proj.invert([(px - v.x) / v.k, (py - v.y) / v.k]);
      if (!isFinite(gx) || !isFinite(gy)) return;
      const [sx, sy] = proj([gx, gy]);
      // Solve the transform so that point projects back onto the cursor.
      setView({ x: px - nextK * sx, y: py - nextK * sy, k: nextK });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Button zoom: always zoom about the viewport center.
  const handleZoomIn = useCallback(() => {
    setView((v) => {
      const nextK = clamp(+(v.k * ZOOM_STEP).toFixed(2), MIN_ZOOM, MAX_ZOOM);
      return nextK === v.k ? v : zoomAboutCenter(nextK);
    });
  }, []);
  const handleZoomOut = useCallback(() => {
    setView((v) => {
      const nextK = clamp(+(v.k / ZOOM_STEP).toFixed(2), MIN_ZOOM, MAX_ZOOM);
      return nextK === v.k ? v : zoomAboutCenter(nextK);
    });
  }, []);

  // Refresh: return to the exact initial view (identity transform) and
  // glide the rotation back to the default.
  const handleReset = useCallback(() => {
    setView(IDENTITY_VIEW);
    draggingRef.current = false;
    dragRef.current = null;
    velocityRef.current = 0;
    targetRef.current = 0;
    resettingRef.current = true;
  }, []);

  return (
    <div className="font-sans rounded-xl border shadow-sm select-none border-primary bg-primary flex flex-col max-h-80">
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
      <div className="flex-1 min-h-0 p-4">
        <div
          ref={mapCanvasRef}
          className="h-full overflow-hidden relative rounded-lg bg-primary [--geo-land:#A3C1AD] [--geo-land-hover:#93B1BD] [--geo-border:#FFFFFF] dark:[--geo-land:#9CBDCF] dark:[--geo-land-hover:#B0D3E3] dark:[--geo-border:#7FA5B9]"
          style={{ touchAction: "none", cursor: "grab" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          <ComposableMap
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            style={{ width: "100%", height: "100%", display: "block" }}
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

            <ProjectionBridge onProjection={handleProjection} />

            {/* Zoom transform: screen = translate(x, y) scale(k) ∘ projection */}
            <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
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
            </g>
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
