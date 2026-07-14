/**
 * Hooks barrel export
 *
 * @example
 * ```tsx
 * import { useFetchData, useApiMutation, useAccessToken } from "@/hooks";
 * ```
 */

// Auth
export {
  useAccessToken,
  setAccessToken,
  clearAccessToken,
} from "./useAccessToken";

// Data fetching
export { useFetchData } from "./useFetchData";
export { useInfiniteFetchData } from "./useInfiniteFetchData";
export { useApiMutation } from "./useApiMutation";
export { useSafeUpdate } from "./useSafeUpdate";

// Internal (for advanced use)
export { fetchData } from "./fetcher";
