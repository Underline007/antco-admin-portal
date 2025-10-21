import { Link, useLocation } from "react-router-dom";
import type { cn } from "@/shared/utils/cn";
import { useAuthStore } from "@/features/auth/stores/authStore";
import {
  LayoutDashboard,
  Users,
  Shield,
  KeyRound,
  ChevronLeft,
  LogOut,
  User,
} from "lucide-react";

interface MenuItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: {
    resource: string;
    action: string;
  };
  roles?: string[];
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
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
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { user, hasPermission, logout } = useAuthStore();

  // Filter menu items based on permissions
  const filteredMenuItems = menuItems.filter((item) => {
    if (item.permission) {
      return hasPermission(item.permission.resource, item.permission.action);
    }
    return true;
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-30 h-full bg-white border-r border-gray-200 transition-all duration-300",
          isOpen ? "w-64" : "w-20",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <div className={cn("flex items-center", !isOpen && "justify-center")}>
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            {isOpen && (
              <span className="ml-3 text-xl font-semibold text-gray-800">
                Admin Portal
              </span>
            )}
          </div>
          <button
            onClick={onToggle}
            className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft
              className={cn(
                "h-5 w-5 transition-transform",
                !isOpen && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100",
                  !isOpen && "justify-center"
                )}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span className="ml-3">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-gray-200 p-3">
          {/* Profile link */}
          <Link
            to="/profile"
            className={cn(
              "flex items-center px-3 py-2 mb-2 rounded-lg text-gray-700 hover:bg-gray-100",
              !isOpen && "justify-center"
            )}
          >
            <User className="h-5 w-5" />
            {isOpen && (
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            )}
          </Link>

          {/* Logout button */}
          <button
            onClick={logout}
            className={cn(
              "flex w-full items-center px-3 py-2 rounded-lg text-red-600 hover:bg-red-50",
              !isOpen && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5" />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
