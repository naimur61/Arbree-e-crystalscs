import {
  Building2,
  Globe,
  Shield,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface Supplier {
  name: string;
  region: string;
  risk: "low" | "medium" | "high";
  spend: string;
  status: "active" | "pending" | "at-risk";
}

const TOP_SUPPLIERS: Supplier[] = [
  {
    name: "Quantum Materials Co.",
    region: "Asia Pacific",
    risk: "low",
    spend: "$2.4M",
    status: "active",
  },
  {
    name: "Apex Components Ltd.",
    region: "North America",
    risk: "low",
    spend: "$1.8M",
    status: "active",
  },
  {
    name: "Pinnacle Resources Inc.",
    region: "Europe",
    risk: "medium",
    spend: "$1.2M",
    status: "pending",
  },
  {
    name: "Vertex Supply Chain",
    region: "South America",
    risk: "high",
    spend: "$890K",
    status: "at-risk",
  },
  {
    name: "Horizon Tech Partners",
    region: "Asia Pacific",
    risk: "low",
    spend: "$750K",
    status: "active",
  },
];

interface IntelItem {
  title: string;
  source: string;
  time: string;
  type: "positive" | "negative" | "neutral";
}

const RECENT_INTEL: IntelItem[] = [
  {
    title: "Supplier consolidation in EU region",
    source: "Risk Intelligence",
    time: "2h ago",
    type: "neutral",
  },
  {
    title: "New trade regulations impact",
    source: "Regulatory Watch",
    time: "4h ago",
    type: "negative",
  },
  {
    title: "Q3 compliance scores published",
    source: "Compliance Hub",
    time: "6h ago",
    type: "positive",
  },
  {
    title: "Geopolitical risk alert: Region A",
    source: "Threat Monitor",
    time: "12h ago",
    type: "negative",
  },
  {
    title: "Supply chain resilience report",
    source: "Analytics Engine",
    time: "1d ago",
    type: "positive",
  },
];

const riskConfig = {
  low: { bg: "bg-success-primary", text: "text-success-primary", label: "Low" },
  medium: {
    bg: "bg-warning-primary",
    text: "text-warning-primary",
    label: "Medium",
  },
  high: { bg: "bg-error-primary", text: "text-error-primary", label: "High" },
};

const statusConfig = {
  active: {
    bg: "bg-success-primary",
    text: "text-success-primary",
    icon: CheckCircle,
  },
  pending: {
    bg: "bg-warning-primary",
    text: "text-warning-primary",
    icon: Clock,
  },
  "at-risk": {
    bg: "bg-error-primary",
    text: "text-error-primary",
    icon: AlertTriangle,
  },
};

const intelTypeConfig = {
  positive: {
    bg: "bg-success-primary",
    text: "text-success-primary",
    border: "border-success-primary",
    label: "Positive",
  },
  negative: {
    bg: "bg-error-primary",
    text: "text-error-primary",
    border: "border-error-primary",
    label: "Negative",
  },
  neutral: {
    bg: "bg-info-primary",
    text: "text-info-primary",
    border: "border-info-primary",
    label: "Neutral",
  },
};

function SupplierRow({ supplier }: { supplier: Supplier }) {
  const risk = riskConfig[supplier.risk];
  const status = statusConfig[supplier.status];
  const StatusIcon = status.icon;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-secondary last:border-b-0">
      {/* Icon */}
      <div
        className={`flex justify-center items-center w-8 h-8 rounded-lg ${risk.bg}`}
      >
        <Building2 className={`w-4 h-4 ${risk.text}`} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary truncate">
          {supplier.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <Globe className="w-3 h-3 text-tertiary" />
          <p className="text-xs text-tertiary truncate">{supplier.region}</p>
        </div>
      </div>

      {/* Spend */}
      <p className="text-sm font-semibold text-primary">{supplier.spend}</p>

      {/* Status badge */}
      <div
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
      >
        <StatusIcon className="w-3 h-3" />
        <span className="capitalize">{supplier.status}</span>
      </div>
    </div>
  );
}

function IntelRow({ item }: { item: IntelItem }) {
  const config = intelTypeConfig[item.type];

  return (
    <div className="flex items-start gap-3 py-3 border-b border-secondary last:border-b-0">
      {/* Type indicator */}
      <div
        className={`flex justify-center items-center w-8 h-8 rounded-lg ${config.bg}`}
      >
        <ArrowUpRight className={`w-4 h-4 ${config.text}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary">{item.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-tertiary">{item.source}</span>
          <span className="text-tertiary">·</span>
          <span className="text-xs text-tertiary">{item.time}</span>
        </div>
      </div>

      {/* Type badge */}
      <div
        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </div>
    </div>
  );
}

export function InsightPanels() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Top Suppliers Panel */}
      <div className="rounded-xl border border-primary bg-primary shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-secondary">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-7 h-7 rounded-lg bg-offer-primary">
              <TrendingUp className="w-4 h-4 icon-offer-primary" />
            </div>
            <h3 className="text-sm font-semibold text-primary">
              Top Suppliers
            </h3>
          </div>
          <button className="text-xs font-medium text-info-primary hover:underline">
            View All
          </button>
        </div>

        {/* Body */}
        <div className="px-4">
          {TOP_SUPPLIERS.map((supplier) => (
            <SupplierRow key={supplier.name} supplier={supplier} />
          ))}
        </div>
      </div>

      {/* Recent Intelligence Panel */}
      <div className="rounded-xl border border-primary bg-primary shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-secondary">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-7 h-7 rounded-lg bg-accent-primary">
              <Shield className="w-4 h-4 icon-accent-primary" />
            </div>
            <h3 className="text-sm font-semibold text-primary">
              Recent Intelligence
            </h3>
          </div>
          <button className="text-xs font-medium text-info-primary hover:underline">
            View All
          </button>
        </div>

        {/* Body */}
        <div className="px-4">
          {RECENT_INTEL.map((item) => (
            <IntelRow key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
