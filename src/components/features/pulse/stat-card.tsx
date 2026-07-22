"use client";

import {
  Activity,
  ShieldAlert,
  AlertTriangle,
  TrendingDown,
} from "lucide-react";

const STATS = [
  {
    icon: <Activity className="h-4 w-4 text-emerald-600" />,
    label: "Suppliers Monitored",
    value: "6",
    sub: "across all vendors",
    trend: "+12 this week",
    trendColor: "text-emerald-600",
  },
  {
    icon: <ShieldAlert className="h-4 w-4 text-amber-600" />,
    label: "Active Cyber Alerts",
    value: "6",
    sub: "1 high · 5 medium",
    trend: "+2 this week",
    trendColor: "text-amber-600",
  },
  {
    icon: <AlertTriangle className="h-4 w-4 text-rose-600" />,
    label: "Breach-Exposed Suppliers",
    value: "1",
    sub: "1 confirmed · 0 suspected",
    trend: "Steady 30 d",
    trendColor: "text-slate-500",
  },
  {
    icon: <TrendingDown className="h-4 w-4 text-emerald-600" />,
    label: "Downstream Exposure",
    value: "2",
    sub: "providers with incident",
    trend: "Steady 30 d",
    trendColor: "text-slate-500",
  },
] as const;

export function StatCards() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="rounded-lg border border-emerald-200 bg-white p-3 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {s.icon}
              <span className="text-xs font-medium text-slate-700">
                {s.label}
              </span>
            </div>
            <span className={`text-[10px] ${s.trendColor}`}>{s.trend}</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {s.value}
          </div>
          <div className="text-[10px] text-slate-500">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
