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
    border: "border-success-primary",
    badgeBg: "bg-success-primary",
    text: "text-success-primary",
    value: "text-success-primary",
    progress: "bg-success-secondary",
  },
  blue: {
    border: "border-info-primary",
    badgeBg: "bg-info-primary",
    text: "text-info-primary",
    value: "text-info-primary",
    progress: "bg-info-secondary",
  },
  orange: {
    border: "border-warning-primary",
    badgeBg: "bg-warning-primary",
    text: "text-warning-primary",
    value: "text-warning-primary",
    progress: "bg-warning-secondary",
  },
  red: {
    border: "border-error-primary",
    badgeBg: "bg-error-primary",
    text: "text-error-primary",
    value: "text-error-primary",
    progress: "bg-error-secondary",
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
    <div className={`rounded-[8px] border ${colors.border} bg-primary p-4`}>
      {/* Header row: label + trend badge */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-primary font-bold">{label}</p>
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
        {target && <span className="text-secondary text-xs">{target}</span>}
        {subtitle && (
          <span className="text-secondary text-[10px]">{subtitle}</span>
        )}
      </div>

      {/* Progress row: colored label + percentage */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-semibold ${colors.text}`}>
          {progressLabel}
        </span>
        <span className="text-sm text-secondary">{progressValue}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-primary rounded-full overflow-hidden">
        <div
          className={`h-full ${colors.progress} rounded-full`}
          style={{ width: `${progressValue}%` }}
        />
      </div>
    </div>
  );
}
