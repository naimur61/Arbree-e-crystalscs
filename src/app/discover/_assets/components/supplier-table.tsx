// supplier-table.tsx
"use client";

import { MoreVertical, ChevronsUpDown } from "lucide-react";
import { StatusBadge } from "./status-badge";
import { ProgressBar } from "./progress-bar";
import { RiskIndicator, type FlagColor } from "./risk-indicator";
import Image from "next/image";

interface SupplierData {
  id: number;
  name: string;
  iconUrl: string; // swap for your real asset/CDN path per supplier
  services: string;
  completeness: number;
  riskFlags: Array<{ color: FlagColor }>;
  status: "In Progress" | "Over Due" | "Complete" | "Received";
}

const supplierData: SupplierData[] = [
  {
    id: 1,
    name: "P&G Oral Health",
    iconUrl: "https://picsum.photos/seed/pg-oral/80/80",
    services: "Cost analysis",
    completeness: 30,
    riskFlags: [{ color: "blue" }],
    status: "In Progress",
  },
  {
    id: 2,
    name: "Kavo Kerr",
    iconUrl: "https://picsum.photos/seed/kavo-1/80/80",
    services: "Fintech",
    completeness: 70,
    riskFlags: [{ color: "green" }, { color: "red" }, { color: "orange" }],
    status: "Over Due",
  },
  {
    id: 3,
    name: "Henry Schein Inc.",
    iconUrl: "https://picsum.photos/seed/henry-schein/80/80",
    services: "Insurance",
    completeness: 30,
    riskFlags: [{ color: "blue" }],
    status: "Received",
  },
  {
    id: 4,
    name: "Microbrush",
    iconUrl: "https://picsum.photos/seed/microbrush/80/80",
    services: "Financial due diligence",
    completeness: 10,
    riskFlags: [{ color: "blue" }],
    status: "Complete",
  },
  {
    id: 5,
    name: "Kavo Kerr",
    iconUrl: "https://picsum.photos/seed/kavo-2/80/80",
    services: "Insurance and risk management",
    completeness: 30,
    riskFlags: [{ color: "blue" }],
    status: "Complete",
  },
  {
    id: 6,
    name: "Dynarex Corp",
    iconUrl: "https://picsum.photos/seed/dynarex-1/80/80",
    services: "Macro and microeconomic",
    completeness: 40,
    riskFlags: [{ color: "blue" }],
    status: "Over Due",
  },
  {
    id: 7,
    name: "Cranberry",
    iconUrl: "https://picsum.photos/seed/cranberry/80/80",
    services: "Finance",
    completeness: 15,
    riskFlags: [{ color: "blue" }],
    status: "Over Due",
  },
  {
    id: 8,
    name: "Premier Dental Products",
    iconUrl: "https://picsum.photos/seed/premier-dental/80/80",
    services: "Investment",
    completeness: 40,
    riskFlags: [{ color: "blue" }],
    status: "In Progress",
  },
  {
    id: 9,
    name: "Dynarex Corp",
    iconUrl: "https://picsum.photos/seed/dynarex-2/80/80",
    services: "Financial modeling",
    completeness: 30,
    riskFlags: [{ color: "blue" }],
    status: "Received",
  },
  {
    id: 10,
    name: "Dynarex Corp",
    iconUrl: "https://picsum.photos/seed/dynarex-3/80/80",
    services: "Financial decision-making",
    completeness: 30,
    riskFlags: [{ color: "blue" }],
    status: "In Progress",
  },
];

function SortableHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span>{label}</span>
      <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />
    </div>
  );
}

export function SupplierTable() {
  return (
    <div className="overflow-x-auto bg-white rounded-[8px] border border-gray-200 shadow-sm">
      <p className="text-xl font-bold text-slate-900 mb-3 p-3">
        Supplier Oversight
      </p>

      <div className="">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
                <SortableHeader label="Supplier Name" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
                <SortableHeader label="Services" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
                Completeness
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
                Risk Flags
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {supplierData.map((supplier) => (
              <tr
                key={`${supplier.id}-${supplier.name}`}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={supplier.iconUrl}
                      alt={supplier.name}
                      className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0"
                      width={40}
                      height={40}
                    />
                    <span className="font-semibold text-slate-900">
                      {supplier.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-base text-slate-600">
                  {supplier.services}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <ProgressBar percentage={supplier.completeness} />
                    <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                      {supplier.completeness}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <RiskIndicator indicators={supplier.riskFlags} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={supplier.status} />
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
