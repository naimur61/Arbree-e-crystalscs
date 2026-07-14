"use client";

import type { InvoiceSummary } from "./types";
import SummaryInfoCard from "./summary-info-card";
import { CalendarIcon } from "./icons";
import { Typography } from "@/components/common/Typography/typography";

export default function UpcomingInvoiceCard({
  invoice,
}: {
  invoice: InvoiceSummary;
}) {
  return (
    <SummaryInfoCard icon={<CalendarIcon />} title="Upcoming invoice">
      <Typography variant="h3" weight="bold">
        {invoice.amount}
      </Typography>
      <Typography variant="caption-1" color="tertiary">
        {invoice.note}
      </Typography>
    </SummaryInfoCard>
  );
}
