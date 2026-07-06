'use client';

import type { SetupStep, VerificationMethod } from './types';
import SetupStepper from './setup-stepper';
import VerificationMethodList from './verification-method';
import ScanQrStep from './scan-qr-step';
import VerifyStep from './verify-step';
import RecoveryStep from './recovery-step';
import DoneStep from './done-step';
import { ArrowLeftIcon } from './icons';

interface SetupTwoFactorCardProps {
  steps: SetupStep[];
  currentStepId: string;
  methods: VerificationMethod[];
  selectedId: string;
  onSelect: (id: string) => void;
  appName: string;
  setupKey: string;
  verifyCode: string[];
  onVerifyCodeChange: (digits: string[]) => void;
  recoveryCodes: string[];
  recoveryConfirmed: boolean;
  onRecoveryConfirmedChange: (v: boolean) => void;
  onCancel?: () => void;
  onContinue?: () => void;
  onClose?: () => void;
}

export default function SetupTwoFactorCard({
  steps,
  currentStepId,
  methods,
  selectedId,
  onSelect,
  appName,
  setupKey,
  verifyCode,
  onVerifyCodeChange,
  recoveryCodes,
  recoveryConfirmed,
  onRecoveryConfirmedChange,
  onCancel,
  onContinue,
  onClose,
}: SetupTwoFactorCardProps) {
  const continueLabel =
    currentStepId === 'verify'
      ? 'Verify & Continue'
      : currentStepId === 'recovery'
        ? 'Finish Setup'
        : 'Continue';

  const continueDisabled = currentStepId === 'recovery' && !recoveryConfirmed;
  const isDone = currentStepId === 'done';

  return (
    <div className="rounded-2xl bg-white px-3 py-4 shadow-sm sm:px-5 sm:py-5 md:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-x-3">
        <h2 className="shrink-0 text-sm font-semibold text-gray-900 sm:text-base">
          Setup Two-Factor Authentication
        </h2>
        <div className="sm:ml-auto">
          <SetupStepper steps={steps} />
        </div>
      </div>

      {currentStepId === 'method' && (
        <>
          <p className="mt-4 mb-2.5 text-xs text-gray-500 sm:mt-5 sm:mb-3 sm:text-sm">
            Choose how you&apos;d like to receive verification codes
          </p>
          <VerificationMethodList methods={methods} selectedId={selectedId} onSelect={onSelect} />
        </>
      )}

      {currentStepId === 'scan-qr' && (
        <div className="mt-4 sm:mt-5">
          <ScanQrStep appName={appName} setupKey={setupKey} />
        </div>
      )}

      {currentStepId === 'verify' && (
        <div className="mt-5 sm:mt-6">
          <VerifyStep appName={appName} code={verifyCode} onChange={onVerifyCodeChange} />
        </div>
      )}

      {currentStepId === 'recovery' && (
        <div className="mt-4 sm:mt-5">
          <RecoveryStep
            codes={recoveryCodes}
            confirmed={recoveryConfirmed}
            onConfirmedChange={onRecoveryConfirmedChange}
          />
        </div>
      )}

      {isDone && (
        <div className="mt-4 sm:mt-5">
          <DoneStep onClose={onClose} />
        </div>
      )}

      {!isDone && (
        <div className="mt-5 flex flex-col-reverse items-center gap-3 sm:mt-6 sm:flex-row sm:justify-between md:gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex w-full items-center justify-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 sm:w-auto"
          >
            <ArrowLeftIcon />
            Cancel
          </button>
          <button
            type="button"
            onClick={onContinue}
            disabled={continueDisabled}
            className="w-full rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200 sm:w-auto"
          >
            {continueLabel}
          </button>
        </div>
      )}
    </div>
  );
}
