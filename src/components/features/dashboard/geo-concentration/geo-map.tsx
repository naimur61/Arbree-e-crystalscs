// ═══════════════════════════════════════════════════════════
// GeoMap – supplier world map in two variants:
//   "flat"  → 2D map (spins left/right only)
//   "globe" → 3D orthographic sphere
// Interaction logic (drag spin, momentum, zoom) lives in useGeoMap;
// this file holds the data, layers, tooltip and card chrome.
// ═══════════════════════════════════════════════════════════

"use client";

import { memo, useEffect, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Sphere,
  useMapContext,
} from "react-simple-maps";
import { Globe, MapPin, Minus, Plus, RotateCcw } from "lucide-react";

import { ActionButton } from "@/components/common/button";
import { cn } from "@/lib/utils";
import { useGeoMap } from "./use-geo-map";
import worldAtlas from "./world-atlas.json";

// ── Demo data ─────────────────────────────────────────────
export interface MarkerData {
  name: string;
  coordinates: [number, number];
  suppliers: number;
  breakdown: string[];
}

const MARKERS: MarkerData[] = [
  {
    name: "United Kingdom",
    coordinates: [-2, 54],
    suppliers: 6,
    breakdown: ["100% in England", "33% in London"],
  },
  {
    name: "United States",
    coordinates: [-95, 37],
    suppliers: 12,
    breakdown: ["50% in California"],
  },
  {
    name: "Brazil",
    coordinates: [-55, -10],
    suppliers: 3,
    breakdown: ["100% in São Paulo"],
  },
  {
    name: "South Africa",
    coordinates: [25, -29],
    suppliers: 2,
    breakdown: ["100% in Cape Town"],
  },
  {
    name: "India",
    coordinates: [78, 20],
    suppliers: 8,
    breakdown: ["60% in Bangalore"],
  },
  {
    name: "Australia",
    coordinates: [133, -25],
    suppliers: 4,
    breakdown: ["75% in Sydney"],
  },
];

// ── Tooltip ───────────────────────────────────────────────
export interface TooltipData {
  name: string;
  suppliers: number;
  breakdown: string[];
}

