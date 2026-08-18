"use client";

import { ExternalLinkIcon } from "./icons";
import { ActionButton } from "@/components/common/button/action-button";
import { Typography } from "@/components/common/typography/typography";

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
      <div className="flex flex-col gap-1">
        <Typography variant="label-1">Usage this period</Typography>
        <Typography variant="label-3" className="text-tertiary">
          Resets on {resetDate} &middot; {daysRemaining} days remaining
        </Typography>
      </div>
      <ActionButton
        type="button"
        variant="link"
        size="sm"
        lastIcon={<ExternalLinkIcon />}
        buttonContent="View detailed usage"
        handleOpen={onViewDetails}
        btnStyle="text-success-primary hover:text-success-primary-hover no-underline"
      />
    </div>
  );
}
