'use client';

import OtpCodeInput from './otp-code-input';

interface VerifyStepProps {
  appName: string;
  code: string[];
  onChange: (digits: string[]) => void;
}

export default function VerifyStep({ appName, code, onChange }: VerifyStepProps) {
  return (
    <div className="text-center">
      <h3 className="text-sm font-semibold text-gray-900 sm:text-base">Enter the 6-digit code</h3>
      <p className="mx-auto mt-1 max-w-xs text-xs text-gray-500 sm:max-w-sm sm:text-sm">
        Open your authenticator app and enter the current code for {appName}.
      </p>

      <div className="mt-5 sm:mt-6">
        <OtpCodeInput value={code} onChange={onChange} />
      </div>

      <p className="mt-4 text-[11px] text-gray-400 sm:mt-5 sm:text-xs">
        Codes refresh every 30 seconds — if one expires, just use the next.
      </p>
    </div>
  );
}
