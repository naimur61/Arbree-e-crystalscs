"use client";

import { RefreshCw } from "lucide-react";

const TIME_FILTERS = ["Today", "7 Day", "30 Day", "90 Day"] as const;

export function HeaderCard() {
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
            {TIME_FILTERS.map((t, i) => (
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
        <FlowStep active />
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
      className={`flex items-center gap-2 rounded-md border px-3 py-2 ${active ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50"} ${blurred ? "opacity-40 blur-[1.5px]" : ""}`}
    >
      <div
        className={`h-6 w-6 shrink-0 rounded-full ${active ? "bg-emerald-500" : "bg-slate-300"}`}
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
