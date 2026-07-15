"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Zap,
  Music,
  TrendingUp,
  Building2,
  Bell,
  FileText,
  Settings,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "../common/typography/typography";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Executive Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "Discover",
    href: "/discover",
    icon: <Compass className="w-5 h-5" />,
  },
  {
    label: "Activate",
    href: "/activate",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    label: "Pulse",
    href: "/pulse",
    icon: <Music className="w-5 h-5" />,
    badge: 5,
  },
  {
    label: "Evolve",
    href: "/evolve",
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

const SECONDARY_NAV_ITEMS: NavItem[] = [
  {
    label: "Suppliers",
    href: "/suppliers",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    label: "Alerts",
    href: "/alerts",
    icon: <Bell className="w-5 h-5" />,
    badge: 5,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: "Design Guide",
    href: "/guide",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export function LeftSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard")
      return pathname === "/dashboard" || pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex fixed top-0 left-0 z-40 flex-col w-64 h-screen border-r border-border bg-background">
      {/* Logo Section */}
      <div className="flex flex-col gap-2">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="E-Crystal Logo"
            width={100}
            height={100}
            className="object-contain py-2 w-full h-14 border-b"
            priority
          />
        </Link>

        <div className="h-10 border-b">
          <Typography variant="caption-2" className="px-2">
            Outsource the Noise. Keep the Intelligence™
          </Typography>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="overflow-y-auto flex-1 py-4 px-3">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-offer-primary text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "shrink-0",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="flex justify-center items-center px-1.5 h-5 text-xs font-medium text-white bg-red-500 rounded-full min-w-5">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="my-4 border-t border-border" />

        {/* Secondary Navigation */}
        <ul className="space-y-1">
          {SECONDARY_NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "shrink-0",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="flex justify-center items-center px-1.5 h-5 text-xs font-medium text-white bg-red-500 rounded-full min-w-5">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
