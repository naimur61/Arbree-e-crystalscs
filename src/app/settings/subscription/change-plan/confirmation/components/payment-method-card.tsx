import type { PaymentMethodInfo } from "./types";

export default function PaymentMethodCard({
  method,
  onChangeMethod,
}: {
  method: PaymentMethodInfo;
  onChangeMethod?: () => void;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Payment method</h2>
        <button
          type="button"
          onClick={onChangeMethod}
          className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
        >
          Change payment method
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        {/* Card brand placeholder */}
        <span className="flex h-8 w-11 shrink-0 items-center justify-center rounded-md bg-blue-600 text-[10px] font-bold italic text-white">
          VISA
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">
            {method.brand} ending in {method.last4}
          </p>
          <p className="text-xs text-gray-400">
            Expires {method.expiry} · {method.billingEmail}
          </p>
        </div>
        {method.isDefault && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
            DEFAULT
          </span>
        )}
      </div>

      <p className="mt-3 border-t border-gray-100 pt-3 text-[11px] text-gray-400">
        Charges are processed via PCI-compliant gateway. Card details are never
        stored on e-Crystal servers.
      </p>
    </div>
  );
}
