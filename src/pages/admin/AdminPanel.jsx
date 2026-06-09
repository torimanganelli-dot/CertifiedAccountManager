import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/api/supabaseClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Layers, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminPanel() {
  const queryClient = useQueryClient();
  const [newCohortName, setNewCohortName] = useState("");

  const { data: profiles = [] } = useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: cohorts = [] } = useQuery({
    queryKey: ["cohorts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("cohorts").select("*").order("created_at");
      if (error) throw error;
      return data;
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async ({ id, updates }) => {
      const { error } = await supabase.from("profiles").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-profiles"] });
      toast.success("Participant updated");
    },
    onError: (err) => toast.error("Update failed: " + err.message),
  });

  const createCohortMutation = useMutation({
    mutationFn: async (name) => {
      const { error } = await supabase.from("cohorts").insert({ name, is_active: true });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cohorts"] });
      setNewCohortName("");
      toast.success("Cohort created");
    },
    onError: (err) => toast.error("Create failed: " + err.message),
  });

  const deleteCohortMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("cohorts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cohorts"] });
      toast.success("Cohort deleted");
    },
    onError: (err) => toast.error("Delete failed: " + err.message),
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-inter font-bold text-2xl">Admin Panel</h1>
        <p className="text-sm text-muted-foreground">Manage participants and cohorts</p>
      </div>

      <Tabs defaultValue="participants">
        <TabsList className="grid grid-cols-2 w-64">
          <TabsTrigger value="participants" className="flex items-center gap-2">
            <Users className="w-4 h-4" /> Participants
          </TabsTrigger>
          <TabsTrigger value="cohorts" className="flex items-center gap-2">
            <Layers className="w-4 h-4" /> Cohorts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="participants" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Participants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profiles.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-4 py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{p.display_name || p.email}</p>
                    <p className="text-xs text-muted-foreground">{p.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={p.role || "participant"}
                      onChange={(e) => updateProfileMutation.mutate({ id: p.id, updates: { role: e.target.value } })}
                      className="text-xs border rounded-md px-2 py-1 bg-background"
                    >
                      <option value="participant">Participant</option>
                      <option value="leader">Leader</option>
                      <option value="admin">Admin</option>
                    </select>
                    <select
                      value={p.cohort || ""}
                      onChange={(e) => updateProfileMutation.mutate({ id: p.id, updates: { cohort: e.target.value } })}
                      className="text-xs border rounded-md px-2 py-1 bg-background"
                    >
                      <option value="">No cohort</option>
                      {cohorts.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              {profiles.length === 0 && <p className="text-sm text-muted-foreground">No participants yet.</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Cohort</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Cohort 1 - Spring 2026"
                  value={newCohortName}
                  onChange={(e) => setNewCohortName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && newCohortName.trim() && createCohortMutation.mutate(newCohortName.trim())}
                />
                <Button
                  onClick={() => newCohortName.trim() && createCohortMutation.mutate(newCohortName.trim())}
                  disabled={!newCohortName.trim() || createCohortMutation.isPending}
                >
                  <Plus className="w-4 h-4 mr-1" /> Create
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Cohorts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cohorts.map((c) => {
                const memberCount = profiles.filter((p) => p.cohort === c.name).length;
                return (
                  <div key={c.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{memberCount} member{memberCount !== 1 ? "s" : ""}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteCohortMutation.mutate(c.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
              {cohorts.length === 0 && <p className="text-sm text-muted-foreground">No cohorts yet.</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
