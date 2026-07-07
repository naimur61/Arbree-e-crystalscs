"use client";

import { MoreHorizontal } from "lucide-react";

interface RiskItem {
  label: string;
  value: string | number;
  color: "orange" | "red";
}

interface ConcentrationRiskProps {
  risks: RiskItem[];
  summary: string;
}

export function ConcentrationRisk({ risks, summary }: ConcentrationRiskProps) {
  const dotClasses = {
    orange: "bg-orange-500",
    red: "bg-red-500",
  };

  const badgeClasses = {
    orange: "bg-orange-100 text-orange-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-[8px] border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-gray-900 font-bold text-sm">Concentration Risk</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-400 text-xs mb-5">Executive scorecard</p>

      <div className="space-y-3">
        {risks.map((risk, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 px-5 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotClasses[risk.color]}`}
              />
              <span className="text-gray-700 text-xs">{risk.label}</span>
            </div>
            <span
              className={`font-bold text-xs px-4 py-2 rounded-xl whitespace-nowrap ${badgeClasses[risk.color]}`}
            >
              {risk.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-5 border-t border-gray-100">
        <p className="text-gray-400 text-xs">{summary}</p>
      </div>
    </div>
  );
}
