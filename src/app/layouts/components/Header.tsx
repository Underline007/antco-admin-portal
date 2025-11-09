import { Menu, Bell, Search } from "lucide-react";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-gray-200/50 shadow-sm shadow-[#1851c1]/5">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden hover:bg-[#1851c1]/50 rounded-xl transition-all duration-300 hover:scale-110"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </Button>

          {/* Search bar with modern design */}
          <div className="relative hidden md:block group">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-300 group-focus-within:text-[#1851c1]" />
            <Input
              type="text"
              placeholder="Search anything..."
              className="w-80 pl-11 pr-4 py-2 rounded-xl border-gray-200/50 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-[#2563eb] focus:ring-4 focus:ring-[#1851c1] transition-all duration-300 placeholder:text-gray-400"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1851c1]/0 via-[#2563eb]/0 to-[#3b82f6]/0 group-focus-within:from-[#1851c1]/5 group-focus-within:via-[#2563eb]/5 group-focus-within:to-[#3b82f6]/5 pointer-events-none transition-all duration-300"></div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications with badge */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-xl hover:bg-[#1851c1]/50 transition-all duration-300 hover:scale-110"
            >
              <Bell className="h-5 w-5 text-gray-700 group-hover:text-[#1851c1] transition-colors duration-300" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 animate-pulse shadow-lg shadow-red-500/50"></span>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 animate-ping"></span>
            </Button>
          </div>

          {/* User dropdown */}
          {user && <UserDropdown user={user} />}
        </div>
      </div>
    </header>
  );
};
