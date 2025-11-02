import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { roleApi } from "../api/roleApi";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Plus, Search, Edit, Trash2, Key } from "lucide-react";

export default function RolesListPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch roles
  const { data, isLoading, error } = useQuery({
    queryKey: ["roles", pageNumber, pageSize, searchTerm],
    queryFn: () =>
      roleApi.getRoles(pageNumber, pageSize, {
        searchTerm: searchTerm || undefined,
      }),
  });

  const roles = data?.items || [];
  const totalPages = data?.totalPages || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPageNumber(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Roles</h1>
            <p className="text-gray-600 mt-2">
              Manage user roles and permissions
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Role
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <Card className="p-4 mb-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit">Search</Button>
        </form>
      </Card>

      {/* Roles Grid */}
      {isLoading && (
        <div className="text-center py-8 text-gray-600">Loading roles...</div>
      )}

      {error && (
        <div className="text-center py-8 text-red-600">
          Error loading roles. Please try again.
        </div>
      )}

      {!isLoading && !error && roles.length === 0 && (
        <Card className="p-8 text-center text-gray-600">No roles found.</Card>
      )}

      {!isLoading && !error && roles.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Card key={role.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Key className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {role.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {role.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {role.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Created: {formatDate(role.createdAt)}</span>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Key className="h-4 w-4 mr-2" />
                    Permissions
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <Card className="p-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing page {pageNumber} of {totalPages} ({data?.totalCount}{" "}
                total roles)
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pageNumber === 1}
                  onClick={() => setPageNumber((p) => p - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pageNumber >= totalPages}
                  onClick={() => setPageNumber((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
