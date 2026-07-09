"use client";

import { useState } from "react";

import type { BillingCycle } from "./components/types";
import PricingHeader from "./components/pricing-header";
import PricingCard from "./components/pricing-card";
import ComparisonTable from "./components/comparison-table";
import FooterPerks from "./components/footer-perks";
import {
  ShieldCheckIcon,
  UserPlusIcon,
  SparklesIcon,
} from "./components/icons";

import type {
  PricingPlan,
  ComparisonRow,
  FooterPerk,
} from "./components/types";

/* =========================================================================
   SAMPLE DATA — replace with real plan/pricing data from your billing API
   ========================================================================= */

const samplePlans: PricingPlan[] = [
  {
    id: "essentials",
    name: "Essentials",
    audience: "(SMEs / Start-ups)",
    monthlyPrice: 750,
    billingNote: "Per Month / Anually",
    description:
      "Core supplier-oversight service providing baseline visibility and compliance readiness",
    ctaLabel: "Select Starter",
    features: [
      "Supplier health checks",
      "Due-diligence templates",
      "Onboarding support",
      "Quarterly summary",
    ],
  },
  {
    id: "scale-ups",
    name: "Scale-ups / Fintechs (Growth)",
    audience: "",
    monthlyPrice: 1999,
    billingNote: "Per Month / Anually",
    description: "Continuous supplier-performance monitoring and reporting",
    ctaLabel: "Subscribed",
    isSubscribed: true,
    isRecommended: true,
    features: [
      "KPI tracking",
      "Dashboards",
      "Quarterly resilience review",
      "PowerBI export",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "(Mid-tier / Large Firms)",
    monthlyPrice: 3999,
    billingNote: "Per Month / Anually",
    description:
      "Fully managed supplier-risk oversight and strategic optimisation",
    ctaLabel: "Select Starter",
    features: [
      "Managed performance",
      "Risk alerts & benchmarking",
      "Board-ready reports",
      "Dedicated advisor",
    ],
  },
];

const sampleComparisonRows: ComparisonRow[] = [
  {
    feature: "Seats",
    starter: "Up to 5",
    professional: "Up to 25",
    enterprise: "Unlimited",
  },
  {
    feature: "Alerts monitored / mo",
    starter: "250",
    professional: "2,000",
    enterprise: "Unlimited",
  },
  {
    feature: "Modules",
    starter: "Discover",
    professional: "+ Activate, Pulse",
    enterprise: "All (Discover + Evolve)",
  },
  {
    feature: "Data sources",
    starter: "5",
    professional: "15",
    enterprise: "Unlimited",
  },
  {
    feature: "API calls / mo",
    starter: "—",
    professional: "50k",
    enterprise: "1M+",
  },
  {
    feature: "Support",
    starter: "Email · 48h",
    professional: "Priority · 8h",
    enterprise: "Dedicated CSM · 1h",
  },
  {
    feature: "SSO / SAML",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    feature: "Audit logs",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    feature: "DPA & compliance docs",
    starter: false,
    professional: false,
    enterprise: true,
  },
];

const sampleFooterPerks: FooterPerk[] = [
  {
    id: "money-back",
    icon: <ShieldCheckIcon />,
    title: "30-day money-back",
    description: "Full refund on monthly plans. No questions asked.",
  },
  {
    id: "add-seats",
    icon: <UserPlusIcon />,
    title: "Add seats anytime",
    description: "Prorated to your billing cycle automatically.",
  },
  {
    id: "migration",
    icon: <SparklesIcon />,
    title: "White-glove migration",
    description: "Included on Professional and Enterprise plans.",
  },
];

/* =========================================================================
   PAGE — composes everything
   ========================================================================= */

export default function ChoosePlanPage() {
  const [cycle, setCycle] = useState<BillingCycle>("yearly");

  return (
    <div className="min-h-screen bg-children-body p-4 sm:p-6">
      <div className="mx-auto max-w-5xl space-y-5">
        <PricingHeader cycle={cycle} onCycleChange={setCycle} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {samplePlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} cycle={cycle} />
          ))}
        </div>

        <ComparisonTable rows={sampleComparisonRows} />

        <FooterPerks perks={sampleFooterPerks} />
      </div>
    </div>
  );
}
