import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/stores/authStore";

interface UseRoutePermissionOptions {
  resource?: string;
  action?: string;
  roles?: string[];
  requireAll?: boolean;
  redirectTo?: string;
}

export const useRoutePermission = ({
  resource,
  action,
  roles,
  requireAll = false,
  redirectTo = "/unauthorized",
}: UseRoutePermissionOptions) => {
  const navigate = useNavigate();
  const { hasPermission, hasAnyRole, hasAllRoles } = useAuthStore();

  useEffect(() => {
    let hasAccess = true;

    // Check permissions
    if (resource && action) {
      hasAccess = hasPermission(resource, action);
    }

    // Check roles
    if (hasAccess && roles && roles.length > 0) {
      hasAccess = requireAll ? hasAllRoles(roles) : hasAnyRole(roles);
    }

    // Redirect if no access
    if (!hasAccess) {
      navigate(redirectTo, { replace: true });
    }
  }, [
    resource,
    action,
    roles,
    requireAll,
    redirectTo,
    navigate,
    hasPermission,
    hasAnyRole,
    hasAllRoles,
  ]);

  return { hasAccess: true }; // If we're still here, we have access
};
