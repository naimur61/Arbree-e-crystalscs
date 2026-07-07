import type { ReactNode } from "react";
import type { ProfileUser } from "../types";
import { MailIcon, BriefcaseIcon, BuildingIcon } from "./icons";

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
        <p className="text-[11px] uppercase tracking-wide text-emerald-700/70">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

interface ContactInfoBarProps {
  user: ProfileUser;
}

export default function ContactInfoBar({ user }: ContactInfoBarProps) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl bg-emerald-50 p-4 sm:grid-cols-3">
      <InfoItem icon={<MailIcon />} label="Email" value={user.email} />
      <InfoItem
        icon={<BriefcaseIcon />}
        label="Job Title"
        value={user.jobTitle}
      />
      <InfoItem icon={<BuildingIcon />} label="Company" value={user.company} />
    </div>
  );
}
