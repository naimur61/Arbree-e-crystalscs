import type { ReactNode } from "react";

export interface PlanInfo {
  name: string;
  isActive: boolean;
  isCurrentPlan: boolean;
  description: string;
  priceLabel: string;
  priceSubLabel: string;
  billingCycle: string;
  renewsOn: string;
  renewsInDays: number;
  nextChargeAmount: string;
  nextChargeNote: string;
  paymentMethod: string;
  paymentExpiry: string;
  seatsUsed: number;
  seatsTotal: number;
}

export type UsageColor = "emerald" | "blue" | "orange" | "purple";

export interface UsageStat {
  id: string;
  icon: ReactNode;
  label: string;
  used: number;
  total: number;
  unit: string;
  percent: number;
  color: UsageColor;
}

export interface InvoiceSummary {
  amount: string;
  date: string;
  note: string;
  status?: "PAID";
}

export interface BillingContact {
  name: string;
  email: string;
  phone: string;
}

export type InvoiceStatus = "PAID" | "PENDING" | "FAILED";

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
}

export const usageColorMap: Record<
  UsageColor,
  { icon: string; bg: string; bar: string }
> = {
  emerald: { icon: "emerald", bg: "emerald", bar: "emerald" },
  blue: { icon: "blue", bg: "blue", bar: "blue" },
  orange: { icon: "orange", bg: "orange", bar: "orange" },
  purple: { icon: "purple", bg: "purple", bar: "purple" },
};

export const usageColorVariants: Record<
  UsageColor,
  { icon: string; badge: string; bar: string }
> = {
  emerald: {
    icon: "bg-success-secondary text-success-primary",
    badge: "text-success-primary",
    bar: "bg-success-secondary",
  },
  blue: {
    icon: "bg-info-secondary text-info-primary",
    badge: "text-info-primary",
    bar: "bg-info-secondary",
  },
  orange: {
    icon: "bg-warning-secondary text-warning-primary",
    badge: "text-warning-primary",
    bar: "bg-warning-secondary",
  },
  purple: {
    icon: "bg-accent-primary text-accent-primary",
    badge: "text-accent-primary",
    bar: "bg-accent-solid",
  },
};
