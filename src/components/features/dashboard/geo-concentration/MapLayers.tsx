// ═══════════════════════════════════════════════════════════
// MapLayers – the reusable, memoised pieces that draw onto the
// map: the gradient definition, country borders, the live
// projection bridge, and every supplier marker.
//
// These never hold state, so they can be shared by the globe and
// the flat map without re-rendering the whole SVG on every drag.
// ═══════════════════════════════════════════════════════════

"use client";

import { memo, useEffect, useRef } from "react";
import {
  Geographies,
  Geography,
  Marker,
  useMapContext,
} from "react-simple-maps";

import worldAtlas from "./world-atlas.json";
import { type MarkerData } from "./markers-data";

const DEG2RAD = Math.PI / 180;

// Great-circle distance (in radians) between two lng/lat points.
// On the globe we use it to hide markers that are on the far side
// of the sphere (they'd otherwise be mirrored onto the visible disc).
function haversineDistance(a: [number, number], b: [number, number]): number {
  const dLat = (b[1] - a[1]) * DEG2RAD;
  const dLon = (b[0] - a[0]) * DEG2RAD;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a[1] * DEG2RAD) *
      Math.cos(b[1] * DEG2RAD) *
      Math.sin(dLon / 2) ** 2;
  return 2 * Math.asin(Math.min(1, Math.sqrt(h)));
}

// ── Background: country shapes ────────────────────────────
// Memoised so hovering a marker only re-renders the tooltip,
// never this expensive layer of ~200 SVG paths.
export const CountryLayer = memo(function CountryLayer() {
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

// ── Markers ───────────────────────────────────────────────
interface MapMarkerProps {
  data: MarkerData;
  mode: "globe" | "flat";
  onEnter: (d: MarkerData) => void;
  onLeave: () => void;
}

export const MapMarker = memo(function MapMarker({
  data,
  mode,
  onEnter,
  onLeave,
}: MapMarkerProps) {
  const { width, height, projection } = useMapContext();

  // Globe-only: drop markers that are on the far hemisphere.
  // invert() the viewport centre → geographic centre, then measure.
  if (mode === "globe") {
    const [cx, cy] = projection.invert([width / 2, height / 2]);
    if (haversineDistance(data.coordinates, [cx, cy]) > Math.PI / 2 - 0.06) {
      return null;
    }
  }

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
      {/* Solid ring */}
      <circle r={8} fill="var(--bg-success-secondary)" />
      {/* Gradient dot that scales up on hover */}
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

// ── Projection bridge ─────────────────────────────────────
// Forward the live projection to the hook's ref so the wheel-zoom
// handler can read it outside the render cycle.
export function ProjectionBridge({
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

// ── Marker gradient (one shared def) ──────────────────────
export function MarkerGradient() {
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
