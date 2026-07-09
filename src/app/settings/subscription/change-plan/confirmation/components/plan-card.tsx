import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { PlanCardData } from "./types";

export default function PlanCard({
  icon,
  plan,
  highlighted,
}: {
  icon: ReactNode;
  plan: PlanCardData;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`flex-1 rounded-xl border p-4 ${
        highlighted
          ? "border-emerald-300 bg-emerald-50/60"
          : "border-gray-100 bg-white"
      }`}
    >
      {/* Header row: label + badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {plan.badge === "Active" ? "Current" : "New Plan"}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            plan.badgeTone === "selected"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {plan.badge}
        </span>
      </div>

      {/* Plan identity */}
      <div className="mt-2 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          {icon}
        </span>
        <span className="font-semibold text-gray-900">{plan.name}</span>
      </div>
      <p className="mt-0.5 text-xs text-gray-400">{plan.billingNote}</p>

      {/* Price */}
      <div className="mt-3">
        <span className="text-xl font-semibold text-gray-900">
          {plan.priceLabel}
        </span>
        <span className="text-xs text-gray-400"> {plan.priceUnit}</span>
      </div>

      {/* Feature list */}
      <ul className="mt-3 space-y-1.5">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-1.5 text-xs text-gray-600"
          >
            <Check className="size-3 shrink-0 text-emerald-500" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
