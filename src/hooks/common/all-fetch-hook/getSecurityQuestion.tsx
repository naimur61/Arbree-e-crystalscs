import useFetchData from "@/hooks/TanstackQueries/useFetchData";

/** Security question structure */
interface SecurityQuestion {
  id: string;
  name?: string;
  question?: string;
}

/** API response structure */
interface SecurityQuestionsResponse {
  data?: {
    questions?: SecurityQuestion[];
  };
}

/** Option format for dropdowns/selects */
interface SelectOption {
  label: string;
  value: string;
}

/** Configuration for security questions hook */
interface SecurityQuestionsOptions {
  /** Custom API path */
  path?: string;
  /** Additional filters */
  filter?: Record<string, unknown>;
  /** Enable/disable the query */
  enabled?: boolean;
}

/** Return type for useSecurityQuestions hook */
interface UseSecurityQuestionsReturn {
  /** Formatted options for dropdowns */
  options: SelectOption[];
  /** Raw API response data */
  data: SecurityQuestionsResponse | undefined;
  /** Whether data is loading */
  isLoading: boolean;
  /** Whether an error occurred */
  isError: boolean;
}

/**
 * Hook to fetch security questions
 *
 * @example
 * ```tsx
 * const { options, isLoading } = useSecurityQuestions();
 *
 * // Use with select component
 * <Select options={options} />
 *
 * // With custom path and filters
 * const { options } = useSecurityQuestions({
 *   path: "admin/security-questions",
 *   filter: { active: true },
 * });
 * ```
 */
function useSecurityQuestions({
  path,
  filter,
  enabled,
}: SecurityQuestionsOptions = {}): UseSecurityQuestionsReturn {
  const { data, isLoading, isError } = useFetchData<SecurityQuestionsResponse>({
    method: "GET",
    path: path ?? "student-auth/security-questions",
    queryKey: "fetch-security-questions-list",
    enabled,
    filterData: filter as Record<string, string | number | boolean | string[]>,
  });

  const options: SelectOption[] =
    data?.data?.questions?.map((item) => ({
      label: item.name || item.question || "Unknown",
      value: item.id,
    })) ?? [];

  return { options, data, isLoading, isError };
}

export default useSecurityQuestions;
