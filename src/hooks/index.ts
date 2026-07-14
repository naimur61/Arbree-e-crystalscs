import { useFetchData } from "./useFetchData";
import { useInfiniteFetchData } from "./useInfiniteFetchData";
import { useApiMutation } from "./useApiMutation";
import { useSafeUpdate } from "./useSafeUpdate";
import { fetchData } from "./fetcher";

/**
 * @example
 
 *  In your ```.tsx component
 * import { queryHooks } from "@/hooks";
 *
 * const { data } = queryHooks.useFetchData({ path: "courses", queryKey: "list" });
 * const mutation = queryHooks.useApiMutation({ method: "POST", path: "create" });
 * ```
 */
export const queryHooks = {
  useFetchData,
  useInfiniteFetchData,
  useApiMutation,
  useSafeUpdate,
  fetchData,
} as const;
