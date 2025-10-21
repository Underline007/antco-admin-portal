import apiClient from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";
import { User, CreateUserDto, UpdateUserDto, UserFilters } from "../types";
import type { PaginatedResponse } from "../../../shared/api/types";

export const userApi = {
  getUsers: async (
    page: number,
    pageSize: number,
    filters?: UserFilters
  ): Promise<PaginatedResponse<User>> => {
    const params = {
      pageNumber: page,
      pageSize,
      ...filters,
    };
    const response = await apiClient.get(API_ENDPOINTS.USERS.LIST, { params });
    return response.data;
  },

  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get(API_ENDPOINTS.USERS.GET(id));
    return response.data;
  },

  createUser: async (data: CreateUserDto): Promise<User> => {
    const response = await apiClient.post(API_ENDPOINTS.USERS.CREATE, data);
    return response.data;
  },

  updateUser: async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await apiClient.put(API_ENDPOINTS.USERS.UPDATE(id), data);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
  },

  updateUserRole: async (id: string, roleIds: string[]): Promise<User> => {
    const response = await apiClient.put(API_ENDPOINTS.USERS.UPDATE_ROLE(id), {
      roleIds,
    });
    return response.data;
  },
};
