"use client";

import { MapPin } from "lucide-react";

export interface TooltipData {
  name: string;
  suppliers: number;
  breakdown: string[];
}

interface TooltipProps {
  data: TooltipData;
}

export function Tooltip({ data }: TooltipProps) {
  return (
    <div className="absolute top-[15%] right-[15%] z-10 w-64">
      {/* Soft glow behind the card */}
      <div className="absolute -inset-1 -z-10 rounded-lg bg-success-primary/20 blur-xl" />

      <div className="overflow-hidden rounded-lg border border-primary bg-primary shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-secondary">
          <div className="flex justify-center items-center w-6 h-6 rounded-md bg-success-primary">
            <MapPin className="w-3.5 h-3.5 icon-success-primary" />
          </div>
          <h3 className="text-sm font-semibold text-primary">{data.name}</h3>
        </div>

        {/* Body */}
        <div className="p-3">
          <p className="text-xs text-secondary">
            <span className="font-semibold text-success-primary">
              {data.suppliers}
            </span>{" "}
            suppliers
          </p>
          {data.breakdown.map((line, idx) => (
            <p key={idx} className="mt-1 text-xs text-tertiary">
              • {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
