import { ShieldCheck } from "lucide-react";
import { CardContainer } from "@/components/common/card";

export function SupplierHealthCheck() {
  const grid = [
    ["e", "a", "r", "r"],
    ["e", "a", "a", "r"],
    ["e", "e", "a", "a"],
  ];
  const color = (c: string) =>
    c === "e" ? "bg-emerald-400" : c === "a" ? "bg-amber-400" : "bg-rose-500";
  const rowLabels = ["High", "Medium", "Low"];
  const colLabels = ["Low", "Medium", "High", "Critical"];
  return (
    <CardContainer
      icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
      title="Supplier Health Check"
      subtitle="Suppliers by risk and criticality"
    >
      <div className="flex gap-2">
        <div className="flex flex-col justify-around py-1 font-medium text-[10px] text-slate-500">
          {rowLabels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-1">
            {grid.flatMap((row, ri) =>
              row.map((c, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  className={`aspect-square rounded ${color(c)} flex items-center justify-center text-white`}
                >
                  {(ri + ci) % 2 === 0 ? "●" : ""}
                </div>
              )),
            )}
          </div>
          <div className="grid grid-cols-4 gap-1 mt-1 text-center text-[10px] text-slate-500">
            {colLabels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-2 font-medium text-[10px] text-slate-600">
        <span>Criticality</span>
        <span>Risk</span>
      </div>
    </CardContainer>
  );
}
