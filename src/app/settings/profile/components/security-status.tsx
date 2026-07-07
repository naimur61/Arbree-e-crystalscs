import type { SecurityCardData, SecurityCardTone } from "../types";

const toneStyles: Record<SecurityCardTone, string> = {
  good: "bg-emerald-50 border-emerald-200 text-emerald-700",
  warning: "bg-amber-50 border-amber-200 text-amber-700",
  neutral: "bg-gray-50 border-gray-200 text-gray-700",
};

function StatusCard({ card }: { card: SecurityCardData }) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-xl border p-4 ${toneStyles[card.tone]}`}
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        {card.icon}
        {card.label}
      </div>
      <p className="text-sm font-semibold">{card.value}</p>
    </div>
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
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">Security Status</h2>
          <p className="text-sm text-gray-500">
            Current state of your account security
          </p>
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {standingLabel}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((card) => (
          <StatusCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
