"use client";

import { useState } from "react";
import { EcosystemGraph } from "./_assets/components/ecosystem-graph";
import { RiskHeatmap } from "./_assets/components/risk-heatmap";
import { TabSwitcher } from "./_assets/components/tab-switcher";
import { TopRisksCard } from "./_assets/components/top-risks-card";
import { FlowBanner } from "@/components/features/shared/flow-banner";

interface Node {
  id: string;
  label: string;
  type: "supplier" | "service" | "function" | "outcome";
  color: string;
}

interface Link {
  source: string;
  target: string;
  critical?: boolean;
}

// Mock data for different tabs
const graphData = {
  suppliers: {
    nodes: [
      {
        id: "s1",
        label: "Logistics",
        type: "supplier" as const,
        color: "#10b981",
      },
      {
        id: "s2",
        label: "Operations Delivery",
        type: "supplier" as const,
        color: "#10b981",
      },
      {
        id: "s3",
        label: "Operations Update",
        type: "supplier" as const,
        color: "#ef4444",
      },
      {
        id: "s4",
        label: "Operations",
        type: "supplier" as const,
        color: "#10b981",
      },
      {
        id: "sv1",
        label: "Logistics",
        type: "service" as const,
        color: "#3b82f6",
      },
      {
        id: "sv2",
        label: "Payments",
        type: "service" as const,
        color: "#ef4444",
      },
      {
        id: "sv3",
        label: "Consulting",
        type: "service" as const,
        color: "#3b82f6",
      },
      {
        id: "o1",
        label: "Gamma Logistics",
        type: "outcome" as const,
        color: "#6b7280",
      },
      {
        id: "o2",
        label: "Delta Mfg",
        type: "outcome" as const,
        color: "#f97316",
      },
      {
        id: "o3",
        label: "Sierra Analytics",
        type: "outcome" as const,
        color: "#f97316",
      },
    ] as Node[],
    links: [
      { source: "s1", target: "sv1" },
      { source: "s2", target: "sv1" },
      { source: "s3", target: "sv2", critical: true },
      { source: "s4", target: "sv3" },
      { source: "sv1", target: "o1" },
      { source: "sv2", target: "o2", critical: true },
      { source: "sv3", target: "o3" },
      { source: "sv1", target: "o2" },
    ] as Link[],
  },
  services: {
    nodes: [
      {
        id: "s1",
        label: "Logistics",
        type: "supplier" as const,
        color: "#10b981",
      },
      {
        id: "s2",
        label: "Operations Delivery",
        type: "supplier" as const,
        color: "#10b981",
      },
      {
        id: "s3",
        label: "Delta Mfg",
        type: "supplier" as const,
        color: "#f97316",
      },
      {
        id: "s4",
        label: "Payments",
        type: "supplier" as const,
        color: "#ef4444",
      },
      {
        id: "sv1",
        label: "Logistics",
        type: "service" as const,
        color: "#3b82f6",
      },
      {
        id: "sv2",
        label: "Consulting",
        type: "service" as const,
        color: "#3b82f6",
      },
      {
        id: "sv3",
        label: "Reporting",
        type: "service" as const,
        color: "#3b82f6",
      },
      {
        id: "o1",
        label: "Operations",
        type: "outcome" as const,
        color: "#ef4444",
      },
      { id: "o2", label: "Legal", type: "outcome" as const, color: "#10b981" },
      {
        id: "o3",
        label: "Product Delivery",
        type: "outcome" as const,
        color: "#ef4444",
      },
    ] as Node[],
    links: [
      { source: "s1", target: "sv1" },
      { source: "s2", target: "sv2" },
      { source: "s3", target: "sv1" },
      { source: "s4", target: "sv3" },
      { source: "sv1", target: "o1" },
      { source: "sv2", target: "o2" },
      { source: "sv3", target: "o3" },
      { source: "sv1", target: "o3", critical: true },
    ] as Link[],
  },
  functions: {
    nodes: [
      {
        id: "s1",
        label: "Operations Delivery",
        type: "supplier" as const,
        color: "#10b981",
      },
      {
        id: "s2",
        label: "Operations Update",
        type: "supplier" as const,
        color: "#ef4444",
      },
      {
        id: "s3",
        label: "Operations",
        type: "supplier" as const,
        color: "#10b981",
      },
      {
        id: "s4",
        label: "Gamma Logistics",
        type: "supplier" as const,
        color: "#6b7280",
      },
      {
        id: "sv1",
        label: "Consulting",
        type: "service" as const,
        color: "#3b82f6",
      },
      {
        id: "sv2",
        label: "Payment Processing",
        type: "service" as const,
        color: "#f97316",
      },
      {
        id: "sv3",
        label: "Risk Management",
        type: "service" as const,
        color: "#3b82f6",
      },
      {
        id: "o1",
        label: "Finance",
        type: "outcome" as const,
        color: "#ef4444",
      },
      {
        id: "o2",
        label: "Compliance",
        type: "outcome" as const,
        color: "#10b981",
      },
      {
        id: "o3",
        label: "Analytics",
        type: "outcome" as const,
        color: "#f97316",
      },
    ] as Node[],
    links: [
      { source: "s1", target: "sv1" },
      { source: "s2", target: "sv2", critical: true },
      { source: "s3", target: "sv3" },
      { source: "s4", target: "sv1" },
      { source: "sv1", target: "o1" },
      { source: "sv2", target: "o2", critical: true },
      { source: "sv3", target: "o3" },
      { source: "sv1", target: "o3" },
    ] as Link[],
  },
};

