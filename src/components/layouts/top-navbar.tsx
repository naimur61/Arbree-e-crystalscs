"use client";

/* ── TopNavbar: sticky header with title, search, theme toggle, avatar, sidebar toggle ── */

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Bell,
  Search,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { useLayout } from "@/providers/layout-provider";
import { Button } from "../ui/button";

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
      <div className="flex justify-between items-center px-6 h-16">
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
          <button className="flex gap-2 items-center py-1.5 px-3 text-sm rounded-lg transition-colors text-muted-foreground bg-muted hover:bg-accent">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg transition-colors text-muted-foreground hover:bg-accent">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Theme Toggle — placeholder box until mounted to avoid hydration mismatch */}
          {mounted ? (
            <Button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="p-2 transition-colors text-muted-foreground"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          ) : (
            <div className="size-8" />
          )}

          {/* User Avatar */}
          <button className="flex justify-center items-center w-9 h-9 text-sm font-medium text-white rounded-full bg-primary">
            SC
          </button>

          {/* Toggle Right Sidebar */}
          <Button
            variant={state.isRightSidebarOpen ? "default" : "outline"}
            size="sm"
            onClick={toggleRightSidebar}
            className="ml-2"
          >
            {state.isRightSidebarOpen ? (
              <PanelRightClose className="w-4 h-4" />
            ) : (
              <PanelRightOpen className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
