"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ActionButton } from "@/components/common/button/action-button";
import ConfettiBackground from "./components/confetti-background";
import SuccessBadge from "./components/success-badge";
import SummaryCard from "./components/summary-card";
import { planName, billingEmail, summaryRows } from "./components/sample-data";

export default function PlanChangeConfirmedPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-emerald-50/60">
      <ConfettiBackground />

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center">
            <SuccessBadge />
          </div>

          <h1 className="mt-5 text-xl font-semibold text-gray-900">
            Plan change confirmed
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            You&apos;re now on the{" "}
            <span className="font-semibold text-gray-700">{planName}</span>{" "}
            plan. A receipt has been emailed to {billingEmail}.
          </p>

          <div className="mt-6">
            <SummaryCard rows={summaryRows} />
          </div>

          <ActionButton
            type="button"
            variant="default"
            size="default"
            buttonContent="Back to subscription"
            icon={<ArrowLeft className="size-4" />}
            handleOpen={() => router.push("/settings/subscription")}
            className="mt-6 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
          />
        </div>
      </div>
    </div>
  );
}
