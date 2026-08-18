"use client";

import { HeaderCard } from "@/components/features/pulse/header-card";
import { StatCards } from "@/components/features/pulse/stat-card";
import { GaugeCards } from "@/components/features/pulse/gauge-card";
import { HeatmapCard } from "@/components/features/pulse/heatmap-card";
import { RecommendedActions } from "@/components/features/pulse/recommended-actions";
import { AlertsCard } from "@/components/features/pulse/alerts-card";
import { BlastRadiusCard } from "@/components/features/pulse/blast-radius-card";
import { IntelligenceHighlights } from "@/components/features/pulse/intelligence-highlights";
import { SignalSources } from "@/components/features/pulse/signal-sources";
import { AlertFeed } from "@/components/features/pulse/alert-feed";
import { FlowBanner } from "@/components/features/shared/flow-banner";

export default function PulseContainer() {
  return (
    <div>
      <div className="space-y-3">
        <HeaderCard />
        <FlowBanner currentPage="pulse" />
        <StatCards />
        <GaugeCards />
        <div className="grid grid-cols-2 gap-3">
          <HeatmapCard />
          <RecommendedActions />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <AlertsCard />
          <BlastRadiusCard />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <IntelligenceHighlights />
          <SignalSources />
        </div>
        <AlertFeed />
      </div>
    </div>
  );
}
