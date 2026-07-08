"use client";

import { useState } from "react";

interface HeatmapCell {
  criticality: "Low" | "Medium" | "High";
  risk: "Low" | "Medium" | "High" | "Critical";
  count: number;
  supplier?: string;
}

interface RiskHeatmapProps {
  data: HeatmapCell[];
}

const CRITICALITY_ORDER = ["High", "Medium", "Low"] as const;
const RISK_ORDER = ["Low", "Medium", "High", "Critical"] as const;

// Each criticality row keeps a single hue; shade deepens left→right as
// active risk climbs from Low to Critical.
const ROW_SHADES: Record<(typeof CRITICALITY_ORDER)[number], string[]> = {
  High: ["bg-red-50", "bg-red-200", "bg-red-400", "bg-red-600"],
  Medium: ["bg-orange-50", "bg-orange-200", "bg-orange-400", "bg-orange-600"],
  Low: ["bg-blue-50", "bg-blue-200", "bg-blue-400", "bg-blue-600"],
};

const ROW_DOT_COLOR: Record<(typeof CRITICALITY_ORDER)[number], string> = {
  High: "#dc2626",
  Medium: "#c2410c",
  Low: "#2563eb",
};

const DARK_CELLS = new Set([
  "bg-red-400",
  "bg-red-600",
  "bg-orange-400",
  "bg-orange-600",
  "bg-blue-400",
  "bg-blue-600",
]);

export function RiskHeatmap({ data }: RiskHeatmapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const getCell = (criticality: string, risk: string) =>
    data.find((d) => d.criticality === criticality && d.risk === risk);

  // The highest-count cell in each row gets the flagged "target" marker.
  const rowMax: Record<string, number> = {};
  CRITICALITY_ORDER.forEach((c) => {
    rowMax[c] = Math.max(
      0,
      ...data.filter((d) => d.criticality === c).map((d) => d.count),
    );
  });

  return (
    <div className="w-full flex">
      {/* Rotated axis label */}
      <div className="flex items-center justify-center pr-3">
        <span
          className="text-sm font-bold text-gray-800 whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Criticality
        </span>
      </div>

      <div className="flex-1 min-w-0">
        {/* Column headers */}
        <div className="flex mb-2">
          <div className="w-20 flex-shrink-0" />
          {RISK_ORDER.map((risk) => (
            <div
              key={risk}
              className="flex-1 text-center text-sm font-semibold text-gray-700"
            >
              {risk}
            </div>
          ))}
        </div>

        {/* Rows */}
        {CRITICALITY_ORDER.map((criticality) => (
          <div key={criticality} className="flex gap-2 mb-2">
            <div className="w-20 flex-shrink-0 text-sm font-semibold text-gray-700 flex items-center justify-end pr-2">
              {criticality}
            </div>

            {RISK_ORDER.map((risk) => {
              const cell = getCell(criticality, risk);
              const count = cell?.count ?? 0;
              const colIdx = RISK_ORDER.indexOf(risk);
              const bg = ROW_SHADES[criticality][colIdx];
              const isFlagged = count > 0 && count === rowMax[criticality];
              const dotSize = count === 0 ? 0 : Math.min(8 + count * 2.5, 20);
              const key = `${criticality}-${risk}`;
              const isDark = DARK_CELLS.has(bg);

              return (
                <div
                  key={key}
                  onMouseEnter={() => setHovered(key)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative flex-1 h-20 rounded-lg ${bg} flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-[1.06] hover:z-10 hover:shadow-lg`}
                >
                  {count > 0 &&
                    (isFlagged ? (
                      <div className="w-6 h-6 rounded-full border-[3px] border-white flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      </div>
                    ) : (
                      <div
                        className="rounded-full"
                        style={{
                          width: dotSize,
                          height: dotSize,
                          backgroundColor: isDark
                            ? "#ffffff"
                            : ROW_DOT_COLOR[criticality],
                        }}
                      />
                    ))}

                  {cell?.supplier && (
                    <div
                      className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-white/80"
                      title={cell.supplier}
                    />
                  )}

                  {/* Tooltip */}
                  {hovered === key && (
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-md px-2.5 py-1.5 whitespace-nowrap z-20 shadow-lg">
                      <div className="font-semibold">
                        {criticality} criticality × {risk} risk
                      </div>
                      <div className="text-gray-300">
                        {count} supplier{count === 1 ? "" : "s"}
                        {cell?.supplier ? ` · ${cell.supplier}` : ""}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* X-axis label */}
        <div className="flex mt-3">
          <div className="w-20 flex-shrink-0" />
          <div className="flex-1 text-center text-sm font-bold text-gray-800">
            Active Risk
          </div>
        </div>
      </div>
    </div>
  );
}
