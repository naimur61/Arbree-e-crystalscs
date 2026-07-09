import type { ChangeItem } from "./types";

export default function WhatsChangingCard({ items }: { items: ChangeItem[] }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-semibold text-gray-900">
        What&apos;s changing
      </h2>
      <p className="text-xs text-gray-500">
        Effective immediately on confirmation
      </p>

      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
              {item.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
