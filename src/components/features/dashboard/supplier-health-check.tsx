"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { CardContainer } from "@/components/common/card";

const ROWS = ["High", "Medium", "Low", "Info"];
const COLS = ["Low", "Medium", "High", "Critical"];

const BG: Record<string, string[]> = {
  High: ["bg-red-50", "bg-red-200", "bg-red-400", "bg-red-600"],
  Medium: ["bg-orange-50", "bg-orange-200", "bg-orange-400", "bg-orange-600"],
  Low: ["bg-blue-50", "bg-blue-200", "bg-blue-400", "bg-blue-600"],
  Info: ["bg-green-50", "bg-green-200", "bg-green-400", "bg-green-600"],
};

type Cell = { c: number; f?: boolean; s?: string };
const CELLS: Cell[][] = [
  [
    { c: 1 },
    { c: 3, s: "Acme Corp" },
    { c: 5, f: true },
    { c: 2, f: true, s: "GlobalTech" },
  ],
  [{ c: 4 }, { c: 7, s: "BetaSupply" }, { c: 6 }, { c: 3 }],
  [{ c: 8 }, { c: 5 }, { c: 2, s: "Delta Inc" }, { c: 1 }],
  [{ c: 12, s: "EcoSource" }, { c: 9 }, { c: 4 }, { c: 2 }],
];

function Cell({
  bg,
  dot,
  cell,
  row,
  ci,
}: {
  bg: string;
  dot: string;
  cell: Cell;
  row: string;
  ci: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`relative rounded flex items-center justify-center flex-1 ${bg}`}
      style={{ height: 37.81 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {cell.f ? (
        <div
          className={`rounded-full flex items-center justify-center ${dot}`}
          style={{ width: 22, height: 22 }}
        >
          <div
            className={`rounded-full flex items-center justify-center ${bg}`}
            style={{ width: 16, height: 16 }}
          >
            <div
              className={`rounded-full ${dot}`}
              style={{ width: 8, height: 8 }}
            />
          </div>
        </div>
      ) : (
        <div
          className={`rounded-full ${dot}`}
          style={{ width: 8, height: 8 }}
        />
      )}

      {hover && (
        <div className="absolute left-1/2 bottom-full z-20 py-1.5 px-2.5 mb-2 text-xs whitespace-nowrap bg-gray-900 rounded-md shadow-lg -translate-x-1/2 pointer-events-none text-primary">
          <div className="font-semibold">
            {row} × {COLS[ci]} risk
          </div>
          <div className="text-gray-300">
            {cell.c} supplier{cell.c === 1 ? "" : "s"}
            {cell.s ? ` · ${cell.s}` : ""}
          </div>
        </div>
      )}
    </div>
  );
}

export function SupplierHealthCheck() {
  return (
    <CardContainer
      padding="sm"
      className="max-h-[255px]"
      icon={<BadgeCheck className="text-white" size={24} fill="#15803D" />}
      title="Supplier Health Check"
      subtitle="Suppliers by risk and criticality"
    >
      <div className="grid grid-cols-10 gap-4">
        <div className="flex col-span-1 justify-center items-center">
          <span
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Criticality
          </span>
        </div>

        <div className="flex col-span-9 gap-2">
          <div className="flex flex-col justify-around py-1 font-medium leading-none text-[10px] text-secondary">
            {["High", "Medium", "Low"].map((r) => (
              <span
                key={r}
                style={{ height: 37.81 }}
                className="flex items-center"
              >
                {r}
              </span>
            ))}
          </div>

          <div className="flex-1 space-y-1">
            {ROWS.map((row, ri) => (
              <div key={row} className="flex gap-1">
                {COLS.map((_, ci) => (
                  <Cell
                    key={ci}
                    bg={BG[row][ci]}
                    dot={BG[row][3 - ci]}
                    cell={CELLS[ri][ci]}
                    row={row}
                    ci={ci}
                  />
                ))}
              </div>
            ))}

            <div className="flex gap-1 mt-1 text-center text-[10px] text-secondary">
              {COLS.map((l) => (
                <span key={l} className="flex-1">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <span className="font-medium text-[10px] text-secondary">Risk</span>
      </div>
    </CardContainer>
  );
}
