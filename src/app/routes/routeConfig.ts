export const ROUTES = {
  // Root
  ROOT: "/",

  // Public routes
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },

  // Protected routes
  DASHBOARD: "/dashboard",

  // User management
  USERS: {
    LIST: "/users",
    CREATE: "/users/new",
    DETAIL: (id: string) => `/users/${id}`,
    EDIT: (id: string) => `/users/${id}/edit`,
  },

  // Role management
  ROLES: {
    LIST: "/roles",
    CREATE: "/roles/new",
    DETAIL: (id: string) => `/roles/${id}`,
    EDIT: (id: string) => `/roles/${id}/edit`,
  },

  // Permission management
  PERMISSIONS: "/permissions",

  // Profile & Settings
  PROFILE: "/profile",
  SETTINGS: "/settings",

  // Error pages
  UNAUTHORIZED: "/unauthorized",
  NOT_FOUND: "/404",
} as const;
