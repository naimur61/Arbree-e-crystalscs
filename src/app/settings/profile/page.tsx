"use client";

import ProfileHeader from "./components/ProfileHeader";
import ContactInfoBar from "./components/contact-info-bar";
import SecurityStatus from "./components/security-status";
import QuickActions from "./components/quick-actions";
import {
  ShieldIcon,
  KeyIcon,
  MonitorIcon,
  ClockIcon,
} from "./components/icons";
import { UserIcon, LockRotateIcon, ShieldCheckIcon } from "./components/icons";
import type { ProfileUser, SecurityCardData, QuickAction } from "./types";

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
    icon: <ShieldIcon />,
    label: "Two-Factor Auth",
    value: "Enabled",
    tone: "good",
  },
  {
    id: "password",
    icon: <KeyIcon />,
    label: "Password",
    value: "Update in 12 days",
    tone: "warning",
  },
  {
    id: "sessions",
    icon: <MonitorIcon />,
    label: "Active Sessions",
    value: "3 devices",
    tone: "neutral",
  },
  {
    id: "last-login",
    icon: <ClockIcon />,
    label: "Last Login",
    value: "Today, 09:42",
    tone: "neutral",
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
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto space-y-5 p-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Profile Overview
          </h1>
          <p className="text-sm text-gray-500">
            Manage your account and security at a glance
          </p>
        </div>

        <ProfileHeader user={sampleUser} />
        <ContactInfoBar user={sampleUser} />
        <SecurityStatus cards={sampleSecurityCards} />
        <QuickActions actions={sampleActions} />
      </div>
    </main>
  );
}
