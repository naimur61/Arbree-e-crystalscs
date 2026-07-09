import type { ReactNode } from "react";

export type BillingCycle = "monthly" | "yearly";

export interface PricingPlan {
  id: string;
  name: string;
  audience: string;
  monthlyPrice: number;
  billingNote: string;
  description: string;
  ctaLabel: string;
  isSubscribed?: boolean;
  isRecommended?: boolean;
  features: string[];
}

export interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}

export interface FooterPerk {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}
