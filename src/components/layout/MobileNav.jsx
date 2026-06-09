import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, BookOpen, Trophy, FileText, Users, LogOut } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function MobileNav({ user }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isLeader = user?.role === "leader" || user?.role === "admin";

  const links = isLeader
    ? [
        { to: "/sprints", icon: BookOpen, label: "Sprints" },
        { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
        { to: "/playbook", icon: FileText, label: "Strategic Playbook" },
        { to: "/leader", icon: LayoutDashboard, label: "Leader Dashboard" },
        ...(user?.role === "admin" ? [{ to: "/admin", icon: Users, label: "Manage Participants" }] : []),
      ]
    : [
        { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/sprints", icon: BookOpen, label: "Sprints" },
        { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
        { to: "/playbook", icon: FileText, label: "Strategic Playbook" },
      ];

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between p-4 bg-sidebar text-sidebar-foreground border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <span className="font-inter font-black text-secondary-foreground text-[10px]">CAM</span>
          </div>
          <span className="font-bold text-sm">AM Accelerator</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="absolute inset-x-0 top-[60px] z-50 bg-sidebar border-b border-sidebar-border p-4 space-y-1">
          {links.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                location.pathname.startsWith(to)
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
          <button
            onClick={() => base44.auth.logout()}
            className="flex items-center gap-2 px-3 py-2.5 w-full text-sm text-sidebar-foreground/60"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}