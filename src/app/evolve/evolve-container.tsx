"use client";

import { FlowBanner } from "@/components/features/ui/flow-banner";
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
    <main className="min-h-screen">
      <div className="p-4 mx-auto">
        <FlowBanner currentPage="evolve" />

        <div className="">
          {/* <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4 items-center">
              <h2 className="text-sm font-bold text-primary">Executive Summary</h2>
              <p className="text-xs text-secondary">May 2024</p>
            </div>
          </div> */}

          <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-3">
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

          <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-[2fr_1fr]">
            <div className="p-4 bg-primary rounded-2xl border border-primary shadow-sm">
              <p className="mb-6 text-sm font-bold text-primary">
                Business Impact
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                  icon="£"
                  variant="operational"
                />
                <ImpactCard
                  title="Reputation Impact"
                  amount="10M"
                  subtitle="External sentiment risk rising"
                  icon="£"
                  variant="reputation"
                />
              </div>
            </div>
            <ExecutiveBrief />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
            <div className="p-4 bg-primary rounded-2xl border border-primary">
              <p className="mb-6 text-sm font-bold text-primary">
                e-Crystal Recommended Actions
              </p>
              <div className="space-y-3">
                {recommendations.map((rec, index) => {
                  const impactColorMap: Record<string, string> = {
                    Financial: "text-error-primary",
                    Sensitive: "text-warning-primary",
                    Mindful: "text-success-primary",
                    Physical: "text-info-primary",
                  };
                  const impactColor =
                    impactColorMap[rec.category] ?? "text-success-primary";
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
                        isHighlighted
                          ? "bg-success-primary border border-success-primary"
                          : "bg-transparent border border-secondary"
                      }`}
                    >
                      <div className="flex gap-4 items-center">
                        <span className="flex justify-center items-center w-9 h-9 text-base font-bold text-white bg-success-secondary rounded-full shrink-0">
                          {rec.id}
                        </span>
                        <div className="flex gap-2 items-center">
                          <p className="text-sm font-semibold text-primary">
                            {rec.title}
                          </p>
                          <span className="py-0.5 px-2 text-xs text-secondary bg-quartiary rounded-md">
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
                  className="inline-flex gap-1 items-center text-xs font-semibold text-success-primary hover:underline"
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
