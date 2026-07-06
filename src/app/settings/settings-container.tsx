'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  UserRound,
  Building2,
  Shield,
  KeyRound,
  Smartphone,
  Users,
  Settings,
  Bell,
  CreditCard,
  IdCard,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Profile Overview',
    href: '/settings/profile',
    icon: <UserRound size={16} />,
  },
  {
    label: 'Personal Information',
    href: '/settings/personal-information',
    icon: <IdCard size={16} />,
  },
  {
    label: 'Business Information',
    href: '/settings/business-information',
    icon: <Building2 size={16} />,
  },
  {
    label: 'Security',
    href: '/settings/security',
    icon: <Shield size={16} />,
  },
  {
    label: 'Change Password',
    href: '/settings/change-password',
    icon: <KeyRound size={16} />,
  },
  {
    label: 'Two-Factor Auth',
    href: '/settings/two-factor-auth',
    icon: <Smartphone size={16} />,
  },
  {
    label: 'Subscription',
    href: '/settings/subscription',
    icon: <CreditCard size={16} />,
  },
  {
    label: 'Notifications',
    href: '/settings/notifications',
    icon: <Bell size={16} />,
  },
  {
    label: 'Team & Roles',
    href: '/settings/team-roles',
    icon: <Users size={16} />,
  },
  {
    label: 'Preferences',
    href: '/settings/preferences',
    icon: <Settings size={16} />,
  },
];

export default function SettingsContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r bg-green-50 p-4 lg:w-60">
        <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-green-700">
          Settings
        </h2>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-green-600 text-white font-semibold'
                  : 'text-slate-600 hover:bg-green-600 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-green-50 p-4 md:p-6">{children}</main>
    </div>
  );
}
