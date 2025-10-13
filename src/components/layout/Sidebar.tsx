import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  BarChart3, 
  MessageSquare,
  Calendar,
  TrendingUp,
  Settings 
} from "lucide-react";

const navItems = [
  { to: "/placement", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/placement/students", icon: Users, label: "Students" },
  { to: "/placement/recruiters", icon: Briefcase, label: "Recruiters" },
  { to: "/placement/jobs", icon: FileText, label: "Jobs" },
  { to: "/placement/calendar", icon: Calendar, label: "Calendar" },
  { to: "/placement/recruitment-tracking", icon: TrendingUp, label: "Recruitment Tracking" },
  { to: "/placement/communication", icon: MessageSquare, label: "Communication" },
  { to: "/placement/settings", icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="h-full flex flex-col">
        {/* Logo/Title */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">
            Placement Cell
          </h1>
          <p className="text-sm text-sidebar-foreground/70 mt-1">
            Admin Dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/placement"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60 text-center">
            © 2025 Placement Cell
          </p>
        </div>
      </div>
    </aside>
  );
};
