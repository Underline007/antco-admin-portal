import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, LoginRequest, AuthState } from "../types";
import { authApi } from "../api/authApi";
import { setTokens, clearTokens } from "../utils/token";
import axios from "axios";

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  clearError: () => void;

  // Permission checks
  hasPermission: (resource: string, action: string) => boolean;
  hasRole: (roleName: string) => boolean;
  hasAnyRole: (roleNames: string[]) => boolean;
  hasAllRoles: (roleNames: string[]) => boolean;
}

type ApiErrorBody = {
  message?: string;
  code?: string;
  details?: Record<string, unknown>;
};

// Helper chuẩn để lấy message từ unknown
function getErrorMessage(err: unknown): string {
  if (typeof err === "string") return err;

  // Axios error?
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as ApiErrorBody | undefined;
    return data?.message ?? err.message ?? "Request failed";
  }

  if (err instanceof Error) return err.message;
  return "Unexpected error";
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(credentials);
          const { user, accessToken, refreshToken } = response;

          setTokens(accessToken, refreshToken);

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (err: unknown) {
          const message = getErrorMessage(err);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: message || "Login failed",
          });
          throw err;
        }
      },

      // Logout action
      logout: async () => {
        set({ isLoading: true });
        try {
          await authApi.logout();
        } catch (err) {
          // có thể log nhẹ nếu muốn
          console.error("Logout error:", getErrorMessage(err));
        } finally {
          clearTokens();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // Check authentication status
      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const user = await authApi.validateToken();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          console.error("Error while checking auth:", error);
          clearTokens();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // Update user data
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Permission checks
      hasPermission: (resource: string, action: string) => {
        const user = get().user;
        if (!user) return false;

        return user.permissions.some(
          (perm) => perm.resource === resource && perm.action === action
        );
      },

      hasRole: (roleName: string) => {
        const user = get().user;
        if (!user) return false;

        return user.roles.some((role) => role.name === roleName);
      },

      hasAnyRole: (roleNames: string[]) => {
        const user = get().user;
        if (!user) return false;

        return user.roles.some((role) => roleNames.includes(role.name));
      },

      hasAllRoles: (roleNames: string[]) => {
        const user = get().user;
        if (!user) return false;

        const userRoleNames = user.roles.map((role) => role.name);
        return roleNames.every((roleName) => userRoleNames.includes(roleName));
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
