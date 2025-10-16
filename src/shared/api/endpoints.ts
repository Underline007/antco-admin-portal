export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    VALIDATE_TOKEN: "/auth/validate-token",
    REGISTER: "/auth/register",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  // Users
  USERS: {
    LIST: "/users",
    GET: (id: string) => `/users/${id}`,
    CREATE: "/users",
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    UPDATE_ROLE: (id: string) => `/users/${id}/role`,
  },

  // Roles
  ROLES: {
    LIST: "/roles",
    GET: (id: string) => `/roles/${id}`,
    CREATE: "/roles",
    UPDATE: (id: string) => `/roles/${id}`,
    DELETE: (id: string) => `/roles/${id}`,
    PERMISSIONS: (id: string) => `/roles/${id}/permissions`,
  },

  // Permissions
  PERMISSIONS: {
    LIST: "/permissions",
    ASSIGN: "/permissions/assign",
  },
} as const;
