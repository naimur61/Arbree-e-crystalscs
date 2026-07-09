"use client";

import type { InvoiceSummary } from "./types";
import SummaryInfoCard from "./summary-info-card";
import { FileTextIcon } from "./icons";
import { Badge } from "@/components/ui/badge";

export default function LastInvoiceCard({
  invoice,
}: {
  invoice: InvoiceSummary;
}) {
  return (
    <SummaryInfoCard
      icon={<FileTextIcon />}
      title="Last Invoice"
      badge={
        <Badge className="bg-success-primary text-success-primary border-0 caption-1 font-semibold">
          PAID
        </Badge>
      }
    >
      <p className="title-3 text-primary">{invoice.amount}</p>
      <p className="caption-1 text-tertiary">{invoice.note}</p>
    </SummaryInfoCard>
  );
}
