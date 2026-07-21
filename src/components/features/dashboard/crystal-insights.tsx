import { TrendingUp, ArrowRight } from "lucide-react";
import { CardContainer } from "@/components/common/card";

export function CrystalInsights() {
  return (
    <CardContainer
      icon={<TrendingUp className="w-4 h-4 text-emerald-600" />}
      title="e-Crystal Insights"
      subtitle="Patterns worth your attention"
    >
      <div className="space-y-3">
        <div className="p-3 bg-emerald-50 rounded-md">
          <p className="text-xs text-slate-800">
            <span className="font-semibold text-emerald-700">100%</span> of the
            recent supplier onboarding batch is successful.
          </p>
        </div>
        <p className="text-xs text-slate-700">
          2 suppliers show gaps in digital security and ESG documentation.
        </p>
        <div className="flex gap-3 items-center">
          <div className="flex relative justify-center items-center w-14 h-14">
            <svg viewBox="0 0 40 40" className="w-14 h-14 -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="#f1f5f9"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="#10b981"
                strokeWidth="4"
                fill="none"
                strokeDasharray={2 * Math.PI * 16}
                strokeDashoffset={2 * Math.PI * 16 * (1 - 0.72)}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute font-semibold text-[11px] text-slate-900">
              72%
            </span>
          </div>
          <div className="text-xs text-slate-700">
            Risk coverage across monitored suppliers
          </div>
        </div>
      </div>
      <button className="flex gap-1 items-center mt-3 font-medium text-emerald-600 hover:text-emerald-700 text-[11px]">
        See in Evolve <ArrowRight className="w-3 h-3" />
      </button>
    </CardContainer>
  );
}
