import { ToastMessageShow } from "@/components/common/toast";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { removeEmptyFields } from "@/lib/remove-empty-fields";
import { useAccessToken } from "./useAccessToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** HTTP methods that can be used with mutations */
type MutationMethod = "POST" | "PATCH" | "DELETE" | "PUT";

/** Response data format */
type ResponseType = "json" | "blob" | "arraybuffer" | "text";

/** Content type for request body */
type DataType = "application/json" | "multipart/form-data";

/** Variables that can be passed to the mutation function */
interface MutationVariables {
  /** Request body or form data */
  [key: string]: unknown;
  /** Optional path override (if not provided in config) */
  path?: string;
}

/** Error structure from API */
interface ApiMutationError {
  response?: {
    status: number;
    data: unknown;
  };
  message?: string;
}

/** Configuration options for useApiMutation */
interface MutationConfig<TData = unknown> {
  /** Whether to remove empty fields from payload */
  safe?: boolean;
  /** HTTP method for the mutation */
  method: MutationMethod;
  /** API endpoint path (can be provided at call time via variables.path) */
  path?: string;
  /** Explicit authentication token (defaults to access token from context) */
  token?: string;
  /** Callback when mutation succeeds */
  onSuccess?: (data: TData) => void;
  /** Callback when mutation fails */
  onError?: (error: ApiMutationError) => void;
  /** Content type of the request body */
  dataType?: DataType;
  /** Expected response data format */
  responseType?: ResponseType;
  /** Show toast on success */
  isSuccessToast?: boolean;
  /** Show toast on error */
  isErrorToast?: boolean;
}

/**
 * Hook for API mutations (POST, PATCH, DELETE, PUT)
 *
 * @example
 * ```tsx
 * const mutation = useApiMutation({
 *   method: "POST",
 *   path: "courses/create",
 *   onSuccess: (data) => console.log("Created:", data),
 * });
 *
 * // Usage
 * mutation.mutate({ title: "New Course", description: "..." });
 * ```
 */
export function useApiMutation<TData = unknown>({
  responseType = "json",
  safe = true,
  method,
  path,
  token: explicitToken,
  onSuccess,
  onError,
  dataType = "application/json",
  isSuccessToast = true,
  isErrorToast = true,
}: MutationConfig<TData>): UseMutationResult<
  TData,
  ApiMutationError,
  MutationVariables
> {
  const accessToken = useAccessToken();
  const authToken = explicitToken || accessToken || "";

  return useMutation<TData, ApiMutationError, MutationVariables>({
    mutationFn: async (variables: MutationVariables) => {
      const requestPath = path ?? variables.path;

      if (!requestPath) {
        throw new Error(
          "API path is required either in config or mutation variables",
        );
      }

      const headers: Record<string, string> =
        dataType === "multipart/form-data"
          ? { Authorization: `Bearer ${authToken}` }
          : {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            };

      const body =
        dataType === "multipart/form-data"
          ? (variables as unknown as FormData)
          : JSON.stringify(
              safe
                ? removeEmptyFields(variables as Record<string, unknown>)
                : variables,
            );

      const response = await fetch(`${API_URL}/${requestPath}`, {
        method,
        headers,
        body,
      });

      let parsedData: TData;

      switch (responseType) {
        case "blob":
          parsedData = (await response.blob()) as TData;
          break;
        case "arraybuffer":
          parsedData = (await response.arrayBuffer()) as TData;
          break;
        case "text":
          parsedData = (await response.text()) as TData;
          break;
        default:
          parsedData = (await response.json().catch(() => ({}))) as TData;
      }

      if (!response.ok) {
        console.error("API mutation error", parsedData);
        throw {
          response: {
            status: response.status,
            data: parsedData,
          },
        } satisfies ApiMutationError;
      }

      return parsedData;
    },

    onSuccess: (data: TData) => {
      if (onSuccess) {
        onSuccess(data);
        return;
      }

      if (isSuccessToast) {
        ToastMessageShow("success", data);
      }
    },

    onError: (error: ApiMutationError) => {
      console.error("API mutation error:", error);

      if (onError) {
        onError(error);
        return;
      }

      if (isErrorToast) {
        ToastMessageShow("error", error);
      }
    },
  });
}
