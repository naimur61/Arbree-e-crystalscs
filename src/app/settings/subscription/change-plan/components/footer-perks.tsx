"use client";

import type { FooterPerk } from "./types";

export default function FooterPerks({ perks }: { perks: FooterPerk[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {perks.map((perk) => (
        <div
          key={perk.id}
          className="flex items-start gap-3 rounded-xl bg-primary p-3 shadow-sm"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success-primary text-success-primary">
            {perk.icon}
          </span>
          <div>
            <p className="label-3 text-primary">{perk.title}</p>
            <p className="caption-1 text-tertiary">{perk.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
