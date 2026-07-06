'use client';

import { useState } from 'react';

import type { TwoFactorStatus, VerificationMethod, StepId } from './components/types';
import { STEP_ORDER } from './components/types';
import TwoFactorStatusCard from './components/two-factor-status-card';
import SetupTwoFactorCard from './components/setup-two-factor-card';
import { SmartphoneIcon, MessageSquareIcon, MailIcon } from './components/icons';

/* =========================================================================
   SAMPLE DATA — replace with real data from your API/auth layer
   ========================================================================= */

const sampleStatus: TwoFactorStatus = {
  enabled: true,
  method: 'Authenticator app',
  backupCodesRemaining: 8,
  backupCodesTotal: 10,
  lastVerified: 'Today, 09:42',
};

function buildSteps(currentStepId: StepId) {
  const currentIndex = STEP_ORDER.findIndex((s) => s.id === currentStepId);
  return STEP_ORDER.map((s, i) => ({
    id: s.id,
    label: s.label,
    status: (i < currentIndex ? 'complete' : i === currentIndex ? 'current' : 'upcoming') as
      'complete' | 'current' | 'upcoming',
  }));
}

const sampleMethods: VerificationMethod[] = [
  {
    id: 'authenticator',
    icon: <SmartphoneIcon />,
    title: 'Authenticator App',
    description: 'Use Google Authenticator, 1Password, Authy, or Duo to generate codes',
    badge: 'Recommended',
  },
  {
    id: 'sms',
    icon: <MessageSquareIcon />,
    title: 'SMS Text Message',
    description: 'Text codes might take a bit longer if on an unstable/poor signal',
  },
  {
    id: 'email',
    icon: <MailIcon />,
    title: 'Email',
    description: 'Receive codes at email@email.com. Slower but always available',
  },
];

const sampleRecoveryCodes: string[] = [
  '8K4P-WQ2M-9XT1',
  '7RB2-LNSZ-HVBC',
  '3QY7-DT9F-KP4M',
  '5XJ1-VC8R-NW2H',
  '2MG6-KB4T-RQ9L',
  '9FH3-PW7Y-DC5X',
  '4LN8-JE2V-MT6Q',
  '6CZS-HR1B-XP9W',
];

/* =========================================================================
   PAGE — composes everything
   ========================================================================= */

export default function TwoFactorAuthPage() {
  const [enabled, setEnabled] = useState(sampleStatus.enabled);
  const [selectedMethod, setSelectedMethod] = useState('authenticator');
  const [currentStepId, setCurrentStepId] = useState<StepId>('method');
  const [verifyCode, setVerifyCode] = useState<string[]>(Array(6).fill(''));
  const [recoveryConfirmed, setRecoveryConfirmed] = useState(false);

  const goToNextStep = () => {
    const idx = STEP_ORDER.findIndex((s) => s.id === currentStepId);
    if (idx < STEP_ORDER.length - 1) setCurrentStepId(STEP_ORDER[idx + 1].id);
    else console.log('finish setup');
  };

  const goToPreviousStepOrCancel = () => {
    const idx = STEP_ORDER.findIndex((s) => s.id === currentStepId);
    if (idx === 0) {
      console.log('cancel');
    } else {
      setCurrentStepId(STEP_ORDER[idx - 1].id);
    }
  };

  const handleClose = () => {
    console.log('close — 2FA setup complete');
  };

  return (
    <div className="mx-auto space-y-4 sm:space-y-5">
      <div>
        <h1 className="text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
          Two-Factor Authentication
        </h1>
        <p className="text-xs text-gray-500 sm:text-sm">
          Add an extra layer of security when signing in
        </p>
      </div>

      <TwoFactorStatusCard
        status={{ ...sampleStatus, enabled }}
        onToggle={setEnabled}
        onRegenerateBackupCodes={() => console.log('regenerate backup codes')}
        onReconfigure={() => console.log('reconfigure 2FA')}
      />

      <SetupTwoFactorCard
        steps={buildSteps(currentStepId)}
        currentStepId={currentStepId}
        methods={sampleMethods}
        selectedId={selectedMethod}
        onSelect={setSelectedMethod}
        appName="e-Crystal"
        setupKey="3BSW Y3DP EHPK 3PXP 3BSW Y3DP"
        verifyCode={verifyCode}
        onVerifyCodeChange={setVerifyCode}
        recoveryCodes={sampleRecoveryCodes}
        recoveryConfirmed={recoveryConfirmed}
        onRecoveryConfirmedChange={setRecoveryConfirmed}
        onCancel={goToPreviousStepOrCancel}
        onContinue={goToNextStep}
        onClose={handleClose}
      />
    </div>
  );
}
