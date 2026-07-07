"use client";

import { ActionButton } from "@/components/common/button/action-button";

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
}

export default function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <ActionButton
      type="button"
      variant="ghost"
      btnSize="sm"
      role="switch"
      aria-checked={enabled}
      btnStyle={`relative inline-flex h-6 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-success-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] disabled:cursor-not-allowed disabled:opacity-50 p-0 min-h-0 gap-0 ${
        enabled ? "bg-success-secondary" : "bg-disabled"
      }`}
      buttonContent={
        <>
          <div className="absolute inset-0 flex items-center text-[9px] font-bold uppercase leading-none">
            <span
              className={`flex w-1/2 items-center justify-center transition-colors ${
                enabled ? "text-success-primary" : "text-transparent"
              }`}
            >
              On
            </span>

            <span
              className={`flex w-1/2 items-center justify-center transition-colors ${
                !enabled ? "text-tertiary" : "text-transparent"
              }`}
            >
              Off
            </span>
          </div>

          <span
            className={`pointer-events-none absolute top-0.5 left-0.5 z-10 h-5 w-5 rounded-full bg-white shadow-lg transition-transform duration-200 ${
              enabled ? "translate-x-8" : "translate-x-0"
            }`}
          />
        </>
      }
      handleOpen={() => onChange(!enabled)}
    />
  );
}
