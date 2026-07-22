"use client";

const BLAST_CHIPS = [
  ["AWS us-east-1", "Bluehost Systems", "Your payments API"],
  ["Cloudflare", "Coreos Logistics"],
  ["Google Cloud", "Interlink Bank Ltd", "Internal warning"],
] as const;

const BLAST_BARS = [
  { l: "Financials", v: 78, h: "3 high" },
  { l: "Cyber", v: 62, h: "2 high" },
  { l: "Operational", v: 48, h: "1 high" },
  { l: "ESG", v: 30, h: "1 med" },
] as const;

export function BlastRadiusCard() {
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Downstream blast radius
        </div>
        <span className="rounded bg-rose-100 px-2 py-0.5 text-[10px] font-medium text-rose-700">
          3 INCIDENT ROW
        </span>
      </div>
      <div className="mb-2 text-[10px] text-slate-500">
        How a single incident propagates across your supply chain
      </div>
      <div className="space-y-2">
        {BLAST_CHIPS.map((row, i) => (
          <div key={i}>
            <div className="flex flex-wrap gap-1">
              {row.map((c, j) => (
                <span
                  key={j}
                  className={`rounded-full border px-2 py-0.5 text-[10px] ${j === 0 ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700"}`}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-1 text-[10px] text-slate-500">
              Direct impact → higher disruption
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 border-t border-slate-100 pt-2">
        <div className="mb-1 text-xs font-medium text-slate-700">
          Shared cloud / infrastructure dependency
        </div>
        {BLAST_BARS.map((b) => (
          <div key={b.l} className="mb-1 flex items-center gap-2">
            <div className="w-20 text-[10px] text-slate-600">{b.l}</div>
            <div className="h-2 flex-1 rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${b.v > 60 ? "bg-rose-500" : b.v > 40 ? "bg-amber-500" : "bg-emerald-500"}`}
                style={{ width: `${b.v}%` }}
              />
            </div>
            <div className="w-12 text-right text-[10px] text-slate-500">
              {b.h}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-md bg-slate-50 p-2 text-[10px] text-slate-600">
        <span className="font-semibold text-slate-800">Correlated risk:</span>{" "}
        when many suppliers depend on the same cloud or one upstream outage,
        isolate them from the customer chain. Pulse tracks these dependencies to
        trigger advisory decisions when incidents materialize downstream.
      </div>
    </div>
  );
}
