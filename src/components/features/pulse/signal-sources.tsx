"use client";

const SIGNAL_CHIPS = [
  "Dark web forums",
  "CVE feeds",
  "CISA KEV",
  "Cloud status pages",
  "Threat intel (MISP)",
  "News & OSINT",
  "Regulator soft reports",
  "Post lists locally",
  "Malware analysis reports",
  "Vulnerability databases",
  "Security blogs",
  "Incident response summaries",
  "Bug bounty disclosures",
  "Phishing threat alerts",
  "Security audit findings",
  "Red team assessments",
] as const;

export function SignalSources() {
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Signal sources
        </div>
        <span className="text-[10px] text-slate-500">
          16 feeds · realtime license
        </span>
      </div>
      <div className="mb-3 text-[10px] text-slate-500">
        Every alert traces back to one of these live, curated intelligence
        sources.
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SIGNAL_CHIPS.map((c) => (
          <span
            key={c}
            className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-700 hover:bg-slate-50"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
