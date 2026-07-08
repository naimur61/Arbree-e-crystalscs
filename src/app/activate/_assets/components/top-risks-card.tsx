"use client";

import { ChevronRight } from "lucide-react";

interface Risk {
  id: number;
  title: string;
  affectedUnits: number;
  description: string;
  severity: "Critical" | "High" | "Medium" | "Low";
}

interface TopRisksCardProps {
  risks: Risk[];
}

const SEVERITY_STYLES: Record<
  Risk["severity"],
  { circle: string; badge: string }
> = {
  Critical: { circle: "bg-red-500", badge: "bg-red-50 text-red-700" },
  High: { circle: "bg-orange-500", badge: "bg-orange-50 text-orange-700" },
  Medium: { circle: "bg-yellow-500", badge: "bg-yellow-50 text-yellow-700" },
  Low: { circle: "bg-green-500", badge: "bg-green-50 text-green-700" },
};

export function TopRisksCard({ risks }: TopRisksCardProps) {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <p className="text-sm font-bold text-gray-900">Top Ecosystem Risks</p>
        <p className="text-xs text-gray-500 mt-0.5">
          Ranked by potential impact
        </p>
      </div>

      <div className="space-y-6">
        {risks.map((risk) => {
          const style = SEVERITY_STYLES[risk.severity];

          return (
            <div key={risk.id} className="flex gap-4">
              {/* Rank circle */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full font-bold text-sm text-white flex items-center justify-center ${style.circle}`}
              >
                {risk.id}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[10px] font-medium text-gray-500">
                    {risk.affectedUnits} units affected
                  </span>
                  <span
                    className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-md ${style.badge}`}
                  >
                    {risk.severity}
                  </span>
                </div>
                <p className="font-semibold text-sm text-gray-900 mt-0.5 mb-1">
                  {risk.title}
                </p>
                <p className="text-xs text-gray-600 leading-snug">
                  {risk.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-6 text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1.5 text-sm">
        View all alerts
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
