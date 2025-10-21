// src/app/routes/LazyRoute.tsx
import { Suspense } from "react";
import { LoadingScreen } from "@/shared/components/ui/LoadingScreen";

// Route wrapper for lazy loading
export const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
);
