"use client";

import type { InvoiceSummary } from "./types";
import SummaryInfoCard from "./summary-info-card";
import { CalendarIcon } from "./icons";
import { Typography } from "@/components/common/typography/typography";

export default function UpcomingInvoiceCard({
  invoice,
}: {
  invoice: InvoiceSummary;
}) {
  return (
    <SummaryInfoCard icon={<CalendarIcon />} title="Upcoming invoice">
      <Typography variant="h5" weight="bold">
        {invoice.amount}
      </Typography>
      <Typography variant="label-3" color="tertiary">
        {invoice.note}
      </Typography>
    </SummaryInfoCard>
  );
}
