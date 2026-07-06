'use client';

import type { ReactNode } from 'react';

type UserRole = 'OWNER' | 'ADMIN' | 'EDITOR' | 'VIEWER';

interface ProfileUser {
  name: string;
  initials: string;
  isActiveNow: boolean;
  role: UserRole;
  jobTitle: string;
  email: string;
  company: string;
}

type SecurityCardTone = 'good' | 'warning' | 'neutral';

interface SecurityCardData {
  id: string;
  icon: ReactNode;
  label: string;
  value: string;
  tone: SecurityCardTone;
}

interface QuickAction {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  locked?: boolean;
  onClick?: () => void;
}

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <path d="M9 22v-4h6v4M9 6h1M14 6h1M9 10h1M14 10h1M9 14h1M14 14h1" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
  </svg>
);
const KeyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="8" cy="15" r="4" />
    <path d="m10.5 12.5 8-8M16 6l2 2M19 3l2 2" />
  </svg>
);
const MonitorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const LockRotateIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);
const ShieldCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const LockIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    className="text-amber-500"
  >
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

function ProfileHeader({ user }: { user: ProfileUser }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-sm font-semibold text-white">
          {user.initials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{user.name}</span>
            {user.isActiveNow && (
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active now
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{user.jobTitle}</p>
        </div>
      </div>
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
        {user.role}
      </span>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-emerald-600">{icon}</span>
      <div className="leading-tight">
        <p className="text-[11px] uppercase tracking-wide text-emerald-700/70">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function ContactInfoBar({ user }: { user: ProfileUser }) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl bg-emerald-50 p-4 sm:grid-cols-3">
      <InfoItem icon={<MailIcon />} label="Email" value={user.email} />
      <InfoItem icon={<BriefcaseIcon />} label="Job Title" value={user.jobTitle} />
      <InfoItem icon={<BuildingIcon />} label="Company" value={user.company} />
    </div>
  );
}

const toneStyles: Record<SecurityCardTone, string> = {
  good: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  warning: 'bg-amber-50 border-amber-200 text-amber-700',
  neutral: 'bg-gray-50 border-gray-200 text-gray-700',
};

function StatusCard({ card }: { card: SecurityCardData }) {
  return (
    <div className={`flex flex-col gap-2 rounded-xl border p-4 ${toneStyles[card.tone]}`}>
      <div className="flex items-center gap-2 text-sm font-medium">
        {card.icon}
        {card.label}
      </div>
      <p className="text-sm font-semibold">{card.value}</p>
    </div>
  );
}

function SecurityStatus({
  cards,
  standingLabel = 'Good standing',
}: {
  cards: SecurityCardData[];
  standingLabel?: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">Security Status</h2>
          <p className="text-sm text-gray-500">Current state of your account security</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {standingLabel}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((card) => (
          <StatusCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   COMPONENT: QuickActions
   "Quick Actions" grid (Edit Profile, Change Password, Enable 2FA)
   ========================================================================= */

function ActionCard({ action }: { action: QuickAction }) {
  return (
    <button
      type="button"
      onClick={action.onClick}
      disabled={action.locked}
      className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:border-emerald-200 hover:shadow disabled:cursor-not-allowed disabled:opacity-80"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
        {action.icon}
      </span>
      <span className="flex-1">
        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
          {action.title}
          {action.locked && <LockIcon />}
        </span>
        <span className="block text-xs text-gray-500">{action.description}</span>
      </span>
    </button>
  );
}

function QuickActions({
  actions,
  restrictedRoleLabel = 'Viewer',
}: {
  actions: QuickAction[];
  restrictedRoleLabel?: string;
}) {
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

/* =========================================================================
   SAMPLE DATA — replace with real data from your API/auth/session layer
   ========================================================================= */

const sampleUser: ProfileUser = {
  name: 'Sarah Chen',
  initials: 'SC',
  isActiveNow: true,
  role: 'VIEWER',
  jobTitle: 'Risk & Compliance Analyst',
  email: 'sarah.chen@crystal.io',
  company: 'Crystal Financial Group',
};

const sampleSecurityCards: SecurityCardData[] = [
  { id: '2fa', icon: <ShieldIcon />, label: 'Two-Factor Auth', value: 'Enabled', tone: 'good' },
  {
    id: 'password',
    icon: <KeyIcon />,
    label: 'Password',
    value: 'Update in 12 days',
    tone: 'warning',
  },
  {
    id: 'sessions',
    icon: <MonitorIcon />,
    label: 'Active Sessions',
    value: '3 devices',
    tone: 'neutral',
  },
  {
    id: 'last-login',
    icon: <ClockIcon />,
    label: 'Last Login',
    value: 'Today, 09:42',
    tone: 'neutral',
  },
];

const sampleActions: QuickAction[] = [
  {
    id: 'edit-profile',
    icon: <UserIcon />,
    title: 'Edit Profile',
    description: 'Update name and details',
    locked: true,
  },
  {
    id: 'change-password',
    icon: <LockRotateIcon />,
    title: 'Change Password',
    description: 'Rotate your credentials',
  },
  {
    id: 'enable-2fa',
    icon: <ShieldCheckIcon />,
    title: 'Enable 2FA',
    description: 'Already active on your account',
    locked: true,
  },
];

/* =========================================================================
   PAGE — composes everything
   ========================================================================= */

export default function ProfileOverviewPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto space-y-5 p-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Profile Overview</h1>
          <p className="text-sm text-gray-500">Manage your account and security at a glance</p>
        </div>

        <ProfileHeader user={sampleUser} />
        <ContactInfoBar user={sampleUser} />
        <SecurityStatus cards={sampleSecurityCards} />
        <QuickActions actions={sampleActions} />
      </div>
    </main>
  );
}
