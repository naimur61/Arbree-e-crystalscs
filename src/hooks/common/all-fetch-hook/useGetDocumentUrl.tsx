import useFetchData from "@/hooks/TanstackQueries/useFetchData";

/** API response structure for document URL */
interface DocumentUrlResponse {
  data?: {
    url?: string;
    [key: string]: unknown;
  };
}

/** Configuration for useGetDocumentUrl hook */
interface GetDocumentUrlOptions {
  /** Normalized document path */
  normalizedPath?: string;
  /** Raw image URL from row data (will be parsed to extract path) */
  rowImageUrl?: string;
  /** Enable/disable the query */
  enable?: boolean;
}

/** Return type for useGetDocumentUrl hook */
interface UseGetDocumentUrlReturn {
  /** Raw API response data */
  data: DocumentUrlResponse | undefined;
  /** Whether data is loading */
  isLoading: boolean;
  /** Whether an error occurred */
  isError: boolean;
}

/**
 * Parse document path from JSON string or return null
 *
 * @param rowImageUrl - JSON string containing path or direct path
 * @returns Parsed path or null
 *
 * @example
 * ```ts
 * parseDocumentPath('{"path": "/documents/file.pdf"}')  // "/documents/file.pdf"
 * parseDocumentPath('/documents/file.pdf')               // "/documents/file.pdf"
 * parseDocumentPath(undefined)                          // null
 * ```
 */
export function parseDocumentPath(rowImageUrl?: string): string | null {
  if (!rowImageUrl) return null;

  try {
    const pathObj = JSON.parse(rowImageUrl) as { path?: string };
    return pathObj?.path ?? null;
  } catch {
    // Not JSON, assume it's a direct path
    return rowImageUrl;
  }
}

/**
 * Hook to fetch document URL by path
 *
 * @example
 * ```tsx
 * // With normalized path
 * const { data, isLoading } = useGetDocumentUrl({
 *   normalizedPath: "/courses/123/document.pdf",
 * });
 *
 * // With row image URL (JSON or direct)
 * const { data } = useGetDocumentUrl({
 *   rowImageUrl: '{"path": "/documents/file.pdf"}',
 * });
 *
 * // Get the URL
 * const documentUrl = data?.data?.url;
 * ```
 */
function useGetDocumentUrl({
  normalizedPath,
  rowImageUrl,
  enable,
}: GetDocumentUrlOptions = {}): UseGetDocumentUrlReturn {
  const resolvedPath = normalizedPath || parseDocumentPath(rowImageUrl);

  const { data, isLoading, isError } = useFetchData<DocumentUrlResponse>({
    path: resolvedPath ? `student-portal${resolvedPath}` : "",
    queryKey: `get-document-url-${resolvedPath ?? "empty"}`,
    enabled: enable !== undefined ? enable && !!resolvedPath : !!resolvedPath,
  });

  return { data, isLoading, isError };
}

export default useGetDocumentUrl;
