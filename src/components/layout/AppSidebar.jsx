import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, BookOpen, Trophy, FileText, 
  Users, Settings, LogOut, ChevronRight
} from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function AppSidebar({ user }) {
  const location = useLocation();
  const isLeader = user?.role === "leader" || user?.role === "admin";

  const participantLinks = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/sprints", icon: BookOpen, label: "Sprints" },
    { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { to: "/playbook", icon: FileText, label: "Strategic Playbook" },
  ];

  const leaderLinks = [
    { to: "/sprints", icon: BookOpen, label: "Sprints" },
    { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { to: "/playbook", icon: FileText, label: "Strategic Playbook" },
    { to: "/leader", icon: LayoutDashboard, label: "Leader Dashboard" },
    ...(user?.role === "admin" ? [{ to: "/admin", icon: Users, label: "Manage Participants" }] : []),
  ];

  const links = isLeader ? leaderLinks : participantLinks;

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border min-h-screen">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <span className="font-inter font-black text-secondary-foreground text-sm">CAM</span>
          </div>
          <div>
            <h1 className="font-inter font-bold text-sm text-sidebar-foreground">AM Accelerator</h1>
            <p className="text-xs text-sidebar-foreground/60">HUB International</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive(to)
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
            {isActive(to) && <ChevronRight className="w-3 h-3 ml-auto" />}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3 px-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold text-sidebar-foreground">
            {user?.full_name?.[0] || "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.full_name || "User"}</p>
            <p className="text-xs text-sidebar-foreground/50 capitalize">{user?.role || "participant"}</p>
          </div>
        </div>
        <button
          onClick={() => base44.auth.logout()}
          className="flex items-center gap-2 px-3 py-2 w-full text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors rounded-lg hover:bg-sidebar-accent/50"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}