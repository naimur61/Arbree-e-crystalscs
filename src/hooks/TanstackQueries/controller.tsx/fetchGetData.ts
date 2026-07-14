/* eslint-disable @typescript-eslint/no-explicit-any */

import { handleApiError } from "../../../../utils/errorHandler";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchData = async ({ queryKey }: any) => {
  const [, { path, Method, withOutToken, token, queryParams = {} }] = queryKey;

  const method = Method.toUpperCase();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Only add Bearer token when withOutToken is FALSE
  if (!withOutToken && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // if (token) {
  //   headers.Authorization = `Bearer ${token}`;
  // }

  let url = `${API_URL}/${path}`;

  // TODO: add allow multiple same name query params start
  // if (method === "GET") {
  //   const searchParams = new URLSearchParams(queryParams).toString();
  //   if (searchParams) url += `?${searchParams}`;
  // }
  if (method === "GET") {
    const searchParams = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v))); // repeat param
      } else {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    if (queryString) url += `?${queryString}`;
  }
  // TODo: add allow multiple same name query params end

  const options: RequestInit = {
    method,
    headers,
    ...(method !== "GET" && { body: JSON.stringify(queryParams) }),
  };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw {
        response: {
          status: response.status,
          data: responseData,
        },
      };
    }

    return responseData;
  } catch (error: any) {
    //If you just return the error (e.g., return error), React Query will treat it as successful data, not a failure.
    const handled = handleApiError(error) !== null;
    if (handled) {
      throw new Error("Handled API error");
    }
    const message =
      error?.response?.data?.message || error?.message || "Request failed";
    throw new Error(message);
  }
};

// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const fetchGetData = async ({ queryKey }: any) => {
//   const [_key, { path, token, queryParams = {} }] = queryKey;

//   const searchParams = new URLSearchParams(queryParams).toString();
//   const url = `${API_URL}/${path}${searchParams ? `?${searchParams}` : ""}`;

//   try {
//     const response = await axios.get(url, {
//       headers: token ? { Authorization: `Bearer ${token}` } : {},
//     });

//     return response.data;
//   } catch (error: any) {
//     //If you just return the error (e.g., return error), React Query will treat it as successful data, not a failure.
//     const message = error?.response?.data?.message || "Get Request failed";
//     throw new Error(message);
//   }
// };
