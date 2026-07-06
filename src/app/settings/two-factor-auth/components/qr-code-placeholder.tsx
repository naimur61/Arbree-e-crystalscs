'use client';

import type { ReactNode } from 'react';

interface QrCodePlaceholderProps {
  size?: number;
  seed?: string;
  className?: string;
}

export default function QrCodePlaceholder({
  size = 176,
  seed = 'e-Crystal',
  className = '',
}: QrCodePlaceholderProps) {
  const grid = 21;
  const cell = size / grid;

  // simple deterministic pseudo-random generator seeded by string
  let seedNum = 0;
  for (let i = 0; i < seed.length; i++) seedNum = (seedNum * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = () => {
    seedNum = (seedNum * 1103515245 + 12345) >>> 0;
    return (seedNum >>> 16) / 65535;
  };

  const isFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= grid - 7) || (r >= grid - 7 && c < 7);

  const cells: ReactNode[] = [];
  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      if (isFinder(r, c)) continue;
      if (rand() > 0.55) {
        cells.push(
          <rect
            key={`${r}-${c}`}
            x={c * cell}
            y={r * cell}
            width={cell}
            height={cell}
            fill="#111827"
          />
        );
      }
    }
  }

  const Finder = ({ r, c }: { r: number; c: number }) => (
    <g>
      <rect x={c * cell} y={r * cell} width={cell * 7} height={cell * 7} fill="#111827" />
      <rect x={(c + 1) * cell} y={(r + 1) * cell} width={cell * 5} height={cell * 5} fill="#fff" />
      <rect
        x={(c + 2) * cell}
        y={(r + 2) * cell}
        width={cell * 3}
        height={cell * 3}
        fill="#111827"
      />
    </g>
  );

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
      <Finder r={0} c={0} />
      <Finder r={0} c={grid - 7} />
      <Finder r={grid - 7} c={0} />
    </svg>
  );
}
