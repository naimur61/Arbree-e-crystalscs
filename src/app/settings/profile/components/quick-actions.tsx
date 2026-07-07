import type { QuickAction } from "../types";
import { ActionButton } from "@/components/common/button/action-button";
import { LockIcon } from "./icons";

function ActionCard({ action }: { action: QuickAction }) {
  return (
    <ActionButton
      type="button"
      variant="ghost"
      btnSize="default"
      disabled={action.locked}
      btnStyle="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm hover:border-emerald-200 hover:shadow disabled:cursor-not-allowed disabled:opacity-80 capitalize"
      icon={
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          {action.icon}
        </span>
      }
      buttonContent={
        <span className="flex-1">
          <span className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
            {action.title}
            {action.locked && <LockIcon />}
          </span>
          <span className="block text-xs text-gray-500">
            {action.description}
          </span>
        </span>
      }
      handleOpen={action.onClick}
    />
  );
}

interface QuickActionsProps {
  actions: QuickAction[];
  restrictedRoleLabel?: string;
}

export default function QuickActions({
  actions,
  restrictedRoleLabel = "Viewer",
}: QuickActionsProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-gray-900">Quick Actions</h2>
      <p className="mb-4 text-sm text-gray-500">
        Common account updates — restricted for {restrictedRoleLabel} role
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {actions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-400">
        Contact your workspace admin to request elevated permissions.
      </p>
    </div>
  );
}
