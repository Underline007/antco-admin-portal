import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/stores/authStore";

export const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    // Redirect to dashboard if already authenticated
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
