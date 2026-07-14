/**
 * Common hooks barrel export
 *
 * @example
 * ```tsx
 * import { useEnrolledCourseList, useBankAccountList } from "@/hooks/common";
 * ```
 */

export { default as useSecurityQuestions } from "./all-fetch-hook/getSecurityQuestion";
export { default as useBankAccountList } from "./all-fetch-hook/useBankAccountList";
export { default as useEnrolledCourseList } from "./all-fetch-hook/useEnrollStudentCourseList";
export { default as useGetDocumentUrl } from "./all-fetch-hook/useGetDocumentUrl";

// Default export for backward compatibility
export { default } from "./hooksExport";
