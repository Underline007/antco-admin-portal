export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/Auth/login",
    LOGOUT: "/Auth/logout",
    REFRESH_TOKEN: "/Auth/refresh-token",
    VALIDATE_TOKEN: "/Auth/validate-token",
    REGISTER: "/Auth/register",
    CHANGE_PASSWORD: "/Auth/change-password",
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
