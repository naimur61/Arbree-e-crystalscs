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
  Critical: {
    circle: "bg-error-secondary",
    badge: "bg-error-secondary text-white",
  },
  High: {
    circle: "bg-warning-secondary",
    badge: "bg-warning-secondary text-white",
  },
  Medium: { circle: "bg-yellow-500", badge: "bg-yellow-50 text-white" },
  Low: { circle: "bg-offer-secondary", badge: "bg-offer-secondary text-white" },
};

export function TopRisksCard({ risks }: TopRisksCardProps) {
  return (
    <div className="w-full bg-primary rounded-lg border border-primary p-6">
      <div className="mb-6">
        <p className="text-sm font-bold text-primary">Top Ecosystem Risks</p>
        <p className="text-xs text-secondary mt-0.5">
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
                  <span className="text-[10px] font-medium text-secondary">
                    {risk.affectedUnits} units affected
                  </span>
                  <span
                    className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-md ${style.badge}`}
                  >
                    {risk.severity}
                  </span>
                </div>
                <p className="font-semibold text-sm text-primary mt-0.5 mb-1">
                  {risk.title}
                </p>
                <p className="text-xs text-secondary leading-snug">
                  {risk.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-6 text-success-primary hover:text-success-dark cursor-pointer font-semibold flex items-center gap-1.5 text-sm">
        View all alerts
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
