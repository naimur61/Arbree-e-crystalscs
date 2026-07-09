"use client";

import type { ComparisonRow } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon } from "./icons";

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="text-success-primary">
        <CheckIcon />
      </span>
    );
  }
  if (value === false) {
    return <span className="text-tertiary">&mdash;</span>;
  }
  return <span className="text-primary">{value}</span>;
}

export default function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="rounded-2xl bg-primary p-4 shadow-sm sm:p-5">
      <h2 className="h6 text-primary">Compare features</h2>
      <p className="caption-1 text-tertiary">
        Detailed breakdown across all plans
      </p>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-tertiary">
              <TableHead className="caption-1 py-2 pr-4 font-medium text-tertiary">
                Feature
              </TableHead>
              <TableHead className="caption-1 px-4 py-2 font-medium text-tertiary">
                Starter
              </TableHead>
              <TableHead className="caption-1 px-4 py-2 font-medium text-tertiary">
                Professional
              </TableHead>
              <TableHead className="caption-1 px-4 py-2 font-medium text-tertiary">
                Enterprise
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.feature} className="border-tertiary">
                <TableCell className="body-3 py-3 pr-4 font-medium text-primary">
                  {row.feature}
                </TableCell>
                <TableCell className="body-4 px-4 py-3">
                  <CellValue value={row.starter} />
                </TableCell>
                <TableCell className="body-4 px-4 py-3">
                  <CellValue value={row.professional} />
                </TableCell>
                <TableCell className="body-4 px-4 py-3">
                  <CellValue value={row.enterprise} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
