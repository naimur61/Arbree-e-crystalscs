'use client';

import { useRef } from 'react';

interface OtpCodeInputProps {
  length?: number;
  value: string[];
  onChange: (digits: string[]) => void;
}

export default function OtpCodeInput({ length = 6, value, onChange }: OtpCodeInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (index: number, digit: string) => {
    const next = [...value];
    next[index] = digit;
    onChange(next);
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1);
    setDigit(index, digit);
    if (digit && index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    e.preventDefault();
    const next = Array.from({ length }, (_, i) => pasted[i] ?? '');
    onChange(next);
    const lastFilled = Math.min(pasted.length, length) - 1;
    inputsRef.current[Math.max(lastFilled, 0)]?.focus();
  };

  return (
    <div className="flex justify-center gap-1.5 sm:gap-2 md:gap-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`h-11 w-9 rounded-lg border text-center text-base font-semibold text-gray-800 outline-none transition sm:h-12 sm:w-10 sm:text-lg md:h-14 md:w-12 md:text-xl ${
            value[i]
              ? 'border-emerald-400 ring-1 ring-emerald-400'
              : 'border-gray-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
          }`}
        />
      ))}
    </div>
  );
}
