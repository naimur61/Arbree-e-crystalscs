import { useInfiniteQuery } from "@tanstack/react-query";
import { removeEmptyFields } from "@/lib/remove-empty-fields";
import { useAccessToken } from "../useAccessToken";
import { fetchData } from "./controller.tsx/fetchGetData";

/** Supported HTTP methods */
type FetchMethod = "GET" | "POST";

/** Query parameters */
type QueryParams = Record<string, string | number | boolean | string[]>;

/** Configuration for useInfiniteFetchData hook */
interface UseInfiniteFetchDataOptions {
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
  getNextPageParam?: (lastPage: Record<string, unknown>) => number | undefined;
  /** Initial page number - defaults to 1 */
  initialPageParam?: number;
}

/**
 * Default pagination function
 * Expects response structure: { data: { data: [], pagination: { page, pageSize, totalCount } } }
 */
function defaultGetNextPageParam(
  lastPage: Record<string, unknown>,
): number | undefined {
  const data = lastPage?.data as Record<string, unknown> | undefined;
  const pagination = data?.pagination as
    | {
        page?: number;
        pageSize?: number;
        totalCount?: number;
      }
    | undefined;

  if (!pagination) return undefined;

  const { page = 1, pageSize = 10, totalCount = 0 } = pagination;
  const totalPages = Math.ceil(totalCount / pageSize);

  return page < totalPages ? page + 1 : undefined;
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
 * } = useInfiniteFetchData({
 *   path: "courses",
 *   queryKey: "courses-infinite",
 *   filterData: { status: "active" },
 * });
 *
 * // Render items
 * data?.pages.flatMap(page =>
 *   (page.data as unknown[])?.map(item => <Card key={item.id} />)
 * )
 *
 * // Load more
 * <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
 *   {isFetchingNextPage ? "Loading..." : "Load More"}
 * </button>
 * ```
 */
export function useInfiniteFetchData({
  path,
  queryKey,
  method = "GET",
  filterData = {},
  token: explicitToken,
  withOutToken = false,
  enabled = true,
  getNextPageParam = defaultGetNextPageParam,
  initialPageParam = 1,
}: UseInfiniteFetchDataOptions) {
  const accessToken = useAccessToken();
  const token = explicitToken || accessToken || "";

  // Clean filterData and remove any existing 'page' field
  const baseParams = removeEmptyFields(filterData);
  delete baseParams.page;

  return useInfiniteQuery({
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
      });
    },
    getNextPageParam,
    initialPageParam,
    enabled: enabled && (withOutToken || !!token),
  });
}

export default useInfiniteFetchData;
