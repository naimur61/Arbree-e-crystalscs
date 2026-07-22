"use client";

import { ChevronRight } from "lucide-react";

const ITEMS = [
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
] as const;

export function RecommendedActions() {
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
        {ITEMS.map((i) => (
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
