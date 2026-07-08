"use client";

import { type ReactNode } from "react";

interface QrCodePlaceholderProps {
  size?: number;
  seed?: string;
  className?: string;
}

interface FinderProps {
  r: number;
  c: number;
  cell: number;
}

function Finder({ r, c, cell }: FinderProps) {
  return (
    <g>
      <rect
        x={c * cell}
        y={r * cell}
        width={cell * 7}
        height={cell * 7}
        fill="#111827"
      />
      <rect
        x={(c + 1) * cell}
        y={(r + 1) * cell}
        width={cell * 5}
        height={cell * 5}
        fill="#fff"
      />
      <rect
        x={(c + 2) * cell}
        y={(r + 2) * cell}
        width={cell * 3}
        height={cell * 3}
        fill="#111827"
      />
    </g>
  );
}

export default function QrCodePlaceholder({
  size = 176,
  seed = "e-Crystal",
  className = "",
}: QrCodePlaceholderProps) {
  const grid = 21;
  const cell = size / grid;

  const isFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= grid - 7) || (r >= grid - 7 && c < 7);

  const hash = (str: string) => {
    let h = 0;

    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h, 31) + str.charCodeAt(i);
    }

    return h >>> 0;
  };

  const seedHash = hash(seed);

  const cells: ReactNode[] = [];

  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      if (isFinder(r, c)) continue;

      // Pure deterministic pseudo-random value
      const value = hash(`${seedHash}-${r}-${c}`) / 0xffffffff;

      if (value > 0.55) {
        cells.push(
          <rect
            key={`${r}-${c}`}
            x={c * cell}
            y={r * cell}
            width={cell}
            height={cell}
            fill="#111827"
          />,
        );
      }
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`rounded-lg ${className}`}
      role="img"
      aria-label="QR code"
    >
      <rect width={size} height={size} fill="#fff" />
      {cells}
      <Finder r={0} c={0} cell={cell} />
      <Finder r={0} c={grid - 7} cell={cell} />
      <Finder r={grid - 7} c={0} cell={cell} />
    </svg>
  );
}
