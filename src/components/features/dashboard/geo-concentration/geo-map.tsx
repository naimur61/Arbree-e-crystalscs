"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

// TopoJSON world map (countries at 110m resolution)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MarkerData {
  markerOffset: number;
  name: string;
  coordinates: [number, number];
  suppliers: number;
  breakdown: string[];
}

import { Tooltip, type TooltipData } from "./tooltip";

const markers: MarkerData[] = [
  {
    markerOffset: -15,
    name: "United Kingdom",
    coordinates: [-2, 54],
    suppliers: 6,
    breakdown: ["100% in England", "33% in London"],
  },
  {
    markerOffset: 25,
    name: "United States",
    coordinates: [-95, 37],
    suppliers: 12,
    breakdown: ["50% in California"],
  },
  {
    markerOffset: 25,
    name: "Brazil",
    coordinates: [-55, -10],
    suppliers: 3,
    breakdown: ["100% in São Paulo"],
  },
  {
    markerOffset: 25,
    name: "South Africa",
    coordinates: [25, -29],
    suppliers: 2,
    breakdown: ["100% in Cape Town"],
  },
  {
    markerOffset: 25,
    name: "India",
    coordinates: [78, 20],
    suppliers: 8,
    breakdown: ["60% in Bangalore"],
  },
  {
    markerOffset: 25,
    name: "Australia",
    coordinates: [133, -25],
    suppliers: 4,
    breakdown: ["75% in Sydney"],
  },
];

export default function GeoMap() {
  const [tooltipContent, setTooltipContent] = useState<TooltipData | null>(
    null,
  );

  return (
    <div className="relative p-6 w-full font-sans bg-white rounded-lg border shadow-sm select-none">
      {/* Title */}
      <h2 className="mb-2 text-xl font-bold text-slate-800">
        Geo-Concentration & Dependency Map
      </h2>

      {/* Map Canvas */}
      <div className="overflow-hidden relative w-full bg-white rounded">
        <ComposableMap projectionConfig={{ scale: 140 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#A3C1AD" /* Soft blue-grey from image */
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

          {/* Location Markers */}
          {markers.map(({ name, coordinates, suppliers, breakdown }) => (
            <Marker
              key={name}
              coordinates={coordinates}
              onMouseEnter={() => {
                setTooltipContent({ name, suppliers, breakdown });
              }}
              onMouseLeave={() => {
                setTooltipContent(null);
              }}
            >
              {/* Outer Glow Effect */}
              <circle
                r={6}
                fill="#4ade80"
                opacity={0.4}
                className="animate-ping"
              />
              {/* Inner Solid Green Dot */}
              <circle
                r={5}
                fill="#16a34a"
                stroke="#ffffff"
                strokeWidth={1.5}
                className="transition-transform cursor-pointer hover:scale-125"
              />
            </Marker>
          ))}
        </ComposableMap>

        {/* Tooltip */}
        {tooltipContent && <Tooltip data={tooltipContent} />}
      </div>

      {/* Footer controls & update indicator */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">Last updated: 7 days ago</span>
        <div className="flex space-x-2">
          <button className="py-1 px-3 text-xl font-bold text-white bg-emerald-600 rounded shadow hover:bg-emerald-700">
            +
          </button>
          <button className="py-1 px-3 text-xl font-bold text-gray-600 bg-gray-100 rounded border shadow-sm hover:bg-gray-200">
            -
          </button>
        </div>
      </div>
    </div>
  );
}
