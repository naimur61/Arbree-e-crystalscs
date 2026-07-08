"use client";

import toast, { ToastOptions } from "react-hot-toast";
import { LabelAndPlaceholderTextFormat } from "@/lib/utils";
import { ToastMessageChange } from "./custom-message.component";

/**
 * Available toast notification types
 */
type ToastType = "success" | "error" | "loading" | "custom";

/**
 * Extended toast options including custom flags
 */
type ExtendedToastOptions = ToastOptions & {
  textFormat?: boolean;
  changeMessage?: boolean;
};

/**
 * Default toast configuration
 */
const defaultOptions: ExtendedToastOptions = {
  duration: 3000,
  position: "top-center",
  textFormat: true,
  changeMessage: false,
};

/**
 * Extracts a string message from various error/response shapes.
 */
function resolveMessage(msg: unknown, fallback: string): string {
  if (typeof msg === "string") return msg;
  if (msg && typeof msg === "object") {
    const obj = msg as Record<string, unknown>;
    const data = obj.data as Record<string, unknown> | undefined;
    const response = obj.response as Record<string, unknown> | undefined;
    const responseData = response?.data as Record<string, unknown> | undefined;
    return (
      (responseData?.message as string) ||
      (response?.message as string) ||
      (data?.message as string) ||
      (obj.message as string) ||
      fallback
    );
  }
  return fallback;
}

/**
 * ToastMessageShow — Unified toast notification system.
 *
 * Supports:
 * - Success / Error / Loading / Custom types
 * - Extracts messages from API error responses
 * - Optional message transformation via ToastMessageChange
 * - Optional text case formatting
 *
 * @example
 * ToastMessageShow('success', 'Profile updated successfully');
 * ToastMessageShow('error', apiErrorResponse);
 * ToastMessageShow('loading', 'Saving...', { textFormat: false });
 */
export const ToastMessageShow = (
  type: ToastType,
  message: unknown,
  options: ExtendedToastOptions = {},
) => {
  const { textFormat, changeMessage, ...toastOptions } = {
    ...defaultOptions,
    ...options,
  };

  const MessageHandler = (msg: string) => {
    let finalMessage = msg;
    if (changeMessage) finalMessage = ToastMessageChange(finalMessage);
    if (textFormat) finalMessage = LabelAndPlaceholderTextFormat(finalMessage);
    return finalMessage;
  };

  const resolvedMessage = resolveMessage(
    message,
    type === "error" ? "Something went wrong" : "Successfully updated",
  );
  const formattedMessage = MessageHandler(resolvedMessage);

  switch (type) {
    case "success":
      toast.success(formattedMessage, toastOptions);
      break;
    case "error":
      toast.error(formattedMessage, toastOptions);
      break;
    case "loading":
      toast.loading(formattedMessage, toastOptions);
      break;
    case "custom":
      toast(formattedMessage, toastOptions);
      break;
    default:
      toast(formattedMessage, toastOptions);
  }
};

/** Shortcut: Show a success toast */
export const toastSuccessMessage = (
  msg: unknown,
  options?: ExtendedToastOptions,
) => ToastMessageShow("success", msg, options);

/** Shortcut: Show an error toast */
export const toastErrorMessage = (
  msg: unknown,
  options?: ExtendedToastOptions,
) => ToastMessageShow("error", msg, options);

/** Shortcut: Show a loading toast */
export const toastLoadingMessage = (
  msg: unknown,
  options?: ExtendedToastOptions,
) => ToastMessageShow("loading", msg, options);

/** Shortcut: Show a custom toast */
export const toastCustomMessage = (
  msg: unknown,
  options?: ExtendedToastOptions,
) => ToastMessageShow("custom", msg, options);
