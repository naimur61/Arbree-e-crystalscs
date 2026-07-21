"use client";

import {
  RefreshCw,
  Activity,
  ShieldAlert,
  AlertTriangle,
  TrendingDown,
  Zap,
  Lock,
  Leaf,
  Radio,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function PulseContainer() {
  return (
    <div className="min-h-screen bg-[#f4faf5] p-4 text-[13px] text-slate-800">
      <div className="mx-auto max-w-[1400px] space-y-3">
        <HeaderCard />
        <div className="grid grid-cols-4 gap-3">
          <StatCard
            icon={<Activity className="h-4 w-4 text-emerald-600" />}
            label="Suppliers Monitored"
            value="6"
            sub="across all vendors"
            trend="+12 this week"
            trendColor="text-emerald-600"
          />
          <StatCard
            icon={<ShieldAlert className="h-4 w-4 text-amber-600" />}
            label="Active Cyber Alerts"
            value="6"
            sub="1 high · 5 medium"
            trend="+2 this week"
            trendColor="text-amber-600"
          />
          <StatCard
            icon={<AlertTriangle className="h-4 w-4 text-rose-600" />}
            label="Breach-Exposed Suppliers"
            value="1"
            sub="1 confirmed · 0 suspected"
            trend="Steady 30 d"
            trendColor="text-slate-500"
          />
          <StatCard
            icon={<TrendingDown className="h-4 w-4 text-emerald-600" />}
            label="Downstream Exposure"
            value="2"
            sub="providers with incident"
            trend="Steady 30 d"
            trendColor="text-slate-500"
          />
        </div>

        <div className="grid grid-cols-4 gap-3">
          <GaugeCard
            title="SLA"
            icon={<Zap className="h-4 w-4 text-emerald-600" />}
            pct={33}
            tone="rose"
            note="SLA breach rate"
          />
          <GaugeCard
            title="Information Security"
            icon={<Lock className="h-4 w-4 text-emerald-600" />}
            pct={50}
            tone="amber"
            note="Security posture 30 d avg"
          />
          <GaugeCard
            title="Sustainability"
            icon={<Leaf className="h-4 w-4 text-emerald-600" />}
            pct={67}
            tone="emerald"
            note="Social · Environmental"
          />
          <GaugeCard
            title="Adverse Media Monitoring"
            icon={<Radio className="h-4 w-4 text-emerald-600" />}
            pct={83}
            tone="emerald"
            note="Signal over 30 d"
            bars
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <HeatmapCard />
          <RecommendedActions />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <AlertsCard />
          <BlastRadiusCard />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <IntelligenceHighlights />
          <SignalSources />
        </div>

        <AlertFeed />
      </div>
    </div>
  );
}

/* ---------- Header ---------- */
function HeaderCard() {
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-slate-900">Pulse</h1>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
              Live Monitor
            </span>
          </div>
          <p className="mt-1 max-w-xl text-xs text-slate-500">
            Continuous oversight of supplier breaches, shared infrastructure
            incidents, and supply-chain risk radius.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-md border border-slate-200 text-xs">
            {["Today", "7 Day", "30 Day", "90 Day"].map((t, i) => (
              <button
                key={t}
                className={`px-3 py-1.5 ${i === 0 ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-600">
            <RefreshCw className="h-3 w-3" /> Refresh
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-lg font-serif italic text-slate-900">
          e-CRYSTAL FLOW<sup className="text-[8px]">™</sup>
        </h2>
        <p className="text-[11px] text-slate-500">
          A continuous journey from insight to impact
        </p>
      </div>

      <div className="mt-3 grid grid-cols-5 items-center gap-2">
        <FlowStep blurred />
        <FlowStep blurred />
        <div className="relative flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white font-semibold shadow-lg ring-4 ring-emerald-100">
            M
          </div>
        </div>
        <FlowStep active />
        <FlowStep blurred />
      </div>
    </div>
  );
}

function FlowStep({
  active,
  blurred,
}: {
  active?: boolean;
  blurred?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-md border px-3 py-2 ${
        active
          ? "border-emerald-300 bg-emerald-50"
          : "border-slate-200 bg-slate-50"
      } ${blurred ? "opacity-40 blur-[1.5px]" : ""}`}
    >
      <div
        className={`h-6 w-6 rounded-full ${active ? "bg-emerald-500" : "bg-slate-300"}`}
      />
      <div className="min-w-0 flex-1">
        <div
          className={`text-xs font-semibold ${active ? "text-emerald-700" : "text-slate-600"}`}
        >
          {active ? "PULSE" : "Stage"}
        </div>
        <div className="truncate text-[10px] text-slate-500">
          {active ? "Realtime monitoring signal" : "Pipeline stage description"}
        </div>
      </div>
    </div>
  );
}

/* ---------- Stat card ---------- */
function StatCard({
  icon,
  label,
  value,
  sub,
  trend,
  trendColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  trend: string;
  trendColor: string;
}) {
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="text-xs font-medium text-slate-700">{label}</span>
        </div>
        <span className={`text-[10px] ${trendColor}`}>{trend}</span>
      </div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      <div className="text-[10px] text-slate-500">{sub}</div>
    </div>
  );
}

/* ---------- Gauge card ---------- */
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
  const r = 22;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
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

function MiniArea({ tone }: { tone: "rose" | "amber" | "emerald" }) {
  const color =
    tone === "rose" ? "#f43f5e" : tone === "amber" ? "#f59e0b" : "#10b981";
  const pts = [10, 14, 9, 18, 12, 20, 15, 22, 18, 14, 20, 25, 22, 28, 30];
  const w = 200;
  const h = 40;
  const step = w / (pts.length - 1);
  const max = Math.max(...pts);
  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${i * step},${h - (p / max) * h}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full">
      <path d={`${path} L${w},${h} L0,${h} Z`} fill={color} opacity="0.15" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
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

/* ---------- Heatmap ---------- */
function HeatmapCard() {
  const levels = ["Low", "Medium", "High", "Critical"];
  const grid = [
    ["e", "e", "a", "r"],
    ["e", "a", "a", "r"],
    ["a", "a", "r", "r"],
    ["r", "r", "r", "r"],
  ];
  const color = (c: string) =>
    c === "e" ? "bg-emerald-400" : c === "a" ? "bg-amber-400" : "bg-rose-500";
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="mb-1 text-sm font-semibold text-slate-900">
        Cyber risk heatmap
      </div>
      <div className="mb-3 text-[10px] text-slate-500">
        Likelihood × severity
      </div>
      <div className="mb-2 text-[11px] font-medium text-slate-600">
        6 suppliers in hotspot
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col justify-between py-1 text-[10px] text-slate-500">
          <span>High</span>
          <span>Med</span>
          <span>Low</span>
          <span className="pt-1 font-medium text-slate-600">Likelihood</span>
        </div>
        <div className="flex-1">
          <div className="mb-1 grid grid-cols-4 gap-1 text-center text-[10px] text-slate-500">
            {levels.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-1">
            {grid.flatMap((row, ri) =>
              row.map((c, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  className={`flex aspect-square items-center justify-center rounded ${color(c)} text-white`}
                >
                  {(ri + ci) % 3 === 0 ? "●" : ""}
                </div>
              )),
            )}
          </div>
          <div className="mt-1 text-center text-[10px] font-medium text-slate-600">
            Severity
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Recommended actions ---------- */
function RecommendedActions() {
  const items = [
    {
      t: "Suspend BluePeak data sharing",
      d: "Confirmed leak of key API keys through their gateway.",
    },
    {
      t: "Request patch confirmation from Alpha Solutions for CVE-2026-940",
      d: "Vulnerability patch verification is overdue.",
    },
    {
      t: "Initiate email failover for AWS-dependent suppliers",
      d: "AWS outage cascading through downstream services.",
    },
    {
      t: "Force password reset for Centrex Logistics contacts",
      d: "Credential exposure detected in third-party dump.",
    },
  ];
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Recommended actions
        </div>
        <span className="text-[10px] text-slate-500">
          Operational response backlog
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {items.map((i) => (
          <div
            key={i.t}
            className="flex items-start gap-2 border-b border-slate-100 pb-2 last:border-0"
          >
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
            <div className="flex-1">
              <div className="text-xs font-medium text-slate-800">{i.t}</div>
              <div className="text-[10px] text-slate-500">{i.d}</div>
            </div>
            <ChevronRight className="h-3 w-3 text-slate-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Alerts ---------- */
function AlertsCard() {
  const alerts = new Array(5).fill(0).map((_, i) => ({
    critical: i === 0,
    title:
      i === 0
        ? "BluePeak Systems — ransomware confirmed"
        : "BluePeak Systems — ransomware confirmed",
    desc: "Encryption observed on production supplier processes. Incident acknowledged by vendor.",
    tags: ["CRITICAL", "Direct Impact"] as string[],
  }));
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Alerts <span className="text-slate-400">(Live)</span>
        </div>
        <div className="flex gap-1 text-[10px]">
          <span className="rounded bg-emerald-500 px-2 py-0.5 text-white">
            All
          </span>
          <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
            Critical
          </span>
          <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
            Downstream
          </span>
        </div>
      </div>
      <div className="mb-2 text-[10px] text-slate-500">
        6 active · streaming from live feeds
      </div>
      <div className="space-y-2">
        {alerts.map((a, idx) => (
          <div
            key={idx}
            className="border-b border-slate-100 pb-2 last:border-0"
          >
            <div className="flex items-start gap-2">
              <span
                className={`mt-1 h-2 w-2 rounded-full ${a.critical ? "bg-rose-500" : "bg-amber-500"}`}
              />
              <div className="flex-1">
                <div className="text-xs font-medium text-slate-800">
                  {a.title}
                </div>
                <div className="text-[10px] text-slate-500">{a.desc}</div>
                <div className="mt-1 flex gap-1">
                  {a.tags.map((t) => (
                    <span
                      key={t}
                      className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${
                        t === "CRITICAL"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Blast radius ---------- */
function BlastRadiusCard() {
  const chips = [
    ["AWS us-east-1", "Bluehost Systems", "Your payments API"],
    ["Cloudflare", "Coreos Logistics"],
    ["Google Cloud", "Interlink Bank Ltd", "Internal warning"],
  ];
  const bars = [
    { l: "Financials", v: 78, h: "3 high" },
    { l: "Cyber", v: 62, h: "2 high" },
    { l: "Operational", v: 48, h: "1 high" },
    { l: "ESG", v: 30, h: "1 med" },
  ];
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Downstream blast radius
        </div>
        <span className="rounded bg-rose-100 px-2 py-0.5 text-[10px] font-medium text-rose-700">
          3 INCIDENT ROW
        </span>
      </div>
      <div className="mb-2 text-[10px] text-slate-500">
        How a single incident propagates across your supply chain
      </div>
      <div className="space-y-2">
        {chips.map((row, i) => (
          <div key={i}>
            <div className="flex flex-wrap gap-1">
              {row.map((c, j) => (
                <span
                  key={j}
                  className={`rounded-full border px-2 py-0.5 text-[10px] ${
                    j === 0
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-1 text-[10px] text-slate-500">
              Direct impact → higher disruption
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 border-t border-slate-100 pt-2">
        <div className="mb-1 text-xs font-medium text-slate-700">
          Shared cloud / infrastructure dependency
        </div>
        {bars.map((b) => (
          <div key={b.l} className="mb-1 flex items-center gap-2">
            <div className="w-20 text-[10px] text-slate-600">{b.l}</div>
            <div className="h-2 flex-1 rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${
                  b.v > 60
                    ? "bg-rose-500"
                    : b.v > 40
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
                style={{ width: `${b.v}%` }}
              />
            </div>
            <div className="w-12 text-right text-[10px] text-slate-500">
              {b.h}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-md bg-slate-50 p-2 text-[10px] text-slate-600">
        <span className="font-semibold text-slate-800">Correlated risk:</span>{" "}
        when many suppliers depend on the same cloud or one upstream outage,
        isolate them from the customer chain. Pulse tracks these dependencies to
        trigger advisory decisions when incidents materialize downstream.
      </div>
    </div>
  );
}

/* ---------- Intelligence highlights ---------- */
function IntelligenceHighlights() {
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Intelligence highlights
        </div>
        <span className="text-[10px] text-slate-500">Updated 4 m ago</span>
      </div>
      <div className="space-y-3">
        <p className="text-xs text-slate-700">
          Edmundson Electrical Ltd DocMerlo operates as a subsidiary of Herisha
          Holdings Investments Limited. Parental guarantees may be resolved.
        </p>
        <p className="text-[11px] text-slate-500">
          Coverity Scaffolding utilizes an external HSE Consultant (Bone Grimes)
          and has transitioned from 2 RIDDORs in 2024 to 1 in 30 days.
        </p>
        <div className="rounded-md border border-slate-100 bg-slate-50 p-2">
          <div className="text-[11px] font-medium text-slate-800">
            7 suppliers have ISO 27001 or SOC 2 expiring in 90 days
          </div>
          <div className="mt-1 text-[10px] text-slate-500">
            Compliance officers are automatically notified. Trigger evidence
            requests and reassessments before the audit window closes.
          </div>
          <button className="mt-1 text-[10px] font-medium text-emerald-600">
            Get notified →
          </button>
        </div>
        <div className="rounded-md border border-slate-100 bg-slate-50 p-2">
          <div className="text-[11px] font-medium text-slate-800">
            7 suppliers have ISO 27001 or SOC 2 expiring in 90 days
          </div>
          <div className="mt-1 text-[10px] text-slate-500">
            Compliance officers are automatically notified. Trigger evidence
            requests and reassessments before the audit window closes.
          </div>
          <button className="mt-1 text-[10px] font-medium text-emerald-600">
            Get notified →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Signal sources ---------- */
function SignalSources() {
  const chips = [
    "Dark web forums",
    "CVE feeds",
    "CISA KEV",
    "Cloud status pages",
    "Threat intel (MISP)",
    "News & OSINT",
    "Regulator soft reports",
    "Post lists locally",
    "Malware analysis reports",
    "Vulnerability databases",
    "Security blogs",
    "Incident response summaries",
    "Bug bounty disclosures",
    "Phishing threat alerts",
    "Security audit findings",
    "Red team assessments",
  ];
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Signal sources
        </div>
        <span className="text-[10px] text-slate-500">
          16 feeds · realtime license
        </span>
      </div>
      <div className="mb-3 text-[10px] text-slate-500">
        Every alert traces back to one of these live, curated intelligence
        sources.
      </div>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <span
            key={c}
            className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-700 hover:bg-slate-50"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Alert feed table ---------- */
function AlertFeed() {
  const rows = [
    {
      d: "23 Sep",
      n: "Coventry Scaffolding",
      meta: "Operations issue · RIDDOR · High priority",
      risk: "High",
      color: "rose",
    },
    {
      d: "22 Sep",
      n: "Hovel Ltd",
      meta: "Compliance alert · missing PII",
      risk: "Medium",
      color: "amber",
    },
    {
      d: "22 Sep",
      n: "Edmundson Electrical",
      meta: "ESG alert · Missing GHG · Carbon Reduction Plan",
      risk: "Medium",
      color: "amber",
    },
    {
      d: "22 Sep",
      n: "Brewsters Waste",
      meta: "Statue Alert · Community rating",
      risk: "Low",
      color: "emerald",
    },
  ];
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-900">Alert Feed</div>
          <div className="text-[10px] text-slate-500">
            In your live supplier ecosystem
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <div className="flex overflow-hidden rounded-md border border-slate-200">
            {["All", "High 3", "Medium 4", "Low 1"].map((t, i) => (
              <button
                key={t}
                className={`px-2 py-1 ${i === 0 ? "bg-emerald-500 text-white" : "bg-white text-slate-600"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-slate-600">
            <Filter className="h-3 w-3" /> Filter
          </button>
        </div>
      </div>
      <div className="mt-3 divide-y divide-slate-100">
        {rows.map((r) => (
          <div
            key={r.n}
            className="grid grid-cols-[60px_1fr_140px_80px] items-center gap-3 py-2"
          >
            <div className="text-[10px] text-slate-500">{r.d}</div>
            <div>
              <div className="text-xs font-medium text-slate-800">{r.n}</div>
              <div className="text-[10px] text-slate-500">{r.meta}</div>
            </div>
            <div className="h-8">
              <MiniArea tone={r.color as "rose" | "amber" | "emerald"} />
            </div>
            <div className="text-right">
              <span
                className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                  r.color === "rose"
                    ? "bg-rose-100 text-rose-700"
                    : r.color === "amber"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {r.risk}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
