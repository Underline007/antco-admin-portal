import { Card } from "../../../components/ui/card";
import { Users, Shield, Key, Activity, TrendingUp, ArrowUpRight, Zap } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      gradient: "from-[#1851c1] via-[#1851c1] to-[#2563eb]",
      iconBg: "from-[#1851c1] to-[#3b82f6]",
      shadowColor: "[#1851c1]/30",
    },
    {
      title: "Total Roles",
      value: "24",
      change: "+5.2%",
      trend: "up",
      icon: Shield,
      gradient: "from-[#2563eb] via-[#60a5fa] to-[#0d9488]",
      iconBg: "from-[#3b82f6] to-[#60a5fa]",
      shadowColor: "[#3b82f6]/30",
    },
    {
      title: "Permissions",
      value: "156",
      change: "+8.1%",
      trend: "up",
      icon: Key,
      gradient: "from-[#3b82f6] via-teal-500 to-emerald-600",
      iconBg: "from-[#60a5fa] to-teal-500",
      shadowColor: "[#60a5fa]/30",
    },
    {
      title: "Active Sessions",
      value: "892",
      change: "+23.4%",
      trend: "up",
      icon: Activity,
      gradient: "from-[#2563eb] via-[#1851c1] to-[#3b82f6]",
      iconBg: "from-[#3b82f6] to-fuchsia-500",
      shadowColor: "[#3b82f6]/30",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      href: "/users",
      icon: Users,
      gradient: "from-[#1851c1] to-[#2563eb]",
    },
    {
      title: "Manage Roles",
      description: "Configure user roles and permissions",
      href: "/roles",
      icon: Shield,
      gradient: "from-[#2563eb] to-[#3b82f6]",
    },
    {
      title: "Permissions",
      description: "Set up granular access controls",
      href: "/permissions",
      icon: Key,
      gradient: "from-[#3b82f6] to-[#0d9488]",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1851c1]/10 via-[#2563eb]/10 to-[#3b82f6]/10 rounded-2xl blur-3xl"></div>
        <div className="relative">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1851c1] via-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Welcome to AntCo Admin Portal - SSO Management System
          </p>
        </div>
      </div>

      {/* Stats Grid - AI Inspired Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="group relative animate-[fadeIn_0.5s_ease-out]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect */}
              <div className={cn(
                "absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl",
                `bg-gradient-to-r ${stat.gradient}`
              )}></div>

              {/* Card */}
              <Card className={cn(
                "relative p-6 bg-white/80 backdrop-blur-xl border border-gray-200/50",
                "shadow-lg hover:shadow-xl transition-all duration-300",
                "hover:scale-[1.02] active:scale-[0.98]",
                `hover:shadow-${stat.shadowColor}`
              )}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>

                  {/* Icon with gradient */}
                  <div className={cn(
                    "relative p-3 rounded-xl shadow-lg transition-all duration-300",
                    "bg-gradient-to-br",
                    stat.iconBg,
                    "group-hover:scale-110 group-hover:rotate-3"
                  )}>
                    <Icon className="h-6 w-6 text-white relative z-10" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent"></div>
                  </div>
                </div>

                {/* Trend indicator */}
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold",
                    "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                  )}>
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.change}</span>
                  </div>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>

                {/* Decorative gradient overlay */}
                <div className={cn(
                  "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none",
                  `bg-gradient-to-br ${stat.gradient}`
                )}></div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="p-6 bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#1851c1] to-[#2563eb] shadow-lg shadow-[#1851c1]/30">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#1851c1] to-[#2563eb] bg-clip-text text-transparent">
              Quick Actions
            </h2>
          </div>

          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.title}
                  href={action.href}
                  className={cn(
                    "group relative block p-4 rounded-xl transition-all duration-300",
                    "hover:bg-gradient-to-r hover:from-[#1851c1] hover:to-[#2563eb]",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    "border border-transparent hover:border-purple-200/50"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "relative p-2.5 rounded-xl shadow-md transition-all duration-300",
                      "bg-gradient-to-br",
                      action.gradient,
                      "group-hover:scale-110 group-hover:shadow-lg"
                    )}>
                      <Icon className="h-5 w-5 text-white" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-[#0f3d99] transition-colors">
                        {action.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-[#1851c1] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </a>
              );
            })}
          </div>
        </Card>

        {/* System Status */}
        <Card className="p-6 bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-600 to-[#0d9488] shadow-lg shadow-emerald-500/30">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-[#0d9488] bg-clip-text text-transparent">
              System Status
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { name: "Auth API", status: "Online" },
              { name: "Admin API", status: "Online" },
              { name: "Identity Server", status: "Online" },
              { name: "Database", status: "Connected" },
            ].map((service, index) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-emerald-50/50 hover:to-teal-50/50 transition-all duration-300 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"></div>
                    <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-ping"></div>
                  </div>
                  <span className="font-medium text-gray-700">{service.name}</span>
                </div>
                <span className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-xl shadow-md",
                  "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
                  "group-hover:scale-105 transition-transform duration-300"
                )}>
                  {service.status}
                </span>
              </div>
            ))}
          </div>

          {/* System health indicator */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">System Health</p>
                <p className="text-xs text-gray-500 mt-0.5">All services operational</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-[#0d9488] bg-clip-text text-transparent">
                  100%
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
