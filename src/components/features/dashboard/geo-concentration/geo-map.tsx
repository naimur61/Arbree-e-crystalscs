// ═══════════════════════════════════════════════════════════
// GeoMap – 3D orthographic globe.
//
// All the hard work (drag spin, momentum, zoom, tooltip state)
// lives in the shared `useGeoMap` hook. This file only describes
// the globe's _appearance_: a round sphere, the ocean colour,
// and the card chrome around it.
// ═══════════════════════════════════════════════════════════

"use client";

import { ComposableMap, Sphere } from "react-simple-maps";
import { Globe, Minus, Plus, RotateCcw } from "lucide-react";

import { ActionButton } from "@/components/common/button";
import { Tooltip } from "./tooltip";
import { markers } from "./markers-data";
import { useGeoMap } from "./useGeoMap";
import {
  CountryLayer,
  MapMarker,
  MarkerGradient,
  ProjectionBridge,
} from "./MapLayers";

// A round globe: the orthographic sphere (diameter = 2 × scale) fits
// inside the viewBox with a little margin around it.
const WIDTH = 700;
const HEIGHT = 560;
const SCALE = 275;

export default function GeoMap() {
  const {
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
  } = useGeoMap({ mode: "globe", width: WIDTH, height: HEIGHT, scale: SCALE });

  /* ── Card chrome ───────────────────────────────────────── */
  return (
    <div className="font-sans rounded-xl border border-primary bg-primary shadow-sm select-none flex flex-col max-h-80">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-secondary">
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center w-7 h-7 rounded-lg bg-success-primary">
            <Globe className="w-4 h-4 icon-success-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary">
              Geo-Concentration & Dependency Map
            </h3>
            <p className="text-[11px] text-tertiary">
              Global supplier locations · 3D globe
            </p>
          </div>
        </div>
        <span className="hidden sm:inline text-[11px] text-tertiary">
          Drag to spin · Scroll to zoom
        </span>
      </div>

      {/* Canvas */}
      <div className="flex-1 min-h-0 p-4">
        <div
          ref={canvasRef}
          className="h-full relative overflow-hidden rounded-lg bg-primary
            [--geo-ocean:#CBE3F5] [--geo-ocean-stroke:#8FAFBF]
            dark:[--geo-ocean:#0A2C40] dark:[--geo-ocean-stroke:#1D4A63]
            [--geo-land:#A3C1AD] [--geo-land-hover:#93B1BD] [--geo-border:#FFFFFF]
            dark:[--geo-land:#9CBDCF] dark:[--geo-land-hover:#B0D3E3] dark:[--geo-border:#7FA5B9]"
          style={{ touchAction: "none", cursor: "grab" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <ComposableMap
            width={WIDTH}
            height={HEIGHT}
            style={{ width: "100%", height: "100%", display: "block" }}
            projection="geoOrthographic"
            projectionConfig={{
              scale: SCALE,
              rotate: [rotation[0], rotation[1], 0],
            }}
          >
            <MarkerGradient />
            <ProjectionBridge onProjection={onProjection} />

            {/* Zoom transform: screen = translate(x, y) scale(k) ∘ projection */}
            <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
              {/* The blue marble + its dark outline */}
              <Sphere
                className="fill-[var(--geo-ocean)] stroke-[var(--geo-ocean-stroke)]"
                strokeWidth={0.5}
              />
              <CountryLayer />

              {/* Supplier markers */}
              {markers.map((marker) => (
                <MapMarker
                  key={marker.name}
                  data={marker}
                  mode="globe"
                  onEnter={onMarkerEnter}
                  onLeave={onMarkerLeave}
                />
              ))}
            </g>
          </ComposableMap>

          {tooltip && <Tooltip data={tooltip} />}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-4 py-3 border-t border-secondary">
        <span className="text-xs text-tertiary">Last updated: 7 days ago</span>
        <div className="flex items-center gap-2">
          <ActionButton
            variant="outline"
            size="icon-sm"
            icon={<RotateCcw className="size-4" />}
            tooltipContent="Reset view"
            handleOpen={onReset}
          />
          <ActionButton
            variant="outline"
            size="icon-sm"
            icon={<Minus className="size-4" />}
            tooltipContent="Zoom out"
            handleOpen={onZoomOut}
          />
          <ActionButton
            variant="gradient"
            size="icon-sm"
            icon={<Plus className="size-4" />}
            tooltipContent="Zoom in"
            handleOpen={onZoomIn}
          />
        </div>
      </div>
    </div>
  );
}
