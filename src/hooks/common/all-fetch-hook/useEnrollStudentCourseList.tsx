import useFetchData from "@/hooks/TanstackQueries/useFetchData";

/** Enrolled course structure */
interface EnrolledCourse {
  sessionCourseId: string;
  name?: string;
  title?: string;
  [key: string]: unknown;
}

/** API response structure */
interface EnrolledCoursesResponse {
  data?: {
    courses?: EnrolledCourse[];
  };
}

/** Option format for dropdowns/selects */
interface SelectOption {
  label: string;
  value: string;
}

/** Configuration for enrolled courses hook */
interface EnrolledCourseListOptions {
  /** Custom API path */
  path?: string;
  /** Additional filters */
  filter?: Record<string, unknown>;
  /** Enable/disable the query */
  enabled?: boolean;
}

/** Return type for useEnrolledCourseList hook */
interface UseEnrolledCourseListReturn {
  /** Formatted options for dropdowns */
  options: SelectOption[];
  /** Raw API response data */
  data: EnrolledCoursesResponse | undefined;
  /** Whether data is loading */
  isLoading: boolean;
  /** Whether an error occurred */
  isError: boolean;
}

/**
 * Hook to fetch enrolled student courses
 *
 * @example
 * ```tsx
 * const { options, isLoading } = useEnrolledCourseList();
 *
 * // Use with select component
 * <Select options={options} placeholder="Select course" />
 *
 * // With custom path and filters
 * const { options } = useEnrolledCourseList({
 *   path: "admin/enrolled-courses",
 *   filter: { studentId: "123" },
 * });
 * ```
 */
function useEnrolledCourseList({
  path,
  filter,
  enabled,
}: EnrolledCourseListOptions = {}): UseEnrolledCourseListReturn {
  const { data, isLoading, isError } = useFetchData<EnrolledCoursesResponse>({
    method: "GET",
    path: path ?? "student-portal/courses",
    queryKey: "fetch-enrolled-courses-list",
    enabled,
    filterData: filter as Record<string, string | number | boolean | string[]>,
  });

  const options: SelectOption[] =
    data?.data?.courses?.map((item) => ({
      label: item.name || item.title || "Unknown",
      value: item.sessionCourseId,
    })) ?? [];

  return { options, data, isLoading, isError };
}

export default useEnrolledCourseList;
