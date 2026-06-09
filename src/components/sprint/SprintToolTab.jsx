import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, ExternalLink, Sparkles } from "lucide-react";

export default function SprintToolTab({ sprint }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-inter font-semibold text-lg mb-1">AI Sprint Tool</h3>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">{sprint.toolInstructions}</p>
          </div>
        </div>

        <div className="bg-muted rounded-xl p-6 text-center space-y-4">
          <Wrench className="w-10 h-10 mx-auto text-primary/60" />
          <div>
            <h4 className="font-semibold mb-1">Claude AI Project</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Access your dedicated AI workspace to create sprint artifacts with guided prompts and scored feedback.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a href={sprint.claudeProjectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Open Sprint Project
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}