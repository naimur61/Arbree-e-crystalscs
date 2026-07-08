// status-badge.tsx
type Status = "In Progress" | "Over Due" | "Complete" | "Received";

const statusStyles: Record<Status, string> = {
  "In Progress": "bg-blue-50 text-blue-600",
  "Over Due": "bg-orange-50 text-orange-500",
  Complete: "bg-emerald-50 text-emerald-600",
  Received: "bg-slate-100 text-slate-500",
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
