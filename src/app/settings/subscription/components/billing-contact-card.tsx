"use client";

import type { BillingContact } from "./types";
import SummaryInfoCard from "./summary-info-card";
import { MailIcon } from "./icons";

export default function BillingContactCard({
  contact,
}: {
  contact: BillingContact;
}) {
  return (
    <SummaryInfoCard icon={<MailIcon />} title="Billing contact">
      <p className="body-3 font-semibold text-primary">{contact.name}</p>
      <p className="caption-1 text-tertiary">
        {contact.email} &middot; {contact.phone}
      </p>
    </SummaryInfoCard>
  );
}
