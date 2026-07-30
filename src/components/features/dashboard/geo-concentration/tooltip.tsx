"use client";

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
    <div className="absolute top-[15%] right-[15%] w-64">
      {/* Glowing green blob background */}
      <div
        className="overflow-hidden relative"
        style={{ borderRadius: "5px 5px 5px 0", background: "#052E16" }}
      >
        {/* Blob layers */}
        <div className="absolute -top-6 -left-4 w-32 h-32 bg-white/20 rounded-full blur-xl" />
        <div className="absolute -bottom-8 -right-6 w-40 h-40 bg-[#C4FFCC]/30 rounded-full blur-2xl" />
        <div className="absolute top-4 right-8 w-24 h-24 bg-[#27D33B]/20 rounded-full blur-xl" />
        {/* Outer glow */}
        <div
          className="absolute -inset-1 bg-green-500/10 blur-2xl -z-10"
          style={{ borderRadius: "5px 5px 5px 0" }}
        />

        {/* Content */}
        <div className="relative p-4 text-white">
          <h3 className="mb-2 text-lg font-semibold">{data.name}</h3>
          <p className="text-sm opacity-90">{data.suppliers} suppliers</p>
          {data.breakdown.map((line, idx) => (
            <p key={idx} className="text-sm opacity-75">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
