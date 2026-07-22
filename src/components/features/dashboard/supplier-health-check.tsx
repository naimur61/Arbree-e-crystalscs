"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { CardContainer } from "@/components/common/card";

/* ── Types ── */

const CRITICALITY_ORDER = ["High", "Medium", "Low"] as const;
type Criticality = (typeof CRITICALITY_ORDER)[number];

const RISK_ORDER = ["Low", "Medium", "High", "Critical"] as const;
type Risk = (typeof RISK_ORDER)[number];

interface HeatmapCell {
  criticality: Criticality;
  risk: Risk;
  count: number;
  isFlagged?: boolean;
  supplier?: string;
}

/* ── Constants ── */

const ROW_SHADES: Record<Criticality, string[]> = {
  High: ["bg-red-50", "bg-red-200", "bg-red-400", "bg-red-600"],
  Medium: ["bg-orange-50", "bg-orange-200", "bg-orange-400", "bg-orange-600"],
  Low: ["bg-blue-50", "bg-blue-200", "bg-blue-400", "bg-blue-600"],
};

/* Reversed dot colors — darkest bg shade gets lightest dot, and vice versa */
const DOT_SHADES: Record<Criticality, string[]> = {
  High: ["#dc2626", "#f87171", "#fecaca", "#fef2f2"],
  Medium: ["#ea580c", "#fb923c", "#fed7aa", "#fff7ed"],
  Low: ["#2563eb", "#60a5fa", "#bfdbfe", "#eff6ff"],
};

const DOT_SIZE = 8;
const DOT_BORDER = 3;
const OUTER_SIZE = 22;
const CELL_W = 84.88;
const CELL_H = 37.81;

/* ── Mock data ── */

const MOCK_CELLS: HeatmapCell[] = [
  { criticality: "High", risk: "Low", count: 1 },
  { criticality: "High", risk: "Medium", count: 3, supplier: "Acme Corp" },
  { criticality: "High", risk: "High", count: 5, isFlagged: true },
  {
    criticality: "High",
    risk: "Critical",
    count: 2,
    isFlagged: true,
    supplier: "GlobalTech",
  },
  { criticality: "Medium", risk: "Low", count: 4 },
  { criticality: "Medium", risk: "Medium", count: 7, supplier: "BetaSupply" },
  { criticality: "Medium", risk: "High", count: 6 },
  { criticality: "Medium", risk: "Critical", count: 3 },
  { criticality: "Low", risk: "Low", count: 8 },
  { criticality: "Low", risk: "Medium", count: 5 },
  { criticality: "Low", risk: "High", count: 2, supplier: "Delta Inc" },
  { criticality: "Low", risk: "Critical", count: 1 },
];

/* ── Cell helper ── */

function riskIndex(risk: Risk): number {
  return RISK_ORDER.indexOf(risk);
}

/* ── Component ── */

function CellDisplay({ cell }: { cell: HeatmapCell }) {
  const [hovered, setHovered] = useState(false);
  const ri = riskIndex(cell.risk);
  const shadeClass = ROW_SHADES[cell.criticality][ri];

  return (
    <div
      className="relative rounded flex items-center justify-center cursor-default"
      style={{ width: `${CELL_W}px`, height: `${CELL_H}px` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* background */}
      <div className={`absolute inset-0 rounded ${shadeClass}`} />

      {/* center dot — only flagged cells get a thick border with a gap */}
      <div className="relative z-10 flex items-center justify-center">
        {cell.isFlagged ? (
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: `${OUTER_SIZE}px`,
              height: `${OUTER_SIZE}px`,
              border: `${DOT_BORDER}px solid ${DOT_SHADES[cell.criticality][ri]}`,
            }}
          >
            <div
              className="rounded-full shrink-0"
              style={{
                width: `${DOT_SIZE}px`,
                height: `${DOT_SIZE}px`,
                backgroundColor: DOT_SHADES[cell.criticality][ri],
              }}
            />
          </div>
        ) : (
          <div
            className="rounded-full shrink-0"
            style={{
              width: `${DOT_SIZE}px`,
              height: `${DOT_SIZE}px`,
              backgroundColor: DOT_SHADES[cell.criticality][ri],
            }}
          />
        )}
      </div>

      {/* tooltip */}
      {hovered && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-primary text-xs rounded-md px-2.5 py-1.5 whitespace-nowrap z-20 shadow-lg pointer-events-none">
          <div className="font-semibold">
            {cell.criticality} criticality × {cell.risk} risk
          </div>
          <div className="text-gray-300">
            {cell.count} supplier{cell.count === 1 ? "" : "s"}
            {cell.supplier ? ` · ${cell.supplier}` : ""}
          </div>
        </div>
      )}
    </div>
  );
}

export function SupplierHealthCheck() {
  return (
    <CardContainer
      icon={<ShieldCheck className="w-4 h-4 text-success-primary" />}
      title="Supplier Health Check"
      subtitle="Suppliers by risk and criticality"
    >
      <div className="flex gap-2">
        {/* Row labels */}
        <div className="flex flex-col justify-around py-1 text-secondary text-[10px] font-medium leading-none">
          {CRITICALITY_ORDER.map((l) => (
            <span
              key={l}
              style={{ height: `${CELL_H}px` }}
              className="flex items-center"
            >
              {l}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-[repeat(4,84.88px)] gap-1">
            {MOCK_CELLS.map((cell, i) => (
              <CellDisplay key={i} cell={cell} />
            ))}
          </div>

          {/* Column labels */}
          <div className="grid grid-cols-[repeat(4,84.88px)] gap-1 mt-1 text-center text-secondary text-[10px]">
            {RISK_ORDER.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom labels */}
      <div className="flex justify-between mt-2 text-secondary text-[10px] font-medium">
        <span>Criticality</span>
        <span>Risk</span>
      </div>
    </CardContainer>
  );
}
