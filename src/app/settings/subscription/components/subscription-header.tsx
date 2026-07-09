"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { ActionButton } from "@/components/common/button/action-button";

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
        <h3 className="type-h6-size sm:title-1">Subscription</h3>
        <p className="type-body-4-size sm:body-3 text-secondary mt-1">
          Manage your plan, billing cycle, and usage
        </p>
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
