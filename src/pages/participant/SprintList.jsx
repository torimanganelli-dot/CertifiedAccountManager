import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/api/supabaseClient";
import { SPRINTS } from "@/lib/sprintData";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SprintList() {
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

  const getStatus = (num) => {
    const r = reflections.find((ref) => ref.sprint_number === num);
    return r?.status || "not_started";
  };

  const statusBadge = (status) => {
    if (status === "completed") return <Badge className="bg-green-100 text-green-700 border-0">Completed</Badge>;
    if (status === "in_progress") return <Badge className="bg-amber-100 text-amber-700 border-0">In Progress</Badge>;
    return <Badge variant="outline" className="text-muted-foreground">Not Started</Badge>;
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-inter font-bold text-2xl">Sprints</h1>
        <p className="text-muted-foreground mt-1">8 two-week sprints + 1 Capstone</p>
      </div>

      <div className="space-y-3">
        {SPRINTS.map((sprint) => {
          const status = getStatus(sprint.number);
          return (
            <Link
              key={sprint.number}
              to={`/sprints/${sprint.number}`}
              className="group flex items-start gap-5 p-5 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-inter font-bold text-lg ${
                status === "completed" ? "bg-green-100 text-green-700" :
                status === "in_progress" ? "bg-secondary/20 text-secondary" :
                "bg-muted text-muted-foreground"
              }`}>
                {sprint.number === 9 ? "C" : sprint.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-base">{sprint.name}</h3>
                  {statusBadge(status)}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{sprint.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
