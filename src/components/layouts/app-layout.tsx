"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useLayout } from "@/providers/layout-provider";
import { cn } from "@/lib/utils";
import { TopNavbar } from "./top-navbar";
import { LeftSidebar } from "./left-sidebar";

/* ── AppLayout: auth routes get no chrome, app routes get header + sidebar shells ── */

/** Routes that bypass the global layout. Supports exact match and '/auth/*' wildcard. */
const EXCLUDED_PATHS = [
  "/login",
  "/register",
  "/auth/*",
  "/forgot-password",
  "/reset-password",
];

function isPathExcluded(pathname: string): boolean {
  return EXCLUDED_PATHS.some((pattern) => {
    if (pattern.endsWith("/*")) {
      return pathname.startsWith(pattern.slice(0, -2));
    }
    return pathname === pattern;
  });
}

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

/** Renders the app chrome (header, sidebar containers). */
function LayoutInner({ children, title, subtitle }: AppLayoutProps) {
  const { state } = useLayout();

  return (
    <div className="min-h-screen bg-background">
      <LeftSidebar />
      {/* Main content area — shifts when the sidebar opens/closes */}
      <div
        className={cn(
          "flex min-h-screen flex-col transition-[margin] duration-300 overflow-x-clip",
          state.isLeftSidebarOpen ? "ml-64" : "ml-16",
        )}
      >
        <TopNavbar
          title={title || "e-Crystal"}
          subtitle={subtitle || "Premium crystals for every collection."}
        />

        <main className="flex-1 p-4 bg-children-body">{children}</main>
      </div>
    </div>
  );
}

/** Public API: auth pages get bare children, all others get full chrome. */
export function AppLayout({ children, ...props }: AppLayoutProps) {
  const pathname = usePathname();

  if (isPathExcluded(pathname)) {
    return <>{children}</>;
  }

  return <LayoutInner {...props}>{children}</LayoutInner>;
}
