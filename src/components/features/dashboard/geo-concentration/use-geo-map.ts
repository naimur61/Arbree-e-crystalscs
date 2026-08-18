// ═══════════════════════════════════════════════════════════
// useGeoMap – shared interaction engine for both map variants:
// drag-to-spin (with easing), release momentum, cursor-anchored
// wheel zoom, button zoom and reset. "flat" locks latitude tilt.
// ═══════════════════════════════════════════════════════════

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { MarkerData, TooltipData } from "./geo-map";

export interface GeoMapConfig {
  mode: "globe" | "flat";
  width: number;
  height: number;
  scale: number;
}

// d3-zoom style transform: screen = translate(x, y) · scale(k) · projection
export interface ViewTransform {
  x: number;
  y: number;
  k: number;
}

export const IDENTITY_VIEW: ViewTransform = { x: 0, y: 0, k: 1 };

const zoomAboutCenter = (
  k: number,
  width: number,
  height: number,
): ViewTransform => ({
  x: (width / 2) * (1 - k),
  y: (height / 2) * (1 - k),
  k,
});

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
const normalizeRotation = (deg: number) => ((deg % 360) + 360) % 360;

// ── Tuning ────────────────────────────────────────────────
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const ZOOM_STEP = 1.3; // factor per click / scroll tick
const ROTATE_SENSITIVITY = 0.6; // degrees spun per pixel dragged
const EASE = 0.12; // drag-follow smoothing per frame (0-1)
const INERTIA_FRICTION = 0.9; // momentum decay per frame
const MIN_SPEED = 0.05; // stop coasting below this
const MAX_SPEED = 60; // launch momentum cap

export function useGeoMap({ mode, width, height, scale }: GeoMapConfig) {
  const isGlobe = mode === "globe";

  // rotation = [longitude spin, latitude tilt]; lat stays 0 on flat map
  const [rotation, setRotation] = useState<[number, number]>([0, 0]);
  const [view, setView] = useState<ViewTransform>(IDENTITY_VIEW);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  // Mutable per-frame values live in refs so the rAF loop never
  // waits on a React re-render.
  const rotationRef = useRef<[number, number]>([0, 0]);
  const targetRef = useRef<[number, number]>([0, 0]); // drag aim point
  const velocityRef = useRef<[number, number]>([0, 0]); // release speed
  const dragRef = useRef<{
    x: number;
    y: number;
    lon: number;
    lat: number;
    pointerId: number;
  } | null>(null);
  const draggingRef = useRef(false);
  const resettingRef = useRef(false);
  const projRef = useRef<any>(null); // live d3 projection
  const viewRef = useRef(view);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  // ── rAF loop: smooth drag + momentum + reset ────────────
  useEffect(() => {
    let raf = 0;
    let prev = performance.now();

    const tick = () => {
      const now = performance.now();
      // dt in 16.67ms frames, capped so long pauses don't fling the map
      const dt = Math.min((now - prev) / 16.667, 3) || 1;
      prev = now;

      const r = rotationRef.current;
      let changed = false;

      if (draggingRef.current) {
        const goal = targetRef.current;
        r[0] += (goal[0] - r[0]) * EASE;
        if (isGlobe) r[1] += (goal[1] - r[1]) * EASE;
        changed = true;
      } else if (resettingRef.current) {
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
        r[0] += velocityRef.current[0] * dt;
        if (isGlobe) r[1] += velocityRef.current[1] * dt;
        velocityRef.current[0] *= Math.pow(INERTIA_FRICTION, dt);
        if (isGlobe) velocityRef.current[1] *= Math.pow(INERTIA_FRICTION, dt);
        changed = true;
      } else {
        velocityRef.current = [0, 0];
      }

      if (changed) {
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

  // ── Pointer drag ────────────────────────────────────────
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
    // Snapshot the last delta to seed release momentum.
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

  // ── Wheel zoom (cursor-anchored) ────────────────────────
  const onWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const proj = projRef.current;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!proj || !rect) return;

      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const v = viewRef.current;
      const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
      const nextK = clamp(v.k * factor, MIN_ZOOM, MAX_ZOOM);
      if (nextK === v.k) return;

      if (isGlobe) {
        // Orthographic projection only covers a disc; if the cursor is
        // outside it, fall back to zooming toward the centre.
        const preX = (px - v.x) / v.k;
        const preY = (py - v.y) / v.k;
        const dx = preX - width / 2;
        const dy = preY - height / 2;
        if (dx * dx + dy * dy > scale * scale) {
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

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  // ── Buttons ─────────────────────────────────────────────
  const zoomBy = useCallback(
    (factor: number) =>
      setView((v) => {
        const nextK = clamp(v.k * factor, MIN_ZOOM, MAX_ZOOM);
        return nextK === v.k ? v : zoomAboutCenter(nextK, width, height);
      }),
    [width, height],
  );
  const onZoomIn = useCallback(() => zoomBy(ZOOM_STEP), [zoomBy]);
  const onZoomOut = useCallback(() => zoomBy(1 / ZOOM_STEP), [zoomBy]);

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
