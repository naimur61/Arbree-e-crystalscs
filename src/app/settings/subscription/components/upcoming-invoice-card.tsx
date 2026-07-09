"use client";

import type { InvoiceSummary } from "./types";
import SummaryInfoCard from "./summary-info-card";
import { CalendarIcon } from "./icons";

export default function UpcomingInvoiceCard({
  invoice,
}: {
  invoice: InvoiceSummary;
}) {
  return (
    <SummaryInfoCard icon={<CalendarIcon />} title="Upcoming invoice">
      <p className="title-3 text-primary">{invoice.amount}</p>
      <p className="caption-1 text-tertiary">{invoice.note}</p>
    </SummaryInfoCard>
  );
}
