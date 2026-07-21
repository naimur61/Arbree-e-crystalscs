import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  FileText,
  TrendingUp,
  TrendingDown,
  LucideIcon,
} from "lucide-react";

import { Sparkline } from "@/components/features/dashboard/sparkline";
import { Typography } from "@/components/common/typography/typography";
import { CardContainer } from "@/components/common/card/Card";

/* ---------------------- Data types ---------------------- */
interface KpiCardData {
  label: string;
  value: string;
  trend: number;
  comment: string;
  icon: LucideIcon;
  borderClass: string;
  iconClass: string;
  trendIcon: LucideIcon;
  sparklineData: number[];
}

/* ---------------------- Cards ---------------------- */
const CARDS: KpiCardData[] = [
  {
    label: "Suppliers",
    value: "12",
    trend: 8,
    comment: "Total",
    icon: AlertTriangle,
    borderClass: "border-l-error-primary",
    iconClass: "text-error-primary",
    trendIcon: TrendingUp,
    sparklineData: [8, 9, 7, 10, 11, 10, 12, 14, 13, 15, 14, 16],
  },
  {
    label: "Critical Suppliers",
    value: "5",
    trend: -3,
    comment: "33% of total",
    icon: AlertCircle,
    borderClass: "border-l-warning-primary",
    iconClass: "text-warning-primary",
    trendIcon: TrendingDown,
    sparklineData: [8, 7, 9, 6, 7, 5, 6, 4, 5, 3, 4, 5],
  },
  {
    label: "Risk Status",
    value: "487",
    trend: 12,
    comment: "High or Critical",
    icon: CheckCircle2,
    borderClass: "border-l-success-primary",
    iconClass: "text-success-primary",
    trendIcon: TrendingUp,
    sparklineData: [420, 440, 430, 460, 450, 470, 465, 480, 475, 485, 490, 487],
  },
  {
    label: "Active Alerts",
    value: "23",
    trend: 2,
    comment: "New onBoarding batch",
    icon: FileText,
    borderClass: "border-l-info-primary",
    iconClass: "text-info-primary",
    trendIcon: TrendingUp,
    sparklineData: [18, 20, 17, 22, 19, 21, 20, 23, 22, 24, 21, 23],
  },
  {
    label: "Renewals (90 days)",
    value: "12",
    trend: 8,
    comment: "All status New",
    icon: AlertTriangle,
    borderClass: "border-l-error-primary",
    iconClass: "text-error-primary",
    trendIcon: TrendingUp,
    sparklineData: [4, 5, 3, 6, 5, 7, 8, 10, 9, 11, 10, 12],
  },
];

/* ---------------------- Card ---------------------- */
function KpiCard({ card }: { card: KpiCardData }) {
  return (
    <CardContainer className={`${card.borderClass}  gap-1 p-3`}>
      <Typography
        variant="body-2"
        weight="semibold"
        className="leading-tight"
        limit
        tooltip
      >
        {card.label}
      </Typography>

      <Typography variant="body-1" weight="bold" className="leading-tight">
        {card.value}
      </Typography>

      <div className="flex gap-1 justify-between items-end mt-auto">
        <Typography variant="caption-2">{card.comment}</Typography>

        <div className="flex flex-col gap-0 items-end w-16">
          {/* <span */}
          {/*   className={`inline-flex items-center gap-0.5 text-[10px] font-semibold leading-none ${trendColor}`} */}
          {/* > */}
          {/*   <TrendIcon className="w-3 h-3" /> */}
          {/*   {isUp ? "+" : ""} */}
          {/*   {absTrend}% */}
          {/* </span> */}

          <div className={`w-full ${card.iconClass}`}>
            <Sparkline data={card.sparklineData} />
          </div>
        </div>
      </div>
    </CardContainer>
  );
}

/* ---------------------- Export ---------------------- */
export function KpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {CARDS.map((card) => (
        <KpiCard key={card.label} card={card} />
      ))}
    </div>
  );
}
