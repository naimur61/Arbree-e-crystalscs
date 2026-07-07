"use client";

/* ── TopNavbar: sticky header with title, search, theme toggle, avatar, sidebar toggle ── */

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Bell, Search, ChevronLeft } from "lucide-react";

import { useLayout } from "@/providers/layout-provider";
import { ActionButton } from "@/components/common/button";

interface TopNavProps {
  title: string;
  subtitle?: string;
}

export function TopNavbar({ title, subtitle }: TopNavProps) {
  const { toggleRightSidebar, state } = useLayout();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-lg supports-backdrop-filter:bg-background/60">
      <div className="flex justify-between items-center px-3 h-14">
        {/* Left: Page Title */}
        <div className="flex flex-col">
          <h4 className="font-semibold text-foreground">{title}</h4>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex gap-2 items-center">
          {/* Search */}
          <ActionButton
            variant="ghost"
            btnStyle="bg-muted text-muted-foreground px-3 h-8"
            radius="lg"
            iconSize="sm"
            icon={<Search />}
            buttonContent="Search"
          />

          {/* Notifications */}
          <div className="relative">
            <ActionButton
              variant="icon"
              size="icon-sm"
              tooltipContent="Notifications"
              icon={<Bell />}
            />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </div>

          {/* Theme Toggle — placeholder box until mounted to avoid hydration mismatch */}
          {mounted ? (
            <ActionButton
              variant="icon"
              size="icon-sm"
              tooltipContent={
                resolvedTheme === "dark"
                  ? "Switch to day mode"
                  : "Switch to night mode"
              }
              handleOpen={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              icon={resolvedTheme === "dark" ? <Sun /> : <Moon />}
            />
          ) : (
            <div className="size-8" />
          )}

          {/* User Avatar */}
          <ActionButton
            variant="default"
            radius="full"
            btnStyle="w-9 h-9 !px-0 bg-success-secondary shadow-none"
            buttonContent="SC"
          />

          {/* Toggle Right Sidebar */}
          <ActionButton
            hidden={state.isRightSidebarOpen}
            variant="icon"
            radius="full"
            tooltipContent="Toggle sidebar"
            handleOpen={toggleRightSidebar}
            icon={<ChevronLeft className="text-secondary" strokeWidth={3} />}
          />
        </div>
      </div>
    </header>
  );
}