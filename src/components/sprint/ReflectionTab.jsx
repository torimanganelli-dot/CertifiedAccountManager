import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DollarSign, Target, Save, Download, CheckCircle2, MessageSquare, ChevronRight, Calendar, ClipboardList, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { SPRINT_LABELS } from "@/lib/sprintData";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const QUESTION_IDS = ["q1", "q2", "q3", "q4", "q5"];

export default function ReflectionTab({ sprint, user }) {
  const queryClient = useQueryClient();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [metrics, setMetrics] = useState({ revenue_influenced: 0, opportunities_uncovered: 0 });

  const { data: allReflections = [] } = useQuery({
    queryKey: ["my-reflections"],
    queryFn: () => base44.entities.SprintReflection.filter({ created_by: user?.email }),
  });

  const existing = allReflections.find((r) => r.sprint_number === sprint.number);

  useEffect(() => {
    if (existing) {
      // Parse stored answers JSON from reflection_text
      try {
        const stored = JSON.parse(existing.reflection_text || "{}");
        setAnswers(stored);
      } catch {
        // Legacy plain text: put it in q1
        setAnswers({ q1: existing.reflection_text || "" });
      }
      setMetrics({
        revenue_influenced: existing.revenue_influenced || 0,
        opportunities_uncovered: existing.opportunities_uncovered || 0,
      });
    }
  }, [existing?.id]);

  const totalRevenue = allReflections.reduce((s, r) => s + (r.revenue_influenced || 0), 0);
  const totalOpportunities = allReflections.reduce((s, r) => s + (r.opportunities_uncovered || 0), 0);

  const questions = sprint.reflectionQuestions || [];
  const answeredCount = questions.filter((q) => (answers[q.id] || "").trim().length > 10).length;
  const completionPct = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  const saveMutation = useMutation({
    mutationFn: async (status) => {
      const data = {
        reflection_text: JSON.stringify(answers),
        purpose_connection: answers.q2 || "",
        understanding_gained: answers.q3 || "",
        influence_applied: answers.q4 || "",
        revenue_influenced: metrics.revenue_influenced,
        opportunities_uncovered: metrics.opportunities_uncovered,
        sprint_number: sprint.number,
        sprint_name: sprint.name,
        status,
        participant_name: user?.full_name,
        cohort: user?.cohort || "",
      };
      if (existing) return base44.entities.SprintReflection.update(existing.id, data);
      return base44.entities.SprintReflection.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reflections"] });
      toast.success("Reflection saved!");
    },
  });

  const handleDownload = () => {
    const label = SPRINT_LABELS[sprint.number] || sprint.name;
    const lines = questions.map((q) => `${q.label.toUpperCase()}\n${q.prompt}\n\n${answers[q.id] || "(No answer)"}`).join("\n\n---\n\n");
    const content = `${label}: ${sprint.name}\nParticipant: ${user?.full_name || ""}\nDate: ${new Date().toLocaleDateString()}\n\n${"=".repeat(50)}\n\n${lines}\n\n${"=".repeat(50)}\nRevenue Influenced: $${metrics.revenue_influenced.toLocaleString()}\nOpportunities Uncovered: ${metrics.opportunities_uncovered}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${label.replace(/\s/g, "_")}_Reflection_${user?.full_name?.replace(/\s/g, "_") || "user"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateAnswer = (id, value) => setAnswers((p) => ({ ...p, [id]: value }));

  return (
    <div className="space-y-6">
      {/* Running totals */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-primary to-primary/85">
          <CardContent className="p-4 text-primary-foreground">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-secondary" />
              <span className="text-xs font-medium text-primary-foreground/70">Total Revenue Influenced</span>
            </div>
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-primary-foreground/50 mt-0.5">across all sprints</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-accent to-accent/85">
          <CardContent className="p-4 text-accent-foreground">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4" />
              <span className="text-xs font-medium text-accent-foreground/70">Opportunities Uncovered</span>
            </div>
            <p className="text-2xl font-bold">{totalOpportunities}</p>
            <p className="text-xs text-accent-foreground/50 mt-0.5">across all sprints</p>
          </CardContent>
        </Card>
      </div>

      {/* Capstone: Book Presentation & Survey */}
      {sprint.number === 9 && (
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-inter font-semibold text-lg mb-1">Book Your Capstone Presentation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Schedule your capstone presentation session with your leader to showcase everything you've built across the 8 sprints.
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <a href="https://outlook.office.com/bookwithme/user/64ad068b94944190b7b4a72b4d71faed@hubinternational.com/meetingtype/cehCnRras0yWxt41Z1ezIA2?anonymous&ismsaljsauthenabled&ep=mlink" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Book Presentation
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
                  <ClipboardList className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-inter font-semibold text-lg mb-1">Complete the Course Survey</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share your feedback on the CAM Accelerator program. Your input helps us improve the experience for future participants.
                  </p>
                  <Button asChild variant="outline" className="border-secondary/40 text-secondary-foreground hover:bg-secondary/10">
                    <a href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=whWFoZgxrU-X7SmkbJdP2-m45qkl79RDv7dXj0fAeH9URVlINUk3Q1VIMVFDUUdLRUs1VUxNM1dQWS4u" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Take the Survey
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Question navigator */}
      {sprint.number !== 9 && questions.length > 0 && (
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            {/* Progress header */}
            <div className="p-5 border-b border-border/50 bg-muted/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <h3 className="font-inter font-semibold text-base">
                    {SPRINT_LABELS[sprint.number] || sprint.name} Reflection
                  </h3>
                  {existing?.status === "completed" && (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground font-medium">{answeredCount}/{questions.length} answered</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              {/* Question tabs */}
              <div className="flex gap-2 mt-3">
                {questions.map((q, i) => {
                  const answered = (answers[q.id] || "").trim().length > 10;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setActiveQuestion(i)}
                      className={cn(
                        "flex-1 h-8 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1",
                        activeQuestion === i
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : answered
                          ? "bg-green-500/10 text-green-600 border border-green-200"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {answered && activeQuestion !== i ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuestion}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="p-5 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {activeQuestion + 1}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary/80 uppercase tracking-wide mb-0.5">
                      {questions[activeQuestion].label}
                    </p>
                    <p className="text-sm font-medium text-foreground leading-snug">
                      {questions[activeQuestion].prompt}
                    </p>
                  </div>
                </div>
                <Textarea
                  placeholder="Write your reflection here..."
                  value={answers[questions[activeQuestion].id] || ""}
                  onChange={(e) => updateAnswer(questions[activeQuestion].id, e.target.value)}
                  rows={5}
                  className="resize-none border-border/60 focus:border-primary/50"
                />
                <div className="flex justify-between items-center pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={activeQuestion === 0}
                    onClick={() => setActiveQuestion((p) => p - 1)}
                    className="text-muted-foreground"
                  >
                    ← Previous
                  </Button>
                  {activeQuestion < questions.length - 1 ? (
                    <Button
                      size="sm"
                      onClick={() => setActiveQuestion((p) => p + 1)}
                      className="flex items-center gap-1"
                    >
                      Next <ChevronRight className="w-3 h-3" />
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">All questions answered ✓</span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* Metrics */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-5 space-y-4">
          <h4 className="font-semibold text-sm">Sprint Metrics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wide">Revenue Influenced ($)</label>
              <Input
                type="number"
                value={metrics.revenue_influenced}
                onChange={(e) => setMetrics((p) => ({ ...p, revenue_influenced: parseFloat(e.target.value) || 0 }))}
                className="border-border/60"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wide">Opportunities Uncovered</label>
              <Input
                type="number"
                value={metrics.opportunities_uncovered}
                onChange={(e) => setMetrics((p) => ({ ...p, opportunities_uncovered: parseInt(e.target.value) || 0 }))}
                className="border-border/60"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              onClick={() => saveMutation.mutate("in_progress")}
              variant="outline"
              disabled={saveMutation.isPending}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button
              onClick={() => saveMutation.mutate("completed")}
              disabled={saveMutation.isPending}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border-0"
            >
              <CheckCircle2 className="w-4 h-4" />
              Mark Completed
            </Button>
            <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}