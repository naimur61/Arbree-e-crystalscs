"use client";

import {
  Activity,
  ArrowRight,
  Download,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";

type PageType = "discover" | "activate" | "pulse" | "evolve";

interface FlowBannerProps {
  currentPage: PageType;
}

export function FlowBanner({ currentPage }: FlowBannerProps) {
  const isActive = (page: PageType) => currentPage === page;

  const pageConfig = {
    discover: {
      title: "Discover - Supplier Intelligence Universe",
      subtitle: "Map, classify, and assess supplier ecosystem",
    },
    activate: {
      title: "Activate - Ecosystem Intelligence",
      subtitle: "See the relationships behind supplier risk",
    },
    pulse: {
      title: "Pulse - Real-Time Supplier Insights",
      subtitle:
        "Monitor risk in real time Track signals, threats and emerging changes.",
    },
    evolve: {
      title: "Evolve - Executive Decision Intelligence",
      subtitle:
        "Turn insight into action. Lead with confidence. Board-ready intelligence.",
    },
  };

  const config = pageConfig[currentPage];

  return (
    <div className="space-y-4 mb-4">
      <div className="flex justify-between">
        <div>
          <h6 className="text-xl font-bold text-gray-900 mb-2">
            {config.title}
          </h6>
          <p className="text-gray-600 text-xs">{config.subtitle}</p>
        </div>
        {/* Export Button */}
        {currentPage === "evolve" && (
          <div className="flex justify-end mb-6">
            <button className="bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-emerald-800 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[8px] border border-gray-200 p-4 shadow-sm">
        <h2 className="text-center text-xl font-semibold text-emerald-700 mb-2">
          e-CRYSTAL FLOW™
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          A continuous journey from insight to impact
        </p>

        <div className="flex items-center justify-between gap-4">
          {/* DISCOVER */}
          <div
            className={`flex-1 rounded-lg border p-4 flex items-center gap-3 transition-all duration-300 ${
              isActive("discover")
                ? "bg-emerald-50 border-emerald-200"
                : "bg-emerald-50 border-emerald-200 opacity-70 blur-[3px]"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive("discover") ? "bg-emerald-200" : "bg-emerald-200"
              }`}
            >
              <Search
                className={`w-4 h-4 ${
                  isActive("discover") ? "text-emerald-700" : "text-gray-500"
                }`}
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-base text-gray-900">DISCOVER</p>
              <p className="text-[9px] text-gray-600">
                Reveal your supplier ecosystem Identify geographic roles and
                dependencies
              </p>
            </div>
          </div>

          <ArrowRight
            className={`w-5 h-5 text-emerald-400 ${isActive("discover") ? "block" : "hidden"}`}
          />

          {/* ACTIVATE */}
          <div
            className={`flex-1 rounded-lg border p-4 flex items-center gap-3 transition-all duration-300 ${
              isActive("activate")
                ? "bg-emerald-50 border-emerald-200"
                : "bg-emerald-50 border-emerald-200 opacity-70 blur-[3px]"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive("activate") ? "bg-emerald-200" : "bg-emerald-200"
              }`}
            >
              <Zap
                className={`w-4 h-4 ${
                  isActive("activate") ? "text-emerald-700" : "text-gray-500"
                }`}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-base">
                ACTIVATE
              </h3>
              <p className="text-[9px] text-gray-600">
                Prioritize relationships Assess criticality and map dependencies
              </p>
            </div>
          </div>

          <ArrowRight
            className={`w-5 h-5 text-emerald-400 ${isActive("activate") ? "block" : "hidden"}`}
          />
          {/* Pulse */}
          <div
            className={`flex-1 rounded-lg border p-4 flex items-center gap-3 transition-all duration-300 ${
              isActive("pulse")
                ? "bg-emerald-50 border-emerald-200"
                : "bg-emerald-50 border-emerald-200 opacity-70 blur-[3px]"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive("pulse") ? "bg-emerald-200" : "bg-emerald-200"
              }`}
            >
              <Activity
                className={`w-4 h-4 ${
                  isActive("pulse") ? "text-emerald-700" : "text-gray-500"
                }`}
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-base text-gray-900">PULSE</p>
              <p className="text-[9px] text-gray-600">
                Monitor risk in real time Track signals, threats and emerging
                changes.
              </p>
            </div>
          </div>
          <ArrowRight
            className={`w-5 h-5 text-emerald-400 ${isActive("pulse") ? "block" : "hidden"}`}
          />

          {/* EVOLVE */}
          <div
            className={`flex-1 rounded-lg border p-4 flex items-center gap-3 transition-all duration-300 ${
              isActive("evolve")
                ? "bg-emerald-50 border-emerald-200"
                : "bg-emerald-50 border-emerald-200 opacity-70 blur-[3px]"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive("evolve") ? "bg-emerald-200" : "bg-emerald-200"
              }`}
            >
              <TrendingUp
                className={`w-4 h-4 ${
                  isActive("evolve") ? "text-emerald-700" : "text-gray-500"
                }`}
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-base text-gray-900">EVOLVE</p>
              <p className="text-[9px] text-gray-600">
                Turn insight into action Improve resilience and optimize
                outcomes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
