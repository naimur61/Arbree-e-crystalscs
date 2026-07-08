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
  "High impact": "text-red-600",
  "Moderate impact": "text-orange-600",
  "Low impact": "text-emerald-600",
};

export function StrategicRisks({ risks }: StrategicRisksProps) {
  return (
    <div className="bg-white rounded-[8px] border border-gray-200 p-6 h-full">
      <p className="text-sm font-bold text-emerald-700 mb-5">
        Top Strategic Risks
      </p>

      <div className="space-y-4">
        {risks.map((risk, idx) => {
          const isTop = idx === 0;

          return (
            <div
              key={risk.id}
              className={`rounded-xl bg-emerald-50 p-5 flex items-center justify-between ${
                isTop
                  ? "border-2 border-emerald-500"
                  : "border-2 border-transparent"
              }`}
            >
              <div className="flex items-center gap-4 text-xs">
                <span className="text-gray-900 font-bold">{risk.id}</span>
                <span className="text-gray-900 font-semibold">
                  {risk.title}
                </span>
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
