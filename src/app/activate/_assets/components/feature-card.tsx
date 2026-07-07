"use client";

import { Zap, ChevronRight } from "lucide-react";

export function FeatureCard() {
  return (
    <div className="border-2 border-emerald-600 rounded-xl bg-emerald-50/30 p-6 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-4 mb-4">
          <h3 className="text-lg font-bold text-gray-900">e-CRYSTAL FLOW™</h3>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">
            Activate
          </span>
        </div>
        <p className="text-gray-700 text-sm font-medium">
          A continuous journey from insight to impact
        </p>

        {/* Feature details */}
        <div className="mt-4">
          <div className="flex items-center gap-3 bg-white border border-emerald-300 rounded-lg p-4">
            <Zap className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">ACTIVATE</p>
              <p className="text-xs text-gray-600">
                Prioritize what matters most. Assess criticality and map
                relationships.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-emerald-600 flex-shrink-0 ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
