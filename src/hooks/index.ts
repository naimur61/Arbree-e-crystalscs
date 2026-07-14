/**
 * Hooks barrel export
 *
 * @example
 * ```tsx
 * // Import individual hooks
 * import { useFetchData, useApiMutation } from "@/hooks";
 *
 * // Import common hooks
 * import HookDataFetcher from "@/hooks/common";
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

// Common data fetching hooks
export {
  default as HookDataFetcher,
  useEnrolledCourseList,
  useBankAccountList,
  useSecurityQuestions,
  useGetDocumentUrl,
} from "./common";
