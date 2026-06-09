import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Phone, ExternalLink, Calendar } from "lucide-react";

export default function PracticeTab() {
  return (
    <div className="space-y-6">
      {/* Hyperbound */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-inter font-semibold text-lg mb-1">Hyperbound AI Role-Play</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Simulate AI role-plays for cold calls, warm calls, discovery calls, and more. Customize AI buyers for your ICP. Close your skill gaps.
              </p>
              <Button asChild variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <a href="https://outlook.office.com/book/HyperboundSkillPractice@hubinternational.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" />
                  Sign Up for Hyperbound
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 1:1 Coaching */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-inter font-semibold text-lg mb-1">1:1 Coaching</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Schedule a 1:1 coaching session with your leader to discuss your progress and next steps.
              </p>
              <Button asChild variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <a href="https://outlook.office.com/bookwithme/user/64ad068b94944190b7b4a72b4d71faed@hubinternational.com/meetingtype/AVuADIDo1kSjAKAfSzHuhg2?anonymous&ismsaljsauthenabled&ep=mlink" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  Schedule Coaching
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}