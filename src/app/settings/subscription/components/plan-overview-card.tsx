"use client";

import type { PlanInfo } from "./types";
import { ShieldIcon, CreditCardIcon } from "./icons";
import SeatsUsageBar from "./seats-usage-bar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/common/typography/typography";
import { Calendar } from "lucide-react";

export default function PlanOverviewCard({ plan }: { plan: PlanInfo }) {
  return (
    <Card className="rounded-2xl border-0 p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-sm font-semibold text-white">
            <ShieldIcon />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Typography
                variant="h5"
                weight="bold"
                color="successSecondaryHover"
              >
                {plan.name}
              </Typography>

              {plan.isActive && (
                <Badge className="bg-success-primary px-3 py-1 border-0 caption-1 font-semibold flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-success-secondary" />
                  <Typography
                    variant="label-1"
                    weight="bold"
                    color="successSecondaryHover"
                  >
                    Active Now
                  </Typography>
                </Badge>
              )}
              {plan.isCurrentPlan && (
                <Badge className="bg-info-primary px-3 py-1  text-info-primary border-info-secondary caption-1 font-semibold">
                  <Typography
                    variant="label-1"
                    weight="bold"
                    color="infoPrimary"
                  >
                    CURRENT PLAN
                  </Typography>
                </Badge>
              )}
            </div>
            <Typography variant="label-1" weight="bold">
              {plan.description}
            </Typography>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <Typography variant="h3" weight="bold">
            {plan.priceLabel}
          </Typography>
          <Typography variant="label-1" weight="bold">
            {plan.priceSubLabel}
          </Typography>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-tertiary pt-4 sm:grid-cols-4">
        <div className="flex items-center gap-2">
          <Calendar />

          <div className="flex flex-col">
            <Typography variant="label-1" color="tertiary">
              Billing cycle
            </Typography>

            <Typography variant="label-1" weight="extrabold">
              {plan.billingCycle}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col">
          <Typography variant="label-1" color="tertiary">
            Renews On
          </Typography>
          <Typography variant="label-1" weight="extrabold">
            {plan.renewsOn}
          </Typography>
          <Typography variant="label-3">in {plan.renewsInDays} days</Typography>
        </div>
        <div className="flex flex-col">
          <Typography variant="label-1" color="tertiary">
            Next Charge
          </Typography>
          <Typography variant="label-1" weight="extrabold">
            {plan.nextChargeAmount}
          </Typography>
          <Typography variant="label-3">{plan.nextChargeNote}</Typography>
        </div>
        <div>
          <Typography
            variant="label-1"
            color="tertiary"
            className="flex items-center gap-1"
          >
            <CreditCardIcon />
            Payment method
          </Typography>
          <Typography
            variant="body-3"
            className="mt-1 font-medium text-primary"
          >
            {plan.paymentMethod}
          </Typography>
          <Typography variant="label-3">
            Expires {plan.paymentExpiry}
          </Typography>
        </div>
      </div>

      <div className="mt-4">
        <SeatsUsageBar used={plan.seatsUsed} total={plan.seatsTotal} />
      </div>
    </Card>
  );
}
