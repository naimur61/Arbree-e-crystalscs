import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  target?: string;
  subtitle?: string;
  progressLabel: string;
  progressValue: number; // e.g. 97
  accentColor?: "green" | "blue" | "orange" | "red";
}

const COLOR_MAP = {
  green: {
    border: "border-emerald-200",
    badgeBg: "bg-emerald-100",
    text: "text-emerald-600",
    value: "text-emerald-600",
    progress: "bg-emerald-500",
  },
  blue: {
    border: "border-blue-200",
    badgeBg: "bg-blue-100",
    text: "text-blue-600",
    value: "text-blue-600",
    progress: "bg-blue-500",
  },
  orange: {
    border: "border-orange-200",
    badgeBg: "bg-orange-100",
    text: "text-orange-600",
    value: "text-orange-600",
    progress: "bg-orange-500",
  },
  red: {
    border: "border-red-200",
    badgeBg: "bg-red-100",
    text: "text-red-600",
    value: "text-red-600",
    progress: "bg-red-500",
  },
} as const;

export function MetricCard({
  label,
  value,
  change,
  trend,
  target,
  subtitle,
  progressLabel,
  progressValue,
  accentColor = "green",
}: MetricCardProps) {
  const isPositive = trend === "up";
  const colors = COLOR_MAP[accentColor];

  return (
    <div className={`rounded-[8px] border ${colors.border} bg-white p-4`}>
      {/* Header row: label + trend badge */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-900 font-bold">{label}</p>
        <div
          className={`flex items-center gap-1 ${colors.badgeBg} ${colors.text} rounded-full px-2.5 py-1 text-sm font-semibold`}
        >
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      {/* Value row: big number + target/subtitle */}
      <div className="flex items-baseline justify-between mb-1">
        <span className={`text-xl font-bold ${colors.value}`}>{value}</span>
        {target && <span className="text-gray-500 text-xs">{target}</span>}
        {subtitle && (
          <span className="text-gray-500 text-[10px]">{subtitle}</span>
        )}
      </div>

      {/* Progress row: colored label + percentage */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-semibold ${colors.text}`}>
          {progressLabel}
        </span>
        <span className="text-sm text-gray-500">{progressValue}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors.progress} rounded-full`}
          style={{ width: `${progressValue}%` }}
        />
      </div>
    </div>
  );
}
