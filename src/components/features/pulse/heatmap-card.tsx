"use client";

const HEATMAP_GRID = [
  ["e", "e", "a", "r"],
  ["e", "a", "a", "r"],
  ["a", "a", "r", "r"],
  ["r", "r", "r", "r"],
] as const;

const heatmapColor = (c: string) =>
  c === "e" ? "bg-emerald-400" : c === "a" ? "bg-amber-400" : "bg-rose-500";

const LEVELS = ["Low", "Medium", "High", "Critical"];

export function HeatmapCard() {
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="mb-1 text-sm font-semibold text-slate-900">
        Cyber risk heatmap
      </div>
      <div className="mb-3 text-[10px] text-slate-500">
        Likelihood × severity
      </div>
      <div className="mb-2 text-[11px] font-medium text-slate-600">
        6 suppliers in hotspot
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col justify-between py-1 text-[10px] text-slate-500">
          <span>High</span>
          <span>Med</span>
          <span>Low</span>
          <span className="pt-1 font-medium text-slate-600">Likelihood</span>
        </div>
        <div className="flex-1">
          <div className="mb-1 grid grid-cols-4 gap-1 text-center text-[10px] text-slate-500">
            {LEVELS.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-1">
            {HEATMAP_GRID.flatMap((row, ri) =>
              row.map((c, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  className={`flex aspect-square items-center justify-center rounded ${heatmapColor(c)} text-white`}
                >
                  {(ri + ci) % 3 === 0 ? "●" : ""}
                </div>
              )),
            )}
          </div>
          <div className="mt-1 text-center text-[10px] font-medium text-slate-600">
            Severity
          </div>
        </div>
      </div>
    </div>
  );
}
