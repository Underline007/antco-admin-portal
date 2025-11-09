import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { roleApi } from "../api/roleApi";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Plus, Search, Edit, Trash2, Key, Shield } from "lucide-react";
import { cn } from "@/shared/utils/cn";

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
    <div className="space-y-6">
      {/* Header with gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb]/10 via-[#3b82f6]/10 to-[#0d9488]/10 rounded-2xl blur-3xl"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#0d9488] bg-clip-text text-transparent">
              Roles
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage user roles and permissions
            </p>
          </div>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-[#3b82f6]/30 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3 h-auto">
            <Plus className="h-5 w-5" />
            <span className="font-semibold">Add Role</span>
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <Card className="p-6 bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none transition-all duration-300 group-focus-within:text-[#2563eb]" />
            <Input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-xl border-gray-200/50 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-[#2563eb] transition-all duration-300 placeholder:text-gray-400"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#2563eb]/0 via-[#3b82f6]/0 to-[#0d9488]/0 group-focus-within:from-[#2563eb]/5 group-focus-within:via-[#3b82f6]/5 group-focus-within:to-[#0d9488]/5 pointer-events-none transition-all duration-300"></div>
          </div>
          <Button type="submit" className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-[#3b82f6]/30 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl px-8 h-auto">
            <span className="font-semibold">Search</span>
          </Button>
        </form>
      </Card>

      {/* Roles Grid */}
      {isLoading && (
        <Card className="p-12 text-center bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#2563eb] border-r-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading roles...</p>
        </Card>
      )}

      {error && (
        <Card className="p-12 text-center bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-red-600 font-medium">Error loading roles. Please try again.</p>
        </Card>
      )}

      {!isLoading && !error && roles.length === 0 && (
        <Card className="p-12 text-center bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Shield className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">No roles found.</p>
        </Card>
      )}

      {!isLoading && !error && roles.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <div
                key={role.id}
                className="group relative animate-[fadeIn_0.5s_ease-out]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#0d9488]"></div>

                {/* Card */}
                <Card className={cn(
                  "relative p-6 bg-white/80 backdrop-blur-xl border border-gray-200/50",
                  "shadow-lg hover:shadow-xl transition-all duration-300",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  "hover:shadow-[#3b82f6]/30"
                )}>
                  {/* Header with icon */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={cn(
                      "relative h-14 w-14 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center",
                      "bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#0d9488]",
                      "group-hover:scale-110 group-hover:rotate-3"
                    )}>
                      <Shield className="h-7 w-7 text-white relative z-10" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                        {role.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Created {formatDate(role.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {role.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {role.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200/50">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl border-blue-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-cyan-50 hover:border-blue-400 transition-all duration-300 font-semibold"
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Permissions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl hover:bg-cyan-100/50 hover:text-cyan-700 hover:border-cyan-300 transition-all duration-300 hover:scale-110"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl hover:bg-red-100/50 hover:text-red-700 hover:border-red-300 transition-all duration-300 hover:scale-110"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#0d9488]"></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Card className="p-6 mt-6 bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">
                <span className="text-gray-900 font-semibold">Page {pageNumber}</span>
                <span className="text-gray-500"> of </span>
                <span className="text-gray-900 font-semibold">{totalPages}</span>
                <span className="text-gray-500 ml-2">({data?.totalCount} total roles)</span>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pageNumber === 1}
                  onClick={() => setPageNumber((p) => p - 1)}
                  className="rounded-xl border-gray-300 hover:border-blue-300 hover:bg-[#2563eb] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-semibold hover:scale-105 disabled:hover:scale-100"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pageNumber >= totalPages}
                  onClick={() => setPageNumber((p) => p + 1)}
                  className="rounded-xl border-gray-300 hover:border-cyan-300 hover:bg-cyan-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-semibold hover:scale-105 disabled:hover:scale-100"
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
