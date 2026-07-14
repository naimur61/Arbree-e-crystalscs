"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { ActionButton } from "@/components/common/button/action-button";
import { Typography } from "@/components/common/typography/typography";

export default function SubscriptionHeader({
  onChangePlan,
}: {
  onChangePlan?: () => void;
}) {
  const router = useRouter();

  const handleChangePlan =
    onChangePlan ?? (() => router.push("/settings/subscription/change-plan"));

  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <Typography variant="h5" weight="bold" color="successSecondaryHover">
          Subscription
        </Typography>
        <Typography variant="label-2" weight="semibold">
          Manage your plan, billing cycle, and usage
        </Typography>
      </div>
      <ActionButton
        type="button"
        variant="default"
        size="lg"
        icon={<Sparkles />}
        buttonContent="Change plan"
        handleOpen={handleChangePlan}
        btnStyle="shrink-0 border-0 text-type-label-1-size"
      />
    </div>
  );
}
