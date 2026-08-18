"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const price =
    cycle === "yearly"
      ? Math.round(plan.monthlyPrice * 0.8)
      : plan.monthlyPrice;

  return (
    <div
      className={`group relative flex flex-col rounded-lg p-3 text-primary transition-all duration-300 hover:rounded-xl hover:bg-success-secondary-hover hover:text-white hover:shadow-[0_2px_20px_0_rgba(1,255,51,0.15)] hover:-translate-y-1 ${
        plan.isRecommended
          ? "bg-success-secondary from-emerald-200/20 to-green-600/20 ring-2 ring-success-primary"
          : "bg-success-secondary from-emerald-200/20 to-green-600/20"
      }`}
    >
      <div className="rounded-2xl border border-white/20 p-5">
        {plan.isRecommended && (
          <span className="rounded-full px-3 py-1 caption-1 font-semibold uppercase tracking-wide text-white shadow transition-all">
            Recommended
          </span>
        )}

        <h3 className="h6 text-white group-hover:text-white">{plan.name}</h3>
        {plan.audience && (
          <p className="title-4 mt-0.5 text-white group-hover:text-white/70">
            {plan.audience}
          </p>
        )}

        <div className="mt-4 flex items-baseline gap-2">
          <span className="h-4 font-semibold text-white group-hover:text-white">
            £{price.toLocaleString()}
          </span>
          <span className="h-2 text-white group-hover:text-white/70">
            {" "}
            per month
          </span>
        </div>
        <p className="title-4 text-white mt-2 group-hover:text-white/60">
          {plan.billingNote}
        </p>

        <p className="title-4 mt-3 text-white group-hover:text-white/80">
          {plan.description}
        </p>

        <ActionButton
          type="button"
          variant={plan.isSubscribed ? "secondary" : "ghost"}
          size="default"
          buttonContent={plan.ctaLabel}
          handleOpen={() =>
            router.push(
              `/settings/subscription/change-plan/confirmation?plan=${plan.id}&cycle=${cycle}`,
            )
          }
          btnStyle={`mt-4 w-full rounded-xl py-2.5 text-sm font-medium transition ${
            plan.isSubscribed
              ? "bg-gradient-to-r from-emerald-300 to-emerald-500 text-emerald-950"
              : "bg-white/10 text-primary group-hover:text-white hover:bg-white/20"
          }`}
        />
      </div>

      <ul className="mt-5 space-y-2.5 border-gray-300 pt-4 transition-all group-hover:border-white/15">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 body-2 text-white group-hover:text-white"
          >
            <span className="text-white group-hover:text-white/80">
              <CheckCircleIcon />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
