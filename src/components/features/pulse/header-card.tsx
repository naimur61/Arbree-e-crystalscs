"use client";

import { ActionButton } from "@/components/common/button/action-button";
import { RefreshCw } from "lucide-react";

const TIME_FILTERS = ["Today", "7 Day", "30 Day", "90 Day"] as const;

export function HeaderCard() {
  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-lg font-semibold text-slate-900">Pulse</h1>
            <span className="py-0.5 px-2 font-medium text-emerald-700 bg-emerald-100 rounded-full text-[10px]">
              Live Monitor
            </span>
          </div>
          <p className="mt-1 max-w-xl text-xs text-slate-500">
            Continuous oversight of supplier breaches, shared infrastructure
            incidents, and supply-chain risk radius.
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex overflow-hidden text-xs rounded-md border border-slate-200">
            {TIME_FILTERS.map((t, i) => (
              <button
                key={t}
                className={`px-3 py-1.5 ${i === 0 ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <ActionButton
            variant="gradient"
            icon={<RefreshCw className="w-4 h-4" />}
            buttonContent="Refresh"
          />
        </div>
      </div>
    </div>
  );
}
