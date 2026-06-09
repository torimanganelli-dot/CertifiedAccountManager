import React, { useState } from "react";

const SectionEyebrow = ({ label }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{label}</p>
);

const Divider = () => <div className="h-px bg-border" />;

const JOURNEY_STAGES = [
  {
    icon: "🔒", label: "Onboarding", sub: "New clients",
    color: "bg-blue-50 border-blue-200",
    accentColor: "text-blue-600",
    heading: "First impressions set the entire relationship.",
    body: "Set expectations on process, response times, and communication preferences. Make the experience easy and efficient from day one. Clients who have a smooth onboarding are far more forgiving when something goes wrong later — and far more likely to send referrals."
  },
  {
    icon: "⚙", label: "Changes", sub: "Mid-term shifts",
    color: "bg-amber-50 border-amber-200",
    accentColor: "text-amber-600",
    heading: "Mid-term changes create coverage gaps if you're not watching.",
    body: "New employees, locations, equipment, contracts, or acquisitions can all affect the program. Your job is to be the one who catches these — not the one who discovers them at a claim. A quick check-in when something changes protects both the client and your relationship."
  },
  {
    icon: "🌟", label: "Stewardship", sub: "Ongoing value",
    color: "bg-green-50 border-green-200",
    accentColor: "text-green-700",
    heading: "Stewardship is showing value throughout the year — not just at renewal.",
    body: "It includes ongoing updates, asking for feedback, and offering services that may be relevant before the client asks. Know each client's communication preference and honor it. The AM who communicates consistently and on the client's terms builds a relationship that's genuinely hard to replace."
  },
  {
    icon: "🏆", label: "Recognition", sub: "Appreciation",
    color: "bg-purple-50 border-purple-200",
    accentColor: "text-purple-600",
    heading: "Recognition is not a reward program — it's knowing your clients well.",
    body: "Loyalty milestones, referral thanks, seasonal recognition. The gesture should fit the person, not a template. A handwritten note or personal call for a 10-year client does more for the relationship than any formal program."
  },
  {
    icon: "📝", label: "Claims", sub: "Moments of truth",
    color: "bg-red-50 border-red-200",
    accentColor: "text-red-600",
    heading: "Claims are the moment your value is most visible — or most absent.",
    body: "How you show up during a claim defines the relationship more than any other touchpoint. Advocacy, communication, and proactive updates during the process are what clients remember. A claim handled well becomes a retention story."
  },
];

const COMM_SKILLS = [
  { icon: "💓", title: "Listen with curiosity", body: "Resist the urge to solve before you fully understand. Ask follow-up questions. Let silence work. The client who feels heard stays." },
  { icon: "❓", title: "Ask to understand", body: "Good questions reveal what the client actually needs — which is often different from what they asked for. Questions also signal investment in their situation." },
  { icon: "🤝", title: "Empathy", body: "Acknowledge how the client is feeling, not just what they're asking. A client who feels understood is far more forgiving of process and far more loyal over time." },
  { icon: "💡", title: "Resourcefulness", body: "Always offer a solution — even if it isn't yours. The AM who connects a client to the right answer, regardless of who provides it, becomes indispensable." },
  { icon: "⚡", title: "Responsiveness", body: "Speed signals respect. A same-day acknowledgment — even just 'I'm on it' — does more for client confidence than a perfect answer three days later." },
];

