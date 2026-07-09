import { Activity, Headset, Layers, Receipt, Users } from "lucide-react";
import type {
  ChangeItem,
  PaymentMethodInfo,
  PlanCardData,
  PriceLineItem,
} from "./types";

export const currentPlan: PlanCardData = {
  name: "Enterprise",
  badge: "Active",
  badgeTone: "neutral",
  billingNote: "Annual · Unlimited seats",
  priceLabel: "$5,400",
  priceUnit: "/ month",
  features: [
    "All modules",
    "Unlimited intel feeds",
    "Dedicated CSM · 1h SLA",
    "SSO/SAML · Audit logs",
  ],
};

export const newPlan: PlanCardData = {
  name: "Professional",
  badge: "Selected",
  badgeTone: "selected",
  billingNote: "Annual · up to 25 seats",
  priceLabel: "$499",
  priceUnit: "/ seat / month",
  features: [
    "Discover, Activate, Pulse",
    "2,000 alerts / mo",
    "Priority support · 8h SLA",
    "Bulk exports",
  ],
};

export const changeItems: ChangeItem[] = [
  {
    id: "seats",
    icon: <Users className="size-4" />,
    title: "Seat limit reduced",
    description:
      "From unlimited to 25 seats. 17 of your 42 seats will need to be deactivated by your admin.",
  },
  {
    id: "modules",
    icon: <Layers className="size-4" />,
    title: "Module access reduced",
    description:
      "Evolve module will be removed. Discover, Activate, and Pulse remain available.",
  },
  {
    id: "alerts",
    icon: <Activity className="size-4" />,
    title: "Alert quota set to 2,000 / mo",
    description:
      "Down from unlimited. Existing alert rules will continue running until the cap is reached.",
  },
  {
    id: "support",
    icon: <Headset className="size-4" />,
    title: "Support tier change",
    description:
      "Dedicated CSM removed. Priority chat & email with 8h SLA replaces it.",
  },
  {
    id: "billing",
    icon: <Receipt className="size-4" />,
    title: "Billing simplified",
    description:
      "Annual billing continues. Unused balance will be applied as credit toward your new plan.",
  },
];

export const samplePaymentMethod: PaymentMethodInfo = {
  brand: "Visa",
  last4: "4421",
  expiry: "09/28",
  billingEmail: "billing@ecrystal.io",
  isDefault: true,
};

export const priceLineItems: PriceLineItem[] = [
  { label: "Current Enterprise (annual)", amount: "$64,800.00" },
  { label: "New Professional (annual × 25)", amount: "$149,700.00" },
  { label: "Proration credit", amount: "-$28,350.00", isCredit: true },
];
