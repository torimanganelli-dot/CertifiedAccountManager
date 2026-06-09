import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { SPRINTS } from "@/lib/sprintData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Wrench, Headphones, MessageSquare } from "lucide-react";
import LearningTab from "@/components/sprint/LearningTab";
import SprintToolTab from "@/components/sprint/SprintToolTab";
import PracticeTab from "@/components/sprint/PracticeTab";
import ReflectionTab from "@/components/sprint/ReflectionTab";
import TabNavFooter from "@/components/sprint/TabNavFooter";

const BASE_TABS = [
  { value: "learning", label: "Learning", icon: BookOpen },
  { value: "tool", label: "Sprint Tool", icon: Wrench },
  { value: "practice", label: "Practice", icon: Headphones },
  { value: "reflection", label: "Reflection", icon: MessageSquare },
];

export default function SprintDetail() {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const sprintNum = parseInt(window.location.pathname.split("/").pop());
  const sprint = SPRINTS.find((s) => s.number === sprintNum);
  const [activeTab, setActiveTab] = useState("learning");

  if (!sprint) {
    return (
      <div className="p-10 text-center">
        <p className="text-muted-foreground">Sprint not found.</p>
      </div>
    );
  }

  // Build tabs: remove practice for Capstone, rename last tab to "Presentation" for Capstone
  const visibleTabs = BASE_TABS
    .filter((t) => sprint.number === 9 ? t.value !== "practice" : true)
    .map((t) => sprint.number === 9 && t.value === "reflection" ? { ...t, label: "Presentation" } : t);
  const currentIndex = visibleTabs.findIndex((t) => t.value === activeTab);
  const nextTab = visibleTabs[currentIndex + 1] || null;
  const nextSprint = SPRINTS.find((s) => s.number === sprintNum + 1) || null;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-inter font-bold text-sm">
            {sprint.number === 9 ? "C" : sprint.number}
          </div>
          <div>
            <h1 className="font-inter font-bold text-xl md:text-2xl">{sprint.name}</h1>
            <p className="text-sm text-muted-foreground">{sprint.subtitle}</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`w-full grid ${sprint.number === 9 ? "grid-cols-3" : "grid-cols-4"} h-12 bg-muted rounded-xl p-1`}>
          {visibleTabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className="flex items-center gap-2 text-xs md:text-sm rounded-lg">
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="learning" className="mt-6">
          <LearningTab sprint={sprint} />
          <TabNavFooter nextTab={nextTab} onNext={() => setActiveTab(nextTab?.value)} onDashboard={() => navigate("/dashboard")} />
        </TabsContent>
        <TabsContent value="tool" className="mt-6">
          <SprintToolTab sprint={sprint} />
          <TabNavFooter nextTab={nextTab} onNext={() => setActiveTab(nextTab?.value)} onDashboard={() => navigate("/dashboard")} />
        </TabsContent>
        <TabsContent value="practice" className="mt-6">
          <PracticeTab user={user} />
          <TabNavFooter nextTab={nextTab} onNext={() => setActiveTab(nextTab?.value)} onDashboard={() => navigate("/dashboard")} />
        </TabsContent>
        <TabsContent value="reflection" className="mt-6">
          <ReflectionTab sprint={sprint} user={user} />
          <TabNavFooter nextTab={nextTab} onNext={() => setActiveTab(nextTab?.value)} onDashboard={() => navigate("/dashboard")} nextSprint={nextSprint} onNextSprint={() => navigate(`/sprints/${nextSprint?.number}`)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}