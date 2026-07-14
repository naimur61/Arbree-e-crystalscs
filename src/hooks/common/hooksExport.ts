/**
 * Common hooks barrel export
 *
 * @example
 * ```tsx
 * import HookDataFetcher from "@/hooks/common/hooksExport";
 *
 * // Use individual hooks
 * const { options } = HookDataFetcher.useEnrolledCourseList();
 * const { options } = HookDataFetcher.useBankAccountList();
 * const { options } = HookDataFetcher.useSecurityQuestions();
 * const { data } = HookDataFetcher.useGetDocumentUrl({ normalizedPath: "/path" });
 * ```
 */

import useEnrolledCourseList from "./all-fetch-hook/useEnrollStudentCourseList";
import useBankAccountList from "./all-fetch-hook/useBankAccountList";
import useSecurityQuestions from "./all-fetch-hook/getSecurityQuestion";
import useGetDocumentUrl from "./all-fetch-hook/useGetDocumentUrl";

const HookDataFetcher = {
  /** Hook for fetching enrolled courses */
  useEnrolledCourseList,
  /** Hook for fetching bank account list */
  useBankAccountList,
  /** Hook for fetching security questions */
  useSecurityQuestions,
  /** Hook for fetching document URLs */
  useGetDocumentUrl,
} as const;

export default HookDataFetcher;

// Named exports for tree-shaking
export {
  useEnrolledCourseList,
  useBankAccountList,
  useSecurityQuestions,
  useGetDocumentUrl,
};
