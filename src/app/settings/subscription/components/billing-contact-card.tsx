"use client";

import type { BillingContact } from "./types";
import SummaryInfoCard from "./summary-info-card";
import { MailIcon } from "./icons";
import { Typography } from "@/components/common/typography/typography";

export default function BillingContactCard({
  contact,
}: {
  contact: BillingContact;
}) {
  return (
    <SummaryInfoCard icon={<MailIcon />} title="Billing contact">
      <Typography variant="h5" weight="bold">
        {contact.name}
      </Typography>
      <Typography variant="label-3" color="tertiary">
        {contact.email} &middot; {contact.phone}
      </Typography>
    </SummaryInfoCard>
  );
}
