"use client";

import { Filter } from "lucide-react";
import { MiniArea } from "./gauge-card";

const ALERT_FILTERS = ["All", "High 3", "Medium 4", "Low 1"] as const;

const ROWS = [
  {
    d: "23 Sep",
    n: "Coventry Scaffolding",
    meta: "Operations issue · RIDDOR · High priority",
    risk: "High",
    color: "rose" as const,
  },
  {
    d: "22 Sep",
    n: "Hovel Ltd",
    meta: "Compliance alert · missing PII",
    risk: "Medium",
    color: "amber" as const,
  },
  {
    d: "22 Sep",
    n: "Edmundson Electrical",
    meta: "ESG alert · Missing GHG · Carbon Reduction Plan",
    risk: "Medium",
    color: "amber" as const,
  },
  {
    d: "22 Sep",
    n: "Brewsters Waste",
    meta: "Statue Alert · Community rating",
    risk: "Low",
    color: "emerald" as const,
  },
] as const;

const riskStyle = (color: string) =>
  color === "rose"
    ? "bg-rose-100 text-rose-700"
    : color === "amber"
      ? "bg-amber-100 text-amber-700"
      : "bg-emerald-100 text-emerald-700";

export function AlertFeed() {
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
            {ALERT_FILTERS.map((t, i) => (
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
        {ROWS.map((r) => (
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
              <MiniArea tone={r.color} />
            </div>
            <div className="text-right">
              <span
                className={`rounded px-2 py-0.5 text-[10px] font-medium ${riskStyle(r.color)}`}
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
