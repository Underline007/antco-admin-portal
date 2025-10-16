import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

// Helper: lấy HTTP status nếu object có dạng { response: { status: number } }
const getHttpStatus = (err: unknown): number | undefined => {
  if (typeof err === "object" && err !== null) {
    const res = (err as { response?: { status?: number } }).response;
    return res?.status;
  }
  return undefined;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: unknown) => {
        const status = getHttpStatus(error);
        // Không retry với lỗi 4xx
        if (status && status >= 400 && status < 500) return false;
        // Retry tối đa 3 lần cho lỗi khác
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
    mutations: {
      retry: false,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
