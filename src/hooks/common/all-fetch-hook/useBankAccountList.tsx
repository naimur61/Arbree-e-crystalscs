import useFetchData from "@/hooks/TanstackQueries/useFetchData";

/** Bank account structure */
interface BankAccount {
  id: string;
  bankName?: string;
  accountNumber?: string;
  [key: string]: unknown;
}

/** API response structure */
interface BankAccountsResponse {
  data?: {
    bankInfos?: BankAccount[];
  };
}

/** Option format for dropdowns/selects */
interface SelectOption {
  label: string;
  value: string;
}

/** Configuration for bank account list hook */
interface BankAccountListOptions {
  /** Custom API path */
  path?: string;
  /** Additional filters */
  filter?: Record<string, unknown>;
  /** Enable/disable the query */
  enabled?: boolean;
}

/** Return type for useBankAccountList hook */
interface UseBankAccountListReturn {
  /** Formatted options for dropdowns */
  options: SelectOption[];
  /** Raw API response data */
  data: BankAccountsResponse | undefined;
  /** Whether data is loading */
  isLoading: boolean;
  /** Whether an error occurred */
  isError: boolean;
}

/**
 * Hook to fetch bank account list
 *
 * @example
 * ```tsx
 * const { options, isLoading } = useBankAccountList();
 *
 * // Use with select component
 * <Select options={options} placeholder="Select bank account" />
 *
 * // With custom path and filters
 * const { options } = useBankAccountList({
 *   path: "admin/bank-accounts",
 *   filter: { status: "active" },
 * });
 * ```
 */
function useBankAccountList({
  path,
  filter,
  enabled,
}: BankAccountListOptions = {}): UseBankAccountListReturn {
  const { data, isLoading, isError } = useFetchData<BankAccountsResponse>({
    method: "GET",
    path: path ?? "student-portal/access/accounts/list",
    queryKey: "list-of-bank-account-list",
    enabled,
    filterData: filter as Record<string, string | number | boolean | string[]>,
  });

  const options: SelectOption[] =
    data?.data?.bankInfos?.map((item) => ({
      label: item.bankName || "Unknown",
      value: item.id,
    })) ?? [];

  return { options, data, isLoading, isError };
}

export default useBankAccountList;
