"use client";

import { useState, useMemo } from "react";

import { REQUIREMENTS } from "./components/types";
import LastChangeBanner from "./components/last-change-banner";
import ChangePasswordForm from "./components/change-password-form";
import PasswordRequirementsCard from "./components/password-requirements-card";
import { Typography } from "@/components/common/typography/typography";

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
    <div className="p-4 sm:p-6">
      <div className="mx-auto space-y-5">
        <div>
          <Typography variant="h5">Change Password</Typography>
          <Typography variant="body-3" color="secondary">
            Update your password to keep your account secure
          </Typography>
        </div>

        <LastChangeBanner
          daysSinceChange={daysSinceChange}
          rotationDays={rotationDays}
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_500px]">
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
