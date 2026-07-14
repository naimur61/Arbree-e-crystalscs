"use client";

import type { InvoiceSummary } from "./types";
import SummaryInfoCard from "./summary-info-card";
import { FileTextIcon } from "./icons";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/common/Typography/typography";

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
      <Typography variant="h3" weight="bold">
        {invoice.amount}
      </Typography>
      <Typography variant="caption-1" color="tertiary">
        {invoice.note}
      </Typography>
    </SummaryInfoCard>
  );
}
