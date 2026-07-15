"use client";

import ProfileHeader from "./components/ProfileHeader";
import SecurityStatus from "./components/security-status";
import QuickActions from "./components/quick-actions";
import { UserIcon, LockRotateIcon, ShieldCheckIcon } from "./components/icons";
import type { ProfileUser, SecurityCardData, QuickAction } from "./types";
import { Typography } from "@/components/common/typography/typography";
import { CircleCheck, TriangleAlert, Shield, Clock } from "lucide-react";

const sampleUser: ProfileUser = {
  name: "Sarah Chen",
  initials: "SC",
  isActiveNow: true,
  role: "VIEWER",
  jobTitle: "Risk & Compliance Analyst",
  email: "sarah.chen@crystal.io",
  company: "Crystal Financial Group",
};

const sampleSecurityCards: SecurityCardData[] = [
  {
    id: "2fa",
    icon: <CircleCheck />,
    label: "Two-Factor Auth",
    value: "Enabled",
    tone: "good",
    borderColor: "border-icon-success-primary",
  },
  {
    id: "password",
    icon: <TriangleAlert />,
    label: "Password",
    value: "Update in 12 days",
    tone: "warning",
    borderColor: "border-icon-warning-secondary",
  },
  {
    id: "sessions",
    icon: <Shield />,
    label: "Active Sessions",
    value: "3 devices",
    tone: "neutral",
    borderColor: "border-icon-success-primary",
  },
  {
    id: "last-login",
    icon: <Clock />,
    label: "Last Login",
    value: "Today, 09:42",
    tone: "neutral",
    borderColor: "border-icon-success-primary",
  },
];

const sampleActions: QuickAction[] = [
  {
    id: "edit-profile",
    icon: <UserIcon />,
    title: "Edit Profile",
    description: "Update name and details",
    locked: true,
  },
  {
    id: "change-password",
    icon: <LockRotateIcon />,
    title: "Change Password",
    description: "Rotate your credentials",
    locked: true,
  },
  {
    id: "enable-2fa",
    icon: <ShieldCheckIcon />,
    title: "Enable 2FA",
    description: "Already active on your account",
    locked: true,
  },
];

export default function ProfileOverviewPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto space-y-5 p-6">
        <div>
          <Typography variant="h4">Profile Overview</Typography>
          <Typography variant="body-2">
            Manage your account and security at a glance
          </Typography>
        </div>

        <ProfileHeader user={sampleUser} />
        <SecurityStatus cards={sampleSecurityCards} />
        <QuickActions actions={sampleActions} />
      </div>
    </main>
  );
}
