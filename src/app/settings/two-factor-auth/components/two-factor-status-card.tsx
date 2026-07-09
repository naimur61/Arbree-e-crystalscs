"use client";

import type { TwoFactorStatus } from "./types";
import ToggleSwitch from "./toggle-switch";
import { Sparkles } from "lucide-react";
import { ShieldCheckIcon, SmartphoneIcon, RefreshIcon } from "./icons";
import { KeyRound, Check } from "lucide-react";
import { ActionButton } from "@/components/common/button/action-button";

interface TwoFactorStatusCardProps {
  status: TwoFactorStatus;
  onToggle: (v: boolean) => void;
  onRegenerateBackupCodes?: () => void;
  onReconfigure?: () => void;
}

export default function TwoFactorStatusCard({
  status,
  onToggle,
  onRegenerateBackupCodes,
  onReconfigure,
}: TwoFactorStatusCardProps) {
  return (
    <div className="rounded-2xl bg-white px-3 py-4 shadow-sm sm:px-5 sm:py-5 md:px-6">
      {/* Banner row */}
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 sm:h-9 sm:w-9">
            <ShieldCheckIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-sm font-semibold text-gray-900 sm:text-base">
                {status.enabled ? "2FA is enabled" : "2FA is disabled"}
              </span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 sm:text-[11px]">
                ACTIVE
              </span>
            </div>
            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
              Authenticator app active as of iPhone 15 · Ensuring your codes
              secure
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <ToggleSwitch enabled={status.enabled} onChange={onToggle} />
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="shrink-0 text-emerald-600">
            <SmartphoneIcon />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-[10px] uppercase tracking-wide text-gray-400 sm:text-[11px]">
              Method
            </p>
            {/* font-semibold text-gray-900 */}
            <p className="truncate text-xs font-semibold text-gray-900 sm:text-sm">
              {status.method}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="shrink-0">
            <KeyRound />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-[10px] uppercase tracking-wide text-gray-400 sm:text-[11px]">
              Backup Codes
            </p>
            <p className="truncate text-xs font-semibold text-gray-900 sm:text-sm">
              {status.backupCodesRemaining} of {status.backupCodesTotal} unused
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="shrink-0 text-emerald-600">
            <Check />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-[10px] uppercase tracking-wide text-gray-400 sm:text-[11px]">
              Last Verified
            </p>
            <p className="truncate text-xs font-semibold text-gray-900 sm:text-sm">
              {status.lastVerified}
            </p>
          </div>
        </div>
      </div>

      {/* Actions row */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap md:gap-3">
        <ActionButton
          type="button"
          variant="outline"
          size="sm"
          icon={<RefreshIcon />}
          buttonContent="Regenerate backup codes"
          handleOpen={onRegenerateBackupCodes}
          btnStyle="bg-tertiary text-secondary rounded-lg px-[15px] py-1 self-stretch gap-2.5 shadow-[0_2px_0_0_rgba(0,0,0,0.02)] border-0 text-xs font-medium hover:bg-tertiary-hover sm:text-sm"
        />
        <ActionButton
          type="button"
          variant="default"
          size="sm"
          icon={<Sparkles size={14} />}
          buttonContent="Reconfigure 2FA"
          handleOpen={onReconfigure}
          btnStyle="bg-success-secondary-hover text-white rounded-lg px-4 py-1 self-stretch text-xs font-medium hover:bg-success-secondary sm:text-sm"
        />
      </div>
    </div>
  );
}
