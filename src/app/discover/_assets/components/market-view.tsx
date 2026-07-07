/* eslint-disable react-hooks/immutability */
"use client";

import { useMemo, useState, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// --- Chart data: value = share of spend, risk = qualitative risk label for that slice ---
type RiskLevel = "Low" | "Medium" | "High";

interface SliceDatum {
  key: string;
  name: string;
  value: number;
  color: string;
  risk: RiskLevel;
}

const chartData: SliceDatum[] = [
  {
    key: "supplier",
    name: "Supplier",
    value: 25,
    color: "#14532d",
    risk: "Low",
  },
  {
    key: "country",
    name: "Country / Region",
    value: 27,
    color: "#1e3a8a",
    risk: "Medium",
  },
  {
    key: "risk",
    name: "Risk Level",
    value: 15,
    color: "#7f1d1d",
    risk: "High",
  },
  {
    key: "market",
    name: "Market Rating",
    value: 18,
    color: "#f59e0b",
    risk: "Medium",
  },
  { key: "match", name: "Match %", value: 15, color: "#86efac", risk: "Low" },
];

const legendItems = chartData.map(({ name, color }) => ({ name, color }));

const riskDotColor: Record<RiskLevel, string> = {
  Low: "#34d399",
  Medium: "#fbbf24",
  High: "#f87171",
};

// --- Provider logo icons ---
function LogoPill() {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9">
      <path d="M20 3a17 17 0 0 1 0 34V3z" fill="#6d28d9" />
      <path
        d="M20 3a17 17 0 0 0 0 34V3z"
        fill="#fff"
        stroke="#6d28d9"
        strokeWidth="2.5"
      />
      <path d="M11 20a9 9 0 0 0 9 9v-9H11z" fill="#6d28d9" />
      <path
        d="M29 20a9 9 0 0 1-9 9v-9h9z"
        fill="#fff"
        stroke="#6d28d9"
        strokeWidth="2"
      />
    </svg>
  );
}

function LogoSpiralDual() {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9">
      <circle
        cx="15"
        cy="20"
        r="12"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2.5"
      />
      <path
        d="M15 12a8 8 0 1 1 -5.6 13.6"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="26"
        cy="20"
        r="9"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="2.5"
      />
      <circle cx="26" cy="20" r="2" fill="#a78bfa" />
    </svg>
  );
}

