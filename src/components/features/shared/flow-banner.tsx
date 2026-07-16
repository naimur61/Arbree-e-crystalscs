"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Activity,
  ArrowRight,
  Download,
  LayoutDashboard,
  LucideIcon,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";

type PageType = "dashboard" | "discover" | "activate" | "pulse" | "evolve";

interface FlowBannerProps {
  currentPage: PageType;
}

const STEPS: Record<
  PageType,
  {
    icon: LucideIcon;
    title: string;
    desc: string;
    header: string;
    subtitle: string;
  }
> = {
  dashboard: {
    icon: LayoutDashboard,
    title: "DASHBOARD",
    desc: "Overview of your entire supplier intelligence ecosystem",
    header: "Dashboard - Supplier Intelligence Hub",
    subtitle: "Your central view across all stages of the flow",
  },
  discover: {
    icon: Search,
    title: "DISCOVER",
    desc: "Reveal your supplier ecosystem. Identify geographic roles and dependencies",
    header: "Discover - Supplier Intelligence Universe",
    subtitle: "Map, classify, and assess supplier ecosystem",
  },
  activate: {
    icon: Zap,
    title: "ACTIVATE",
    desc: "Prioritize relationships. Assess criticality and map dependencies",
    header: "Activate - Ecosystem Intelligence",
    subtitle: "See the relationships behind supplier risk",
  },
  pulse: {
    icon: Activity,
    title: "PULSE",
    desc: "Monitor risk in real time. Track signals, threats and emerging changes",
    header: "Pulse - Real-Time Supplier Insights",
    subtitle:
      "Monitor risk in real time Track signals, threats and emerging changes.",
  },
  evolve: {
    icon: TrendingUp,
    title: "EVOLVE",
    desc: "Turn insight into action. Improve resilience and optimize outcomes",
    header: "Evolve - Executive Decision Intelligence",
    subtitle:
      "Turn insight into action. Lead with confidence. Board-ready intelligence.",
  },
};

const ORDER: PageType[] = ["discover", "activate", "pulse", "evolve"];

const ROUTES: Record<PageType, string> = {
  dashboard: "/dashboard",
  discover: "/discover",
  activate: "/activate",
  pulse: "/pulse",
  evolve: "/evolve",
};

export function FlowBanner({ currentPage }: FlowBannerProps) {
  const router = useRouter();
  const { header, subtitle } = STEPS[currentPage];
  const isDashboard = currentPage === "dashboard";

  return (
    <div className="mb-4 space-y-4">
      {/* Header */}
      {!isDashboard && (
        <div className="flex justify-between">
          <div>
            <p className="mb-2 text-xl font-bold text-primary">{header}</p>
            <p className="text-xs text-secondary">{subtitle}</p>
          </div>
          {currentPage === "evolve" && (
            <button className="flex gap-2 items-center py-2 px-6 font-semibold bg-emerald-700 rounded-lg transition-colors hover:bg-emerald-800 text-primary">
              <Download className="w-4 h-4" />
              Export
            </button>
          )}
        </div>
      )}

      {/* Flow Steps */}
      <div className="p-4 rounded-2xl border shadow-sm bg-primary border-primary">
        <p className="mb-2 text-xl font-semibold text-center text-success-primary">
          e-CRYSTAL FLOW™
        </p>
        <p className="mb-6 text-sm text-center text-secondary">
          A continuous journey from insight to impact
        </p>

        <div className="flex gap-4 justify-between items-center">
          {ORDER.map((key, i) => {
            const step = STEPS[key];
            const active = key === currentPage;
            const dashboard = currentPage === "dashboard";
            const isActive = active || dashboard;
            const Icon = step.icon;

            return (
              <div key={key} className="flex flex-1 gap-4 items-center">
                <div
                  role="link"
                  tabIndex={isActive ? 0 : -1}
                  aria-disabled={!isActive}
                  aria-label={`Go to ${step.title}`}
                  onClick={() => isActive && router.push(ROUTES[key])}
                  onKeyDown={(e) => {
                    if (isActive && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      router.push(ROUTES[key]);
                    }
                  }}
                  className={cn(
                    "flex-1 rounded-lg border p-4 h-19 flex items-center gap-3 transition-all duration-300",
                    isActive
                      ? "cursor-pointer bg-success-primary border-success-primary hover:opacity-90"
                      : "cursor-default bg-success-secondary border-success-secondary opacity-70 blur-[3px]",
                  )}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive ? "bg-success-primary" : "bg-success-secondary"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? "text-success-primary"
                          : "text-success-secondary"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-primary">
                      {step.title}
                    </p>
                    <p className="text-[9px] text-secondary">{step.desc}</p>
                  </div>
                </div>

                {i < ORDER.length - 1 && (
                  <ArrowRight
                    className={`w-5 h-5 shrink-0 text-emerald-400 ${
                      isActive ? "block" : "hidden"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
