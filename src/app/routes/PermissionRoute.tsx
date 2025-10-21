import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/stores/authStore";

interface PermissionRouteProps {
  children: ReactNode;
  resource?: string;
  action?: string;
  roles?: string[];
  requireAll?: boolean; // Require all roles or just one
  fallback?: ReactNode; // Custom fallback component
}

export const PermissionRoute = ({
  children,
  resource,
  action,
  roles,
  requireAll = false,
  fallback,
}: PermissionRouteProps) => {
  const { hasPermission, hasAnyRole, hasAllRoles, isAuthenticated } =
    useAuthStore();

  // Check if user is authenticated first
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Check permission
  if (resource && action) {
    const hasRequiredPermission = hasPermission(resource, action);
    if (!hasRequiredPermission) {
      return fallback || <Navigate to="/unauthorized" replace />;
    }
  }

  // Check roles
  if (roles && roles.length > 0) {
    const hasRequiredRoles = requireAll
      ? hasAllRoles(roles)
      : hasAnyRole(roles);

    if (!hasRequiredRoles) {
      return fallback || <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};
