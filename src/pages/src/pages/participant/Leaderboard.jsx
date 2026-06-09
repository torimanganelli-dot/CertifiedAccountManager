import React from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, DollarSign, Target, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Leaderboard() {
  const { user } = useOutletContext();

  const { data: reflections = [] } = useQuery({
    queryKey: ["all-reflections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sprint_reflections")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Aggregate by participant user_id
  const participantMap = {};
  reflections.forEach((r) => {
    const key = r.user_id;
    if (!participantMap[key]) {
      participantMap[key] = {
        user_id: key,
        name: r.participant_name || "Participant",
        revenue: 0,
        opportunities: 0,
        completed: 0,
        cohort: r.cohort,
      };
    }
    participantMap[key].revenue += r.revenue_influenced || 0;
    participantMap[key].opportunities += r.opportunities_uncovered || 0;
    if (r.status === "completed") participantMap[key].completed += 1;
  });

  const participants = Object.values(participantMap);

  const sortBy = (field) => [...participants].sort((a, b) => b[field] - a[field]);

  const rankBadge = (i) => {
    if (i === 0) return <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-sm">1</div>;
    if (i === 1) return <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm">2</div>;
    if (i === 2) return <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-sm">3</div>;
    return <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-sm">{i + 1}</div>;
  };

  const LeaderList = ({ data, valueKey, format }) => (
    <div className="space-y-2">
      {data.map((p, i) => (
        <div
          key={p.user_id}
          className={`flex items-center gap-4 p-4 rounded-xl border ${
            p.user_id === user?.id ? "bg-primary/5 border-primary/30" : "bg-card border-border"
          }`}
        >
          {rankBadge(i)}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">
              {p.name}{p.user_id === user?.id && " (You)"}
            </p>
            {p.cohort && <p className="text-xs text-muted-foreground">{p.cohort}</p>}
          </div>
          <span className="font-inter font-bold text-sm">{format(p[valueKey])}</span>
        </div>
      ))}
      {data.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No data yet. Complete sprints to appear here.</p>
      )}
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="w-7 h-7 text-secondary" />
        <h1 className="font-inter font-bold text-2xl">Leaderboard</h1>
      </div>

      <Tabs defaultValue="progress">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="progress" className="flex items-center gap-2 text-xs">
            <BarChart3 className="w-3 h-3" /> Progress
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2 text-xs">
            <DollarSign className="w-3 h-3" /> Revenue
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex items-center gap-2 text-xs">
            <Target className="w-3 h-3" /> Opportunities
          </TabsTrigger>
        </TabsList>
        <TabsContent value="progress" className="mt-4">
          <LeaderList data={sortBy("completed")} valueKey="completed" format={(v) => `${v}/9 sprints`} />
        </TabsContent>
        <TabsContent value="revenue" className="mt-4">
          <LeaderList data={sortBy("revenue")} valueKey="revenue" format={(v) => `$${v.toLocaleString()}`} />
        </TabsContent>
        <TabsContent value="opportunities" className="mt-4">
          <LeaderList data={sortBy("opportunities")} valueKey="opportunities" format={(v) => `${v} found`} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
