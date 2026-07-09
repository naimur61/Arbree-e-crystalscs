"use client";

import { useRouter } from "next/navigation";
import PageHeader from "./components/page-header";
import PlanTransitionCards from "./components/plan-transition-cards";
import WhatsChangingCard from "./components/whats-changing-card";
import PaymentMethodCard from "./components/payment-method-card";
import PriceSummaryCard from "./components/price-summary-card";
import {
  currentPlan,
  newPlan,
  changeItems,
  samplePaymentMethod,
  priceLineItems,
} from "./components/sample-data";

export default function ConfirmPlanChangePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-emerald-50/40 p-4 sm:p-6">
      <div className="mx-auto max-w-5xl space-y-5">
        <PageHeader />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
              <PlanTransitionCards current={currentPlan} next={newPlan} />
            </div>

            <WhatsChangingCard items={changeItems} />

            <PaymentMethodCard
              method={samplePaymentMethod}
              onChangeMethod={() => console.log("change payment method")}
            />
          </div>

          <PriceSummaryCard
            contractNote="Annual contract · 25 seats"
            lineItems={priceLineItems}
            subtotal="$121,350.00"
            estimatedTax="$10,315.00"
            dueToday="$131,665.00"
            renewsNote="Renews May 4, 2027 at $149,700.00"
            onConfirm={() =>
              router.push(
                "/settings/subscription/change-plan/confirmation/success",
              )
            }
            onCancel={() => console.log("cancel")}
            onBackToPlans={() =>
              router.push("/settings/subscription/change-plan")
            }
          />
        </div>
      </div>
    </div>
  );
}
