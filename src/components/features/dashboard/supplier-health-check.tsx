import { ShieldCheck } from "lucide-react";
import { CardContainer } from "@/components/common/card";
import { themeConfig } from "@/lib/theme/theme.config";

export function SupplierHealthCheck() {
  const grid = [
    ["e", "a", "r", "r"],
    ["e", "a", "a", "r"],
    ["e", "e", "a", "a"],
  ];
  const bgColor = (c: string) =>
    c === "e"
      ? themeConfig.colors.bg.successPrimaryHover
      : c === "a"
        ? themeConfig.colors.bg.warningPrimaryHover
        : themeConfig.colors.bg.errorPrimaryHover;
  const dotColor = (c: string) =>
    c === "e"
      ? themeConfig.colors.text.successPrimary
      : c === "a"
        ? themeConfig.colors.text.warningPrimary
        : themeConfig.colors.text.errorPrimary;
  const rowLabels = ["High", "Medium", "Low"];
  const colLabels = ["Low", "Medium", "High", "Critical"];
  return (
    <CardContainer
      icon={
        <ShieldCheck
          className={`w-4 h-4 ${themeConfig.colors.icon.successPrimary}`}
        />
      }
      title="Supplier Health Check"
      subtitle="Suppliers by risk and criticality"
    >
      <div className="flex gap-2">
        <div
          className={`flex flex-col justify-around py-1 font-medium text-[10px] ${themeConfig.colors.text.secondary}`}
        >
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
                  className={`aspect-square rounded ${bgColor(c)} flex items-center justify-center text-xs font-semibold ${dotColor(c)}`}
                >
                  {(ri + ci) % 2 === 0 ? "●" : ""}
                </div>
              )),
            )}
          </div>
          <div
            className={`grid grid-cols-4 gap-1 mt-1 text-center text-[10px] ${themeConfig.colors.text.secondary}`}
          >
            {colLabels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`flex justify-between mt-2 font-medium text-[10px] ${themeConfig.colors.text.secondary}`}
      >
        <span>Criticality</span>
        <span>Risk</span>
      </div>
    </CardContainer>
  );
}
