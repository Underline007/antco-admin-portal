import * as React from "react";
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { handleApiError } from "../api/utils";

interface UseApiQueryOptions<TData>
  extends Omit<UseQueryOptions<TData, AxiosError>, "queryKey" | "queryFn"> {
  /** Optional: your own handler that receives a human-friendly error message */
  onError?: (errorMessage: string, rawError?: AxiosError) => void;
}

export function useApiQuery<TData = unknown>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<TData>,
  options?: UseApiQueryOptions<TData>
): UseQueryResult<TData, AxiosError> {
  const { onError, ...rest } = options ?? {};

  const result = useQuery<TData, AxiosError>({
    queryKey,
    queryFn,
    // v5: do NOT include onError here
    ...rest,
  });

  React.useEffect(() => {
    if (result.error && onError) {
      onError(handleApiError(result.error), result.error);
    }
  }, [result.error, onError]);

  return result;
}
