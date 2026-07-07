"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

function WaveChart() {
  return (
    <svg
      viewBox="0 0 400 140"
      preserveAspectRatio="none"
      className="w-full h-32"
    >
      <defs>
        <linearGradient id="brief-wave" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path
        d="M 0 140 L 0 100 C 40 40, 90 40, 140 75 C 175 100, 195 100, 220 75 C 250 45, 290 40, 400 40 L 400 140 Z"
        fill="url(#brief-wave)"
      />
      <path
        d="M 0 100 C 40 40, 90 40, 140 75 C 175 100, 195 100, 220 75 C 250 45, 290 40, 400 40"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function ExecutiveBrief() {
  return (
    <div className="bg-white rounded-[8px] border border-gray-200 p-4 shadow-sm">
      <h3 className="text-gray-900 text-sm font-bold mb-4">
        Quarterly Executive Brief
      </h3>

      <div className="border-2 border-emerald-500 rounded-xl p-5 pt-5 pb-0 overflow-hidden">
        <p className="text-gray-500 text-xs mb-1">e-Crystal</p>
        <h2 className="text-sm font-bold text-gray-900 mb-4">
          Executive Report
        </h2>

        <WaveChart />
      </div>

      <Link
        href="#"
        className="mt-4 text-emerald-700 text-xs font-semibold flex items-center gap-2 hover:gap-3 transition-all"
      >
        Export brief <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
