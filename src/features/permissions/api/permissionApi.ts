import { adminApiClient } from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";
import type { Permission, PermissionCategory, PermissionFilters } from "../types";

export const permissionApi = {
  // Get all permissions
  getPermissions: async (filters?: PermissionFilters): Promise<Permission[]> => {
    const params = filters ? { ...filters } : {};
    const response = await adminApiClient.get(API_ENDPOINTS.PERMISSIONS.LIST, {
      params,
    });
    return response.data;
  },

  // Get permission categories
  getCategories: async (): Promise<PermissionCategory[]> => {
    const response = await adminApiClient.get(API_ENDPOINTS.PERMISSIONS.CATEGORIES);
    return response.data;
  },
};
