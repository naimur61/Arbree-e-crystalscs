"use client";

import { ArrowUpRight } from "lucide-react";

interface RiskPostureCardProps {
  confidence: number;
  trend: "increasing" | "decreasing" | "stable";
  recommendation: string;
  description: string;
}

const trendLabel = {
  increasing: "Increasing",
  decreasing: "Decreasing",
  stable: "Stable",
};

export function RiskPostureCard({
  confidence,
  trend,
  recommendation,
  description,
}: RiskPostureCardProps) {
  return (
    <div className="bg-emerald-50 rounded-[8px] p-4 h-full border border-emerald-200 shadow-sm">
      <p className="text-gray-900 text-xs font-bold tracking-wide mb-5">
        RISK POSTURE
      </p>

      <p className="text-2xl font-extrabold text-red-600 flex items-center gap-1.5 mb-8">
        Elevated <ArrowUpRight className="w-6 h-6" strokeWidth={2.5} />
      </p>

      <div className="space-y-6 text-base">
        <p className="text-gray-600 text-xs py-2">
          AI Confidence:{" "}
          <span className="font-bold text-gray-900">{confidence}%</span>
        </p>
        <p className="text-gray-600 text-xs py-2">
          Trend:{" "}
          <span className="font-bold text-gray-900">{trendLabel[trend]}</span>
        </p>
        <p className="text-gray-600 text-xs py-2">
          Board Recommendation:{" "}
          <span className="font-bold text-gray-900">{recommendation}</span>
        </p>
      </div>

      <p className="text-gray-600 text-xs leading-relaxed mt-8">
        {description}
      </p>
    </div>
  );
}
