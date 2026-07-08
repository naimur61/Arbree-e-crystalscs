"use client";

import { FlowBanner } from "@/components/common/ui/flow-banner";
import { useState } from "react";
import { EcosystemGraph } from "./_assets/components/ecosystem-graph";
import { RiskHeatmap } from "./_assets/components/risk-heatmap";
import { TabSwitcher } from "./_assets/components/tab-switcher";
import { TopRisksCard } from "./_assets/components/top-risks-card";

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
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto p-4">
        {/* Flow Banner */}
        <FlowBanner currentPage="activate" />

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {/* Ecosystem Map Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-1">
                  Ecosystem Map
                </h2>
                <p className="text-gray-600 text-xs">
                  Your business. Connected.
                </p>
              </div>
              <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mb-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                <span className="text-gray-700 text-xs">Supplier</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-700 text-xs">Service</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <span className="text-gray-700 text-xs">Function</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-6 bg-red-500"></div>
                <span className="text-gray-700 text-xs">Critical path</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-6 border-t-2 border-dashed border-gray-300"></div>
                <span className="text-gray-700 text-xs">Standard</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Heatmap */}
            <div className="lg:col-span-1 p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">
                Ecosystem Risk Heatmap
              </h3>
              <p className="text-gray-600 text-xs mb-6">
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
