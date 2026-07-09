"use client";

import type { PlanInfo } from "./types";
import { ShieldIcon, CalendarIcon, CreditCardIcon } from "./icons";
import SeatsUsageBar from "./seats-usage-bar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PlanOverviewCard({ plan }: { plan: PlanInfo }) {
  return (
    <Card className="rounded-2xl border-0 p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-sm font-semibold text-white">
            <ShieldIcon />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-type-h6-size">
                {plan.name}
              </span>

              {plan.isActive && (
                <Badge className="bg-success-primary text-success-primary border-0 caption-1 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-success-secondary" />
                  Active now
                </Badge>
              )}
              {plan.isCurrentPlan && (
                <Badge className="bg-info-primary text-info-primary border-info-secondary caption-1 font-semibold">
                  CURRENT PLAN
                </Badge>
              )}
            </div>
            <p className="body-4 sm:body-3 mt-0.5 text-secondary">
              {plan.description}
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="title-3 sm:title-2 text-primary">{plan.priceLabel}</p>
          <p className="caption-1 text-tertiary">{plan.priceSubLabel}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-tertiary pt-4 sm:grid-cols-4">
        <div>
          <p className="label-3 flex items-center gap-1.5 text-tertiary">
            <CalendarIcon />
            Billing cycle
          </p>
          <p className="body-3 mt-1 font-medium text-primary">
            {plan.billingCycle}
          </p>
        </div>
        <div>
          <p className="caption-1 text-tertiary">Renews on</p>
          <p className="body-3 mt-1 font-medium text-primary">
            {plan.renewsOn}
          </p>
          <p className="caption-1 text-tertiary">in {plan.renewsInDays} days</p>
        </div>
        <div>
          <p className="caption-1 text-tertiary">Next charge</p>
          <p className="body-3 mt-1 font-medium text-primary">
            {plan.nextChargeAmount}
          </p>
          <p className="caption-1 text-tertiary">{plan.nextChargeNote}</p>
        </div>
        <div>
          <p className="label-3 flex items-center gap-1.5 text-tertiary">
            <CreditCardIcon />
            Payment method
          </p>
          <p className="body-3 mt-1 font-medium text-primary">
            {plan.paymentMethod}
          </p>
          <p className="caption-1 text-tertiary">
            Expires {plan.paymentExpiry}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <SeatsUsageBar used={plan.seatsUsed} total={plan.seatsTotal} />
      </div>
    </Card>
  );
}
