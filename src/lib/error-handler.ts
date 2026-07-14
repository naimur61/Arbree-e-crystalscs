import toast from "react-hot-toast";

/** API error response structure */
interface ApiErrorResponse {
  status?: number;
  data?: {
    message?: string;
    [key: string]: unknown;
  };
}

/** Error structure from API calls */
interface ApiError {
  response?: ApiErrorResponse;
  message?: string;
}

/** HTTP status codes requiring special handling */
const REDIRECT_STATUS_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
} as const;

/** Route paths for redirects */
const REDIRECT_PATHS = {
  LOGIN: "/login",
  FORBIDDEN: "/forbidden",
} as const;

/**
 * Handle API authorization errors (401/403) with user feedback and redirects
 *
 * @param error - The error object from API call
 * @returns false if error was handled (auth error), undefined for other errors
 *
 * @example
 * ```tsx
 * try {
 *   const data = await fetchData();
 * } catch (error) {
 *   const wasHandled = handleApiAuthError(error);
 *   if (!wasHandled) {
 *     // Handle other error types
 *   }
 * }
 * ```
 */
export function handleApiAuthError(error: unknown): false | undefined {
  const apiError = error as ApiError;
  const status = apiError?.response?.status;

  // Handle 401 Unauthorized
  if (status === REDIRECT_STATUS_CODES.UNAUTHORIZED) {
    toast.error("Unauthorized. Redirecting to login...");
    window.location.href = REDIRECT_PATHS.LOGIN;
    return false;
  }

  // Handle 403 Forbidden
  if (status === REDIRECT_STATUS_CODES.FORBIDDEN) {
    toast.error("Access denied.");
    window.location.href = REDIRECT_PATHS.FORBIDDEN;
    return false;
  }

  // Error not handled
  return undefined;
}