const CALENDAR_MONTHS = [
  { month: "Month 1", type: "Onboarding", cover: "Set expectations on process, response times, and communication preferences. Make the experience easy and efficient from day one." },
  { month: "Month 2", type: "Exposure review", cover: "Confirm any operational changes — new employees, locations, equipment, or contracts — are properly reflected in the program." },
  { month: "Month 3", type: "Coverage gap", cover: "Address known gaps — umbrella, cyber, professional liability. Separate from renewal. Frame as your job, not a sales conversation." },
  { month: "Month 4", type: "Market update", cover: "Share relevant industry conditions, carrier appetite shifts, or regulatory changes. Curate with one sentence of context about why it matters to them specifically." },
  { month: "Month 5", type: "Mid-term check-in", cover: "Ask what's changed — new projects, contracts, hires, or business shifts. Early warning on exposures before they become surprises." },
  { month: "Month 6", type: "Claims review", cover: "Review any open or recent claims. Introduce a loss control resource or carrier safety program. Check in on how the claims experience has felt." },
  { month: "Month 7", type: "Pre-renewal", cover: "Start the renewal strategy conversation 90 days out, not 30. Summarize what changed this year and what it means for their program." },
  { month: "Month 8", type: "Renewal strategy", cover: "Present options, carrier recommendations, and a coverage gap summary. Walk them through the reasoning, not just the numbers." },
  { month: "Month 9", type: "Renewal execution", cover: "Bind coverage, confirm all changes, deliver a program summary. Make this a clear, confident handoff — not a flurry of paperwork." },
  { month: "Month 10", type: "Value-add", cover: "Introduce a vendor resource, carrier tool, or safety program. Post-renewal is ideal — nothing to sell, just something useful." },
  { month: "Month 11", type: "Recognition", cover: "Acknowledge loyalty milestones, referrals given, or just the relationship itself. The gesture matters more than the scale." },
  { month: "Month 12", type: "Year-end review", cover: "Review the full year — what changed, what worked, what's ahead. Ask for feedback. Seeds Month 1 of the next cycle." },
];

const OUTREACH_APPROACHES = [
  {
    num: "1", title: "The pre-renewal outreach",
    body: "Start this conversation 90 days out, not 30. For any account that has gone through meaningful change, walking into renewal without a prior strategy conversation puts you in a reactive posture at exactly the wrong moment. Open with a summary of everything that changed in the past year and what it means for their program.",
    tip: `The goal of this call is not to quote — it's to align on strategy so that when markets respond, you're already on the same page. Tough renewal? Deliver the news quickly.`
  },
  {
    num: "2", title: "The mid-year check-in",
    body: "The best mid-year trigger is activity in the client's business. Ask what's in the pipeline, what bids are out, whether any new contracts or compliance requirements have come up.",
    tip: `Opening: "I'm doing my mid-year check-in — anything new in the pipeline or any contracts signed since we last talked that I should know about?"`
  },
  {
    num: "3", title: "The value-add delivery",
    body: "Clients respond to information that is directly relevant to their work — carrier appetite shifts, regulatory updates, industry loss data, vendor resources. You don't produce this content. Pull it from HUB resources, carrier partners, or industry publications.",
    tip: "Send it with one sentence of context about why it matters to them specifically. That one sentence is the difference between a newsletter and a value-add."
  },
  {
    num: "4", title: "The coverage gap conversation",
    body: "Gap conversations — umbrella, cyber, EPLI, professional liability — should happen separately, not bundled into renewal. Lead with the client's situation, not the product.",
    tip: `"Most agreements like yours require higher limits than you currently carry — I want to make sure we have this covered before it comes up in a claim or a bid." That's not a pitch. It's your job.`
  },
  {
    num: "5", title: "The stewardship communication",
    body: "Stewardship is showing value throughout the year — not just at renewal. It includes ongoing updates, asking for feedback, and offering services that may be relevant before the client asks.",
    tip: "Three questions to plan stewardship for any account: Who are your top clients? What messages will you send them this year? When?"
  },
];

