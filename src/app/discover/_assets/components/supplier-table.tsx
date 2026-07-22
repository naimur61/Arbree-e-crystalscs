"use client";

import { useMemo, useState } from "react";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import {
  DynamicTable,
  type TableColumn,
  type SortDirection,
} from "@/components/common/dynamic-table/dynamic-table";
import { StatusBadge } from "./status-badge";
import { ProgressBar } from "./progress-bar";
import { RiskIndicator, type FlagColor } from "./risk-indicator";

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

const PER_PAGE = 6;

export function SupplierTable() {
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);

  const handleSort = (key: string) => {
    if (key === sortKey) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setPage(1);
  };

  const sorted = useMemo(() => {
    const copy = [...supplierData];
    copy.sort((a, b) => {
      const aVal = a[sortKey as keyof SupplierData];
      const bVal = b[sortKey as keyof SupplierData];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDirection === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [sortKey, sortDirection]);

  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const pageData = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const columns: TableColumn[] = [
    {
      key: "name",
      header: "Supplier Name",
      sortable: true,
      render: (item) => {
        const supplier = item as unknown as SupplierData;
        return (
          <div className="flex items-center gap-3">
            <Image
              src={supplier.iconUrl}
              alt={supplier.name}
              className="w-10 h-10 rounded-lg object-cover border border-primary shrink-0"
              width={40}
              height={40}
            />
            <span className="font-semibold text-primary">{supplier.name}</span>
          </div>
        );
      },
    },
    {
      key: "services",
      header: "Services",
      sortable: true,
      className: "text-base text-primary",
    },
    {
      key: "completeness",
      header: "Completeness",
      sortable: true,
      render: (item) => {
        const supplier = item as unknown as SupplierData;
        return (
          <div className="flex items-center gap-3">
            <ProgressBar percentage={supplier.completeness} />
            <span className="text-sm font-semibold text-primary whitespace-nowrap">
              {supplier.completeness}%
            </span>
          </div>
        );
      },
    },
    {
      key: "riskFlags",
      header: "Risk Flags",
      render: (item) => {
        const supplier = item as unknown as SupplierData;
        return <RiskIndicator indicators={supplier.riskFlags} />;
      },
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (item) => {
        const supplier = item as unknown as SupplierData;
        return <StatusBadge status={supplier.status} />;
      },
    },
    {
      key: "action",
      header: "Action",
      className: "text-center",
      render: () => (
        <button className="p-2 hover:bg-quartiary rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4 text-primary" />
        </button>
      ),
    },
  ];

  return (
    <DynamicTable
      title="Supplier Oversight"
      isLoading={false}
      data={pageData as unknown as Record<string, unknown>[]}
      config={{ columns, emptyMessage: "No suppliers found" }}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={handleSort}
      pagination={{
        page,
        total: sorted.length,
        perPage: PER_PAGE,
        totalPages,
      }}
      currentPage={page}
      setCurrentPage={setPage}
    />
  );
}
