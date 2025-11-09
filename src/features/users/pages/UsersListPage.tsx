import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/userApi";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Plus, Search, Edit, Trash2, UserCog, Users } from "lucide-react";
import type { User } from "../../auth/types";
import { cn } from "@/shared/utils/cn";

export default function UsersListPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", pageNumber, pageSize, searchTerm],
    queryFn: () =>
      userApi.getUsers(pageNumber, pageSize, {
        searchTerm: searchTerm || undefined,
      }),
  });

  const users = data?.items || [];
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

  const getStatusBadge = (status: User["status"]) => {
    const colors = {
      Active: "bg-green-100 text-green-700",
      Inactive: "bg-gray-100 text-gray-700",
      Suspended: "bg-red-100 text-red-700",
      PendingVerification: "bg-yellow-100 text-yellow-700",
    };
    return colors[status] || colors.Inactive;
  };

  return (
    <div className="space-y-6">
      {/* Header with gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1851c1]/10 via-[#2563eb]/10 to-[#3b82f6]/10 rounded-2xl blur-3xl"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1851c1] via-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent">
              Users
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage user accounts and permissions
            </p>
          </div>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-[#1851c1] to-[#2563eb] hover:from-[#0f3d99] hover:to-blue-700 text-white shadow-lg shadow-[#1851c1]/30 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3 h-auto">
            <Plus className="h-5 w-5" />
            <span className="font-semibold">Add User</span>
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <Card className="p-6 bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none transition-all duration-300 group-focus-within:text-[#1851c1]" />
            <Input
              type="text"
              placeholder="Search by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-xl border-gray-200/50 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-purple-300 focus:ring-4 focus:ring-[#1851c1] transition-all duration-300 placeholder:text-gray-400"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1851c1]/0 via-[#2563eb]/0 to-[#3b82f6]/0 group-focus-within:from-[#1851c1]/5 group-focus-within:via-[#2563eb]/5 group-focus-within:to-[#3b82f6]/5 pointer-events-none transition-all duration-300"></div>
          </div>
          <Button type="submit" className="bg-gradient-to-r from-[#1851c1] to-[#2563eb] hover:from-[#0f3d99] hover:to-blue-700 text-white shadow-lg shadow-[#1851c1]/30 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl px-8 h-auto">
            <span className="font-semibold">Search</span>
          </Button>
        </form>
      </Card>

      {/* Users Table */}
      <Card className="bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg overflow-hidden">
        {isLoading && (
          <div className="p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1851c1] border-r-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading users...</p>
          </div>
        )}

        {error && (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-red-600 font-medium">Error loading users. Please try again.</p>
          </div>
        )}

        {!isLoading && !error && users.length === 0 && (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No users found.</p>
          </div>
        )}

        {!isLoading && !error && users.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-transparent">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Roles
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className="group hover:bg-gradient-to-r hover:from-[#1851c1]/50 hover:to-[#2563eb]/50 transition-all duration-300"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="relative h-11 w-11 flex-shrink-0">
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#1851c1] to-[#2563eb] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                              <span className="text-white font-semibold text-sm">
                                {(user.firstName?.[0] || '')}
                                {(user.lastName?.[0] || '')}
                              </span>
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent"></div>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 group-hover:text-[#0f3d99] transition-colors">
                              {user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {user.phoneNumber || "No phone"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{user.email}</div>
                        {user.emailConfirmed && (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                            Verified
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1.5 inline-flex text-xs font-bold rounded-xl shadow-sm ${getStatusBadge(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {user.roles.length > 0 ? (
                            user.roles.map((role, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-[#1851c1] to-[#2563eb] text-[#0f3d99] rounded-lg shadow-sm"
                              >
                                {role}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400 italic">
                              No roles
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-[#1851c1]/50 hover:text-[#0f3d99] rounded-lg transition-all duration-300 hover:scale-110"
                          >
                            <UserCog className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-[#2563eb]/50 hover:text-blue-700 rounded-lg transition-all duration-300 hover:scale-110"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-red-100/50 hover:text-red-700 rounded-lg transition-all duration-300 hover:scale-110"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-5 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/30 to-transparent">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700">
                  <span className="text-gray-900 font-semibold">Page {pageNumber}</span>
                  <span className="text-gray-500"> of </span>
                  <span className="text-gray-900 font-semibold">{totalPages}</span>
                  <span className="text-gray-500 ml-2">({data?.totalCount} total users)</span>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber((p) => p - 1)}
                    className="rounded-xl border-gray-300 hover:border-purple-300 hover:bg-[#1851c1] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-semibold hover:scale-105 disabled:hover:scale-100"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pageNumber >= totalPages}
                    onClick={() => setPageNumber((p) => p + 1)}
                    className="rounded-xl border-gray-300 hover:border-blue-300 hover:bg-[#2563eb] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-semibold hover:scale-105 disabled:hover:scale-100"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
