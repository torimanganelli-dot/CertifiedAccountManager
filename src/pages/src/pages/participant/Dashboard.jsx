import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { SPRINTS } from "@/lib/sprintData";
import { DollarSign, Target, BarChart3, ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const { user } = useOutletContext();

  const { data: reflections = [] } = useQuery({
    queryKey: ["my-reflections", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sprint_reflections")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const totalRevenue = reflections.reduce((s, r) => s + (r.revenue_influenced || 0), 0);
  const totalOpportunities = reflections.reduce((s, r) => s + (r.opportunities_uncovered || 0), 0);
  const completedSprints = reflections.filter((r) => r.status === "completed").length;
  const progressPercent = Math.round((completedSprints / 9) * 100);

  const getSprintStatus = (num) => {
    const r = reflections.find((ref) => ref.sprint_number === num);
    if (!r) return "not_started";
    return r.status;
  };

  const statusIcon = (status) => {
    if (status === "completed") return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (status === "in_progress") return <Clock className="w-4 h-4 text-secondary" />;
    return <Circle className="w-4 h-4 text-muted-foreground/40" />;
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="font-inter font-bold text-2xl md:text-3xl">
          Welcome back, {user?.display_name || user?.email?.split("@")[0] || "Participant"}
        </h1>
        <p className="text-muted-foreground mt-1">Track your CAM Accelerator progress</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-primary to-primary/85">
          <CardContent className="p-5 text-primary-foreground">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-primary-foreground/70">Revenue Influenced</span>
            </div>
            <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-accent to-accent/85">
          <CardContent className="p-5 text-accent-foreground">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium text-accent-foreground/70">Opportunities Uncovered</span>
            </div>
            <p className="text-3xl font-bold">{totalOpportunities}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Sprint Progress</span>
            </div>
            <p className="text-3xl font-bold">{completedSprints} / 9</p>
            <Progress value={progressPercent} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Sprint list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-inter font-semibold text-lg">Your Sprints</h2>
          <Link to="/sprints" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {SPRINTS.map((sprint) => {
            const status = getSprintStatus(sprint.number);
            return (
              <Link
                key={sprint.number}
                to={`/sprints/${sprint.number}`}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <span className="font-inter font-bold text-sm text-muted-foreground">
                    {sprint.number === 9 ? "C" : sprint.number}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{sprint.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{sprint.subtitle}</p>
                </div>
                {statusIcon(status)}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
