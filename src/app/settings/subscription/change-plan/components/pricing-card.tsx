"use client";

import type { PricingPlan, BillingCycle } from "./types";
import { CheckCircleIcon } from "./icons";
import { ActionButton } from "@/components/common/button/action-button";

export default function PricingCard({
  plan,
  cycle,
}: {
  plan: PricingPlan;
  cycle: BillingCycle;
}) {
  const price =
    cycle === "yearly"
      ? Math.round(plan.monthlyPrice * 0.8)
      : plan.monthlyPrice;

  return (
    <div
      className={`group relative flex flex-col rounded-lg p-5 text-primary transition-all duration-300 hover:rounded-xl hover:bg-success-secondary-hover hover:text-white hover:shadow-[0_2px_20px_0_rgba(1,255,51,0.15)] hover:-translate-y-1 ${
        plan.isRecommended
          ? "bg-gradient-to-b from-emerald-200/20 to-green-600/20 ring-2 ring-success-primary"
          : "bg-gradient-to-b from-emerald-200/20 to-green-600/20"
      }`}
    >
      {plan.isRecommended && (
        <span className="absolute -top-3 left-5 rounded-full bg-primary px-3 py-1 caption-1 font-semibold uppercase tracking-wide text-success-secondary shadow transition-all group-hover:bg-white">
          Recommended
        </span>
      )}

      <h3 className="h6 text-primary group-hover:text-white">{plan.name}</h3>
      {plan.audience && (
        <p className="body-4 mt-0.5 text-primary/70 group-hover:text-white/70">
          {plan.audience}
        </p>
      )}

      <div className="mt-4">
        <span className="title-3 font-semibold text-primary group-hover:text-white">
          £{price.toLocaleString()}
        </span>
        <span className="body-3 text-primary/70 group-hover:text-white/70">
          {" "}
          per month
        </span>
      </div>
      <p className="caption-1 text-primary/60 group-hover:text-white/60">
        {plan.billingNote}
      </p>

      <p className="body-4 mt-3 text-primary/80 group-hover:text-white/80">
        {plan.description}
      </p>

      <ActionButton
        type="button"
        variant={plan.isSubscribed ? "secondary" : "ghost"}
        size="default"
        buttonContent={plan.ctaLabel}
        btnStyle={`mt-4 w-full rounded-xl py-2.5 text-sm font-medium transition ${
          plan.isSubscribed
            ? "bg-gradient-to-r from-emerald-300 to-emerald-500 text-emerald-950"
            : "bg-white/10 text-primary group-hover:text-white hover:bg-white/20"
        }`}
      />

      <ul className="mt-5 space-y-2.5 border-t border-gray-300 pt-4 transition-all group-hover:border-white/15">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 body-4 text-primary group-hover:text-white"
          >
            <span className="text-primary/60 group-hover:text-white/80">
              <CheckCircleIcon />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
