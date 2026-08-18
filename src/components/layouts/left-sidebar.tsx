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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "../common/typography/typography";
import { useLayout } from "@/providers/layout-provider";
import { AgentsPanel } from "./agents-panel";

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

/* ── Set to false to disable collapse/expand and always keep the sidebar expanded ── */
const SIDEBAR_COLLAPSIBLE = true;

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
  const { state, toggleLeftSidebar } = useLayout();
  const isCollapsed = SIDEBAR_COLLAPSIBLE ? !state.isLeftSidebarOpen : false;

  const isActive = (href: string) => {
    if (href === "/dashboard")
      return pathname === "/dashboard" || pathname === "/";
    return pathname.startsWith(href);
  };

  const renderNavItem = (item: NavItem) => (
    <Link
      key={item.href}
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
        isCollapsed && "justify-center px-2",
        isActive(item.href)
          ? "bg-offer-primary text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
      title={isCollapsed ? item.label : undefined}
    >
      <span
        className={cn(
          "shrink-0",
          isActive(item.href) ? "text-primary" : "text-muted-foreground",
        )}
      >
        {item.icon}
      </span>
      {(!isCollapsed || !SIDEBAR_COLLAPSIBLE) && (
        <>
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <span className="flex justify-center items-center px-1.5 h-5 text-xs font-medium text-white bg-red-500 rounded-full min-w-5">
              {item.badge}
            </span>
          )}
        </>
      )}
      {isCollapsed && item.badge && (
        <span className="absolute -top-1 -right-1 flex justify-center items-center px-1 h-4 text-[10px] font-medium text-white bg-red-500 rounded-full min-w-4">
          {item.badge}
        </span>
      )}
    </Link>
  );

  return (
    <aside
      className={cn(
        "flex fixed top-0 left-0 z-40 flex-col h-screen border-r border-border bg-background transition-[width] duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo Section */}
      <div className="flex flex-col gap-2">
        <Link href="/" className={cn("flex", isCollapsed && "justify-center")}>
          <Image
            src="/logo.png"
            alt="E-Crystal Logo"
            width={isCollapsed ? 32 : 100}
            height={isCollapsed ? 32 : 100}
            className={cn(
              "object-contain py-2",
              isCollapsed ? "w-8 h-14" : "w-full h-14",
              "border-b",
            )}
            priority
          />
        </Link>

        {!isCollapsed && (
          <div className="h-10 border-b flex items-center">
            <Typography variant="caption-2" className="px-2">
              Outsource the Noise. Keep the Intelligence™
            </Typography>
          </div>
        )}
      </div>

      {/* Middle: nav on top + AI agents below.
          The grid rows animate 1fr ↔ 0fr so the agents panel collapses
          downward smoothly and the nav grows to fill the space.
          Each part scrolls independently (overscroll contained). */}
      <div
        className={cn(
          "flex-1 min-h-0 grid transition-[grid-template-rows] duration-300 ease-in-out",
          isCollapsed
            ? "grid-rows-[1fr]"
            : state.isAgentsPanelOpen
              ? "grid-rows-[1fr_auto_1fr]"
              : "grid-rows-[1fr_auto_0fr]",
        )}
      >
        {/* Navigation — top half, own scrollbar */}
        <nav className="overflow-y-auto overscroll-contain relative py-4 px-3 min-h-0">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="relative">
                {renderNavItem(item)}
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-4 border-t border-border" />

          {/* Secondary Navigation */}
          <ul className="space-y-1">
            {SECONDARY_NAV_ITEMS.map((item) => (
              <li key={item.href} className="relative">
                {renderNavItem(item)}
              </li>
            ))}
          </ul>
        </nav>

        {/* AI Agents — bottom half, collapsible, own scrollbar */}
        {!isCollapsed && <AgentsPanel />}
      </div>

      {/* Collapse / Expand Toggle Button */}
      {SIDEBAR_COLLAPSIBLE && (
        <div className="border-t border-border p-2">
          <button
            onClick={toggleLeftSidebar}
            className={cn(
              "flex items-center justify-center w-full py-2 rounded-lg text-sm font-medium transition-colors",
              "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-5 h-5" />
                <span>Collapse</span>
              </div>
            )}
          </button>
        </div>
      )}
    </aside>
  );
}
