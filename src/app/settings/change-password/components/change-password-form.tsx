"use client";

import { useEffect } from "react";
import { useForm, useWatch, type FieldValues } from "react-hook-form";
import { CustomField } from "@/components/common/fields/cusInputField";
import { ActionButton } from "@/components/common/button/action-button";
import { Form } from "@/components/ui/form";

interface PasswordFormResult {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordForm({
  onNewPasswordChange,
  onCancel,
  onSubmit,
}: {
  onNewPasswordChange?: (password: string) => void;
  onCancel?: () => void;
  onSubmit?: (values: PasswordFormResult) => void;
}) {
  const form = useForm<FieldValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const watchedNewPassword = useWatch({
    control: form.control,
    name: "newPassword",
    defaultValue: "",
  });

  useEffect(() => {
    onNewPasswordChange?.(watchedNewPassword);
  }, [watchedNewPassword, onNewPasswordChange]);

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit?.({
      currentPassword: values.currentPassword as string,
      newPassword: values.newPassword as string,
      confirmPassword: values.confirmPassword as string,
    });
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomField.Password
            form={form}
            name="currentPassword"
            labelName="Current Password"
            placeholder="Enter your current password"
          />
          <CustomField.Password
            form={form}
            name="newPassword"
            labelName="New Password"
            placeholder="At least 12 characters"
            mode="validate"
          />
          <CustomField.Password
            form={form}
            name="confirmPassword"
            labelName="Confirm New Password"
            placeholder="Re-enter your new password"
          />
        </form>
      </Form>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <ActionButton
          type="button"
          variant="ghost"
          size="sm"
          buttonContent="Cancel"
          handleOpen={onCancel}
          btnStyle="text-gray-500 hover:text-gray-700 font-medium"
        />
        <ActionButton
          type="submit"
          variant="default"
          size="default"
          buttonContent="Update Password"
          handleOpen={handleSubmit}
          btnStyle="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
        />
      </div>
    </div>
  );
}
