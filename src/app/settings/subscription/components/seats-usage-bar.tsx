"use client";

import { UsersIcon } from "./icons";

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
        <span className="label-3 flex items-center gap-1.5 text-primary">
          <span className="icon-secondary">
            <UsersIcon />
          </span>
          Seats
        </span>
        <span className="caption-1 text-tertiary">
          {used} of {total} used
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-tertiary">
        <div
          className="h-full rounded-full bg-success-secondary"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="caption-1 mt-2 text-tertiary">
        {remaining} seats remaining &middot; contact your admin to invite
        teammates
      </p>
    </div>
  );
}
