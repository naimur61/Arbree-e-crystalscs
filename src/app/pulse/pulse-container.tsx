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

export default function PulseContainer() {
  return (
    <div className="min-h-screen bg-[#f4faf5] p-4 text-[13px] text-slate-800">
      <div className="mx-auto max-w-[1400px] space-y-3">
        <HeaderCard />
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
