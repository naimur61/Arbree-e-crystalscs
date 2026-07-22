"use client";

export function IntelligenceHighlights() {
  const highlights = [
    "Edmundson Electrical Ltd DocMerlo operates as a subsidiary of Herisha Holdings Investments Limited. Parental guarantees may be resolved.",
    "Coverity Scaffolding utilizes an external HSE Consultant (Bone Grimes) and has transitioned from 2 RIDDORs in 2024 to 1 in 30 days.",
  ];
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Intelligence highlights
        </div>
        <span className="text-[10px] text-slate-500">Updated 4 m ago</span>
      </div>
      <div className="space-y-3">
        {highlights.map((h, i) => (
          <p key={i} className="text-xs text-slate-700">
            {h}
          </p>
        ))}
        <AlertCard />
        <AlertCard />
      </div>
    </div>
  );
}

function AlertCard() {
  return (
    <div className="rounded-md border border-slate-100 bg-slate-50 p-2">
      <div className="text-[11px] font-medium text-slate-800">
        7 suppliers have ISO 27001 or SOC 2 expiring in 90 days
      </div>
      <div className="mt-1 text-[10px] text-slate-500">
        Compliance officers are automatically notified. Trigger evidence
        requests and reassessments before the audit window closes.
      </div>
      <button className="mt-1 text-[10px] font-medium text-emerald-600">
        Get notified →
      </button>
    </div>
  );
}
