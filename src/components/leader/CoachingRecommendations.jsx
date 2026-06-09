import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";

export default function CoachingRecommendations({ reflections, participantName, revenue, opportunities, completedCount }) {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRecommendations = async () => {
    setLoading(true);

    const completedReflections = reflections.filter((r) => r.status === "completed");
    const reflectionSummary = completedReflections.map((r) => [
      `--- Sprint ${r.sprint_number}: ${r.sprint_name} ---`,
      r.reflection_text ? `Reflection: ${r.reflection_text}` : "",
      `Revenue: $${r.revenue_influenced || 0} | Opportunities: ${r.opportunities_uncovered || 0}`,
    ].filter(Boolean).join("\n")).join("\n\n");

    const prompt = `You are a sales coaching expert reviewing a HUB International Account Manager's progress in the CAM Accelerator program.

Participant: ${participantName}
Sprints Completed: ${completedCount}/9
Total Revenue Influenced: $${revenue.toLocaleString()}
Opportunities Uncovered: ${opportunities}

Sprint Reflections:
${reflectionSummary || "No completed reflections yet."}

Provide 3 specific, actionable coaching recommendations for this participant based on their progress and reflections. Format as a numbered list. Be encouraging but specific.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map((c) => c.text).join("") || "Unable to generate recommendations.";
      setRecommendations(text);
    } catch (err) {
      setRecommendations("Unable to generate recommendations at this time.");
    }
    setLoading(false);
  };

  return (
    <Card className="border-0 bg-muted/30">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            AI Coaching Recommendations
          </h4>
          <Button
            size="sm"
            variant="outline"
            onClick={generateRecommendations}
            disabled={loading}
            className="flex items-center gap-2 text-xs"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>
        {recommendations && (
          <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {recommendations}
          </div>
        )}
        {!recommendations && !loading && (
          <p className="text-xs text-muted-foreground italic">
            Click Generate to get AI-powered coaching recommendations for this participant.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
