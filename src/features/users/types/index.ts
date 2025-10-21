// Re-export User type from auth feature since it's shared
export type { User } from "../../auth/types";

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleIds: string[];
  isActive?: boolean;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  roleIds?: string[];
  isActive?: boolean;
}

// Filters for querying users list
export interface UserFilters {
  search?: string;
  roleId?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
