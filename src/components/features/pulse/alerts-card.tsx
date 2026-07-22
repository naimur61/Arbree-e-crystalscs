"use client";

const ALERTS = Array.from({ length: 5 }, (_, i) => ({
  critical: i === 0,
  title: "BluePeak Systems — ransomware confirmed",
  desc: "Encryption observed on production supplier processes. Incident acknowledged by vendor.",
  tags: ["CRITICAL", "Direct Impact"] as string[],
}));

export function AlertsCard() {
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Alerts <span className="text-slate-400">(Live)</span>
        </div>
        <div className="flex gap-1 text-[10px]">
          {["All", "Critical", "Downstream"].map((t, i) => (
            <span
              key={t}
              className={`rounded px-2 py-0.5 ${i === 0 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-2 text-[10px] text-slate-500">
        6 active · streaming from live feeds
      </div>
      <div className="space-y-2">
        {ALERTS.map((a, idx) => (
          <div
            key={idx}
            className="border-b border-slate-100 pb-2 last:border-0"
          >
            <div className="flex items-start gap-2">
              <span
                className={`mt-1 h-2 w-2 shrink-0 rounded-full ${a.critical ? "bg-rose-500" : "bg-amber-500"}`}
              />
              <div className="flex-1">
                <div className="text-xs font-medium text-slate-800">
                  {a.title}
                </div>
                <div className="text-[10px] text-slate-500">{a.desc}</div>
                <div className="mt-1 flex gap-1">
                  {a.tags.map((t) => (
                    <span
                      key={t}
                      className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${t === "CRITICAL" ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
