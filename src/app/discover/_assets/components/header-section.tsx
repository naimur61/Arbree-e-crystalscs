"use client";

import { Search, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";

export function HeaderSection() {
  return (
    <div className="space-y-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Discover - Supplier Intelligence Universe
        </h1>
        <p className="text-secondary">
          Map, classify, and assess supplier ecosystem
        </p>
      </div>

      <div className="bg-primary rounded-xl border border-primary p-6 shadow-sm">
        <h2 className="text-center text-lg font-semibold text-success-primary mb-2">
          e-CRYSTAL FLOW™
        </h2>
        <p className="text-center text-secondary text-sm mb-6">
          A continuous journey from insight to impact
        </p>

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 bg-emerald-50 rounded-lg border border-emerald-200 p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center">
              <Search className="w-4 h-4 text-success-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary">DISCOVER</h3>
              <p className="text-xs text-secondary">
                Reveal your supplier ecosystem Identify geographic roles and
                dependencies
              </p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-400" />

          <Link
            href="/activate"
            className="flex-1 bg-emerald-50 rounded-lg border border-emerald-200 p-4 flex items-center gap-3 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center">
              <Zap className="w-4 h-4 text-success-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary">ACTIVATE</h3>
              <p className="text-xs text-secondary">
                Prioritize relationships Assess criticality and map dependencies
              </p>
            </div>
          </Link>

          <ChevronRight className="w-5 h-5 text-gray-400" />
          <div className="flex-1 bg-gray-100 rounded-lg p-4 h-20" />
          <ChevronRight className="w-5 h-5 text-gray-400" />
          <div className="flex-1 bg-gray-100 rounded-lg p-4 h-20" />
        </div>
      </div>
    </div>
  );
}
