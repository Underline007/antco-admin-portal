// Re-export User type from auth feature since it's shared
export type { User } from "../../auth/types";

// Create User DTO (matches backend CreateUserDto)
export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

// Update User DTO (matches backend UpdateUserDto)
export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatar?: string;
}

// Assign Roles DTO
export interface AssignRolesDto {
  roleIds: string[];
}

// Filters for querying users list
export interface UserFilters {
  searchTerm?: string;
  status?: "Active" | "Inactive" | "Suspended" | "PendingVerification";
}
