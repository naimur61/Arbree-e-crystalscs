"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Storage key for access token
 */
const TOKEN_KEY = "access_token";

/**
 * Check if we're in a browser environment
 */
const isBrowser = typeof window !== "undefined";

/**
 * Get token from storage (localStorage or cookie)
 */
function getTokenFromStorage(): string | null {
  if (!isBrowser) return null;

  // Try localStorage first
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) return token;
  } catch {
    // localStorage might be disabled
  }

  // Fallback to cookie
  try {
    const match = document.cookie.match(new RegExp(`${TOKEN_KEY}=([^;]+)`));
    if (match) return decodeURIComponent(match[1]);
  } catch {
    // Cookie access might be blocked
  }

  return null;
}

/**
 * Store token in storage
 */
function setTokenInStorage(token: string | null): void {
  if (!isBrowser) return;

  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // localStorage might be disabled
  }

  try {
    if (token) {
      document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; SameSite=Lax; max-age=86400`;
    } else {
      document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
    }
  } catch {
    // Cookie access might be blocked
  }
}

/**
 * External store subscription for cross-tab sync
 */
let listeners: Array<() => void> = [];

function onStorageChange() {
  listeners.forEach((listener) => listener());
}

// Listen for storage changes across tabs
if (isBrowser) {
  window.addEventListener("storage", onStorageChange);
}

/**
 * Subscribe to token changes
 */
function subscribeToToken(callback: () => void): () => void {
  listeners = [...listeners, callback];
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

/**
 * Get current token value for external store
 */
function getTokenSnapshot(): string {
  return getTokenFromStorage() ?? "";
}

/**
 * Hook to access and manage the access token
 *
 * Reads from localStorage/cookie and stays in sync across tabs.
 *
 * @example
 * ```tsx
 * // Get current token
 * const token = useAccessToken();
 *
 * // With setter
 * const { token, setToken, clearToken } = useAccessToken();
 *
 * // Set token on login
 * setToken("eyJhbGciOiJIUzI1NiIs...");
 *
 * // Clear on logout
 * clearToken();
 * ```
 */
export function useAccessToken(): string;
export function useAccessToken(returnSetter: true): {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
};
export function useAccessToken(returnSetter?: boolean) {
  const token = useSyncExternalStore(
    subscribeToToken,
    getTokenSnapshot,
    () => "",
  );

  const setToken = useCallback((newToken: string) => {
    setTokenInStorage(newToken);
    // Notify all subscribers
    listeners.forEach((l) => l());
  }, []);

  const clearToken = useCallback(() => {
    setTokenInStorage(null);
    listeners.forEach((l) => l());
  }, []);

  if (returnSetter) {
    return { token, setToken, clearToken };
  }

  return token;
}

/**
 * Set access token (for use outside of React components)
 */
export function setAccessToken(token: string): void {
  setTokenInStorage(token);
}

/**
 * Clear access token (for use outside of React components)
 */
export function clearAccessToken(): void {
  setTokenInStorage(null);
}
