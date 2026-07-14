"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/common/typography/typography";

export default function SummaryInfoCard({
  icon,
  title,
  badge,
  children,
}: {
  icon: ReactNode;
  title: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="rounded-2xl border-0 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="label-3 flex items-center gap-2 text-tertiary">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-icon-secondary">
            {icon}
          </span>
          <Typography variant="label-2">{title}</Typography>
        </span>
        {badge}
      </div>
      <div className="mt-2">{children}</div>
    </Card>
  );
}
