import { Typography } from "@/components/common/typography/typography";
import type { SecurityCardData, SecurityCardTone } from "../types";
import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const toneStyles: Record<SecurityCardTone, string> = {
  good: "bg-emerald-50 border-emerald-200 text-emerald-700",
  warning: "bg-amber-50 border-amber-200 text-amber-700",
  neutral: "border-gray-200",
};

function StatusCard({ card }: { card: SecurityCardData }) {
  return (
    <Card
      className={`flex-row items-center gap-2 rounded-xl p-6 ${
        card.borderColor ?? "border-gray-200"
      } ${toneStyles[card.tone]}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-green-50">
        {card.icon}
      </div>

      <div className="flex flex-col items-start justify-center gap-1">
        <Typography variant="body-3" weight="bold">
          {card.label}
        </Typography>

        <Typography variant="body-3" weight="semibold">
          {card.value}
        </Typography>
      </div>
    </Card>
  );
}

interface SecurityStatusProps {
  cards: SecurityCardData[];
  standingLabel?: string;
}

export default function SecurityStatus({
  cards,
  standingLabel = "Good standing",
}: SecurityStatusProps) {
  return (
    <Card className="rounded-2xl p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Typography variant="h6" weight="bold">
            Security Status
          </Typography>
          <Typography variant="body-2" color="secondary">
            Current state of your account security
          </Typography>
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
          <ShieldCheck />
          {standingLabel}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((card) => (
          <StatusCard key={card.id} card={card} />
        ))}
      </div>
    </Card>
  );
}
