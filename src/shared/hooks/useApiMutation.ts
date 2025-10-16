import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { handleApiError } from "../api/utils";

type AnyFn = (...args: unknown[]) => unknown;

interface UseApiMutationOptions<TData, TVariables, TContext = unknown>
  extends Omit<
    UseMutationOptions<TData, AxiosError, TVariables, TContext>,
    "mutationFn"
  > {
  /** Your convenience error handler that receives a human-readable message */
  onErrorMessage?: (
    message: string,
    rawError: AxiosError,
    variables?: TVariables
  ) => void;
  /** Your convenience success handler with just the data */
  onSuccessData?: (data: TData) => void;
}

export function useApiMutation<
  TData = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseApiMutationOptions<TData, TVariables, TContext>
): UseMutationResult<TData, AxiosError, TVariables, TContext> {
  const {
    onErrorMessage,
    onSuccessData,
    // Keep TanStack's native callbacks if the caller still wants them
    onError: nativeOnError,
    onSuccess: nativeOnSuccess,
    ...rest
  } = options ?? {};

  return useMutation<TData, AxiosError, TVariables, TContext>({
    mutationFn,
    ...rest,
    // Compose: call native first, then your convenience callbacks
    onError: (error, variables, onMutateResult, context) => {
      (nativeOnError as AnyFn | undefined)?.(
        error,
        variables,
        onMutateResult,
        context
      );
      onErrorMessage?.(handleApiError(error), error, variables);
    },
    onSuccess: (data, variables, context) => {
      (nativeOnSuccess as AnyFn | undefined)?.(data, variables, context);
      onSuccessData?.(data);
    },
  });
}
