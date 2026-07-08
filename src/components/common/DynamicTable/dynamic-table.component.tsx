"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export type TableColumn = {
  key: string;
  header: string;
  className?: string;
  render?: (item: Record<string, unknown>, index: number) => React.ReactNode;
};

export type TableConfig = {
  columns: TableColumn[];
  emptyMessage?: string;
  showPagination?: boolean;
  rowClassName?: (item: Record<string, unknown>) => string;
  renderExpandableRow?: (
    item: Record<string, unknown>,
    index: number,
  ) => React.ReactNode;
};

interface Pagination {
  page: number;
  total: number;
  perPage?: number;
  totalPages: number;
}

interface DynamicTableProps {
  isLoading: boolean;
  pagination?: Pagination;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  renderExpandedRow?: (
    item: Record<string, unknown>,
    index: number,
  ) => React.ReactNode;
  config: TableConfig;
  data: Record<string, unknown>[];
  isCheckBox?: boolean;
  selectedIds?: string[];
  setSelectedIds?: (ids: string[]) => void;
  setSelectObject?: (data: Record<string, unknown>[]) => void;
  pageName?: string;
}

export function DynamicTable({
  data,
  isLoading,
  pagination,
  config,
  selectedIds = [],
  setSelectedIds = () => {},
  setSelectObject = () => {},
  isCheckBox = false,
}: DynamicTableProps) {
  const isEmpty = !isLoading && (!data || data.length === 0);

  const isRowSelected = (id: string) => selectedIds?.includes(id);

  const toggleRowSelection = (id: string) => {
    const newSelectedIds = isRowSelected(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];
    setSelectedIds(newSelectedIds);
    setSelectObject(
      data.filter((item: Record<string, unknown>) =>
        newSelectedIds.includes(item.id as string),
      ),
    );
  };

  const toggleSelectAll = () => {
    const allSelected = data?.every((item: Record<string, unknown>) =>
      isRowSelected(item.id as string),
    );
    const newSelectedIds = allSelected
      ? []
      : data.map((item: Record<string, unknown>) => item.id as string);
    setSelectedIds(newSelectedIds);
    setSelectObject(allSelected ? [] : data);
  };

  return (
    <div className="rounded-md border">
      <Table>
        {pagination && pagination.totalPages > 0 && (
          <TableCaption className="p-4">
            {/* Pagination component rendered separately */}
          </TableCaption>
        )}
        <TableHeader className="bg-muted/50">
          <TableRow>
            {isCheckBox && (
              <TableHead className="w-10 pl-4">
                <input
                  type="checkbox"
                  checked={
                    data?.length > 0 &&
                    data?.every((item: Record<string, unknown>) =>
                      isRowSelected(item.id as string),
                    )
                  }
                  onChange={toggleSelectAll}
                  className="h-4 w-4"
                />
              </TableHead>
            )}
            {config.columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={config.columns.length + (isCheckBox ? 1 : 0)}
                className="h-64 text-center"
              >
                <div className="flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              </TableCell>
            </TableRow>
          ) : isEmpty ? (
            <TableRow>
              <TableCell
                colSpan={config.columns.length + (isCheckBox ? 1 : 0)}
                className="h-64 text-center text-muted-foreground"
              >
                {config.emptyMessage || "No data available"}
              </TableCell>
            </TableRow>
          ) : (
            data?.map((row: Record<string, unknown>, rowIndex: number) => (
              <TableRow key={rowIndex} className={config.rowClassName?.(row)}>
                {isCheckBox && (
                  <TableCell className="pl-4">
                    <input
                      type="checkbox"
                      checked={isRowSelected(row.id as string)}
                      onChange={() => toggleRowSelection(row.id as string)}
                      className="h-4 w-4"
                    />
                  </TableCell>
                )}
                {config.columns.map((col, colIndex) => (
                  <TableCell key={colIndex} className={col.className}>
                    {col.render
                      ? col.render(row, rowIndex)
                      : (row[col.key] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
