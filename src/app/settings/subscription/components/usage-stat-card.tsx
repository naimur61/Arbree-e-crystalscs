"use client";

import type { UsageStat } from "./types";
import { usageColorVariants } from "./types";
import { Card } from "@/components/ui/card";

export default function UsageStatCard({ stat }: { stat: UsageStat }) {
  const colors = usageColorVariants[stat.color];

  return (
    <Card className="rounded-2xl border-0 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.icon}`}
        >
          {stat.icon}
        </span>
        <span className={`label-2 font-semibold ${colors.badge}`}>
          {stat.percent}%
        </span>
      </div>
      <p className="caption-1 mt-3 text-secondary">{stat.label}</p>
      <p className="body-3 mt-0.5 font-semibold text-primary">
        {stat.used.toLocaleString()} / {stat.total.toLocaleString()} {stat.unit}
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-tertiary">
        <div
          className={`h-full rounded-full ${colors.bar}`}
          style={{ width: `${stat.percent}%` }}
        />
      </div>
    </Card>
  );
}
