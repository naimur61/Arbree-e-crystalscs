'use client';

import type { SetupStep } from './types';
import { CheckIcon, ChevronRightIcon } from './icons';

interface SetupStepperProps {
  steps: SetupStep[];
}

export default function SetupStepper({ steps }: SetupStepperProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto">
      {steps.map((step, i) => (
        <div key={step.id} className="flex shrink-0 items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium sm:text-sm ${
              step.status === 'current'
                ? 'border-green-500 bg-green-100 text-gray-900'
                : step.status === 'complete'
                  ? 'border-gray-200 bg-white text-gray-600'
                  : 'border-gray-200 bg-white text-gray-400'
            }`}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold sm:h-5 sm:w-5 sm:text-xs ${
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
            <span className="flex shrink-0 items-center text-gray-400">
              <ChevronRightIcon />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}