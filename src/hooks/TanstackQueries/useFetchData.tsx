import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { removeEmptyFields } from "@/lib/remove-empty-fields";
import { useAccessToken } from "../useAccessToken";
import { fetchData } from "./controller.tsx/fetchGetData";

/** Supported HTTP methods for data fetching */
type FetchMethod = "GET" | "POST";

/** Query parameters - string, number, boolean, or arrays */
type QueryParams = Record<string, string | number | boolean | string[]>;

/** Configuration for useFetchData hook */
interface UseFetchDataOptions {
  /** API endpoint path */
  path: string;
  /** Query key for caching (string or array) */
  queryKey: string | unknown[];
  /** HTTP method - defaults to GET */
  method?: FetchMethod;
  /** Query parameters to send with the request */
  filterData?: QueryParams;
  /** Explicit authentication token (defaults to access token from context) */
  token?: string;
  /** Whether to skip authentication token entirely */
  withOutToken?: boolean;
  /** Whether to enable the query - defaults to true */
  enabled?: boolean;
}

/**
 * Hook for fetching data using React Query
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { data, isLoading, error } = useFetchData({
 *   path: "courses",
 *   queryKey: "courses-list",
 * });
 *
 * // With filters
 * const { data } = useFetchData({
 *   path: "courses",
 *   queryKey: "courses-list",
 *   filterData: { status: "active", page: 1 },
 *   method: "POST",
 * });
 *
 * // Without auth token
 * const { data } = useFetchData({
 *   path: "public/courses",
 *   queryKey: "public-courses",
 *   withOutToken: true,
 * });
 * ```
 */
function useFetchData<T = unknown>({
  path,
  queryKey,
  method = "GET",
  filterData = {},
  token: explicitToken,
  withOutToken = false,
  enabled = true,
}: UseFetchDataOptions): UseQueryResult<T> {
  const accessToken = useAccessToken();
  const authToken = explicitToken || accessToken || "";

  return useQuery<T>({
    queryKey: [
      queryKey,
      {
        path,
        Method: method,
        token: authToken,
        queryParams: removeEmptyFields(filterData),
      },
    ],
    queryFn: fetchData as never, // Type assertion handled by queryKey structure
    enabled: enabled && (withOutToken || !!authToken),
  });
}

export default useFetchData;
