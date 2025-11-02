import apiClient from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  User,
  ChangePasswordRequest,
  SendSMSCodeRequest,
  VerifySMSCodeRequest,
} from "../types";

export const authApi = {
  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  // Register
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
      refreshToken,
    });
    return response.data;
  },

  // Change password
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  },

  // Send SMS verification code
  sendSMSCode: async (data: SendSMSCodeRequest): Promise<{ message: string; success: boolean }> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.SEND_SMS_CODE, data);
    return response.data;
  },

  // Verify SMS code
  verifySMSCode: async (data: VerifySMSCodeRequest): Promise<LoginResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_SMS_CODE, data);
    return response.data;
  },
};
