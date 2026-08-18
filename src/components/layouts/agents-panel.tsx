"use client";

import { ChevronDown, PieChart, RefreshCw, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ActionButton } from "@/components/common/button/action-button";
import { useLayout } from "@/providers/layout-provider";
import { CardContainer } from "../common/card/Card";

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
    color: "bg-orange-100 text-warning-primary",
  },
];

const ACTION_COLORS: Record<string, string> = {
  Insight: "bg-blue-500 hover:bg-blue-600",
  Act: "bg-green-500 hover:bg-green-600",
  Protect: "bg-purple-500 hover:bg-purple-600",
  Improve: "bg-orange-500 hover:bg-orange-600",
};

/**
 * AgentsPanel — the bottom half of the left sidebar.
 *
 * Renders TWO direct children of the sidebar's animated grid:
 *  1. an always-visible header bar with the collapse toggle
 *  2. the agents list inside a `0fr ↔ 1fr` grid row that smoothly
 *     collapses downward / expands back, scrolling independently.
 */
export function AgentsPanel() {
  const { state, toggleAgentsPanel } = useLayout();
  const open = state.isAgentsPanelOpen;

  return (
    <>
      {/* Header bar — stays visible so the panel can be re-opened */}
      <div className="flex shrink-0 justify-between items-center gap-2 px-3 py-2 border-t border-border">
        <div className="min-w-0">
          <h2 className="text-xs font-bold truncate text-foreground">
            e-CRYSTAL AI AGENTS
          </h2>
          <p className="text-[11px] truncate text-muted-foreground">
            Intelligence working for you, 24/7.
          </p>
        </div>
        <ActionButton
          type="button"
          variant="ghost"
          size="icon-sm"
          tooltipContent={open ? "Collapse agents" : "Expand agents"}
          icon={
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-300",
                !open && "rotate-180",
              )}
            />
          }
          handleOpen={toggleAgentsPanel}
          btnStyle="p-1 rounded text-muted-foreground hover:bg-accent"
        />
      </div>

      {/* Collapsible list — height animated by the parent grid row (1fr ↔ 0fr) */}
      <div className="min-h-0 overflow-hidden">
        <div
          className={cn(
            "overflow-y-auto overscroll-contain px-3 pb-3 space-y-3 h-full transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        >
          {AI_AGENTS.map((agent) => (
            <CardContainer key={agent.name} className="bg-success-primary">
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
                    "px-4 py-1.5 text-xs text-white rounded-full",
                    ACTION_COLORS[agent.action],
                  )}
                >
                  {agent.action}
                </Button>
              </div>
            </CardContainer>
          ))}
        </div>
      </div>
    </>
  );
}
