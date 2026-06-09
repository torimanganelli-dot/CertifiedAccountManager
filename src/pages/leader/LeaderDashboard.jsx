import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, DollarSign, Target, BarChart3, ChevronDown } from "lucide-react";
import { SPRINTS, SPRINT_LABELS } from "@/lib/sprintData";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CoachingRecommendations from "@/components/leader/CoachingRecommendations";

export default function LeaderDashboard() {
  const { user } = useOutletContext();
  const [selectedParticipant, setSelectedParticipant] = useState("all");

  const { data: allReflections = [] } = useQuery({
    queryKey: ["leader-reflections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sprint_reflections")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: profiles = [] } = useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  const participants = profiles.filter((p) => p.role === "participant" || !p.role);

  const filteredReflections = selectedParticipant === "all"
    ? allReflections
    : allReflections.filter((r) => r.user_id === selectedParticipant);

  const totalRevenue = filteredReflections.reduce((s, r) => s + (r.revenue_influenced || 0), 0);
  const totalOpportunities = filteredReflections.reduce((s, r) => s + (r.opportunities_uncovered || 0), 0);
  const avgProgress = participants.length > 0
    ? Math.round((allReflections.filter((r) => r.status === "completed").length / (participants.length * 9)) * 100)
    : 0;

  // Per-participant rollup keyed by user_id
  const participantMap = {};
  allReflections.forEach((r) => {
    if (!participantMap[r.user_id]) {
      const profile = profiles.find((p) => p.id === r.user_id);
      participantMap[r.user_id] = {
        user_id: r.user_id,
        name: profile?.display_name || r.participant_name || "Participant",
        reflections: [],
        cohort: r.cohort,
      };
    }
    participantMap[r.user_id].reflections.push(r);
  });

  const participantList = Object.values(participantMap);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-inter font-bold text-2xl">Leader Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor participant progress and performance</p>
        </div>
        <Select value={selectedParticipant} onValueChange={setSelectedParticipant}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="All Participants" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Participants</SelectItem>
            {participants.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.display_name || p.email}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <Users className="w-5 h-5 text-primary mb-2" />
            <p className="text-2xl font-bold">{participants.length}</p>
            <p className="text-xs text-muted-foreground">Participants</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <DollarSign className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Revenue Influenced</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <Target className="w-5 h-5 text-accent mb-2" />
            <p className="text-2xl font-bold">{totalOpportunities}</p>
            <p className="text-xs text-muted-foreground">Opportunities</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <BarChart3 className="w-5 h-5 text-secondary mb-2" />
            <p className="text-2xl font-bold">{avgProgress}%</p>
            <p className="text-xs text-muted-foreground">Avg Progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Participant Detail Cards */}
      <div className="space-y-3">
        <h2 className="font-inter font-semibold text-lg">Participant Progress</h2>
        {participantList.map((p) => {
          const pCompleted = p.reflections.filter((r) => r.status === "completed").length;
          const pRevenue = p.reflections.reduce((s, r) => s + (r.revenue_influenced || 0), 0);
          const pOpps = p.reflections.reduce((s, r) => s + (r.opportunities_uncovered || 0), 0);

          return (
            <Collapsible key={p.user_id}>
              <Card className="border-0 shadow-sm">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-muted/30 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {p.name?.[0] || "?"}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.cohort || "No cohort"} · {pCompleted}/9 sprints</p>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm">
                      <span className="text-green-600 font-medium">${pRevenue.toLocaleString()}</span>
                      <span className="text-accent font-medium">{pOpps} opps</span>
                    </div>
                    <Progress value={(pCompleted / 9) * 100} className="w-20 h-2 hidden md:block" />
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-5 pb-5 space-y-4">
                    <div className="grid grid-cols-3 gap-3 md:hidden">
                      <div className="bg-muted rounded-lg p-2 text-center">
                        <p className="text-xs text-muted-foreground">Revenue</p>
                        <p className="font-bold text-sm">${pRevenue.toLocaleString()}</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2 text-center">
                        <p className="text-xs text-muted-foreground">Opportunities</p>
                        <p className="font-bold text-sm">{pOpps}</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2 text-center">
                        <p className="text-xs text-muted-foreground">Progress</p>
                        <p className="font-bold text-sm">{pCompleted}/9</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                      {SPRINTS.map((sprint) => {
                        const ref = p.reflections.find((r) => r.sprint_number === sprint.number);
                        const st = ref?.status || "not_started";
                        return (
                          <div key={sprint.number} className={`p-2 rounded-lg text-center text-xs ${
                            st === "completed" ? "bg-green-100 text-green-700" :
                            st === "in_progress" ? "bg-amber-100 text-amber-700" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {SPRINT_LABELS[sprint.number]}
                          </div>
                        );
                      })}
                    </div>

                    <CoachingRecommendations
                      reflections={p.reflections}
                      participantName={p.name}
                      revenue={pRevenue}
                      opportunities={pOpps}
                      completedCount={pCompleted}
                    />
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
        {participantList.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-10 text-center text-muted-foreground">
              No participant data yet. Participants will appear once they begin submitting reflections.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