const heatmapData = [
  {
    criticality: "High" as const,
    risk: "Critical" as const,
    count: 5,
    supplier: "Zeta Payments",
  },
  {
    criticality: "High" as const,
    risk: "High" as const,
    count: 3,
    supplier: "Gamma Logistics",
  },
  { criticality: "High" as const, risk: "Medium" as const, count: 1 },
  { criticality: "High" as const, risk: "Low" as const, count: 0 },
  { criticality: "Medium" as const, risk: "Critical" as const, count: 0 },
  { criticality: "Medium" as const, risk: "High" as const, count: 2 },
  { criticality: "Medium" as const, risk: "Medium" as const, count: 3 },
  { criticality: "Medium" as const, risk: "Low" as const, count: 1 },
  { criticality: "Low" as const, risk: "Critical" as const, count: 0 },
  { criticality: "Low" as const, risk: "High" as const, count: 1 },
  { criticality: "Low" as const, risk: "Medium" as const, count: 2 },
  { criticality: "Low" as const, risk: "Low" as const, count: 4 },
];

const topRisks = [
  {
    id: 1,
    title: "Single point of failure",
    affectedUnits: 4,
    description:
      "Zeta Payments is the sole provider for payment processing across all business units",
    severity: "Critical" as const,
  },
  {
    id: 2,
    title: "Geographic concentration",
    affectedUnits: 3,
    description:
      "3 Tier-1 suppliers concentrated in North America — natural disaster or regulatory change risk",
    severity: "High" as const,
  },
  {
    id: 3,
    title: "Multi-service dependency",
    affectedUnits: 2,
    description:
      "3 Tier-1 suppliers concentrated in North America — natural disaster or regulatory change risk",
    severity: "High" as const,
  },
];

export default function ActivateContainer() {
  const [activeTab, setActiveTab] = useState<
    "suppliers" | "services" | "functions"
  >("suppliers");

  const currentGraphData =
    graphData[activeTab as keyof typeof graphData] || graphData.suppliers;

  return (
    <main className="min-h-screen">
      <div className="p-4 mx-auto">
        {/* Flow Banner */}
        <FlowBanner currentPage="activate" />

        {/* Main Content */}
        <div className="p-8 bg-primary rounded-lg border border-primary">
          {/* Ecosystem Map Section */}
          <div className="mb-12">
            <div className="flex lg:flex-row gap-4 flex-col justify-between items-center mb-6">
              <div>
                <p className="mb-1 text-sm font-bold text-primary">
                  Ecosystem Map
                </p>
                <p className="text-xs text-secondary">
                  Your business. Connected.
                </p>
              </div>
              <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Legend */}
            <div className="flex gap-4 items-center mb-6 text-xs">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-success-secondary rounded-full"></div>
                <span className="text-xs text-primary">Supplier</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-info-secondary rounded-full"></div>
                <span className="text-xs text-primary">Service</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-disabled rounded-full"></div>
                <span className="text-xs text-primary">Function</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-6 h-1 bg-warning-secondary"></div>
                <span className="text-xs text-primary">Critical path</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-6 h-1 border-t-2 border-black-solid border-dashed"></div>
                <span className="text-xs text-primary">Standard</span>
              </div>
            </div>

            {/* Graph */}
            <EcosystemGraph
              nodes={currentGraphData.nodes}
              links={currentGraphData.links}
              activeTab={activeTab}
            />
          </div>

          {/* Risk Analysis Section */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Heatmap */}
            <div className="p-4 lg:col-span-1">
              <p className="mb-2 text-sm font-bold text-primary">
                Ecosystem Risk Heatmap
              </p>
              <p className="mb-6 text-xs text-secondary">
                Suppliers by criticality and risk
              </p>
              <RiskHeatmap data={heatmapData} />
            </div>

            {/* Top Risks */}
            <div>
              <TopRisksCard risks={topRisks} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
