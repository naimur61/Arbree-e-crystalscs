import { Typography } from "@/components/common/typography/typography";
import type { QuickAction } from "../types";
import { Lock } from "lucide-react";
import { LockIcon } from "./icons";
import { Card } from "@/components/ui/card";

function ActionCard({ action }: { action: QuickAction }) {
  return (
    <Card
      onClick={action.locked ? undefined : action.onClick}
      className={`
    flex-row items-center gap-3 p-6
    border-gray-100
    ${
      action.locked
        ? "cursor-not-allowed opacity-80"
        : "cursor-pointer hover:border-emerald-200 hover:shadow"
    }
  `}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
        {action.icon}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <Typography variant="body-1" weight="bold">
            {action.title}
          </Typography>

          {action.locked && <LockIcon />}
        </div>

        <Typography variant="body-3" color="secondary">
          {action.description}
        </Typography>
      </div>
    </Card>
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
    <Card className="rounded-2xl p-3 shadow-sm">
      <div className="mb-4">
        <Typography variant="h6" weight="bold">
          Quick Actions
        </Typography>
        <Typography variant="body-2" color="secondary">
          Common account updates — restricted for {restrictedRoleLabel} role
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-4">
        {actions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Lock className="h-4" />
        <Typography variant="body-2" color="secondary">
          Contact your workspace admin to request elevated permissions.
        </Typography>
      </div>
    </Card>
  );
}
