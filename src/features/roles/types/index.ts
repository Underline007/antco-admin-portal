// Role DTO (matches backend RoleDto)
export interface Role {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Create Role DTO
export interface CreateRoleDto {
  name: string;
  description?: string;
}

// Update Role DTO
export interface UpdateRoleDto {
  name: string;
  description?: string;
}

// Assign Permissions DTO
export interface AssignPermissionsDto {
  permissionNames: string[];
}

// Role Filters
export interface RoleFilters {
  searchTerm?: string;
}
