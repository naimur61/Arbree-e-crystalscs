"use client";

import { AlertTriangleIcon } from "./icons";

export default function LastChangeBanner({
  daysSinceChange,
  rotationDays,
}: {
  daysSinceChange: number;
  rotationDays: number;
}) {
  const daysLeft = Math.max(rotationDays - daysSinceChange, 0);

  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
      <span className="mt-0.5 shrink-0 text-amber-500">
        <AlertTriangleIcon />
      </span>
      <div>
        <p className="text-sm font-medium text-amber-800">
          Last password change: {daysSinceChange} days ago
        </p>
        <p className="mt-0.5 text-xs text-amber-700">
          Your organization rotates passwords every {rotationDays} days. You
          have {daysLeft} days before rotation is required.
        </p>
      </div>
    </div>
  );
}
