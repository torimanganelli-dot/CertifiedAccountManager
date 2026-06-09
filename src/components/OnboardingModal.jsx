import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";

export default function OnboardingModal({ user, onComplete }) {
  const [displayName, setDisplayName] = useState(user?.full_name || "");
  const [role, setRole] = useState("participant");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName.trim(),
        role,
      })
      .eq("id", user.id);

    if (error) {
      toast.error("Something went wrong. Please try again.");
      setSaving(false);
      return;
    }

    toast.success("Welcome to the CAM Accelerator!");
    await onComplete(); // calls refreshUser in AuthContext
  };

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md" hideClose>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="font-inter font-black text-primary-foreground text-sm">CAM</span>
            </div>
            <DialogTitle className="text-xl font-inter font-bold">Welcome to the CAM Accelerator</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">Let's get you set up. This will only take a moment.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          <div>
            <label className="text-sm font-medium block mb-1">Your Name</label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Jane Smith"
              required
              autoFocus
            />
            <p className="text-xs text-muted-foreground mt-1">This is how your name will appear to others in the program.</p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "participant", label: "Participant", desc: "I'm completing the CAM Accelerator program" },
                { value: "leader", label: "Manager / Leader", desc: "I'm managing and coaching participants" },
              ].map(({ value, label, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    role === value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <p className={`font-semibold text-sm ${role === value ? "text-primary" : ""}`}>{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={saving || !displayName.trim()}>
            {saving ? "Getting started..." : "Get Started"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
