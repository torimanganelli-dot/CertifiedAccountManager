import React from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Users, TrendingUp } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 text-primary-foreground flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-8">
          <span className="font-inter font-black text-secondary-foreground text-xl">CAM</span>
        </div>
        
        <h1 className="font-inter font-black text-4xl md:text-6xl text-center leading-tight mb-4">
          Accredited Account<br />Manager
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/70 text-center max-w-2xl mb-2">
          8 self-directed, 2-week sprints designed to build Account Management skills inside your existing book of business.
        </p>
        <p className="text-sm text-primary-foreground/50 text-center mb-12">
          HUB International | Sales Force Development
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl w-full">
          {[
            { icon: BookOpen, label: "8 Sprints + Capstone" },
            { icon: TrendingUp, label: "AI-Coached Feedback" },
            { icon: Users, label: "Live Book Application" },
            { icon: Award, label: "HUB CAM Designation" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Icon className="w-5 h-5 text-secondary" />
              <span className="text-xs font-medium text-center text-primary-foreground/80">{label}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={() => base44.auth.redirectToLogin(window.location.origin + "/dashboard")}
          size="lg"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base px-10 py-6 rounded-xl shadow-lg"
        >
          Sign In to Get Started
        </Button>
        
        <p className="text-xs text-primary-foreground/40 mt-4">
          Leaders and Admins sign in with the same button
        </p>
      </div>
    </div>
  );
}