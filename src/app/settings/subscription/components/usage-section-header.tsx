"use client";

import { ExternalLinkIcon } from "./icons";
import { ActionButton } from "@/components/common/button/action-button";

export default function UsageSectionHeader({
  resetDate,
  daysRemaining,
  onViewDetails,
}: {
  resetDate: string;
  daysRemaining: number;
  onViewDetails?: () => void;
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="h6 text-primary">Usage this period</h2>
        <p className="caption-1 text-tertiary">
          Resets on {resetDate} &middot; {daysRemaining} days remaining
        </p>
      </div>
      <ActionButton
        type="button"
        variant="link"
        btnSize="sm"
        lastIcon={<ExternalLinkIcon />}
        buttonContent="View detailed usage"
        handleOpen={onViewDetails}
        btnStyle="text-success-primary hover:text-success-primary-hover no-underline"
      />
    </div>
  );
}
