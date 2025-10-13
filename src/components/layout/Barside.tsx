import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  UserCheck, 
  BarChart3, 
  MessageSquare, 
  FileText, 
  Settings, 
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "", icon: LayoutDashboard },
  { title: "Job Postings", path: "jobs", icon: Briefcase },
  { title: "Eligibility Criteria", path: "eligibility", icon: UserCheck },
  { title: "Match Calculator", path: "calculator", icon: BarChart3 },
  { title: "Candidate Matching", path: "matching", icon: Users },
  { title: "Quick Hire", path: "quick-hire", icon: Lightbulb },
  { title: "Communication", path: "communication", icon: MessageSquare },
  { title: "Reports", path: "reports", icon: FileText },
  { title: "Settings", path: "settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-primary">Recruiter</h1>
        <p className="text-xs text-muted-foreground mt-1">AI-Powered Recruitment</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-medium border-l-4 border-sidebar-primary"
                  : "text-sidebar-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-4">
          <p className="text-xs font-medium text-foreground">Need Help?</p>
          <p className="text-xs text-muted-foreground mt-1">Check our documentation</p>
        </div>
      </div>
    </aside>
  );
};
