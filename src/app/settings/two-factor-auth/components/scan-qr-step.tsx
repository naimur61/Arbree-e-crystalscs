'use client';

import { useState } from 'react';
import QrCodePlaceholder from './qr-code-placeholder';
import { CopyIcon, AlertTriangleIcon } from './icons';

interface ScanQrStepProps {
  appName: string;
  setupKey: string;
}

export default function ScanQrStep({ appName, setupKey }: ScanQrStepProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(setupKey.replace(/\s/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be unavailable (e.g. insecure context) — fail silently
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6 md:gap-8">
      <div className="flex shrink-0 justify-center">
        <div className="rounded-xl border border-gray-100 p-2 sm:p-3">
          <QrCodePlaceholder
            size={140}
            seed={appName}
            className="h-[120px] w-[120px] sm:h-[140px] sm:w-[140px] md:h-[176px] md:w-[176px]"
          />
        </div>
      </div>

      <div className="w-full min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-gray-900 sm:text-base">Scan this QR code</h3>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Open your authenticator app and scan the code to add {appName} to your vault
        </p>

        <p className="mt-3 text-xs text-gray-500 sm:mt-4 sm:text-sm">
          Or enter this setup key manually
        </p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
          <code className="w-full truncate rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-mono text-gray-700 sm:flex-1 sm:text-sm">
            {setupKey}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 sm:w-auto sm:shrink-0"
          >
            <CopyIcon />
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 sm:mt-4">
          <span className="mt-0.5 shrink-0">
            <AlertTriangleIcon />
          </span>
          Keep this key private. Anyone with access can generate sign-in codes for your account.
        </div>
      </div>
    </div>
  );
}
