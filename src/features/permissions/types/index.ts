// Permission DTO (matches backend)
export interface Permission {
  id: string;
  name: string;
  description?: string;
  category: string;
}

// Permission Category
export interface PermissionCategory {
  name: string;
  description: string;
}

// Permission Filters
export interface PermissionFilters {
  category?: string;
}
