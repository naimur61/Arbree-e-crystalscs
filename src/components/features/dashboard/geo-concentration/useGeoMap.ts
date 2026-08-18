// ═══════════════════════════════════════════════════════════
// useGeoMap – one hook that powers BOTH the 3D globe and the
// 2D flat map. All the tricky interaction logic (spin, drag,
// zoom, momentum) lives here so the two map files only have to
// describe how things _look_, not how things _behave_.
// ═══════════════════════════════════════════════════════════

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { MarkerData } from "./markers-data";
import type { TooltipData } from "./tooltip";

// ── Config ────────────────────────────────────────────────
//  mode  : "globe" = 3D orthographic sphere
//          "flat"  = 2D world map (drag spins it left/right only)
//  width / height : the SVG viewBox size in pixels
//  scale : projection scale (for the globe this is the disc radius)
export interface GeoMapConfig {
  mode: "globe" | "flat";
  width: number;
  height: number;
  scale: number;
}

// ── Types ─────────────────────────────────────────────────
// A "view transform" is just the classic d3-zoom idea:
//   screen = translate(x, y)  +  scale(k)  +  projection(geo)
export interface ViewTransform {
  x: number;
  y: number;
  k: number;
}

export const IDENTITY_VIEW: ViewTransform = { x: 0, y: 0, k: 1 };

// Zoom in/out about the centre of the canvas (used by the buttons).
export const zoomAboutCenter = (
  k: number,
  width: number,
  height: number,
): ViewTransform => ({
  x: (width / 2) * (1 - k),
  y: (height / 2) * (1 - k),
  k,
});

// ── Tiny pure helpers ─────────────────────────────────────
const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

// Wrap an angle into [0, 360) so it never drifts past a full turn.
const normalizeRotation = (deg: number) => ((deg % 360) + 360) % 360;

// ── Tuning constants (shared by both maps) ────────────────
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const ZOOM_STEP = 1.3; // scale factor per click / scroll tick
const ROTATE_SENSITIVITY = 0.6; // degrees spun per pixel dragged
const EASE = 0.12; // drag-follow smoothing per frame (0-1)
const INERTIA_FRICTION = 0.9; // momentum decay per frame
const MIN_SPEED = 0.05; // below this we stop coasting
const MAX_SPEED = 60; // cap the launch momentum

