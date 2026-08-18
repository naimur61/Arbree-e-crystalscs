"use client";

import { Zap, Lock, Leaf, Radio } from "lucide-react";

const GAUGES = [
  {
    title: "SLA",
    icon: <Zap className="h-4 w-4 text-emerald-600" />,
    pct: 33,
    tone: "rose" as const,
    note: "SLA breach rate",
  },
  {
    title: "Information Security",
    icon: <Lock className="h-4 w-4 text-emerald-600" />,
    pct: 50,
    tone: "amber" as const,
    note: "Security posture 30 d avg",
  },
  {
    title: "Sustainability",
    icon: <Leaf className="h-4 w-4 text-emerald-600" />,
    pct: 67,
    tone: "emerald" as const,
    note: "Social · Environmental",
  },
  {
    title: "Adverse Media Monitoring",
    icon: <Radio className="h-4 w-4 text-emerald-600" />,
    pct: 83,
    tone: "emerald" as const,
    note: "Signal over 30 d",
    bars: true,
  },
] as const;

export function GaugeCards() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {GAUGES.map((g) => (
        <GaugeCard key={g.title} {...g} />
      ))}
    </div>
  );
}

function GaugeCard({
  title,
  icon,
  pct,
  tone,
  note,
  bars,
}: {
  title: string;
  icon: React.ReactNode;
  pct: number;
  tone: "rose" | "amber" | "emerald";
  note: string;
  bars?: boolean;
}) {
  const ringColor =
    tone === "rose" ? "#f43f5e" : tone === "amber" ? "#f59e0b" : "#10b981";
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-xs font-medium text-slate-700">{title}</span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <Donut pct={pct} color={ringColor} />
        <div className="flex-1 space-y-1 text-[10px] text-slate-600">
          <LegendRow
            color={ringColor}
            label={
              tone === "rose" ? "High" : tone === "amber" ? "Medium" : "Good"
            }
          />
          <LegendRow color="#e5e7eb" label="Baseline" />
          <LegendRow color="#94a3b8" label="Prior period" />
        </div>
      </div>
      <div className="mt-2 text-[10px] text-slate-500">{note}</div>
      <div className="mt-2 h-10">
        {bars ? <MiniBars /> : <MiniArea tone={tone} />}
      </div>
    </div>
  );
}

function Donut({ pct, color }: { pct: number; color: string }) {
  const r = 22,
    c = 2 * Math.PI * r,
    off = c - (pct / 100) * c;
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <circle
        cx="32"
        cy="32"
        r={r}
        stroke="#f1f5f9"
        strokeWidth="8"
        fill="none"
      />
      <circle
        cx="32"
        cy="32"
        r={r}
        stroke={color}
        strokeWidth="8"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={off}
        strokeLinecap="round"
        transform="rotate(-90 32 32)"
      />
      <text
        x="32"
        y="36"
        textAnchor="middle"
        className="fill-slate-900 text-[13px] font-semibold"
      >
        {pct}%
      </text>
    </svg>
  );
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-sm" style={{ background: color }} />
      <span>{label}</span>
    </div>
  );
}

export function MiniArea({ tone }: { tone: "rose" | "amber" | "emerald" }) {
  const color =
    tone === "rose" ? "#f43f5e" : tone === "amber" ? "#f59e0b" : "#10b981";
  const pts = [10, 14, 9, 18, 12, 20, 15, 22, 18, 14, 20, 25, 22, 28, 30];
  const step = 200 / (pts.length - 1),
    max = Math.max(...pts);
  const d = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${i * step},${40 - (p / max) * 40}`)
    .join(" ");
  return (
    <svg viewBox="0 0 200 40" className="h-full w-full">
      <path d={`${d} L200,40 L0,40 Z`} fill={color} opacity="0.15" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function MiniBars() {
  const bars = [8, 14, 6, 20, 12, 18, 24, 16, 22, 28, 18, 14];
  return (
    <div className="flex h-full items-end gap-0.5">
      {bars.map((b, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-emerald-400"
          style={{ height: `${b * 3}%` }}
        />
      ))}
    </div>
  );
}
