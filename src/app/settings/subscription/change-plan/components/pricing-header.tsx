"use client";

import type { BillingCycle } from "./types";
import BillingToggle from "./billing-toggle";

export default function PricingHeader({
  cycle,
  onCycleChange,
}: {
  cycle: BillingCycle;
  onCycleChange: (c: BillingCycle) => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="title-2 sm:title-1 text-primary">Choose a Plan</h1>
        <p className="body-4 sm:body-3 text-secondary mt-1">
          Select the subscription model that fits your team
        </p>
      </div>
      <BillingToggle cycle={cycle} onChange={onCycleChange} />
    </div>
  );
}
