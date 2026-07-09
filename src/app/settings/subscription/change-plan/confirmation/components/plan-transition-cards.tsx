import { ArrowRight, Shield, Zap } from "lucide-react";
import type { PlanCardData } from "./types";
import PlanCard from "./plan-card";

export default function PlanTransitionCards({
  current,
  next,
}: {
  current: PlanCardData;
  next: PlanCardData;
}) {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <PlanCard icon={<Shield className="size-5" />} plan={current} />
      <span className="hidden shrink-0 items-center justify-center sm:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <ArrowRight className="size-4" />
        </span>
      </span>
      <PlanCard icon={<Zap className="size-5" />} plan={next} highlighted />
    </div>
  );
}
