// src/app/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
// import { PermissionRoute } from "./PermissionRoute";
import { LazyRoute } from "./LazyRoute";
// import { MainLayout } from "@/app/layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";


// Lazy load pages
// Auth pages
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(()=> import("@/features/auth/pages/RegisterPage"));
const ForgotPasswordPage = lazy(
  () => import("@/features/auth/pages/ForgotPasswordPage")
);

// // Dashboard
// const DashboardPage = lazy(
//   () => import("@/features/dashboard/pages/DashboardPage")
// );

// // User management
// const UsersListPage = lazy(
//   () => import("@/features/users/pages/UsersListPage")
// );
// const UserDetailsPage = lazy(
//   () => import("@/features/users/pages/UserDetailsPage")
// );
// const CreateUserPage = lazy(
//   () => import("@/features/users/pages/CreateUserPage")
// );
// const EditUserPage = lazy(() => import("@/features/users/pages/EditUserPage"));

// // Role management
// const RolesListPage = lazy(
//   () => import("@/features/roles/pages/RolesListPage")
// );
// const RoleDetailsPage = lazy(
//   () => import("@/features/roles/pages/RoleDetailsPage")
// );
// const CreateRolePage = lazy(
//   () => import("@/features/roles/pages/CreateRolePage")
// );
// const EditRolePage = lazy(() => import("@/features/roles/pages/EditRolePage"));

// // Permission management
// const PermissionsPage = lazy(
//   () => import("@/features/permissions/pages/PermissionsPage")
// );

// // Profile
// const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));
// const SettingsPage = lazy(
//   () => import("@/features/settings/pages/SettingsPage")
// );

// Error pages
const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"));
const UnauthorizedPage = lazy(() => import("@/shared/pages/UnauthorizedPage"));



// Define and export router
export const router = createBrowserRouter([


  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      // {
      //   element: <MainLayout />,
      //   children: [
      //     {
      //       index: true,
      //       element: (
      //         <LazyRoute>
      //           <DashboardPage />
      //         </LazyRoute>
      //       ),
      //     },
      //     {
      //       path: "dashboard",
      //       element: (
      //         <LazyRoute>
      //           <DashboardPage />
      //         </LazyRoute>
      //       ),
      //     },
      //     {
      //       path: "users",
      //       children: [
      //         {
      //           index: true,
      //           element: (
      //             <PermissionRoute resource="users" action="read">
      //               <LazyRoute>
      //                 <UsersListPage />
      //               </LazyRoute>
      //             </PermissionRoute>
      //           ),
      //         },
      //         {
      //           path: "new",
      //           element: (
      //             <PermissionRoute resource="users" action="create">
      //               <LazyRoute>
      //                 <CreateUserPage />
      //               </LazyRoute>
      //             </PermissionRoute>
      //           ),
      //         },
      //         {
      //           path: ":id",
      //           element: (
      //             <PermissionRoute resource="users" action="read">
      //               <LazyRoute>
      //                 <UserDetailsPage />
      //               </LazyRoute>
      //             </PermissionRoute>
      //           ),
      //         },
      //         {
      //           path: ":id/edit",
      //           element: (
      //             <PermissionRoute resource="users" action="update">
      //               <LazyRoute>
      //                 <EditUserPage />
      //               </LazyRoute>
      //             </PermissionRoute>
      //           ),
      //         },
      //       ],
      //     },
      //     {
      //       path: "roles",
      //       children: [
      //         {
      //           index: true,
      //           element: (
      //             <PermissionRoute resource="roles" action="read">
      //               <LazyRoute>
      //                 <RolesListPage />
      //               </LazyRoute>
      //             </PermissionRoute>
      //           ),
      //         },
      //         {
      //           path: "new",
      //           element: (
      //             <PermissionRoute resource="roles" action="create">
      //               <LazyRoute>
      //                 <CreateRolePage />
      //               </LazyRoute>
      //             </PermissionRoute>
      //           ),
      //         },
      //         {
      //           path: ":id",
      //           element: (
      //             <PermissionRoute resource="roles" action="read">
      //               <LazyRoute>
      //                 <RoleDetailsPage />
      //               </LazyRoute>
      //             </PermissionRoute>
      //           ),
      //         },
      //         {
      //           path: ":id/edit",
      //           element: (
      //             <PermissionRoute resource="roles" action="update">
      //               <LazyRoute>
      //                 <EditRolePage />
      //               </LazyRoute>
      //             </PermissionRoute>
      //           ),
      //         },
      //       ],
      //     },
      //     {
      //       path: "permissions",
      //       element: (
      //         <PermissionRoute resource="permissions" action="read">
      //           <LazyRoute>
      //             <PermissionsPage />
      //           </LazyRoute>
      //         </PermissionRoute>
      //       ),
      //     },
      //     {
      //       path: "profile",
      //       element: (
      //         <LazyRoute>
      //           <ProfilePage />
      //         </LazyRoute>
      //       ),
      //     },
      //     {
      //       path: "settings",
      //       element: (
      //         <LazyRoute>
      //           <SettingsPage />
      //         </LazyRoute>
      //       ),
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "/auth",
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: (
              <LazyRoute>
                <LoginPage />
              </LazyRoute>
            ),
          },
          {
            path: "register",
            element: (
              <LazyRoute>
                <RegisterPage />
              </LazyRoute>
            ),
          },
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
