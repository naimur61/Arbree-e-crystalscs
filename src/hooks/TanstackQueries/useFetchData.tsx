/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useAuths } from "@/hooks/userContext";
import { useQuery } from "@tanstack/react-query";
import { RemoveEmptyFields } from "../../../utils/inputFiled/RemoveEmptyFields";
import { useAccessToken } from "../useAccessToken";
import { fetchData } from "./controller.tsx/fetchGetData";

interface Props {
  token?: string;
  filterData?: Record<string, any>; // Better typing
  path: string;
  queryKey: string | any[];
  method?: "GET" | "POST";
  enabled?: boolean;
  withOutToken?: boolean;
}

const useFetchData = ({
  filterData = {},
  queryKey,
  method = "GET",
  path,
  token,
  withOutToken = false,
  enabled = true,
}: Props) => {
  const accessToken = useAccessToken();
  const authToken = token || accessToken || "";

  // all query data return from here like data, isLoading
  return useQuery({
    queryKey: [
      queryKey,
      {
        path,
        Method: method,
        token: authToken,
        queryParams: RemoveEmptyFields(filterData),
      },
    ],
    queryFn: fetchData,
    enabled: enabled && (withOutToken || !!token),

    // enabled: !!token && !!filterData && enabled,
  });
};

export default useFetchData;