function LogoDots() {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9">
      {[6, 12, 18, 24, 30].map((x, i) => (
        <g key={x}>
          {[8, 15, 22, 29].map((y) => (
            <circle
              key={y}
              cx={x}
              cy={y}
              r={i === 2 ? 1.6 : 1.1}
              fill="#374151"
              opacity={Math.abs(i - 2) === 0 ? 1 : 0.7 - Math.abs(i - 2) * 0.12}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

function LogoBurst() {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9">
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 20 + Math.cos(angle) * 5;
        const y1 = 20 + Math.sin(angle) * 5;
        const x2 = 20 + Math.cos(angle) * 16;
        const y2 = 20 + Math.sin(angle) * 16;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#1f2937"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function LogoSpiralBlue() {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9">
      <path
        d="M20 8a12 12 0 1 1 -8.5 20.5A9 9 0 1 1 20 14a6 6 0 1 1 -4.2 10.2"
        fill="none"
        stroke="#2563eb"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const otherProviders = [
  LogoPill,
  LogoSpiralDual,
  LogoDots,
  LogoBurst,
  LogoSpiralBlue,
];

const RADIAN = Math.PI / 180;
const START_ANGLE = 90;
const END_ANGLE = 450;

export default function MarketView() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);
  const activeIndex = hoverIndex ?? pinnedIndex;

  // Precompute each slice's start/mid/end angle ourselves (same convention Recharts
  // uses internally for this startAngle/endAngle pair), so we don't depend on any
  // Recharts-internal prop that may not exist in the installed type defs/version.
  const slicesWithAngles = useMemo(() => {
    const total = chartData.reduce((sum, d) => sum + d.value, 0);
    let cumulative = 0;
    return chartData.map((d) => {
      const span = (d.value / total) * (END_ANGLE - START_ANGLE);
      const startAngle = START_ANGLE + cumulative;
      const endAngle = startAngle + span;
      cumulative += span;
      return {
        ...d,
        percent: d.value / total,
        midAngle: (startAngle + endAngle) / 2,
      };
    });
  }, []);

  const handleEnter = useCallback((index: number) => setHoverIndex(index), []);
  const handleLeave = useCallback(() => setHoverIndex(null), []);
  const handleClick = useCallback(
    (index: number) =>
      setPinnedIndex((prev) => (prev === index ? null : index)),
    [],
  );

  const active = activeIndex !== null ? slicesWithAngles[activeIndex] : null;

  // Position the callout in % terms relative to the square chart box, using the
  // slice's own mid-angle — same trig Recharts' official active-shape recipe uses.
  let calloutStyle: React.CSSProperties | null = null;
  if (active) {
    const cos = Math.cos(-RADIAN * active.midAngle);
    const sin = Math.sin(-RADIAN * active.midAngle);
    const anchorRadiusFraction = 1.08; // just outside the donut ring
    const leftPct = 50 + cos * anchorRadiusFraction * 50;
    const topPct = 50 + sin * anchorRadiusFraction * 50;
    calloutStyle = {
      left: `${leftPct}%`,
      top: `${topPct}%`,
      transform: `translate(${cos < 0 ? "-100%" : "0%"}, -50%)`,
    };
  }

  return (
    <div className="bg-white rounded-[8px] border border-gray-200 p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold tracking-wide text-slate-900 mb-1 capitalize">
            MARKET VIEW
          </h2>
          <p className="text-slate-500 max-w-xl text-xs">
            Strengthen the Market View section so it feels like a supplier
            intelligence capability rather than a simple list.
          </p>
        </div>

        <Link
          href="#"
          className="shrink-0 inline-flex items-center gap-1 text-emerald-700 text-xs font-semibold hover:text-emerald-800"
        >
          View all alerts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 items-start">
        {/* Left: providers */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg text-slate-700 mb-4">
              Other providers in this category
            </h3>
            <div className="flex gap-2">
              {otherProviders.map((Logo, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center bg-white hover:shadow-md transition-shadow"
                >
                  <Logo />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: risk summary + legend */}
        <div className="w-full">
          <h3 className="text-[32px] font-semibold text-slate-700">
            Concentration risk
          </h3>
          <p className="text-[40px] font-bold text-red-600 mb-3">High</p>
          <p className="text-lg text-slate-500">
            4 suppliers control 65% of your spend
          </p>

          <div className="mt-10 pt-10 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-x-7 gap-y-2">
            {legendItems.map((item) => (
              <div key={item.name} className="flex items-center gap-2 w-full">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium text-slate-700">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: donut chart with dynamic hover/click tooltip */}
        <div className="relative flex items-center justify-center">
          {/* Extra padding around the chart gives the callout room to render without being clipped */}
          <div className="relative w-full max-w-[308px] aspect-square p-7 overflow-visible">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="95%"
                  startAngle={START_ANGLE}
                  endAngle={END_ANGLE}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  onMouseLeave={handleLeave}
                >
                  {chartData.map((entry, i) => (
                    <Cell
                      key={entry.key}
                      fill={entry.color}
                      stroke={activeIndex === i ? "#fff" : "none"}
                      strokeWidth={activeIndex === i ? 2 : 0}
                      opacity={
                        activeIndex === null || activeIndex === i ? 1 : 0.45
                      }
                      className="cursor-pointer outline-none transition-opacity"
                      onMouseEnter={() => handleEnter(i)}
                      onClick={() => handleClick(i)}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Tooltip rendered as HTML, outside the SVG, so it can never be clipped
                and always sizes to fit its full text content */}
            {active && calloutStyle && (
              <div
                className="absolute z-20 pointer-events-none"
                style={calloutStyle}
              >
                <div className="flex items-center gap-2 w-max max-w-[220px] bg-slate-900 text-white text-xs font-semibold pl-2 pr-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: riskDotColor[active.risk] }}
                  />
                  <span>
                    {Math.round(active.percent * 100)}% {active.name} ·{" "}
                    {active.risk}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
