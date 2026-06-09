import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function CoachingRecommendations({ reflections, participantName, revenue, opportunities, completedCount }) {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRecommendations = async () => {
    setLoading(true);

    const completedReflections = reflections.filter((r) => r.status === "completed");
    const inProgressReflections = reflections.filter((r) => r.status === "in_progress");

    const reflectionSummary = reflections
      .filter((r) => r.status === "completed" || r.status === "in_progress")
      .map((r) => {
        const lines = [
          `--- Sprint ${r.sprint_number}: ${r.sprint_name} (${r.status}) ---`,
          `Revenue Influenced: $${r.revenue_influenced || 0} | Opportunities Uncovered: ${r.opportunities_uncovered || 0}`,
        ];
        if (r.reflection_text) lines.push(`Main Reflection: ${r.reflection_text}`);
        if (r.purpose_connection) lines.push(`Purpose Connection: ${r.purpose_connection}`);
        if (r.understanding_gained) lines.push(`Understanding Gained: ${r.understanding_gained}`);
        if (r.influence_applied) lines.push(`Influence Applied: ${r.influence_applied}`);
        return lines.join("\n");
      })
      .join("\n\n");

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a coaching advisor for an insurance Certified Account Manager development program (HUB AM Accelerator).

PARTICIPANT: ${participantName}
PROGRAM PROGRESS: ${completedReflections.length} sprints completed, ${inProgressReflections.length} in progress, out of 9 total
TOTAL REVENUE INFLUENCED: $${revenue.toLocaleString()}
TOTAL OPPORTUNITIES UNCOVERED: ${opportunities}

THEIR SPRINT REFLECTIONS AND METRICS:
${reflectionSummary || "No reflections submitted yet."}

Based on what this participant has actually written in their reflections and their specific performance metrics above, generate exactly 3 open-ended discussion questions a leader should ask in a 1:1 coaching conversation. 

Requirements for each question:
1. Reference something SPECIFIC the participant wrote or a concrete pattern in their data (e.g. quote or paraphrase their own words, or cite their revenue/opportunity numbers)
2. Be genuinely open-ended — not a yes/no question
3. Push them to think more deeply about their growth, a gap they identified, or a commitment they made

Return ONLY the 3 numbered questions. No headers, no preamble, no commentary — just the questions.`,
    });
    setRecommendations(result);
    setLoading(false);
  };

  return (
    <div className="mt-3">
      {!recommendations ? (
        <Button
          onClick={generateRecommendations}
          disabled={loading}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-secondary" />}
          Generate Discussion Questions
        </Button>
      ) : (
        <Card className="border border-secondary/30 bg-secondary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-secondary" />
              <h4 className="font-semibold text-sm">Discussion Questions</h4>
            </div>
            <div className="prose prose-sm max-w-none text-sm text-foreground">
              <ReactMarkdown>{recommendations}</ReactMarkdown>
            </div>
            <Button
              onClick={generateRecommendations}
              disabled={loading}
              variant="ghost"
              size="sm"
              className="mt-3 text-xs"
            >
              {loading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
              Regenerate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}