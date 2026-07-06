import type { ReactNode } from 'react';

export interface TwoFactorStatus {
  enabled: boolean;
  method: string;
  backupCodesRemaining: number;
  backupCodesTotal: number;
  lastVerified: string;
}

export type SetupStepStatus = 'complete' | 'current' | 'upcoming';

export interface SetupStep {
  id: string;
  label: string;
  status: SetupStepStatus;
}

export interface VerificationMethod {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
}

export const STEP_ORDER = [
  { id: 'method', label: 'Method' },
  { id: 'scan-qr', label: 'Scan QR' },
  { id: 'verify', label: 'Verify' },
  { id: 'recovery', label: 'Recovery' },
  { id: 'done', label: 'Done' },
] as const;

export type StepId = (typeof STEP_ORDER)[number]['id'];
