import React from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import MobileNav from "./MobileNav";

export default function AppLayout({ user }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar user={user} />
      <div className="flex-1 flex flex-col min-h-screen">
        <MobileNav user={user} />
        <main className="flex-1 overflow-auto">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}