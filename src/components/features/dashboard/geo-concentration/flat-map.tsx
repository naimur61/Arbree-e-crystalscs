// ═══════════════════════════════════════════════════════════
// FlatMap – 2D world map.
//
// Same shared hook as the globe (`useGeoMap`); the only difference
// is `mode: "flat"`, which locks the latitude tilt at 0 so the map
// only spins left/right. Everything interactive is reused.
// ═══════════════════════════════════════════════════════════

"use client";

import { ComposableMap } from "react-simple-maps";
import { Minus, Plus, RotateCcw } from "lucide-react";

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

// Flat (2:1) world-map viewBox — fills the canvas edge-to-edge.
const WIDTH = 800;
const HEIGHT = 390;
const SCALE = 146;

export default function FlatMap() {
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
  } = useGeoMap({ mode: "flat", width: WIDTH, height: HEIGHT, scale: SCALE });

  /* ── Card chrome ───────────────────────────────────────── */
  return (
    <div className="font-sans rounded-xl border shadow-sm select-none border-primary bg-primary flex flex-col max-h-80">
      {/* Header */}
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

      {/* Canvas */}
      <div className="flex-1 min-h-0 p-4">
        <div
          ref={canvasRef}
          className="h-full overflow-hidden relative rounded-lg bg-primary
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
            projectionConfig={{
              scale: SCALE,
              rotate: [rotation[0], rotation[1], 0],
            }}
          >
            <MarkerGradient />
            <ProjectionBridge onProjection={onProjection} />

            {/* Zoom transform: screen = translate(x, y) scale(k) ∘ projection */}
            <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
              <CountryLayer />

              {/* Supplier markers */}
              {markers.map((marker) => (
                <MapMarker
                  key={marker.name}
                  data={marker}
                  mode="flat"
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
      <div className="flex justify-between items-center py-3 px-4 border-t border-secondary">
        <span className="text-xs text-tertiary">Last updated: 7 days ago</span>
        <div className="flex gap-2 items-center">
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
