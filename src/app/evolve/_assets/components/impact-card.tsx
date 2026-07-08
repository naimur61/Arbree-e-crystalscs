"use client";

interface ImpactCardProps {
  title: string;
  amount: string;
  subtitle: string;
  icon?: React.ReactNode;
  variant?: "financial" | "operational" | "reputation";
}

// A fixed jagged point-sequence (0-100 x, 0-100 y, y=100 is baseline) that
// reads as a rough "sparkline" — reused per card via a unique gradient id.
const SPARK_POINTS = [
  0, 55, 8, 60, 16, 38, 24, 48, 32, 62, 40, 70, 48, 46, 56, 40, 64, 55, 72, 30,
  80, 20, 88, 42, 96, 15, 100, 25,
];

function buildPath() {
  let d = `M ${SPARK_POINTS[0]} ${100 - SPARK_POINTS[1]}`;
  for (let i = 2; i < SPARK_POINTS.length; i += 2) {
    d += ` L ${SPARK_POINTS[i]} ${100 - SPARK_POINTS[i + 1]}`;
  }
  return d;
}

function Sparkline({ gradientId }: { gradientId: string }) {
  const linePath = buildPath();
  const areaPath = `${linePath} L 100 100 L 0 100 Z`;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full h-16"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8860b" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fdf6e3" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path
        d={linePath}
        fill="none"
        stroke="#a16207"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const VARIANT_STYLES: Record<
  NonNullable<ImpactCardProps["variant"]>,
  { circle: string; amount: string }
> = {
  financial: { circle: "bg-emerald-600", amount: "text-emerald-700" },
  operational: { circle: "bg-slate-600", amount: "text-slate-700" },
  reputation: { circle: "bg-slate-600", amount: "text-slate-700" },
};

export function ImpactCard({
  title,
  amount,
  subtitle,
  icon,
  variant = "financial",
}: ImpactCardProps) {
  const style = VARIANT_STYLES[variant];
  const gradientId = `spark-${variant}-${amount.replace(/\W/g, "")}`;

  return (
    <div className="bg-white rounded-[8px] border border-gray-100 p-6 text-center shadow-sm">
      <p className="text-gray-800 text-xs font-semibold mb-5">{title}</p>

      <div className="flex items-center justify-center gap-3 mb-5">
        <div
          className={`w-11 h-11 rounded-full ${style.circle} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
        >
          {icon}
        </div>
        <div className={`text-3xl font-bold ${style.amount}`}>{amount}</div>
      </div>

      <p className="text-gray-500 text-xs leading-snug mb-6 max-w-[220px] mx-auto">
        {subtitle}
      </p>

      <Sparkline gradientId={gradientId} />
    </div>
  );
}
