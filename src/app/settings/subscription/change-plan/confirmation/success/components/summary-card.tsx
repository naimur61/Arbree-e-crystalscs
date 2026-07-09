import type { SummaryRow } from "./types";

export default function SummaryCard({ rows }: { rows: SummaryRow[] }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-4">
      <dl className="space-y-2.5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-sm"
          >
            <dt className="text-gray-500">{row.label}</dt>
            <dd className="font-semibold text-gray-900">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
