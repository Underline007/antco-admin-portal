import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { permissionApi } from "../api/permissionApi";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Shield, Filter, Key } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export default function PermissionsListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  // Fetch permissions
  const { data: permissions, isLoading: permissionsLoading } = useQuery({
    queryKey: ["permissions", selectedCategory],
    queryFn: () =>
      permissionApi.getPermissions(
        selectedCategory ? { category: selectedCategory } : undefined
      ),
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["permission-categories"],
    queryFn: () => permissionApi.getCategories(),
  });

  // Group permissions by category
  const groupedPermissions = permissions?.reduce(
    (acc, permission) => {
      const category = permission.category || "other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(permission);
      return acc;
    },
    {} as Record<string, typeof permissions>
  );

  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, { gradient: string; badge: string; iconBg: string }> = {
      users: {
        gradient: "from-[#2563eb] via-[#60a5fa] to-[#0d9488]",
        badge: "from-[#2563eb] to-cyan-100 text-blue-700",
        iconBg: "from-[#3b82f6] to-[#60a5fa]",
      },
      roles: {
        gradient: "from-[#1851c1] via-[#3b82f6] to-[#3b82f6]",
        badge: "from-[#1851c1] to-violet-100 text-[#0f3d99]",
        iconBg: "from-[#1851c1] to-[#3b82f6]",
      },
      permissions: {
        gradient: "from-emerald-600 via-teal-500 to-[#3b82f6]",
        badge: "from-emerald-100 to-teal-100 text-emerald-700",
        iconBg: "from-emerald-500 to-teal-500",
      },
      clients: {
        gradient: "from-orange-600 via-amber-500 to-yellow-600",
        badge: "from-orange-100 to-amber-100 text-orange-700",
        iconBg: "from-orange-500 to-amber-500",
      },
      system: {
        gradient: "from-red-600 via-rose-500 to-pink-600",
        badge: "from-red-100 to-rose-100 text-red-700",
        iconBg: "from-red-500 to-rose-500",
      },
    };
    return gradients[category] || {
      gradient: "from-gray-600 via-gray-500 to-gray-600",
      badge: "from-gray-100 to-gray-100 text-gray-700",
      iconBg: "from-gray-500 to-gray-500",
    };
  };

  return (
    <div className="space-y-6">
      {/* Header with gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-[#0d9488]/10 to-[#3b82f6]/10 rounded-2xl blur-3xl"></div>
        <div className="relative">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-[#0d9488] to-[#3b82f6] bg-clip-text text-transparent">
            Permissions
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            View all system permissions and their categories
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <Card className="p-6 bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-600 to-[#0d9488] shadow-lg shadow-emerald-500/30">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory(undefined)}
              className={cn(
                "rounded-xl transition-all duration-300 font-semibold hover:scale-105",
                selectedCategory === undefined
                  ? "bg-gradient-to-r from-emerald-600 to-[#0d9488] text-white border-transparent shadow-lg shadow-emerald-500/30"
                  : "border-gray-300 hover:border-emerald-300 hover:bg-emerald-50"
              )}
            >
              All
            </Button>
            {categories?.map((category) => {
              const colors = getCategoryGradient(category.name);
              const isSelected = selectedCategory === category.name;
              return (
                <Button
                  key={category.name}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className={cn(
                    "rounded-xl transition-all duration-300 font-semibold hover:scale-105",
                    isSelected
                      ? `bg-gradient-to-r ${colors.gradient} text-white border-transparent shadow-lg`
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  )}
                >
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </Button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Permissions List */}
      {permissionsLoading && (
        <Card className="p-12 text-center bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading permissions...</p>
        </Card>
      )}

      {!permissionsLoading && permissions && permissions.length === 0 && (
        <Card className="p-12 text-center bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Key className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">No permissions found.</p>
        </Card>
      )}

      {!permissionsLoading && groupedPermissions && (
        <div className="space-y-6">
          {Object.entries(groupedPermissions).map(
            ([category, categoryPermissions], index) => {
              const colors = getCategoryGradient(category);
              return (
                <div
                  key={category}
                  className="group relative animate-[fadeIn_0.5s_ease-out]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glow effect */}
                  <div className={cn(
                    "absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl",
                    `bg-gradient-to-r ${colors.gradient}`
                  )}></div>

                  {/* Card */}
                  <Card className="relative p-6 bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* Category header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={cn(
                        "relative h-14 w-14 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center",
                        "bg-gradient-to-br",
                        colors.iconBg,
                        "group-hover:scale-110 group-hover:rotate-3"
                      )}>
                        <Shield className="h-7 w-7 text-white relative z-10" />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent"></div>
                      </div>
                      <div>
                        <h2 className={cn(
                          "text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                          colors.gradient
                        )}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h2>
                        <p className="text-sm text-gray-600 font-medium">
                          {categoryPermissions.length} permission
                          {categoryPermissions.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    {/* Permissions grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {categoryPermissions.map((permission) => (
                        <div
                          key={permission.id}
                          className={cn(
                            "group/item p-4 rounded-xl transition-all duration-300",
                            "bg-gradient-to-r shadow-sm hover:shadow-md",
                            colors.badge,
                            "hover:scale-[1.02] active:scale-[0.98]",
                            "border border-transparent hover:border-opacity-50"
                          )}
                        >
                          <div className="font-semibold text-sm mb-1 flex items-start gap-2">
                            <Key className="h-4 w-4 flex-shrink-0 mt-0.5 opacity-60" />
                            <span className="flex-1">{permission.name}</span>
                          </div>
                          {permission.description && (
                            <div className="text-xs opacity-70 ml-6">
                              {permission.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Decorative gradient overlay */}
                    <div className={cn(
                      "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none",
                      `bg-gradient-to-br ${colors.gradient}`
                    )}></div>
                  </Card>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
