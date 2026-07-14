// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { RemoveEmptyFields } from "../../../utils/inputFiled/RemoveEmptyFields";
// import { useAccessToken } from "../useAccessToken";
// import { fetchData } from "./controller.tsx/fetchGetData";

// interface InfiniteProps {
//   filterData?: Record<string, any>;
//   queryKey: string | any[];
//   path: string;
//   enabled?: boolean;
//   withOutToken?: boolean;
//   getNextPageParam?: (lastPage: any, allPages: any[]) => number | undefined;
// }

// const useInfiniteFetchData = ({
//   filterData = {},
//   queryKey,
//   path,
//   withOutToken = false,
//   enabled = true,
// getNextPageParam = (lastPage) => {
//     const pagination = lastPage?.data?.pagination;
//     if (!pagination) return undefined;
//     const { page, pageSize, totalCount } = pagination;
//     const totalPages = Math.ceil(totalCount / pageSize);
//     return page < totalPages ? page + 1 : undefined;
// }
// }: InfiniteProps) => {
//   const accessToken = useAccessToken();
//   const token = accessToken || "";

//   const baseParams = RemoveEmptyFields(filterData);
//   delete baseParams.page;

//   return useInfiniteQuery({
//     queryKey: [
//       queryKey,
//       {
//         path,
//         Method: "GET",
//         token,
//         queryParams: baseParams,
//       },
//     ],
//     queryFn: ({ pageParam = 1 }) => {
//       const params = { ...baseParams, page: pageParam };
//       return fetchData({
//         queryKey: [{}, { path, Method: "GET", token, queryParams: params }],
//       });
//     },
//     getNextPageParam,
//     initialPageParam: 1,
//     enabled: enabled && (withOutToken || !!token),
//   });
// };

// export default useInfiniteFetchData;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from "@tanstack/react-query";
import { RemoveEmptyFields } from "../../../utils/inputFiled/RemoveEmptyFields";
import { useAccessToken } from "../useAccessToken";
import { fetchData } from "./controller.tsx/fetchGetData";

interface InfiniteProps {
  filterData?: Record<string, any>;
  queryKey: string | any[];
  path: string;
  method?: "GET" | "POST"; // ← new prop
  token?: string; // ← optional explicit token
  enabled?: boolean;
  withOutToken?: boolean;
  getNextPageParam?: (lastPage: any, allPages: any[]) => number | undefined;
}

const useInfiniteFetchData = ({
  filterData = {},
  queryKey,
  path,
  method = "GET", // ← default GET
  token: explicitToken,
  withOutToken = false,
  enabled = true,
  getNextPageParam = (lastPage) => {
    const pagination = lastPage?.data?.pagination;
    if (!pagination) return undefined;
    const { page, pageSize, totalCount } = pagination;
    const totalPages = Math.ceil(totalCount / pageSize);
    return page < totalPages ? page + 1 : undefined;
  },
}: InfiniteProps) => {
  const accessToken = useAccessToken();
  // Use explicit token if provided, otherwise fallback to context token
  const token = explicitToken || accessToken || "";

  // Clean filterData and remove any existing 'page' field
  const baseParams = RemoveEmptyFields(filterData);
  delete baseParams.page;

  return useInfiniteQuery({
    queryKey: [
      queryKey,
      {
        path,
        Method: method, // ← method in cache key
        token,
        queryParams: baseParams, // base filters without page
      },
    ],
    queryFn: ({ pageParam = 1 }) => {
      // Merge the current page into the parameters
      const params = { ...baseParams, page: pageParam };
      return fetchData({
        queryKey: [{}, { path, Method: method, token, queryParams: params }],
      });
    },
    getNextPageParam,
    initialPageParam: 1,
    enabled: enabled && (withOutToken || !!token),
  });
};

export default useInfiniteFetchData;
