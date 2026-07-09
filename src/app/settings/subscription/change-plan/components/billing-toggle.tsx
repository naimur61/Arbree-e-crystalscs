"use client";

import type { BillingCycle } from "./types";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/common/button/action-button";

export default function BillingToggle({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
      <ActionButton
        type="button"
        variant="ghost"
        btnSize="sm"
        buttonContent="Monthly"
        handleOpen={() => onChange("monthly")}
        btnStyle={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
          cycle === "monthly"
            ? "bg-primary text-primary shadow-sm"
            : "text-tertiary"
        }`}
      />
      <ActionButton
        type="button"
        variant="ghost"
        btnSize="sm"
        buttonContent="Yearly"
        lastIcon={
          <Badge className="bg-success-primary text-success-primary border-0 text-[10px] font-semibold">
            SAVE 20%
          </Badge>
        }
        handleOpen={() => onChange("yearly")}
        btnStyle={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
          cycle === "yearly"
            ? "bg-primary text-primary shadow-sm"
            : "text-tertiary"
        }`}
      />
    </div>
  );
}
