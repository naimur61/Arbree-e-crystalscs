import {
  useInfiniteQuery,
  type InfiniteData,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { RemoveEmptyFields } from "../../../utils/inputFiled/RemoveEmptyFields";
import { useAccessToken } from "../useAccessToken";
import { fetchData } from "./controller.tsx/fetchGetData";

/** Supported HTTP methods */
type FetchMethod = "GET" | "POST";

/** Query parameters */
type QueryParams = Record<string, string | number | boolean | string[]>;

/** Pagination info from API response */
interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages?: number;
}

/** API response structure with pagination */
interface PaginatedResponse<T> {
  data?: {
    data?: T[];
    pagination?: PaginationInfo;
    [key: string]: unknown;
  };
}

/** Configuration for useInfiniteFetchData hook */
interface UseInfiniteFetchDataOptions<T> {
  /** API endpoint path */
  path: string;
  /** Query key for caching */
  queryKey: string | unknown[];
  /** HTTP method - defaults to GET */
  method?: FetchMethod;
  /** Query parameters (page param is added automatically) */
  filterData?: QueryParams;
  /** Explicit authentication token */
  token?: string;
  /** Skip authentication entirely */
  withOutToken?: boolean;
  /** Enable/disable the query */
  enabled?: boolean;
  /** Custom function to determine next page - defaults to standard pagination */
  getNextPageParam?: (
    lastPage: PaginatedResponse<T>,
    allPages: PaginatedResponse<T>[],
  ) => number | undefined;
  /** Initial page number - defaults to 1 */
  initialPageParam?: number;
}

/**
 * Hook for paginated data fetching with infinite scroll support
 *
 * @example
 * ```tsx
 * const {
 *   data,
 *   fetchNextPage,
 *   hasNextPage,
 *   isFetchingNextPage,
 *   isLoading,
 * } = useInfiniteFetchData({
 *   path: "courses",
 *   queryKey: "courses-infinite",
 *   filterData: { status: "active" },
 * });
 *
 * // Render items
 * {data?.pages.flatMap(page =>
 *   page.data?.data?.map(item => <CourseCard key={item.id} course={item} />)
 * )}
 *
 * // Load more
 * <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
 *   {isFetchingNextPage ? "Loading..." : "Load More"}
 * </button>
 * ```
 */
function useInfiniteFetchData<T = unknown>({
  path,
  queryKey,
  method = "GET",
  filterData = {},
  token: explicitToken,
  withOutToken = false,
  enabled = true,
  getNextPageParam = defaultGetNextPageParam,
  initialPageParam = 1,
}: UseInfiniteFetchDataOptions<T>): UseInfiniteQueryResult<
  InfiniteData<PaginatedResponse<T>>
> {
  const accessToken = useAccessToken();
  const token = explicitToken || accessToken || "";

  // Clean filterData and remove any existing 'page' field
  const baseParams = RemoveEmptyFields(filterData);
  delete baseParams.page;

  return useInfiniteQuery<InfiniteData<PaginatedResponse<T>>>({
    queryKey: [
      queryKey,
      {
        path,
        Method: method,
        token,
        queryParams: baseParams,
      },
    ],
    queryFn: ({ pageParam = 1 }) => {
      const params = { ...baseParams, page: pageParam };
      return fetchData({
        queryKey: [{}, { path, Method: method, token, queryParams: params }],
      }) as Promise<PaginatedResponse<T>>;
    },
    getNextPageParam,
    initialPageParam,
    enabled: enabled && (withOutToken || !!token),
  });
}

/**
 * Default pagination function
 * Expects response structure: { data: { data: [], pagination: { page, pageSize, totalCount } } }
 */
function defaultGetNextPageParam<T>(
  lastPage: PaginatedResponse<T>,
): number | undefined {
  const pagination = lastPage?.data?.pagination;
  if (!pagination) return undefined;

  const { page, pageSize, totalCount } = pagination;
  const totalPages = Math.ceil(totalCount / pageSize);

  return page < totalPages ? page + 1 : undefined;
}

export default useInfiniteFetchData;
