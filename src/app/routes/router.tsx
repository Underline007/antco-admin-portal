// src/app/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
// import { PermissionRoute } from "./PermissionRoute";
import { LazyRoute } from "./LazyRoute";
import { MainLayout } from "@/app/layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";


// Lazy load pages
// Auth pages
const AuthPage = lazy(() => import("@/features/auth/pages/AuthPage"));
const ForgotPasswordPage = lazy(
  () => import("@/features/auth/pages/ForgotPasswordPage")
);

// Dashboard
const DashboardPage = lazy(
  () => import("@/features/dashboard/pages/DashboardPage")
);

// User management
const UsersListPage = lazy(
  () => import("@/features/users/pages/UsersListPage")
);

// Role management
const RolesListPage = lazy(
  () => import("@/features/roles/pages/RolesListPage")
);

// Error pages
const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"));
const UnauthorizedPage = lazy(() => import("@/shared/pages/UnauthorizedPage"));



// Define and export router
export const router = createBrowserRouter([


  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <LazyRoute>
                <DashboardPage />
              </LazyRoute>
            ),
          },
          {
            path: "dashboard",
            element: (
              <LazyRoute>
                <DashboardPage />
              </LazyRoute>
            ),
          },
          {
            path: "users",
            element: (
              <LazyRoute>
                <UsersListPage />
              </LazyRoute>
            ),
          },
          {
            path: "roles",
            element: (
              <LazyRoute>
                <RolesListPage />
              </LazyRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: (
          <LazyRoute>
            <AuthPage />
          </LazyRoute>
        ),
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "forgot-password",
            element: (
              <LazyRoute>
                <ForgotPasswordPage />
              </LazyRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/unauthorized",
    element: (
      <LazyRoute>
        <UnauthorizedPage />
      </LazyRoute>
    ),
  },
  {
    path: "*",
    element: (
      <LazyRoute>
        <NotFoundPage />
      </LazyRoute>
    ),
  },
]);
