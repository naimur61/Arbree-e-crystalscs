"use client";

import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

interface Recommendation {
  id: number;
  title: string;
  category: string;
  urgency: "IMMEDIATE" | "24H" | "48H";
  description: string;
}

interface RecommendationsCardProps {
  recommendations: Recommendation[];
}

const urgencyStyles: Record<
  Recommendation["urgency"],
  { dot: string; badge: string }
> = {
  IMMEDIATE: { dot: "bg-red-500", badge: "bg-red-100 text-red-600" },
  "24H": { dot: "bg-blue-500", badge: "bg-blue-100 text-blue-600" },
  "48H": {
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-success-primary",
  },
};

export function RecommendationsCard({
  recommendations,
}: RecommendationsCardProps) {
  return (
    <div className="bg-primary rounded-[8px] border border-primary p-6 h-full flex flex-col">
      <div className="flex items-start gap-3 mb-6">
        <Zap className="w-6 h-6 text-emerald-600 fill-emerald-600 flex-shrink-0 mt-1" />
        <div>
          <p className="text-sm font-bold text-primary">
            Strategic Recommendations
          </p>
          <p className="text-secondary text-xs mt-0.5">
            Operational response queue
          </p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {recommendations.map((rec) => {
          const style = urgencyStyles[rec.urgency];

          return (
            <div key={rec.id} className="flex gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-2 ${style.dot}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-primary font-bold text-xs">{rec.title}</p>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0 ${style.badge}`}
                  >
                    {rec.urgency}
                  </span>
                </div>
                <p className="text-secondary text-[10px] mt-1 leading-snug">
                  {rec.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href="#"
        className="mt-6 text-success-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all text-xs"
      >
        View all recommendations <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
