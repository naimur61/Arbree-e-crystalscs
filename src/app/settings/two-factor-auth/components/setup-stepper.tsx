'use client';

import type { SetupStep } from './types';
import { CheckIcon, ChevronRightIcon } from './icons';

interface SetupStepperProps {
  steps: SetupStep[];
}

export default function SetupStepper({ steps }: SetupStepperProps) {
  return (
    <div className="flex items-stretch gap-0 overflow-x-auto">
      {steps.map((step, i) => (
        <div key={step.id} className="flex flex-1 items-stretch max-w-[160px]">
          <span
            className={`flex flex-1 items-center gap-2 self-stretch whitespace-nowrap p-2 text-[11px] font-medium sm:text-xs ${
              step.status === 'current'
                ? 'rounded-full border border-green-500 bg-green-100 text-gray-900'
                : step.status === 'complete'
                  ? 'rounded-full border border-gray-200 bg-white text-gray-600'
                  : 'rounded-full border border-gray-200 bg-white text-gray-400'
            }`}
          >
            <span
              className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold sm:h-4 sm:w-4 sm:text-[10px] ${
                step.status === 'current'
                  ? 'bg-emerald-500 text-white'
                  : step.status === 'complete'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.status === 'complete' ? <CheckIcon /> : i + 1}
            </span>
            {step.label}
          </span>

          {i < steps.length - 1 && (
            <span className="flex shrink-0 items-center self-stretch text-gray-300">
              <ChevronRightIcon />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
