import {
  useNavigate as useRouterNavigate,
  useLocation,
} from "react-router-dom";
import { ROUTES } from "@/app/routes/routeConfig";

export const useNavigate = () => {
  const navigate = useRouterNavigate();
  const location = useLocation();

  return {
    // Raw navigate function
    navigate,

    // Navigation helpers
    goToLogin: (returnUrl?: string) => {
      navigate(ROUTES.AUTH.LOGIN, {
        state: { from: returnUrl || location },
      });
    },
    goToDashboard: () => navigate(ROUTES.DASHBOARD),

    // Users
    goToUsers: () => navigate(ROUTES.USERS.LIST),
    goToCreateUser: () => navigate(ROUTES.USERS.CREATE),
    goToUserDetail: (id: string) => navigate(ROUTES.USERS.DETAIL(id)),
    goToEditUser: (id: string) => navigate(ROUTES.USERS.EDIT(id)),

    // Roles
    goToRoles: () => navigate(ROUTES.ROLES.LIST),
    goToCreateRole: () => navigate(ROUTES.ROLES.CREATE),
    goToRoleDetail: (id: string) => navigate(ROUTES.ROLES.DETAIL(id)),
    goToEditRole: (id: string) => navigate(ROUTES.ROLES.EDIT(id)),

    // Permissions
    goToPermissions: () => navigate(ROUTES.PERMISSIONS),

    // Profile & Settings
    goToProfile: () => navigate(ROUTES.PROFILE),
    goToSettings: () => navigate(ROUTES.SETTINGS),

    // Utilities
    goBack: () => navigate(-1),
    replace: (path: string) => navigate(path, { replace: true }),
  };
};
