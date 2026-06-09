import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save, Download, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const SECTIONS = [
  { key: "org_chart", title: "Your HUB's Org Chart", prompt: "Understanding your full organizational chart—beyond just your immediate team—is essential for delivering comprehensive, high-value service to clients. Include risk services, claims, marketing, and placement contacts. Add the Org Chart for Your HUB." },
  { key: "team_roles", title: "Team Roles & Responsibilities", prompt: "Clearly defining your team structure helps identify roles and responsibilities, which minimizes duplication and improves workflow efficiency. At Our HUB, Our Roles & Responsibilities are:" },
  { key: "strategic_priorities", title: "Strategic Priorities", prompt: "Include information such as current team goals, current team initiatives, and if your team wants to focus on anything specific. At Our HUB, Our Strategic Priorities are:" },
  { key: "success_metrics", title: "Success Metrics", prompt: "What Success Looks Like for Me in My Role with HUB — include activity-based metrics that help you focus on actions that truly move the needle." },
  { key: "ideal_partnership", title: "Ideal Partnership Criteria", prompt: "Consider: Industry & Specialization, Size & Complexity, Risk Profile, Growth Potential, Strategic Alignment, Carrier Appetite, Profitability & Retention. At Our HUB, Our Perfect Client Type Is:" },
  { key: "client_onboarding", title: "Client Onboarding & Kickoff", prompt: "Best practices include: welcome email or call, clear point-of-contact introductions, delivery timeline and service commitments, success measures defined. At Our HUB, We Onboard Clients By:" },
  { key: "tracking_forecasting", title: "Tracking and Forecasting", prompt: "At Our HUB, We Use the Following to Track & Forecast — include tools, cadence, and systems for tracking client communication and activities throughout the year." },
  { key: "client_segmentation", title: "Client Segmentation & Prioritization", prompt: "Consider: Which accounts require full QBRs and executive touchpoints? Which should be nurtured toward growth or retention goals? At Our HUB, We Segment Accounts Based On:" },
  { key: "qbr_process", title: "Planning Strategic Meetings & QBRs", prompt: "Our QBR Process Looks Like — include customized agendas, metrics, emerging risk updates, and cross-selling or solution opportunities." },
  { key: "internal_collaboration", title: "Internal Collaboration & Team Leadership", prompt: "Collaboration best practices: internal pre-meeting strategy sessions, clear ownership of deliverables, post-meeting debrief and alignment. We Collaborate Internally By:" },
  { key: "client_milestones", title: "Client Milestones", prompt: "Our Client Milestones Are — identify key communication touchpoints and milestones throughout the year to build trust and deliver consistent, proactive service." },
  { key: "annual_timeline", title: "Client Annual Timeline", prompt: "Items to include: submission review, submission to market, renewal, post renewal, loss control/risk services, quarterly service meetings, stewardship meetings, pre-renewal meeting. Our Client Annual Timeline:" },
  { key: "renewal_strategy", title: "Renewal Timeline & Milestones", prompt: "Items to include: pre-renewal strategy call, submission to market, quotes received, internal strategy review, client proposal, timeline shared with client and team, binding coverage. Our Renewal Planning Process Includes:" },
  { key: "growth_plan", title: "Cross-Sell & Growth Identification", prompt: "How to spot growth opportunities: Ask 'What's changing in your business?', monitor gaps between exposure and coverage, identify opportunities to sell additional LOB. Our Approach to Growth & Cross-Sell Is:" },
  { key: "client_loss", title: "Loss of a Client", prompt: "Include: team debriefs, follow-up, feedback, and win-backs. When We Lose a Client at Our HUB:" },
  { key: "success_stories", title: "Client Success Story Capture", prompt: "Share stories of successful claim resolutions, risk reduction wins, or creative solutions that saved the client money. Some Success Stories to Share:" },
  { key: "resources", title: "Resources", prompt: "Please list or add to your Favorites any tools or resources available at your HUB." },
];

export default function Playbook() {
  const { user } = useOutletContext();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({});
  const [openSections, setOpenSections] = useState(new Set(["org_chart"]));

  const { data: entries = [] } = useQuery({
    queryKey: ["my-playbook", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("playbook_entries")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const existing = entries[0];

  useEffect(() => {
    if (existing) {
      const data = {};
      SECTIONS.forEach((s) => { data[s.key] = existing[s.key] || ""; });
      setForm(data);
    }
  }, [existing?.id]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = {
        ...form,
        participant_name: user?.display_name || user?.email,
        cohort: user?.cohort || "",
        user_id: user.id,
      };
      if (existing) {
        const { error } = await supabase
          .from("playbook_entries")
          .update(data)
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("playbook_entries")
          .insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-playbook", user?.id] });
      toast.success("Playbook saved!");
    },
    onError: (err) => {
      toast.error("Save failed: " + err.message);
    },
  });

  const handleDownload = () => {
    let content = `STRATEGIC ACCOUNT MANAGER PLAYBOOK\n${user?.display_name || ""}\n${new Date().toLocaleDateString()}\n${"=".repeat(50)}\n\n`;
    SECTIONS.forEach((s) => {
      content += `${s.title.toUpperCase()}\n${"-".repeat(40)}\n${form[s.key] || "(Not completed)"}\n\n`;
    });
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Strategic_Playbook_${user?.display_name?.replace(/\s/g, "_") || "user"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSection = (key) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const filledCount = SECTIONS.filter((s) => form[s.key]?.trim()).length;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <FileText className="w-7 h-7 text-primary" />
          <div>
            <h1 className="font-inter font-bold text-2xl">Strategic Account Playbook</h1>
            <p className="text-sm text-muted-foreground">{filledCount}/{SECTIONS.length} sections completed</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="flex items-center gap-2">
            <Save className="w-4 h-4" /> Save
          </Button>
          <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Download
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {SECTIONS.map((section, i) => (
          <Collapsible key={section.key} open={openSections.has(section.key)} onOpenChange={() => toggleSection(section.key)}>
            <Card className="border-0 shadow-sm">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-muted/30 transition-colors rounded-xl">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    form[section.key]?.trim() ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-sm flex-1 text-left">{section.title}</h3>
                  {openSections.has(section.key) ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="px-5 pb-5 pt-0">
                  <p className="text-sm text-muted-foreground mb-3">{section.prompt}</p>
                  <Textarea
                    placeholder={`Enter your ${section.title.toLowerCase()} here...`}
                    value={form[section.key] || ""}
                    onChange={(e) => setForm((p) => ({ ...p, [section.key]: e.target.value }))}
                    rows={6}
                    className="bg-muted/30"
                  />
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
