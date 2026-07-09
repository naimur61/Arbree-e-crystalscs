"use client";

import type { Invoice, InvoiceStatus } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileTextIcon, DownloadIcon, ChevronRightIcon } from "./icons";
import { ActionButton } from "@/components/common/button/action-button";

function statusBadgeVariant(status: InvoiceStatus) {
  switch (status) {
    case "PAID":
      return "bg-success-primary text-success-primary border-0";
    case "PENDING":
      return "bg-warning-primary text-warning-primary border-0";
    case "FAILED":
      return "bg-error-primary text-error-primary border-0";
  }
}

export default function RecentInvoicesTable({
  invoices,
  cycleNote,
  onViewAll,
  onDownload,
}: {
  invoices: Invoice[];
  cycleNote: string;
  onViewAll?: () => void;
  onDownload?: (invoice: Invoice) => void;
}) {
  return (
    <div className="rounded-2xl bg-primary shadow-sm">
      <div className="flex items-center justify-between px-4 pt-4 sm:px-5 sm:pt-5">
        <div>
          <h2 className="h6 text-primary">Recent Invoices</h2>
          <p className="caption-1 text-tertiary">{cycleNote}</p>
        </div>
        <ActionButton
          type="button"
          variant="link"
          btnSize="sm"
          lastIcon={<ChevronRightIcon />}
          buttonContent="View all"
          handleOpen={onViewAll}
          btnStyle="text-success-primary hover:text-success-primary-hover no-underline"
        />
      </div>

      <div className="mt-3">
        <Table>
          <TableHeader>
            <TableRow className="border-tertiary">
              <TableHead className="caption-1 px-4 py-2 font-medium text-tertiary sm:px-5">
                Invoice
              </TableHead>
              <TableHead className="caption-1 px-4 py-2 font-medium text-tertiary sm:px-5">
                Date
              </TableHead>
              <TableHead className="caption-1 px-4 py-2 font-medium text-tertiary sm:px-5">
                Amount
              </TableHead>
              <TableHead className="caption-1 px-4 py-2 font-medium text-tertiary sm:px-5">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="border-tertiary">
                <TableCell className="flex items-center gap-2 px-4 py-3 font-medium text-primary sm:px-5">
                  <span className="text-icon-tertiary">
                    <FileTextIcon />
                  </span>
                  {invoice.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-secondary sm:px-5">
                  {invoice.date}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-primary sm:px-5">
                  {invoice.amount}
                </TableCell>
                <TableCell className="px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-3">
                    <Badge className={statusBadgeVariant(invoice.status)}>
                      {invoice.status}
                    </Badge>
                    <ActionButton
                      type="button"
                      variant="ghost"
                      btnSize="sm"
                      icon={<DownloadIcon />}
                      buttonContent="PDF"
                      handleOpen={() => onDownload?.(invoice)}
                      btnStyle="text-tertiary hover:text-secondary"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
