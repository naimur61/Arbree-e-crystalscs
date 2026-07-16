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
    <div className="bg-primary rounded-[8px] p-4 h-full border border-primary shadow-sm">
      <p className="text-primary text-xs font-bold tracking-wide mb-5">
        RISK POSTURE
      </p>

      <p className="text-2xl font-extrabold text-error-primary flex items-center gap-1.5 mb-8">
        Elevated <ArrowUpRight className="w-6 h-6" strokeWidth={2.5} />
      </p>

      <div className="space-y-6 text-base">
        <p className="text-secondary text-xs py-2">
          AI Confidence:{" "}
          <span className="font-bold text-primary">{confidence}%</span>
        </p>
        <p className="text-secondary text-xs py-2">
          Trend:{" "}
          <span className="font-bold text-primary">{trendLabel[trend]}</span>
        </p>
        <p className="text-secondary text-xs py-2">
          Board Recommendation:{" "}
          <span className="font-bold text-primary">{recommendation}</span>
        </p>
      </div>

      <p className="text-secondary text-xs leading-relaxed mt-8">
        {description}
      </p>
    </div>
  );
}
