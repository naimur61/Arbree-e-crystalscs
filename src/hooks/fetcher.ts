import { handleApiAuthError } from "@/lib/error-handler";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Supported HTTP methods for fetch requests */
type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

/** Query parameters - string values or arrays for repeated params */
type QueryParams = Record<string, string | number | boolean | string[]>;

/** Configuration passed via React Query's queryKey */
interface FetchQueryKey {
  path: string;
  Method: HttpMethod;
  withOutToken?: boolean;
  token?: string;
  queryParams?: QueryParams;
}

/** Standard API error structure */
interface ApiError {
  response?: {
    status: number;
    data: unknown;
  };
  message?: string;
}

/** Convert QueryParams to URLSearchParams, supporting array values */
function buildSearchParams(queryParams: QueryParams): URLSearchParams {
  const searchParams = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else {
      searchParams.append(key, String(value));
    }
  });

  return searchParams;
}

/**
 * Fetch data function for React Query
 * Used as queryFn in useQuery/useInfiniteQuery
 */
export const fetchData = async ({
  queryKey,
}: {
  queryKey: [unknown, FetchQueryKey];
}) => {
  const [, { path, Method, withOutToken, token, queryParams = {} }] = queryKey;

  const method = Method.toUpperCase();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Only add Bearer token when withOutToken is false
  if (!withOutToken && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let url = `${API_URL}/${path}`;

  // Build URL with search params for GET requests
  if (method === "GET") {
    const searchParams = buildSearchParams(queryParams);
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

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
      } satisfies ApiError;
    }

    return responseData;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    const wasHandled = handleApiAuthError(apiError);

    if (wasHandled === false) {
      throw new Error("Handled API error");
    }

    const message =
      apiError?.response?.data &&
      typeof apiError.response.data === "object" &&
      "message" in apiError.response.data
        ? String((apiError.response.data as { message: string }).message)
        : apiError?.message || "Request failed";

    throw new Error(message);
  }
};
