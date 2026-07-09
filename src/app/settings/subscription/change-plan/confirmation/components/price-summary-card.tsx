import { ArrowRight, Calendar, Info, X } from "lucide-react";
import { ActionButton } from "@/components/common/button/action-button";
import type { PriceLineItem } from "./types";

export default function PriceSummaryCard({
  contractNote,
  lineItems,
  subtotal,
  estimatedTax,
  dueToday,
  renewsNote,
  onConfirm,
  onCancel,
  onBackToPlans,
}: {
  contractNote: string;
  lineItems: PriceLineItem[];
  subtotal: string;
  estimatedTax: string;
  dueToday: string;
  renewsNote: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onBackToPlans?: () => void;
}) {
  return (
    <div className="space-y-3">
      {/* Price detail card */}
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-sm font-semibold text-gray-900">Price summary</h2>
        <p className="text-xs text-gray-500">{contractNote}</p>

        <div className="mt-4 space-y-2.5 text-sm">
          {lineItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-gray-500">{item.label}</span>
              <span
                className={item.isCredit ? "text-emerald-600" : "text-gray-800"}
              >
                {item.amount}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-2 border-t border-gray-100 pt-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-800">{subtotal}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Estimated tax (8.5%)</span>
            <span className="text-gray-800">{estimatedTax}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-sm font-semibold text-gray-900">Due today</span>
          <span className="text-lg font-semibold text-gray-900">
            {dueToday}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-gray-400">
          <Calendar className="size-3" />
          {renewsNote}
        </p>
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2 rounded-xl bg-emerald-50 px-3 py-3 text-[11px] text-emerald-700">
        <Info className="mt-0.5 size-3 shrink-0" />
        <div className="space-y-1">
          <p>You can revert within 30 days for a full pro-rated refund.</p>
          <p>
            End-to-end encrypted. Tax calculated based on billing address (San
            Francisco, CA).
          </p>
        </div>
      </div>

      {/* Confirm button */}
      <ActionButton
        type="button"
        variant="default"
        size="default"
        buttonContent="Confirm change"
        icon={<ArrowRight className="size-4" />}
        handleOpen={onConfirm}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
      />

      {/* Cancel button */}
      <ActionButton
        type="button"
        variant="outline"
        size="default"
        buttonContent="Cancel"
        icon={<X className="size-4" />}
        handleOpen={onCancel}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      />

      {/* Back link */}
      <button
        type="button"
        onClick={onBackToPlans}
        className="flex w-full cursor-pointer items-center justify-center gap-1.5 py-1 text-xs font-medium text-gray-500 hover:text-gray-700"
      >
        <ArrowRight className="size-3 rotate-180" />
        Back to plans
      </button>
    </div>
  );
}