export default function Sprint2Learning() {
  const [activeStage, setActiveStage] = useState(0);
  const [openOutreach, setOpenOutreach] = useState(null);

  return (
    <div className="space-y-8 pb-4">

      {/* Hero */}
      <div className="rounded-2xl bg-primary p-6 relative overflow-hidden">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40 mb-3">AM Accelerator · Sprint 2 of 8</p>
        <h2 className="text-2xl font-bold text-primary-foreground leading-tight mb-2">
          Show up with <span className="text-secondary">relevance</span>
        </h2>
        <p className="text-sm text-primary-foreground/60 mb-5 max-w-lg leading-relaxed">
          Customer service handles what comes in. Customer experience is what clients feel across every interaction all year long. This sprint builds the philosophy, the calendar, and the habits that move you from one to the other.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Understand the difference between customer service and customer experience",
            "Learn how the five client journey stages create opportunities to add value",
            "See how a 12-month proactive calendar works across any account type",
            "Know the communication skills and recognition practices that build loyalty",
          ].map((item) => (
            <div key={item} className="flex gap-2 items-start bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="text-secondary text-xs mt-0.5 shrink-0">✓</span>
              <span className="text-xs text-primary-foreground/70 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Core Reframe */}
      <div>
        <SectionEyebrow label="The core shift" />
        <div className="rounded-2xl bg-primary p-6 md:p-8 relative overflow-hidden">
          <div className="w-10 h-0.5 bg-secondary rounded mb-4" />
          <p className="text-xl md:text-2xl font-bold text-primary-foreground leading-tight mb-3 italic">
            When I do good, no one remembers. When I do bad, <span className="not-italic text-secondary">no one forgets.</span>
          </p>
          <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xl">
            That asymmetry is why proactive client experience matters.{" "}
            <strong className="text-primary-foreground/85 font-semibold">Handling problems well is table stakes</strong> — clients expect it. What creates loyalty, referrals, and retention is the experience they have between problems. The AM who shows up with relevance before a client needs something becomes the advisor clients call first.
          </p>
        </div>
      </div>

      <Divider />

      {/* Service vs Experience */}
      <div>
        <SectionEyebrow label="Two different standards" />
        <h3 className="text-xl font-bold mb-1">Customer service vs. customer experience</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">These are not two words for the same thing. One is a floor. The other is what defines HUB's brand — and your relationship with every client in your book.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Customer service</p>
            <p className="italic text-base text-foreground mb-2 leading-snug">"I handle it when it comes in."</p>
            <ul className="space-y-1">
              {["Reactive — triggered by a client need", "Single point in time", "Problem-oriented", "Resolves existing needs", "The client sets the agenda"].map(i => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2 items-start"><span className="text-blue-400 mt-0.5">·</span>{i}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-green-50 border border-green-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-2">Customer experience</p>
            <p className="italic text-base text-foreground mb-2 leading-snug">"I shape how every interaction feels."</p>
            <ul className="space-y-1">
              {["Proactive — you set the cadence", "Ongoing across the full year", "Feelings-oriented", "Attracts and retains clients", "Defines HUB's brand in the field"].map(i => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2 items-start"><span className="text-green-500 mt-0.5">·</span>{i}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex gap-3 items-start bg-primary rounded-xl p-4 border-l-4 border-secondary">
          <span className="text-secondary shrink-0 text-base mt-0.5">💡</span>
          <p className="text-sm text-primary-foreground/65 leading-relaxed">
            There are four types of value propositions clients respond to: lowest price, product leadership, customer dependency, and{" "}
            <strong className="text-primary-foreground/85 font-medium">making life easier.</strong> The AM who delivers great CX wins on the last one — and that's the hardest for a competitor to take away.
          </p>
        </div>
      </div>

      <Divider />

      {/* Client Journey Stages */}
      <div>
        <SectionEyebrow label="Where experience is made" />
        <h3 className="text-xl font-bold mb-1">The client journey</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">Client experience is not one moment — it's a series of touchpoints across five stages. Each stage has different client emotions, different expectations, and different opportunities to add value.</p>
        <div className="flex gap-1 flex-wrap mb-0">
          {JOURNEY_STAGES.map((stage, i) => (
            <button
              key={i}
              onClick={() => setActiveStage(i)}
              className={`px-4 py-2 text-xs rounded-t-lg border transition-all ${
                activeStage === i
                  ? "bg-card border-border border-b-card text-accent font-semibold relative z-10 -mb-px"
                  : "bg-muted border-transparent text-muted-foreground hover:text-foreground font-medium"
              }`}
            >
              <span className="mr-1">{stage.icon}</span>{stage.label}
            </button>
          ))}
        </div>
        <div className={`bg-card border border-border rounded-b-xl rounded-tr-xl p-5 ${JOURNEY_STAGES[activeStage].color}`}>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{JOURNEY_STAGES[activeStage].sub}</p>
          <p className="font-bold text-base text-foreground mb-2">{JOURNEY_STAGES[activeStage].heading}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{JOURNEY_STAGES[activeStage].body}</p>
        </div>
      </div>

      <Divider />

      {/* Communication Skills */}
      <div>
        <SectionEyebrow label="How you show up" />
        <h3 className="text-xl font-bold mb-1">Five communication skills for great CX</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">The content of what you say matters less than how you engage. These five skills determine how clients experience every conversation — regardless of topic.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
          {COMM_SKILLS.map((skill) => (
            <div key={skill.title} className="bg-card border border-border rounded-xl p-4 hover:-translate-y-0.5 transition-transform">
              <div className="text-2xl mb-2">{skill.icon}</div>
              <p className="font-semibold text-sm text-foreground mb-1">{skill.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{skill.body}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 items-start bg-muted rounded-xl p-4 border-l-4 border-accent">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Know your client's <strong className="text-foreground font-medium">preferred method of communication</strong> — and use it. Texting a client who prefers formal communication, or sending a form letter to someone who expects a phone call, sends the wrong signal regardless of the message content.
          </p>
        </div>
      </div>

      <Divider />

      {/* 12-Month Calendar */}
      <div>
        <SectionEyebrow label="The outreach structure" />
        <h3 className="text-xl font-bold mb-1">A 12-month touchpoint calendar</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">A well-structured account has a meaningful touchpoint every month — not to fill calendar space, but because there is always a legitimate reason to add value.</p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-muted px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span>Month</span><span>Type</span><span>What to cover</span>
          </div>
          {CALENDAR_MONTHS.map((row, i) => (
            <div key={row.month} className={`grid grid-cols-3 px-4 py-3 text-xs gap-2 items-start ${i % 2 === 0 ? "" : "bg-muted/30"} border-t border-border`}>
              <span className="font-semibold text-foreground">{row.month}</span>
              <span className="font-medium text-accent">{row.type}</span>
              <span className="text-muted-foreground leading-relaxed">{row.cover}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Outreach Approaches */}
      <div>
        <SectionEyebrow label="How each touchpoint works" />
        <h3 className="text-xl font-bold mb-1">Outreach approach guide</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">Knowing when to reach out is half the work. Knowing how to open each conversation is the other half.</p>
        <div className="space-y-2">
          {OUTREACH_APPROACHES.map((item) => (
            <div key={item.num} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                onClick={() => setOpenOutreach(openOutreach === item.num ? null : item.num)}
              >
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.num}</span>
                <span className="font-semibold text-sm text-foreground flex-1">{item.title}</span>
                <span className={`text-muted-foreground text-xs transition-transform ${openOutreach === item.num ? "rotate-180" : ""}`}>▼</span>
              </button>
              {openOutreach === item.num && (
                <div className="px-5 pb-4 space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-3">
                    <p className="text-xs text-blue-800 leading-relaxed italic">{item.tip}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Client Recognition */}
      <div>
        <SectionEyebrow label="Going above and beyond" />
        <h3 className="text-xl font-bold mb-1">Client recognition</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">Recognition is not a reward program — it's an expression of how well you know your clients and how much you value the relationship. The gesture should fit the person, not a template.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: "🎉", title: "Loyalty milestones", body: "5, 10, 15, 20 years with HUB. These deserve more than a form email. A handwritten note or a personal call signals that the relationship is genuinely noticed." },
            { icon: "💌", title: "Referral thanks", body: "When a client sends you someone, acknowledge it immediately and personally. A thank-you gift or note closes the loop and makes them more likely to do it again." },
            { icon: "🎁", title: "Seasonal recognition", body: "Know your clients well enough to recognize moments that matter to them. Industry events, company milestones, or personal achievements are all legitimate touchpoints." },
          ].map((card) => (
            <div key={card.title} className="bg-card border border-border rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <div className="text-2xl mb-2">{card.icon}</div>
              <p className="font-semibold text-sm text-foreground mb-1">{card.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}