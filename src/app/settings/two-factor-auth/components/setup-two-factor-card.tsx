"use client";

import type { SetupStep, VerificationMethod } from "./types";
import SetupStepper from "./setup-stepper";
import VerificationMethodList from "./verification-method";
import ScanQrStep from "./scan-qr-step";
import VerifyStep from "./verify-step";
import RecoveryStep from "./recovery-step";
import DoneStep from "./done-step";
import { ArrowLeftIcon } from "./icons";
import { ActionButton } from "@/components/common/button/action-button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/common/typography/typography";

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
    currentStepId === "verify"
      ? "Verify & Continue"
      : currentStepId === "recovery"
        ? "Finish Setup"
        : "Continue";

  const continueDisabled = currentStepId === "recovery" && !recoveryConfirmed;
  const isDone = currentStepId === "done";

  return (
    <Card className="rounded-2xl px-3 py-4 shadow-sm sm:px-5 sm:py-5 md:px-6">
      <div className="-mx-3 border-b border-gray-200 px-3 pb-4 sm:-mx-5 sm:px-5 md:-mx-6 md:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-x-4">
          <Typography variant="h6">Setup Two-Factor Authentication</Typography>

          <SetupStepper steps={steps} />
        </div>
      </div>

      {currentStepId === "method" && (
        <>
          <Typography variant="body-2" color="secondary">
            Choose how you&apos;d like to receive verification codes
          </Typography>
          <VerificationMethodList
            methods={methods}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        </>
      )}

      {currentStepId === "scan-qr" && (
        <div className="mt-4 sm:mt-5">
          <ScanQrStep appName={appName} setupKey={setupKey} />
        </div>
      )}

      {currentStepId === "verify" && (
        <div className="mt-5 sm:mt-6">
          <VerifyStep
            appName={appName}
            code={verifyCode}
            onChange={onVerifyCodeChange}
          />
        </div>
      )}

      {currentStepId === "recovery" && (
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
          <ActionButton
            type="button"
            variant="ghost"
            size="sm"
            icon={<ArrowLeftIcon />}
            buttonContent="Cancel"
            handleOpen={onCancel}
            btnStyle="text-gray-500 hover:text-gray-700"
          />
          <ActionButton
            type="button"
            variant="default"
            size="default"
            buttonContent={continueLabel}
            handleOpen={onContinue}
            disabled={continueDisabled}
            btnStyle="rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200"
          />
        </div>
      )}
    </Card>
  );
}
