"use client";

import { useState } from "react";
import { CopyIcon, DownloadIcon } from "./icons";
import { ActionButton } from "@/components/common/button/action-button";

interface RecoveryStepProps {
  codes: string[];
  confirmed: boolean;
  onConfirmedChange: (v: boolean) => void;
}

export default function RecoveryStep({
  codes,
  confirmed,
  onConfirmedChange,
}: RecoveryStepProps) {
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(codes.join("\n"));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // clipboard may be unavailable — fail silently
    }
  };

  const handleDownload = () => {
    const blob = new Blob([codes.join("\n") + "\n"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recovery-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
        Save your recovery codes
      </h3>
      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
        Store these in a safe place. Each code can be used once to sign in if
        you lose access to your authenticator.
      </p>

      <div className="mt-3 grid grid-cols-1 gap-2 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3 sm:grid-cols-2 md:grid-cols-3 md:p-3">
        {codes.map((code) => (
          <div
            key={code}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-center font-mono text-xs text-gray-700 sm:text-sm"
          >
            {code}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <ActionButton
            type="button"
            variant="outline"
            size="sm"
            icon={<CopyIcon />}
            buttonContent={copiedAll ? "Copied all" : "Copy all"}
            handleOpen={handleCopyAll}
            btnStyle="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
          />
          <ActionButton
            type="button"
            variant="outline"
            size="sm"
            icon={<DownloadIcon />}
            buttonContent="Download .txt"
            handleOpen={handleDownload}
            btnStyle="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
          />
        </div>

        <label className="flex cursor-pointer items-center justify-end gap-2 text-xs font-medium text-gray-700 sm:shrink-0">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => onConfirmedChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-400"
          />
          I&apos;ve saved these codes in a safe place
        </label>
      </div>
    </div>
  );
}
