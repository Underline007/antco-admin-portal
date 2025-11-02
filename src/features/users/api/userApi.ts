import { adminApiClient } from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";
import { User, CreateUserDto, UpdateUserDto, UserFilters, AssignRolesDto } from "../types";
import type { PaginatedResponse } from "../../../shared/api/types";

export const userApi = {
  // Get users with pagination
  getUsers: async (
    pageNumber: number = 1,
    pageSize: number = 10,
    filters?: UserFilters
  ): Promise<PaginatedResponse<User>> => {
    const params = {
      pageNumber,
      pageSize,
      ...filters,
    };
    const response = await adminApiClient.get(API_ENDPOINTS.USERS.LIST, { params });
    return response.data;
  },

  // Get user by ID
  getUser: async (id: string): Promise<User> => {
    const response = await adminApiClient.get(API_ENDPOINTS.USERS.GET(id));
    return response.data;
  },

  // Create user
  createUser: async (data: CreateUserDto): Promise<{ value: string }> => {
    const response = await adminApiClient.post(API_ENDPOINTS.USERS.CREATE, data);
    return response.data;
  },

  // Update user
  updateUser: async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await adminApiClient.put(API_ENDPOINTS.USERS.UPDATE(id), data);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: string): Promise<void> => {
    await adminApiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
  },

  // Assign roles to user
  assignRoles: async (id: string, roleIds: string[]): Promise<{ message: string }> => {
    const response = await adminApiClient.post(API_ENDPOINTS.USERS.ASSIGN_ROLES(id), roleIds);
    return response.data;
  },
};
