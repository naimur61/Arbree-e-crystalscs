"use client";

import type {
  PlanInfo,
  UsageStat,
  InvoiceSummary,
  BillingContact,
  Invoice,
} from "./components/types";
import SubscriptionHeader from "./components/subscription-header";
import PlanOverviewCard from "./components/plan-overview-card";
import UsageSectionHeader from "./components/usage-section-header";
import UsageStatCard from "./components/usage-stat-card";
import LastInvoiceCard from "./components/last-invoice-card";
import UpcomingInvoiceCard from "./components/upcoming-invoice-card";
import BillingContactCard from "./components/billing-contact-card";
import RecentInvoicesTable from "./components/recent-invoices-table";
import { Users, Activity, Database, Zap } from "lucide-react";

const samplePlan: PlanInfo = {
  name: "Enterprise Plan",
  isActive: true,
  isCurrentPlan: true,
  description:
    "Billed annually · Unlimited intel feeds · Priority support · SSO + SAML included",
  priceLabel: "$5,400",
  priceSubLabel: "per month · billed annually",
  billingCycle: "Annual",
  renewsOn: "Jan 14, 2027",
  renewsInDays: 254,
  nextChargeAmount: "$64,800.00",
  nextChargeNote: "on renewal",
  paymentMethod: "Visa •••• 4421",
  paymentExpiry: "09/28",
  seatsUsed: 42,
  seatsTotal: 60,
};

const sampleUsageStats: UsageStat[] = [
  {
    id: "users",
    icon: <Users />,
    label: "Active Users",
    used: 42,
    total: 60,
    unit: "seats",
    percent: 70,
    color: "bg-success-primary",
  },
  {
    id: "alerts",
    icon: <Activity />,
    label: "Alerts Monitored",
    used: 1248,
    total: 2000,
    unit: "alerts",
    percent: 70,
    color: "blue",
  },
  {
    id: "sources",
    icon: <Database />,
    label: "Data Sources",
    used: 18,
    total: 25,
    unit: "sources",
    percent: 70,
    color: "orange",
  },
  {
    id: "api",
    icon: <Zap />,
    label: "API Usage",
    used: 847,
    total: 1000,
    unit: "calls",
    percent: 70,
    color: "purple",
  },
];

const sampleLastInvoice: InvoiceSummary = {
  amount: "$5,400.00",
  date: "Apr 1, 2026",
  note: "Apr 1, 2026 · INV-2026-0042",
  status: "PAID",
};

const sampleUpcomingInvoice: InvoiceSummary = {
  amount: "$5,400.00",
  date: "May 1, 2026",
  note: "May 1, 2026 · auto-charge enabled",
};

const sampleBillingContact: BillingContact = {
  name: "Daniel Park",
  email: "billing@ecrystal.io",
  phone: "+1 (415) 555-0144",
};

const sampleInvoices: Invoice[] = [
  {
    id: "INV-2026-0042",
    date: "Apr 1, 2026",
    amount: "$5,400.00",
    status: "PAID",
  },
  {
    id: "INV-2026-0041",
    date: "Mar 1, 2026",
    amount: "$5,400.00",
    status: "PAID",
  },
  {
    id: "INV-2026-0040",
    date: "Feb 1, 2026",
    amount: "$5,400.00",
    status: "PAID",
  },
];

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-children-body p-4 sm:p-6">
      <div className="mx-auto space-y-5">
        <SubscriptionHeader />

        <PlanOverviewCard plan={samplePlan} />

        <div>
          <UsageSectionHeader
            resetDate="May 1, 2026"
            daysRemaining={12}
            onViewDetails={() => console.log("view detailed usage")}
          />
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sampleUsageStats.map((stat) => (
              <UsageStatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <LastInvoiceCard invoice={sampleLastInvoice} />
          <UpcomingInvoiceCard invoice={sampleUpcomingInvoice} />
          <BillingContactCard contact={sampleBillingContact} />
        </div>

        <RecentInvoicesTable
          invoices={sampleInvoices}
          cycleNote="Last 3 billing cycles"
          onViewAll={() => console.log("view all invoices")}
          onDownload={(invoice) => console.log("download", invoice.id)}
        />
      </div>
    </div>
  );
}
