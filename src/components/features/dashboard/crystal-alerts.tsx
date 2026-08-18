import {
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  Info,
  Shield,
} from "lucide-react";
import { CardContainer } from "@/components/common/card";

const alerts = [
  {
    n: <BadgeDollarSign />,
    tag: "GENERAL",
    title: "All 6 Suppliers",
    meta: "Commercial status: 'In Progress · DO NOT USE'",
    sev: "High",
    tone: "rose",
  },
  {
    n: <Shield />,
    tag: "OPERATIONAL · 2024-2025",
    title: "Coventry Scaffolding",
    meta: "3 RIDDOR injuries reported: 1 in 2025, 2 in 2024",
    sev: "Critical",
    tone: "rose",
  },
  {
    n: <Info />,
    tag: "COMPLIANCE Pending",
    title: "Hoval Ltd",
    meta: "Professional Indemnity Insurance N/A · £0 cover",
    sev: "Medium",
    tone: "amber",
  },
];

export function CrystalAlerts() {
  return (
    <CardContainer
      icon={<AlertTriangle className="text-white" fill="#15803D" />}
      title="e-Crystal Alerts"
      subtitle="What changed, what matters"
    >
      <div className="space-y-3">
        {alerts.map((a, i) => (
          <div
            key={i}
            className="flex gap-3 items-start pb-2 border-b last:border-0"
          >
            <div className="flex items-center p-1 w-6 h-6 rounded-full dark:text-white light:bg-success-primary dark:bg-offer-secondary shrink-0 text-[11px] text-success-primary-hover">
              {a.n ?? "!"}
            </div>
            <div className="flex-1">
              <div className="font-medium tracking-wide uppercase text-[10px] text-slate-500">
                {a.tag}
              </div>
              <div className="text-sm font-semibold light:text-primary">
                {a.title}
              </div>
              <div className="text-[10px] text-slate-500">{a.meta}</div>
            </div>
            <span
              className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-medium ${
                a.tone === "rose"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {a.sev}
            </span>
          </div>
        ))}
      </div>
      <button className="flex gap-1 items-center mt-3 font-medium text-emerald-600 hover:text-emerald-700 text-[11px]">
        View all alerts <ArrowRight className="w-3 h-3" />
      </button>
    </CardContainer>
  );
}
