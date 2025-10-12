import { Home, Briefcase, FileCheck, PieChart, FileText, FileSpreadsheet, Settings, Lightbulb } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/student", icon: Home },
  { title: "Jobs for You", url: "/jobs", icon: Briefcase },
  { title: "Quick Match", url: "/match", icon: Lightbulb  },
  { title: "Applied Jobs", url: "/applied", icon: FileCheck },
  { title: "Stats", url: "/stats", icon: PieChart },
  { title: "Resume Generator", url: "/resume-generator", icon: FileText },
  { title: "ATS Checker", url: "/ats-checker", icon: FileSpreadsheet },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar-background">
        <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
          {state !== "collapsed" && <span className="text-xl font-bold text-primary">Student</span>}
        </div>

        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? "bg-primary/20 text-white font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
