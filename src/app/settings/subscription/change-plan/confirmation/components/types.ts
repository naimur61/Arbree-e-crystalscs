import type { ReactNode } from "react";

export interface PlanCardData {
  name: string;
  badge: string;
  badgeTone: "neutral" | "selected";
  billingNote: string;
  priceLabel: string;
  priceUnit: string;
  features: string[];
}

export interface ChangeItem {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export interface PriceLineItem {
  label: string;
  amount: string;
  isCredit?: boolean;
}

export interface PaymentMethodInfo {
  brand: string;
  last4: string;
  expiry: string;
  billingEmail: string;
  isDefault: boolean;
}
