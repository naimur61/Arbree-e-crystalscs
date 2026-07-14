"use client";

import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "./useApiMutation";
import useFetchData from "./useFetchData";
import { ToastMessageShow } from "@/components/common/toast";

/** Configuration for useSafeUpdate hook */
interface SafeUpdateOptions {
  /** The field name containing the entity in the API response */
  fieldName: string;
  /** Path to fetch the current state */
  fetchPath: string;
  /** Filters for the fetch request */
  fetchFilter?: Record<string, unknown>;
  /** HTTP method for fetch - defaults to GET */
  fetchMethod?: "GET" | "POST";
  /** Path to update the entity */
  updatePath: string;
  /** React Query cache key for invalidation */
  queryKey: string;
  /** Time limit in minutes before requiring override confirmation */
  timeLimitMinutes?: number;
  /** Callback when update succeeds */
  onSuccess?: () => void;
}

/** Result from safeUpdate call */
interface SafeUpdateResult<T = unknown> {
  /** Whether the update was applied immediately */
  immediate: boolean;
  /** The latest entity from the server */
  latest: T | null;
}

/** Return type of useSafeUpdate hook */
interface UseSafeUpdateReturn<T = unknown> {
  /** Function to safely update with conflict detection */
  safeUpdate: (
    payload: Record<string, unknown>,
  ) => Promise<SafeUpdateResult<T>>;
  /** Confirm and apply the pending update */
  confirmOverride: () => Promise<void>;
  /** Whether an override confirmation is needed */
  needsOverride: boolean;
  /** Set needsOverride state manually */
  setNeedsOverride: (value: boolean) => void;
  /** Whether the update is in progress */
  isUpdating: boolean;
  /** The fetched entity data */
  updateData: T | null;
  /** Whether the initial fetch is loading */
  isLoading: boolean;
  /** The pending update payload */
  pendingPayload: Record<string, unknown> | null;
}

/**
 * Hook for safe updates with conflict detection
 *
 * Checks if the entity was modified recently (within timeLimitMinutes)
 * before applying updates. If so, it requires explicit override confirmation.
 *
 * @example
 * ```tsx
 * const {
 *   safeUpdate,
 *   confirmOverride,
 *   needsOverride,
 *   isUpdating,
 * } = useSafeUpdate({
 *   fieldName: "course",
 *   fetchPath: "courses/123",
 *   updatePath: "courses/123",
 *   queryKey: "courses",
 *   timeLimitMinutes: 15,
 *   onSuccess: () => console.log("Updated!"),
 * });
 *
 * // Attempt update
 * const result = await safeUpdate({ title: "New Title" });
 * if (!result.immediate) {
 *   // Show confirmation modal
 *   setShowOverrideModal(true);
 * }
 *
 * // User confirms override
 * await confirmOverride();
 * ```
 */
export function useSafeUpdate<T = Record<string, unknown>>({
  fieldName,
  fetchMethod = "GET",
  fetchFilter,
  fetchPath,
  updatePath,
  queryKey,
  timeLimitMinutes = 15,
  onSuccess,
}: SafeUpdateOptions): UseSafeUpdateReturn<T> {
  const queryClient = useQueryClient();
  const [pending, setPending] = useState<Record<string, unknown> | null>(null);
  const [needsOverride, setNeedsOverride] = useState(false);

  // Update mutation
  const mutation = useApiMutation<{ success: boolean }>({
    method: "PATCH",
    path: updatePath,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setPending(null);
      setNeedsOverride(false);
      onSuccess?.();
      ToastMessageShow("success", { message: "Updated successfully" });
    },
    onError: (error) => {
      console.error("SafeUpdate error", error);
      ToastMessageShow("error", error);
    },
  });

  // Lazy fetch for checking current state
  const { data, refetch, isFetching } = useFetchData<{
    data: Record<string, T>;
  }>({
    method: fetchMethod,
    path: fetchPath,
    filterData: fetchFilter as Record<
      string,
      string | number | boolean | string[]
    >,
    queryKey: fetchPath,
    enabled: false,
  });

  const safeUpdate = useCallback(
    async (payload: Record<string, unknown>): Promise<SafeUpdateResult<T>> => {
      try {
        // Trigger fetch manually to get latest state
        const result = await refetch();
        const latest = result?.data?.data?.[fieldName] ?? null;

        const updatedAt = (latest as Record<string, unknown>)?.updatedAt as
          string | undefined;

        if (!updatedAt) {
          // No updatedAt field - proceed with update
          await mutation.mutateAsync(payload);
          return { immediate: true, latest };
        }

        const lastUpdated = new Date(updatedAt).getTime();
        const diffMinutes = (Date.now() - lastUpdated) / (1000 * 60);

        if (diffMinutes >= timeLimitMinutes) {
          // Enough time has passed - proceed with update
          await mutation.mutateAsync(payload);
          return { immediate: true, latest };
        } else {
          // Too recent - require confirmation
          setPending(payload);
          setNeedsOverride(true);
          return { immediate: false, latest };
        }
      } catch (err) {
        console.error("SafeUpdate check failed", err);
        // On error, proceed with update anyway
        await mutation.mutateAsync(payload);
        return { immediate: true, latest: null };
      }
    },
    [fieldName, mutation, refetch, timeLimitMinutes],
  );

  const confirmOverride = useCallback(async () => {
    if (pending) {
      await mutation.mutateAsync(pending);
    }
  }, [pending, mutation]);

  return {
    safeUpdate,
    confirmOverride,
    needsOverride,
    setNeedsOverride,
    isUpdating: mutation.isPending,
    updateData: (data?.data?.[fieldName] as T) ?? null,
    isLoading: isFetching,
    pendingPayload: pending,
  };
}
