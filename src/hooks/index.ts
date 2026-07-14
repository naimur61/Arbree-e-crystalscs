/**
 * Hooks barrel export
 *
 * @example
 * ```tsx
 * import { useFetchData, useApiMutation, useAccessToken } from "@/hooks";
 * ```
 */

// Token management
export {
  useAccessToken,
  setAccessToken,
  clearAccessToken,
} from "./useAccessToken";

// Tanstack Query hooks
export {
  useFetchData,
  useApiMutation,
  useInfiniteFetchData,
  useSafeUpdate,
  fetchData,
} from "./TanstackQueries";
