import { adminApiClient } from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";
import type {
  Role,
  CreateRoleDto,
  UpdateRoleDto,
  AssignPermissionsDto,
  RoleFilters,
} from "../types";
import type { PaginatedResponse } from "../../../shared/api/types";

export const roleApi = {
  // Get roles with pagination
  getRoles: async (
    pageNumber: number = 1,
    pageSize: number = 10,
    filters?: RoleFilters
  ): Promise<PaginatedResponse<Role>> => {
    const params = {
      pageNumber,
      pageSize,
      ...filters,
    };
    const response = await adminApiClient.get(API_ENDPOINTS.ROLES.LIST, { params });
    return response.data;
  },

  // Get role by ID
  getRole: async (id: string): Promise<Role> => {
    const response = await adminApiClient.get(API_ENDPOINTS.ROLES.GET(id));
    return response.data;
  },

  // Create role
  createRole: async (data: CreateRoleDto): Promise<{ value: string }> => {
    const response = await adminApiClient.post(API_ENDPOINTS.ROLES.CREATE, data);
    return response.data;
  },

  // Update role
  updateRole: async (id: string, data: UpdateRoleDto): Promise<Role> => {
    const response = await adminApiClient.put(API_ENDPOINTS.ROLES.UPDATE(id), data);
    return response.data;
  },

  // Delete role
  deleteRole: async (id: string): Promise<void> => {
    await adminApiClient.delete(API_ENDPOINTS.ROLES.DELETE(id));
  },

  // Assign permissions to role
  assignPermissions: async (
    id: string,
    data: AssignPermissionsDto
  ): Promise<{ message: string }> => {
    const response = await adminApiClient.post(
      API_ENDPOINTS.ROLES.ASSIGN_PERMISSIONS(id),
      data
    );
    return response.data;
  },
};
