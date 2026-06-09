import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard } from "lucide-react";

export default function TabNavFooter({ nextTab, onNext, onDashboard, nextSprint, onNextSprint }) {
  return (
    <div className="mt-8 pt-5 border-t border-border/50 flex items-center justify-between">
      <Button variant="ghost" size="sm" onClick={onDashboard} className="text-muted-foreground gap-2">
        <LayoutDashboard className="w-4 h-4" />
        Return to Dashboard
      </Button>
      <div className="flex items-center gap-2">
        {nextSprint && (
          <Button variant="outline" size="sm" onClick={onNextSprint} className="gap-2">
            {nextSprint.number === 9 ? "Capstone" : `Sprint ${nextSprint.number}`}: {nextSprint.name}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
        {nextTab && (
          <Button size="sm" onClick={onNext} className="gap-2">
            {nextTab.label}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}