import type { ReactNode } from "react";
import type { ProfileUser } from "../types";
import { Mail, Briefcase, Building2 } from "lucide-react";
import { Typography } from "@/components/common/typography/typography";

interface ProfileHeaderProps {
  user: ProfileUser;
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-emerald-600">{icon}</span>
      <div className="leading-tight">
        <Typography variant="body-3">{label}</Typography>
        <Typography
          variant="body-3"
          color="successSecondaryHover"
          weight="bold"
        >
          {value}
        </Typography>
      </div>
    </div>
  );
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-sm font-semibold text-white">
            {user.initials}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <Typography variant="h6">{user.name}</Typography>

              {user.isActiveNow && (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active now
                </span>
              )}

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {user.role}
              </span>
            </div>

            <Typography variant="body-2">{user.jobTitle}</Typography>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 bg-emerald-50 p-4 sm:grid-cols-3">
        <InfoItem icon={<Mail />} label="Email" value={user.email} />

        <InfoItem
          icon={<Briefcase />}
          label="Job Title"
          value={user.jobTitle}
        />

        <InfoItem icon={<Building2 />} label="Company" value={user.company} />
      </div>
    </div>
  );
}
