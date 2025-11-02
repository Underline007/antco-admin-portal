export const API_ENDPOINTS = {
  // Authentication (SSO.AntCo.API - port 5000)
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    REGISTER: "/auth/register",
    CHANGE_PASSWORD: "/auth/change-password",
    SEND_SMS_CODE: "/auth/send-sms-code",
    VERIFY_SMS_CODE: "/auth/verify-sms-code",
    ME: "/auth/me",
  },

  // Users (SSO.AntCo.Admin.API - port 5300)
  USERS: {
    LIST: "/admin/users",
    GET: (id: string) => `/admin/users/${id}`,
    CREATE: "/admin/users",
    UPDATE: (id: string) => `/admin/users/${id}`,
    DELETE: (id: string) => `/admin/users/${id}`,
    ASSIGN_ROLES: (id: string) => `/admin/users/${id}/roles`,
  },

  // Roles (SSO.AntCo.Admin.API - port 5300)
  ROLES: {
    LIST: "/admin/roles",
    GET: (id: string) => `/admin/roles/${id}`,
    CREATE: "/admin/roles",
    UPDATE: (id: string) => `/admin/roles/${id}`,
    DELETE: (id: string) => `/admin/roles/${id}`,
    ASSIGN_PERMISSIONS: (id: string) => `/admin/roles/${id}/permissions`,
  },

  // Permissions (SSO.AntCo.Admin.API - port 5300)
  PERMISSIONS: {
    LIST: "/admin/permissions",
    CATEGORIES: "/admin/permissions/categories",
  },
} as const;