// ── The hook ──────────────────────────────────────────────
export function useGeoMap(config: GeoMapConfig) {
  const { mode, width, height, scale } = config;
  const isGlobe = mode === "globe";

  // ── State ──
  // rotation = [longitude spin, latitude tilt]  (lat is always 0 on the flat map)
  const [rotation, setRotation] = useState<[number, number]>([0, 0]);
  const [view, setView] = useState<ViewTransform>(IDENTITY_VIEW);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  // ── Mutable refs ──
  // The rAF loop reads/writes these every frame. Using state here would
  // stall the animation (React would have to re-render before the next
  // frame is even ready), so everything that changes mid-drag goes in a ref.
  const rotationRef = useRef<[number, number]>([0, 0]);
  const targetRef = useRef<[number, number]>([0, 0]); // where the drag is aiming
  const velocityRef = useRef<[number, number]>([0, 0]); // launch speed on release
  const dragRef = useRef<{
    x: number;
    y: number;
    lon: number;
    lat: number;
    pointerId: number;
  } | null>(null);
  const draggingRef = useRef(false);
  const resettingRef = useRef(false);
  const projRef = useRef<any>(null); // the live d3 projection
  const viewRef = useRef(view);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Keep viewRef in sync so the wheel handler (which runs outside React)
  // always reads the latest transform.
  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  // ── rAF loop: smooth drag + coasting momentum ──────────
  useEffect(() => {
    let raf = 0;
    let prev = performance.now();

    const tick = () => {
      const now = performance.now();
      // Normalise dt to "16.67ms = 1 frame" units, capped at 3 frames
      // so a long pause doesn't fling the globe a mile.
      const dt = Math.min((now - prev) / 16.667, 3) || 1;
      prev = now;

      const r = rotationRef.current;
      let changed = false;

      if (draggingRef.current) {
        // While dragging: chase the cursor with easing → buttery.
        const goal = targetRef.current;
        r[0] += (goal[0] - r[0]) * EASE;
        if (isGlobe) r[1] += (goal[1] - r[1]) * EASE;
        changed = true;
      } else if (resettingRef.current) {
        // Reset button: decay rotation back to zero.
        r[0] *= 1 - EASE;
        if (isGlobe) r[1] *= 1 - EASE;
        changed = true;
        const done = isGlobe
          ? Math.abs(r[0]) < 0.5 && Math.abs(r[1]) < 0.5
          : Math.abs(r[0]) < 0.5;
        if (done) {
          r[0] = 0;
          r[1] = 0;
          resettingRef.current = false;
        }
      } else if (
        Math.abs(velocityRef.current[0]) > MIN_SPEED ||
        Math.abs(velocityRef.current[1]) > MIN_SPEED
      ) {
        // Momentum: keep spinning, then gradually slow down.
        r[0] += velocityRef.current[0] * dt;
        if (isGlobe) r[1] += velocityRef.current[1] * dt;
        velocityRef.current[0] *= Math.pow(INERTIA_FRICTION, dt);
        if (isGlobe) velocityRef.current[1] *= Math.pow(INERTIA_FRICTION, dt);
        changed = true;
      } else {
        velocityRef.current = [0, 0];
      }

      if (changed) {
        // Flat map never tilts, so latitude stays 0.
        rotationRef.current = isGlobe
          ? [normalizeRotation(r[0]), normalizeRotation(r[1])]
          : [normalizeRotation(r[0]), 0];
        setRotation([rotationRef.current[0], rotationRef.current[1]]);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isGlobe]);

  // ── Pointer (drag-to-rotate) handlers ───────────────────
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    resettingRef.current = false;
    velocityRef.current = [0, 0];
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      lon: rotationRef.current[0],
      lat: rotationRef.current[1],
      pointerId: e.pointerId,
    };
    targetRef.current = [rotationRef.current[0], rotationRef.current[1]];
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    // Horizontal drag → longitude, vertical drag → latitude.
    const next: [number, number] = [
      drag.lon + (e.clientX - drag.x) * ROTATE_SENSITIVITY,
      drag.lat - (e.clientY - drag.y) * ROTATE_SENSITIVITY,
    ];
    // Snapshot the last drag delta to seed the release momentum.
    velocityRef.current = [
      next[0] - targetRef.current[0],
      next[1] - targetRef.current[1],
    ];
    targetRef.current = next;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== e.pointerId) return;
    dragRef.current = null;
    draggingRef.current = false;
    // Hand the latest drag velocity to the momentum step (clamped so a
    // fast flick doesn't send the globe into orbit).
    velocityRef.current = [
      clamp(velocityRef.current[0], -MAX_SPEED, MAX_SPEED),
      clamp(velocityRef.current[1], -MAX_SPEED, MAX_SPEED),
    ];
    if (
      Math.abs(velocityRef.current[0]) < MIN_SPEED &&
      Math.abs(velocityRef.current[1]) < MIN_SPEED
    ) {
      velocityRef.current = [0, 0];
    }
  }, []);

  // ── Mouse-wheel zoom (cursor-anchored) ──────────────────
  const onWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const proj = projRef.current;
      if (!proj) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const v = viewRef.current;
      const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
      const nextK = clamp(v.k * factor, MIN_ZOOM, MAX_ZOOM);
      if (nextK === v.k) return;

      if (isGlobe) {
        // On a globe the orthographic projection only covers a disc.
        // If the cursor is outside it, just zoom toward the centre.
        const preX = (px - v.x) / v.k;
        const preY = (py - v.y) / v.k;
        const discR = scale;
        const dx = preX - width / 2;
        const dy = preY - height / 2;
        if (dx * dx + dy * dy > discR * discR) {
          setView(zoomAboutCenter(nextK, width, height));
          return;
        }
      }

      // Keep the geographic point under the cursor fixed while zooming.
      const [gx, gy] = proj.invert([(px - v.x) / v.k, (py - v.y) / v.k]);
      if (!isFinite(gx) || !isFinite(gy)) return;
      const [sx, sy] = proj([gx, gy]);
      setView({ x: px - nextK * sx, y: py - nextK * sy, k: nextK });
    },
    [isGlobe, scale, width, height],
  );

  // Attach the wheel listener (non-passive so we can preventDefault).
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  // ── Button: zoom ────────────────────────────────────────
  const onZoomIn = useCallback(() => {
    setView((v) => {
      const nextK = clamp(v.k * ZOOM_STEP, MIN_ZOOM, MAX_ZOOM);
      return nextK === v.k ? v : zoomAboutCenter(nextK, width, height);
    });
  }, [width, height]);

  const onZoomOut = useCallback(() => {
    setView((v) => {
      const nextK = clamp(v.k / ZOOM_STEP, MIN_ZOOM, MAX_ZOOM);
      return nextK === v.k ? v : zoomAboutCenter(nextK, width, height);
    });
  }, [width, height]);

  // ── Button: reset ───────────────────────────────────────
  const onReset = useCallback(() => {
    setView(IDENTITY_VIEW);
    draggingRef.current = false;
    dragRef.current = null;
    velocityRef.current = [0, 0];
    targetRef.current = [0, 0];
    resettingRef.current = true;
  }, []);

  // ── Marker hover → tooltip ──────────────────────────────
  const onMarkerEnter = useCallback((data: MarkerData) => {
    setTooltip({
      name: data.name,
      suppliers: data.suppliers,
      breakdown: data.breakdown,
    });
  }, []);

  const onMarkerLeave = useCallback(() => setTooltip(null), []);

  // ── Forward the live projection to a ref for the wheel handler
  const onProjection = useCallback((p: any) => {
    projRef.current = p;
  }, []);

  return {
    rotation,
    view,
    tooltip,
    canvasRef,
    onProjection,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onMarkerEnter,
    onMarkerLeave,
    onZoomIn,
    onZoomOut,
    onReset,
  };
}
