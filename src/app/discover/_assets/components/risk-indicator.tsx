// risk-indicator.tsx
export type FlagColor = "green" | "red" | "yellow" | "blue" | "orange";

const flagColorMap: Record<FlagColor, string> = {
  green: "#22c55e",
  red: "#ef4444",
  yellow: "#eab308",
  blue: "#3b82f6",
  orange: "#f97316",
};

const EMPTY_SLOT_COLOR = "#e2e8f5";
const TOTAL_SLOTS = 3;

export function RiskIndicator({
  indicators,
}: {
  indicators: Array<{ color: FlagColor }>;
}) {
  const slots = Array.from(
    { length: TOTAL_SLOTS },
    (_, i) => indicators[i] ?? null,
  );

  return (
    <div className="flex items-center gap-1">
      {slots.map((flag, i) => (
        <span
          key={i}
          className="w-6 h-2.5"
          style={{
            backgroundColor: flag ? flagColorMap[flag.color] : EMPTY_SLOT_COLOR,
          }}
        />
      ))}
    </div>
  );
}
