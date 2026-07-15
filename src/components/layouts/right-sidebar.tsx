"use client";

import { X, PieChart, Zap, Shield, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useLayout } from "@/providers/layout-provider";

interface AIAgent {
  name: string;
  description: string;
  action: string;
  icon: React.ReactNode;
  color: string;
}

const AI_AGENTS: AIAgent[] = [
  {
    name: "Orion",
    description:
      "Always scanning the space, finding patterns, and uncovering hidden data points.",
    action: "Insight",
    icon: <PieChart className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Nova",
    description:
      "A sudden, bright burst of energy that triggers actions and brings things to life.",
    action: "Act",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Pulsar",
    description:
      "Named after the cosmic clocks of the universe; keeps the steady, real-time beat and monitors health.",
    action: "Protect",
    icon: <Shield className="w-6 h-6" />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Nebula",
    description:
      "Where new stars are born; handles continuous growth, adaptation, and shaping the future.",
    action: "Improve",
    icon: <RefreshCw className="w-6 h-6" />,
    color: "bg-orange-100 text-orange-600",
  },
];

const ACTION_COLORS: Record<string, string> = {
  Insight: "bg-blue-500 hover:bg-blue-600",
  Act: "bg-green-500 hover:bg-green-600",
  Protect: "bg-purple-500 hover:bg-purple-600",
  Improve: "bg-orange-500 hover:bg-orange-600",
};

export function RightSidebar() {
  const { state, toggleRightSidebar } = useLayout();

  return (
    <aside
      className={cn(
        "fixed right-0 top-0 z-40 h-screen w-72 border-l border-border bg-background transition-all duration-300",
        state.isRightSidebarOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center px-4 h-14 border-b">
          <div>
            <h2 className="text-sm font-bold text-foreground">
              e-CRYSTAL AI AGENTS
            </h2>
            <p className="text-xs text-muted-foreground">
              Intelligence working for you, 24/7.
            </p>
          </div>

          <button
            onClick={toggleRightSidebar}
            className="p-1 rounded transition-colors text-muted-foreground hover:bg-accent"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* AI Agents List */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {AI_AGENTS.map((agent) => (
            <div
              key={agent.name}
              className="p-4 rounded-xl border transition-shadow hover:shadow-md border-border bg-card"
            >
              <div className="flex gap-3 items-start">
                {/* Agent Icon */}
                <div className={cn("shrink-0 p-2 rounded-lg", agent.color)}>
                  {agent.icon}
                </div>

                {/* Agent Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">
                    {agent.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {agent.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end mt-3">
                <Button
                  size="sm"
                  className={cn(
                    "text-white text-xs px-4 py-1.5 rounded-full",
                    ACTION_COLORS[agent.action],
                  )}
                >
                  {agent.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
