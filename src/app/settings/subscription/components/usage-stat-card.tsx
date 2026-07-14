"use client";

import type { UsageStat } from "./types";
import { usageColorVariants } from "./types";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/common/typography/typography";

export default function UsageStatCard({ stat }: { stat: UsageStat }) {
  const colors = usageColorVariants[stat.color];

  return (
    <Card className="rounded-2xl border-0 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.bg}`}
        >
          {stat.icon}
        </span>
        <span className={`label-2 font-semibold ${colors.badge}`}>
          {stat.percent}%
        </span>
      </div>
      <Typography variant="label-1">{stat.label}</Typography>
      <div>
        <Typography variant="label-1">{stat.used.toLocaleString()}</Typography>{" "}
        / {stat.total.toLocaleString()} {stat.unit}
      </div>
      {/* </p> */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-tertiary">
        <div
          className={`h-full rounded-full ${colors.bar}`}
          style={{ width: `${stat.percent}%` }}
        />
      </div>
    </Card>
  );
}
