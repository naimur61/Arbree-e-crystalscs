"use client";

import { useState, useMemo } from "react";

import { REQUIREMENTS } from "./components/types";
import LastChangeBanner from "./components/last-change-banner";
import ChangePasswordForm from "./components/change-password-form";
import PasswordRequirementsCard from "./components/password-requirements-card";

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");

  const daysSinceChange = 82;
  const rotationDays = 90;

  const allRequirementsMet = useMemo(
    () => REQUIREMENTS.every((r) => r.test(newPassword)),
    [newPassword],
  );

  const handleSubmit = (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (!allRequirementsMet || values.newPassword !== values.confirmPassword)
      return;
    console.log("update password", values);
  };

  return (
    <div className="bg-emerald-50/40 p-4 sm:p-6">
      <div className="mx-auto space-y-5">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">
            Change Password
          </h1>
          <p className="text-sm text-gray-500">
            Update your password to keep your account secure
          </p>
        </div>

        <LastChangeBanner
          daysSinceChange={daysSinceChange}
          rotationDays={rotationDays}
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
          <ChangePasswordForm
            onNewPasswordChange={setNewPassword}
            onCancel={() => console.log("cancel")}
            onSubmit={handleSubmit}
          />

          <PasswordRequirementsCard password={newPassword} />
        </div>
      </div>
    </div>
  );
}
