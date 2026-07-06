'use client';

interface DoneStepProps {
  onClose?: () => void;
}

export default function DoneStep({ onClose }: DoneStepProps) {
  return (
    <div className="flex flex-col items-center px-2 py-4 text-center sm:py-6 md:py-8">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white sm:h-12 sm:w-12">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="sm:h-6 sm:w-6"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>

      <h3 className="mt-3 text-sm font-semibold text-gray-900 sm:mt-4 sm:text-base">
        Two-factor authentication is on
      </h3>
      <p className="mt-1 max-w-xs text-xs text-gray-500 sm:max-w-sm sm:text-sm">
        Your account now requires a code from your authenticator app at sign-in.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="mt-5 w-full rounded-xl bg-emerald-500 px-8 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-600 sm:mt-6 sm:w-auto"
      >
        Close
      </button>
    </div>
  );
}
