import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, Trophy, FileText, Users } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function MobileNav({ user }) {
  const location = useLocation();
  const { logout } = useAuth();
  const isLeader = user?.role === "leader" || user?.role === "admin";

  const participantLinks = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/sprints", icon: BookOpen, label: "Sprints" },
    { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { to: "/playbook", icon: FileText, label: "Playbook" },
  ];

  const leaderLinks = [
    { to: "/sprints", icon: BookOpen, label: "Sprints" },
    { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { to: "/leader", icon: LayoutDashboard, label: "Dashboard" },
    ...(user?.role === "admin" ? [{ to: "/admin", icon: Users, label: "Admin" }] : []),
  ];

  const links = isLeader ? leaderLinks : participantLinks;
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {links.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
              isActive(to)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}