import { Link, useLocation } from "react-router-dom";
import { cn } from "@/shared/utils/cn";
import { useAuthStore } from "@/features/auth/stores/authStore";
import {
  LayoutDashboard,
  Users,
  Shield,
  KeyRound,
  ChevronLeft,
  ChevronDown,
  LogOut,
  User,
  Sparkles,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MenuItem {
  label: string;
  path?: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: {
    resource: string;
    action: string;
  };
  roles?: string[];
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "User Management",
    icon: Settings,
    children: [
      {
        label: "Users",
        path: "/users",
        icon: Users,
        permission: {
          resource: "users",
          action: "read",
        },
      },
      {
        label: "Roles",
        path: "/roles",
        icon: Shield,
        permission: {
          resource: "roles",
          action: "read",
        },
      },
      {
        label: "Permissions",
        path: "/permissions",
        icon: KeyRound,
        permission: {
          resource: "permissions",
          action: "read",
        },
      },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { user, hasPermission, logout } = useAuthStore();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Filter menu items based on permissions
  const filteredMenuItems = menuItems.map((item) => {
    // If item has children, filter them
    if (item.children) {
      const filteredChildren = item.children.filter((child) => {
        if (child.permission) {
          return hasPermission(child.permission.resource, child.permission.action);
        }
        return true;
      });
      // Only show parent if it has visible children
      if (filteredChildren.length === 0) return null;
      return { ...item, children: filteredChildren };
    }
    // Filter single items
    if (item.permission) {
      return hasPermission(item.permission.resource, item.permission.action) ? item : null;
    }
    return item;
  }).filter(Boolean) as MenuItem[];

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };

  const isMenuExpanded = (label: string) => expandedMenus.includes(label);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-30 h-screen transition-all duration-500 ease-in-out flex flex-col",
          "bg-white/80 backdrop-blur-xl border-r border-gray-200/50",
          "shadow-xl shadow-[#1851c1]/10",
          isOpen ? "w-64" : "w-20",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(24, 81, 193, 0.02) 0%, rgba(255, 255, 255, 0.95) 100%)'
        }}
      >
        {/* Logo Header */}
        <div className={cn(
          "flex h-16 items-center justify-between border-b border-gray-200/50 px-4 flex-shrink-0",
          "backdrop-blur-sm"
        )}>
          <div className={cn("flex items-center gap-3", !isOpen && "justify-center w-full")}>
            <div className={cn(
              "relative h-10 w-10 rounded-xl flex items-center justify-center overflow-hidden",
              "bg-gradient-to-br from-[#1851c1] via-[#2563eb] to-[#3b82f6]",
              "shadow-lg shadow-[#1851c1]/50",
              "transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#1851c1]/60"
            )}>
              <Sparkles className="h-5 w-5 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
            {isOpen && (
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-[#1851c1] to-[#2563eb] bg-clip-text text-transparent">
                  AntCo
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Admin Portal
                </span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn(
              "hidden lg:flex h-8 w-8 rounded-lg hover:bg-[#1851c1]/50 transition-all duration-300",
              !isOpen && "hidden"
            )}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 text-gray-600 transition-transform duration-300",
                !isOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto">
          {filteredMenuItems.map((item, index) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = isMenuExpanded(item.label);
            const isActive = item.path ? location.pathname.startsWith(item.path) : false;
            const hasActiveChild = hasChildren && item.children?.some(child =>
              child.path && location.pathname.startsWith(child.path)
            );

            return (
              <div key={item.label} className="space-y-1">
                {/* Parent Menu Item */}
                {hasChildren ? (
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={cn(
                      "group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      hasActiveChild
                        ? "bg-gradient-to-r from-[#1851c1] to-[#2563eb] text-white shadow-lg shadow-[#1851c1]/30"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-[#1851c1]/5 hover:to-[#2563eb]/5",
                      !isOpen && "justify-center px-0"
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isOpen ? 'fadeIn 0.3s ease-out forwards' : 'none'
                    }}
                    title={!isOpen ? item.label : undefined}
                  >
                    {/* Active indicator */}
                    {hasActiveChild && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
                    )}

                    {/* Icon */}
                    <div className={cn(
                      "relative flex items-center justify-center",
                      hasActiveChild && "animate-pulse"
                    )}>
                      <Icon className={cn(
                        "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                        "group-hover:scale-110",
                        hasActiveChild && "drop-shadow-lg"
                      )} />
                    </div>

                    {/* Label */}
                    {isOpen && (
                      <>
                        <span className={cn(
                          "font-medium text-sm transition-all duration-300 flex-1 text-left",
                          hasActiveChild ? "font-semibold" : "group-hover:translate-x-1"
                        )}>
                          {item.label}
                        </span>
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          isExpanded && "rotate-180"
                        )} />
                      </>
                    )}

                    {/* Hover glow effect */}
                    {!hasActiveChild && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1851c1]/0 via-[#2563eb]/0 to-[#3b82f6]/0 group-hover:from-[#1851c1]/5 group-hover:via-[#2563eb]/5 group-hover:to-[#3b82f6]/5 transition-all duration-500"></div>
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.path!}
                    className={cn(
                      "group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      isActive
                        ? "bg-gradient-to-r from-[#1851c1] to-[#2563eb] text-white shadow-lg shadow-[#1851c1]/30"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-[#1851c1]/5 hover:to-[#2563eb]/5",
                      !isOpen && "justify-center px-0"
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isOpen ? 'fadeIn 0.3s ease-out forwards' : 'none'
                    }}
                    title={!isOpen ? item.label : undefined}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
                    )}

                    {/* Icon */}
                    <div className={cn(
                      "relative flex items-center justify-center",
                      isActive && "animate-pulse"
                    )}>
                      <Icon className={cn(
                        "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                        "group-hover:scale-110",
                        isActive && "drop-shadow-lg"
                      )} />
                    </div>

                    {/* Label */}
                    {isOpen && (
                      <span className={cn(
                        "font-medium text-sm transition-all duration-300",
                        isActive ? "font-semibold" : "group-hover:translate-x-1"
                      )}>
                        {item.label}
                      </span>
                    )}

                    {/* Hover glow effect */}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1851c1]/0 via-[#2563eb]/0 to-[#3b82f6]/0 group-hover:from-[#1851c1]/5 group-hover:via-[#2563eb]/5 group-hover:to-[#3b82f6]/5 transition-all duration-500"></div>
                    )}
                  </Link>
                )}

                {/* Submenu Items */}
                {hasChildren && isExpanded && isOpen && (
                  <div className="ml-4 space-y-1 animate-[fadeIn_0.3s_ease-out]">
                    {item.children!.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = child.path ? location.pathname.startsWith(child.path) : false;

                      return (
                        <Link
                          key={child.path}
                          to={child.path!}
                          className={cn(
                            "group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300",
                            "hover:scale-[1.01] active:scale-[0.99]",
                            isChildActive
                              ? "bg-gradient-to-r from-[#2563eb]/50 to-cyan-500 text-white shadow-md"
                              : "text-gray-600 hover:bg-gradient-to-r hover:from-[#2563eb]/5 hover:to-cyan-50 hover:text-gray-900"
                          )}
                        >
                          <div className={cn(
                            "h-1.5 w-1.5 rounded-full transition-all duration-300",
                            isChildActive ? "bg-white" : "bg-gray-400 group-hover:bg-[#2563eb]/50"
                          )}></div>

                          <ChildIcon className={cn(
                            "h-4 w-4 flex-shrink-0 transition-transform duration-300",
                            "group-hover:scale-110"
                          )} />

                          <span className={cn(
                            "font-medium text-sm transition-all duration-300",
                            isChildActive ? "font-semibold" : "group-hover:translate-x-0.5"
                          )}>
                            {child.label}
                          </span>

                          {isChildActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white rounded-r-full"></div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User section */}
        <div className={cn(
          "border-t border-gray-200/50 p-3 flex-shrink-0",
          "backdrop-blur-sm bg-white/40"
        )}>
          {/* Profile link */}
          <Link
            to="/profile"
            className={cn(
              "flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300",
              "text-gray-700 hover:bg-gradient-to-r hover:from-[#1851c1]/5 hover:to-[#2563eb]/5",
              "hover:scale-[1.02] active:scale-[0.98]",
              !isOpen && "justify-center px-0"
            )}
          >
            <div className={cn(
              "relative h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0",
              "bg-gradient-to-br from-[#1851c1] to-[#2563eb]",
              "shadow-lg shadow-[#1851c1]/30 transition-all duration-300",
              "hover:shadow-xl hover:shadow-[#1851c1]/40"
            )}>
              <span className="text-white text-sm font-semibold">
                {user?.firstName?.[0] || ''}{user?.lastName?.[0] || 'U'}
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </Link>

          {/* Logout button */}
          <Button
            variant="ghost"
            onClick={logout}
            className={cn(
              "w-full justify-start gap-3 text-red-600 hover:text-red-700",
              "hover:bg-red-50/50 transition-all duration-300",
              "hover:scale-[1.02] active:scale-[0.98] rounded-xl",
              !isOpen && "justify-center px-0"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span className="font-medium text-sm">Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  );
};
