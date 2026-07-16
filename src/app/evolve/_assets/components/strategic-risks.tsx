"use client";

interface Risk {
  id: number;
  title: string;
  impact: "High impact" | "Moderate impact" | "Low impact";
}

interface StrategicRisksProps {
  risks: Risk[];
}

const impactColors = {
  "High impact": "text-error-primary",
  "Moderate impact": "text-warning-primary",
  "Low impact": "text-success-primary",
};

export function StrategicRisks({ risks }: StrategicRisksProps) {
  return (
    <div className="bg-primary rounded-[8px] border border-primary p-6 h-full">
      <p className="text-sm font-bold text-success-primary mb-5">
        Top Strategic Risks
      </p>

      <div className="space-y-4">
        {risks.map((risk, idx) => {
          const isTop = idx === 0;

          return (
            <div
              key={risk.id}
              className={`rounded-xl bg-success-primary p-5 flex items-center justify-between ${
                isTop
                  ? "border-2 border-success-primary"
                  : "border-2 border-success-secondary"
              }`}
            >
              <div className="flex items-center gap-4 text-xs">
                <span className="text-primary font-bold">{risk.id}</span>
                <span className="text-primary font-semibold">{risk.title}</span>
              </div>
              <span
                className={`text-xs font-bold ${impactColors[risk.impact]}`}
              >
                {risk.impact}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
