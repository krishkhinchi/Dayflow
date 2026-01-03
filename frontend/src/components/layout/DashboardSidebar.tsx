import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Clock,
  LayoutDashboard,
  User,
  CalendarCheck,
  CalendarOff,
  DollarSign,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      isActive
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
    )}
  >
    <span className={cn("transition-transform", isActive && "scale-110")}>{icon}</span>
    <span className="font-medium">{label}</span>
    {isActive && (
      <ChevronRight className="w-4 h-4 ml-auto opacity-60" />
    )}
  </Link>
);

interface DashboardSidebarProps {
  userRole: "admin" | "employee";
}

const DashboardSidebar = ({ userRole }: DashboardSidebarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const employeeLinks = [
    { to: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
    { to: "/profile", icon: <User className="w-5 h-5" />, label: "My Profile" },
    { to: "/attendance", icon: <CalendarCheck className="w-5 h-5" />, label: "Attendance" },
    { to: "/leave", icon: <CalendarOff className="w-5 h-5" />, label: "Leave Requests" },
    { to: "/payroll", icon: <DollarSign className="w-5 h-5" />, label: "Payroll" },
  ];

  const adminLinks = [
    { to: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
    { to: "/employees", icon: <Users className="w-5 h-5" />, label: "Employees" },
    { to: "/attendance", icon: <CalendarCheck className="w-5 h-5" />, label: "Attendance" },
    { to: "/leave-approvals", icon: <CalendarOff className="w-5 h-5" />, label: "Leave Approvals" },
    { to: "/payroll", icon: <DollarSign className="w-5 h-5" />, label: "Payroll" },
  ];

  const links = userRole === "admin" ? adminLinks : employeeLinks;

  return (
    <aside className="w-64 h-screen bg-sidebar fixed left-0 top-0 flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-accent-glow group-hover:scale-105 transition-transform">
            <Clock className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <span className="text-lg font-bold text-sidebar-foreground">Dayflow</span>
            <p className="text-xs text-sidebar-foreground/60 capitalize">{userRole} Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavItem
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            isActive={isActive(link.to)}
          />
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <NavItem
          to="/settings"
          icon={<Settings className="w-5 h-5" />}
          label="Settings"
          isActive={isActive("/settings")}
        />
        <button
          onClick={() => window.location.href = "/"}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
