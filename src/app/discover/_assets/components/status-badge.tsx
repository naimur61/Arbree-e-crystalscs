// status-badge.tsx
type Status = "In Progress" | "Over Due" | "Complete" | "Received";

const statusStyles: Record<Status, string> = {
  "In Progress": "bg-info-primary text-info-primary",
  "Over Due": "bg-warning-primary text-warning-primary",
  Complete: "bg-success-primary text-success-primary",
  Received: "bg-quartiary text-quartiary-primary",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center px-3.5 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
