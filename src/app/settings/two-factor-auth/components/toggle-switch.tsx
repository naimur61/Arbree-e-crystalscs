'use client';

import { ActionButton } from '@/components/common/button/action-button';

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
      btnStyle={`relative inline-flex h-6 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 p-0 min-h-0 h-6 ${
        enabled ? 'bg-emerald-500' : 'bg-gray-300'
      }`}
      buttonContent={
        <>
          {/* ON label — visible when enabled */}
          <span
            className={`absolute left-2 text-[9px] font-bold uppercase leading-none transition-colors ${
              enabled ? 'text-white' : 'text-transparent'
            }`}
          >
            On
          </span>

          {/* OFF label — visible when disabled */}
          <span
            className={`absolute right-2 text-[9px] font-bold uppercase leading-none transition-colors ${
              !enabled ? 'text-gray-500' : 'text-transparent'
            }`}
          >
            Off
          </span>

          {/* Sliding knob — flexbox-centered so it's perfectly vertical */}
          <span
            className={`pointer-events-none z-10 h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-all ${
              enabled ? 'ml-auto mr-0.5' : 'ml-0.5'
            }`}
          />
        </>
      }
      handleOpen={() => onChange(!enabled)}
    />
  );
}
