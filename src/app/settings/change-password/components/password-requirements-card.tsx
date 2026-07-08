"use client";

import { ShieldIcon, CheckIcon, XIcon, InfoIcon } from "./icons";
import { REQUIREMENTS } from "./types";

export default function PasswordRequirementsCard({
  password,
}: {
  password: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2">
        <span className="text-emerald-600">
          <ShieldIcon />
        </span>
        <h3 className="text-sm font-semibold text-gray-900">
          Password Requirements
        </h3>
      </div>

      <ul className="mt-3 space-y-2">
        {REQUIREMENTS.map((req) => {
          const met = req.test(password);
          return (
            <li key={req.id} className="flex items-center gap-2 text-xs">
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  met
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {met ? <CheckIcon /> : <XIcon />}
              </span>
              <span className={met ? "text-gray-700" : "text-gray-500"}>
                {req.label}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-start gap-2 border-t border-gray-100 pt-3 text-[11px] text-gray-400">
        <span className="mt-0.5 shrink-0">
          <InfoIcon />
        </span>
        Avoid reusing previous passwords. A passphrase of 4+ unrelated words
        works well.
      </div>
    </div>
  );
}