function Tooltip({ data }: { data: TooltipData }) {
  return (
    <div className="absolute top-[15%] right-[15%] z-10 w-64">
      <div className="absolute -inset-1 rounded-lg -z-10 bg-success-primary/20 blur-xl" />
      <div className="overflow-hidden rounded-lg border shadow-sm border-primary bg-primary">
        <div className="flex gap-2 items-center py-2 px-3 border-b border-secondary">
          <div className="flex justify-center items-center w-6 h-6 rounded-md bg-success-primary">
            <MapPin className="w-3.5 h-3.5 icon-success-primary" />
          </div>
          <h3 className="text-sm font-semibold text-primary">{data.name}</h3>
        </div>
        <div className="p-3">
          <p className="text-xs text-secondary">
            <span className="font-semibold text-success-primary">
              {data.suppliers}
            </span>{" "}
            suppliers
          </p>
          {data.breakdown.map((line, idx) => (
            <p key={idx} className="mt-1 text-xs text-tertiary">
              • {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Map layers (memoised; no state) ───────────────────────
const DEG2RAD = Math.PI / 180;

// Great-circle distance (radians) — used on the globe to hide
// markers sitting on the far hemisphere.
function haversine(a: [number, number], b: [number, number]): number {
  const dLat = (b[1] - a[1]) * DEG2RAD;
  const dLon = (b[0] - a[0]) * DEG2RAD;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a[1] * DEG2RAD) *
      Math.cos(b[1] * DEG2RAD) *
      Math.sin(dLon / 2) ** 2;
  return 2 * Math.asin(Math.min(1, Math.sqrt(h)));
}

const CountryLayer = memo(function CountryLayer() {
  return (
    <Geographies geography={worldAtlas}>
      {({ geographies }) =>
        geographies.map((geo) => (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            className="stroke-(--geo-border)"
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

function MarkerGradient() {
  return (
    <defs>
      <linearGradient id="geo-marker-gradient" x1="0" y1="0" x2="0" y2="1">
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
  );
}

// Forward the live d3 projection to the hook's ref so wheel-zoom
// can read it outside the render cycle.
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

interface MapMarkerProps {
  data: MarkerData;
  isGlobe: boolean;
  onEnter: (d: MarkerData) => void;
  onLeave: () => void;
}

const MapMarker = memo(function MapMarker({
  data,
  isGlobe,
  onEnter,
  onLeave,
}: MapMarkerProps) {
  const { width, height, projection } = useMapContext();

  // Globe-only: drop markers on the far side of the sphere.
  if (isGlobe) {
    const [cx, cy] = projection.invert([width / 2, height / 2]);
    if (haversine(data.coordinates, [cx, cy]) > Math.PI / 2 - 0.06) return null;
  }

  return (
    <Marker
      coordinates={data.coordinates}
      onMouseEnter={() => onEnter(data)}
      onMouseLeave={onLeave}
    >
      <circle
        r={9}
        fill="var(--bg-success-secondary)"
        opacity={0.35}
        className="animate-ping"
      />
      <circle r={8} fill="var(--bg-success-secondary)" />
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

// ── Variant config ────────────────────────────────────────
export type MapVariant = "flat" | "globe";

const VARIANTS: Record<
  MapVariant,
  {
    width: number;
    height: number;
    scale: number;
    subtitle?: string;
    hint: string;
  }
> = {
  globe: {
    width: 700,
    height: 560,
    scale: 275,
    subtitle: "Global supplier locations · 3D globe",
    hint: "Drag to spin · Scroll to zoom",
  },
  flat: {
    width: 800,
    height: 390,
    scale: 146,
    hint: "Drag to rotate · Scroll to zoom",
  },
};

// ── Main component ────────────────────────────────────────
export default function GeoMap({ variant = "flat" }: { variant?: MapVariant }) {
  const cfg = VARIANTS[variant];
  const isGlobe = variant === "globe";
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
  } = useGeoMap({ mode: variant, ...cfg });

  return (
    <div className="flex flex-col max-h-80 font-sans rounded-xl border shadow-sm select-none border-primary bg-primary">
      {/* Header */}
      <div
        className={cn(
          "flex justify-between items-center px-4 py-3",
          isGlobe && "border-b border-secondary",
        )}
      >
        <div className="flex gap-2 items-center">
          {isGlobe && (
            <div className="flex justify-center items-center w-7 h-7 rounded-lg bg-success-primary">
              <Globe className="w-4 h-4 icon-success-primary" />
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-primary">
              Geo-Concentration & Dependency Map
            </h3>
            {cfg.subtitle && (
              <p className="text-[11px] text-tertiary">{cfg.subtitle}</p>
            )}
          </div>
        </div>
        <span className="hidden sm:inline text-[11px] text-tertiary">
          {cfg.hint}
        </span>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-4 min-h-0">
        <div
          ref={canvasRef}
          className={cn(
            "h-full relative overflow-hidden rounded-lg bg-primary",
            "[--geo-land:#A3C1AD] [--geo-land-hover:#93B1BD] [--geo-border:#FFFFFF]",
            "dark:[--geo-land:#9CBDCF] dark:[--geo-land-hover:#B0D3E3] dark:[--geo-border:#7FA5B9]",
            isGlobe &&
              "[--geo-ocean:#CBE3F5] [--geo-ocean-stroke:#8FAFBF] dark:[--geo-ocean:#0A2C40] dark:[--geo-ocean-stroke:#1D4A63]",
          )}
          style={{ touchAction: "none", cursor: "grab" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <ComposableMap
            width={cfg.width}
            height={cfg.height}
            style={{ width: "100%", height: "100%", display: "block" }}
            projection={isGlobe ? "geoOrthographic" : undefined}
            projectionConfig={{
              scale: cfg.scale,
              rotate: [rotation[0], rotation[1], 0],
            }}
          >
            <MarkerGradient />
            <ProjectionBridge onProjection={onProjection} />

            {/* Zoom transform: screen = translate(x, y) scale(k) ∘ projection */}
            <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
              {isGlobe && (
                <Sphere
                  className="fill-(--geo-ocean) stroke-(--geo-ocean-stroke)"
                  strokeWidth={0.5}
                />
              )}
              <CountryLayer />
              {MARKERS.map((marker) => (
                <MapMarker
                  key={marker.name}
                  data={marker}
                  isGlobe={isGlobe}
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
      <div className="flex justify-between items-center py-3 px-4">
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

// ── Convenience wrappers ──────────────────────────────────
export const GeoConcentration = () => <GeoMap variant="flat" />;
export const GeoGlobe = () => <GeoMap variant="globe" />;
