import { Check } from "lucide-react";

export default function SuccessBadge() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-200 text-emerald-700">
        <Check className="size-5" strokeWidth={2.5} />
      </span>
    </span>
  );
}
