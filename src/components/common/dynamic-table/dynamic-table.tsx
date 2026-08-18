"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type SortDirection = "asc" | "desc";

export type TableColumn = {
  key: string;
  header: string;
  className?: string;
  sortable?: boolean;
  render?: (item: Record<string, unknown>, index: number) => React.ReactNode;
};

export type TableConfig = {
  columns: TableColumn[];
  emptyMessage?: string;
  rowClassName?: (item: Record<string, unknown>) => string;
  getRowId?: (item: Record<string, unknown>) => string;
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
  title?: string;
  isLoading: boolean;
  pagination?: Pagination;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;
  config: TableConfig;
  data: Record<string, unknown>[];
  isCheckBox?: boolean;
  selectedIds?: string[];
  setSelectedIds?: (ids: string[]) => void;
  setSelectObject?: (data: Record<string, unknown>[]) => void;
}

function SortableHeader({
  label,
  active,
  direction,
  onClick,
}: {
  label: string;
  active?: boolean;
  direction?: SortDirection;
  onClick?: () => void;
}) {
  if (!onClick) return <span>{label}</span>;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 group"
    >
      <span>{label}</span>
      <ChevronsUpDown
        className={`w-3.5 h-3.5 transition-colors ${
          active ? "text-primary" : "text-slate-400 group-hover:text-slate-500"
        } ${active && direction === "desc" ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export function DynamicTable({
  title,
  data,
  isLoading,
  pagination,
  currentPage,
  setCurrentPage,
  sortKey,
  sortDirection,
  onSort,
  config,
  selectedIds = [],
  setSelectedIds = () => {},
  setSelectObject = () => {},
  isCheckBox = false,
}: DynamicTableProps) {
  const isEmpty = !isLoading && (!data || data.length === 0);
  const getRowId =
    config.getRowId ?? ((item: Record<string, unknown>) => item.id as string);

  const isRowSelected = (id: string) => selectedIds?.includes(id);

  const toggleRowSelection = (id: string) => {
    const newSelectedIds = isRowSelected(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];
    setSelectedIds(newSelectedIds);
    setSelectObject(
      data.filter((item) => newSelectedIds.includes(getRowId(item))),
    );
  };

  const toggleSelectAll = () => {
    const allSelected = data?.every((item) => isRowSelected(getRowId(item)));
    const newSelectedIds = allSelected
      ? []
      : data.map((item) => getRowId(item));
    setSelectedIds(newSelectedIds);
    setSelectObject(allSelected ? [] : data);
  };

  const colSpan = config.columns.length + (isCheckBox ? 1 : 0);

  return (
    <div className="overflow-x-auto bg-primary rounded-[8px] border border-primary p-4 shadow-sm">
      {title && (
        <p className="text-xl font-bold text-primary mb-3 p-3">{title}</p>
      )}

      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="border-b border-primary hover:bg-transparent">
            {isCheckBox && (
              <TableHead className="w-10 pl-4">
                <input
                  type="checkbox"
                  checked={
                    data?.length > 0 &&
                    data?.every((item) => isRowSelected(getRowId(item)))
                  }
                  onChange={toggleSelectAll}
                  className="h-4 w-4"
                />
              </TableHead>
            )}
            {config.columns.map((column) => (
              <TableHead
                key={column.key}
                className={`text-sm font-medium text-secondary ${column.className ?? ""}`}
              >
                {column.sortable ? (
                  <SortableHeader
                    label={column.header}
                    active={sortKey === column.key}
                    direction={
                      sortKey === column.key ? sortDirection : undefined
                    }
                    onClick={onSort ? () => onSort(column.key) : undefined}
                  />
                ) : (
                  column.header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100">
          {isLoading ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={colSpan} className="h-64 text-center">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              </TableCell>
            </TableRow>
          ) : isEmpty ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={colSpan}
                className="h-64 text-center text-muted-foreground"
              >
                {config.emptyMessage || "No data available"}
              </TableCell>
            </TableRow>
          ) : (
            data?.map((row, rowIndex) => (
              <TableRow
                key={getRowId(row) ?? rowIndex}
                className={`hover:bg-slate-50/60 transition-colors ${
                  config.rowClassName?.(row) ?? ""
                }`}
              >
                {isCheckBox && (
                  <TableCell className="pl-4">
                    <input
                      type="checkbox"
                      checked={isRowSelected(getRowId(row))}
                      onChange={() => toggleRowSelection(getRowId(row))}
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

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-3 pt-4">
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}
            {typeof pagination.total === "number" && (
              <> &middot; {pagination.total} total</>
            )}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={pagination.page <= 1}
              onClick={() => setCurrentPage?.(pagination.page - 1)}
              className="p-2 rounded-lg border border-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-quartiary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => setCurrentPage?.(pagination.page + 1)}
              className="p-2 rounded-lg border border-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-quartiary transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
