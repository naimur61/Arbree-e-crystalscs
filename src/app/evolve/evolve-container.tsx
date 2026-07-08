"use client";

import { FlowBanner } from "@/components/common/ui/flow-banner";
import { ConcentrationRisk } from "./_assets/components/concentration-risk";
import { ExecutiveBrief } from "./_assets/components/executive-brief";
import { ImpactCard } from "./_assets/components/impact-card";
import { RecommendationsCard } from "./_assets/components/recommendations-card";
import { RiskPostureCard } from "./_assets/components/risk-posture-card";
import { StrategicRisks } from "./_assets/components/strategic-risks";

const strategicRisks = [
  { id: 1, title: "Financial Stress Exposure", impact: "High impact" as const },
  { id: 2, title: "Performance issues", impact: "Moderate impact" as const },
  { id: 3, title: "Cyber risk", impact: "High impact" as const },
];

const recommendations = [
  {
    id: 1,
    title: "Financial Stress Exposure",
    category: "Financial",
    urgency: "IMMEDIATE" as const,
    description:
      "Disable production API keys and revoke OAuth grants pending containment.",
  },
  {
    id: 2,
    title: "Suspend BluePeak data sharing",
    category: "Sensitive",
    urgency: "IMMEDIATE" as const,
    description: "Vendor SLA disputes 48h confirmation window for CVE > 9.0.",
  },
  {
    id: 3,
    title: "Suspend BluePeak data sharing",
    category: "Technical",
    urgency: "24H" as const,
    description:
      "Disable production API keys and revoke OAuth grants pending containment.",
  },
  {
    id: 4,
    title: "Suspend BluePeak data sharing",
    category: "Security",
    urgency: "48H" as const,
    description:
      "312 SSO accounts match leaked credentials: rotate + step-up MFA.",
  },
];

const concentrationRisks = [
  { label: "Contract Recognition", value: "38%", color: "orange" as const },
  { label: "Specific Optimization", value: "54%", color: "orange" as const },
  { label: "Demand Condition", value: "3 suppliers", color: "red" as const },
  { label: "Process automation", value: "15%", color: "orange" as const },
];

export default function EvolveContainer() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto p-4">
        <FlowBanner currentPage="evolve" />

        <div className="">
          {/* <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-bold text-gray-900">Executive Summary</h2>
              <p className="text-gray-600 text-xs">May 2024</p>
            </div>
          </div> */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <RiskPostureCard
                confidence={87}
                trend="increasing"
                recommendation="Immediate mitigation"
                description="Key changes in financial risk profile and elevated cyber threat signals require immediate attention and board-level reporting."
              />
            </div>
            <div>
              <StrategicRisks risks={strategicRisks} />
            </div>
            <div>
              <RecommendationsCard recommendations={recommendations} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-4">
            <div className="bg-white rounded-[8px] border border-gray-200 p-4 shadow-sm">
              <p className="text-sm font-bold text-gray-900 mb-6">
                Business Impact
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ImpactCard
                  title="Financial Impact"
                  amount="4.2M"
                  subtitle="Potential exposure across at-risk suppliers"
                  icon="£"
                  variant="financial"
                />
                <ImpactCard
                  title="Operational Impact"
                  amount="3M"
                  subtitle="Critical services currently at risk"
                  icon="⚙️"
                  variant="operational"
                />
                <ImpactCard
                  title="Reputation Impact"
                  amount="10M"
                  subtitle="External sentiment risk rising"
                  icon="👥"
                  variant="reputation"
                />
              </div>
            </div>
            <ExecutiveBrief />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
            <div className="bg-white rounded-[8px] border border-gray-200 p-4">
              <p className="text-sm font-bold text-gray-900 mb-6">
                e-Crystal Recommended Actions
              </p>
              <div className="space-y-3">
                {recommendations.map((rec, index) => {
                  const impactColorMap: Record<string, string> = {
                    Financial: "text-red-600",
                    Sensitive: "text-orange-500",
                    Mindful: "text-emerald-600",
                    Physical: "text-blue-600",
                  };
                  const impactColor =
                    impactColorMap[rec.category] ?? "text-emerald-600";
                  const impactLabel =
                    rec.urgency === "IMMEDIATE"
                      ? "High impact"
                      : rec.urgency === "24H"
                        ? "Moderate impact"
                        : rec.urgency === "48H"
                          ? "Moderate impact"
                          : "Moderate impact";

                  const isHighlighted = index === 0;

                  return (
                    <div
                      key={rec.id}
                      className={`rounded-xl p-4 flex items-center justify-between ${
                        isHighlighted ? "bg-emerald-50" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-base shrink-0">
                          {rec.id}
                        </span>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-900 font-semibold text-sm">
                            {rec.title}
                          </p>
                          <span className="text-gray-500 text-xs bg-gray-100 px-2 py-0.5 rounded-md">
                            {rec.category}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-sm font-bold whitespace-nowrap ${impactColor}`}
                      >
                        {impactLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="text-emerald-700 text-xs font-semibold hover:underline inline-flex items-center gap-1"
                >
                  View Full Plan <span aria-hidden>→</span>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <ConcentrationRisk
                risks={concentrationRisks}
                summary="Top 10 suppliers represent over half of total spend."
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
