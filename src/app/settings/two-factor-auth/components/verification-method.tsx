'use client';

import type { VerificationMethod } from './types';
import { ActionButton } from '@/components/common/button/action-button';

interface VerificationMethodOptionProps {
  method: VerificationMethod;
  selected: boolean;
  onSelect: () => void;
}

function VerificationMethodOption({ method, selected, onSelect }: VerificationMethodOptionProps) {
  return (
    <ActionButton
      type="button"
      variant="ghost"
      btnSize="default"
      aria-pressed={selected}
      btnStyle={`w-full items-start gap-3 rounded-xl border p-3.5 text-left transition sm:p-4 md:gap-4 md:p-5 capitalize ${
        selected
          ? 'border-emerald-300 bg-emerald-50/60'
          : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
      icon={
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9 ${
            selected ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-50 text-gray-500'
          }`}
        >
          {method.icon}
        </span>
      }
      buttonContent={
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-sm font-medium text-gray-900">{method.title}</span>
            {method.badge && (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-700 sm:text-[10px]">
                {method.badge}
              </span>
            )}
          </span>
          <span className="mt-0.5 block text-xs text-gray-500 sm:text-sm">{method.description}</span>
        </span>
      }
      lastIcon={
        <span
          className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 sm:h-5 sm:w-5 ${
            selected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300 bg-white'
          }`}
        >
          {selected && <span className="h-1.5 w-1.5 rounded-full bg-white sm:h-2 sm:w-2" />}
        </span>
      }
      handleOpen={onSelect}
    />
  );
}

interface VerificationMethodListProps {
  methods: VerificationMethod[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function VerificationMethodList({
  methods,
  selectedId,
  onSelect,
}: VerificationMethodListProps) {
  return (
    <div className="space-y-2.5 sm:space-y-3">
      {methods.map((method) => (
        <VerificationMethodOption
          key={method.id}
          method={method}
          selected={selectedId === method.id}
          onSelect={() => onSelect(method.id)}
        />
      ))}
    </div>
  );
}
