"use client";

import { UsersIcon } from "./icons";
import { Typography } from "@/components/common/Typography/typography";

export default function SeatsUsageBar({
  used,
  total,
}: {
  used: number;
  total: number;
}) {
  const percent = Math.min((used / total) * 100, 100);
  const remaining = total - used;

  return (
    <div className="rounded-xl bg-secondary px-4 py-3">
      <div className="flex items-center justify-between">
        <Typography
          variant="label-1"
          className="mt-1 font-medium text-primary flex gap-2"
        >
          <span className="label-1">
            <UsersIcon />
          </span>
          Seats
        </Typography>
        <Typography variant="label-3">
          {used} of {total} used
        </Typography>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-tertiary">
        <div
          className="h-full rounded-full bg-success-secondary"
          style={{ width: `${percent}%` }}
        />
      </div>
      <Typography variant="label-3">
        {remaining} seats remaining &middot; contact your admin to invite
        teammates
      </Typography>
    </div>
  );
}
