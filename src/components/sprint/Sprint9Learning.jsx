import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const TRACK_DATA = {
  eb: {
    intro: "EB accounts are judged heavily on financial outcomes, employee experience, and the AM's ability to translate complex benefits data into clear client value. The sections that carry the most weight here are coverage analysis and service record.",
    items: [
      { section: "Client overview", text: "Headcount, industry, union/non-union status, and whether the plan is fully insured, level-funded, or self-funded. These shape every other section." },
      { section: "Coverage analysis", text: "Plan design competitiveness vs. benchmarks, contributions strategy, and any lines missing from the package — cyber, PL/D&O, voluntary benefits, stop-loss adequacy." },
      { section: "Service record", text: "Claims advocacy outcomes, enrollment support delivered, compliance items managed, carrier performance issues identified and resolved, and savings achieved with specific dollar amounts." },
      { section: "Growth strategy", text: "Is the full EB suite in place? Group life, voluntary, EAP utilization? Are there CL exposures not currently addressed? What does the next plan year design conversation look like?" },
      { section: "Market positioning", text: "Incumbent carrier performance, renewal history, and whether the current carrier relationship is the right long-term home. What would a competitive marketing process look like for this group?" }
    ]
  },
  cl: {
    intro: "CL accounts are evaluated on program completeness, renewal outcomes, and the AM's understanding of the client's operations and risk profile. The sections that carry the most weight are coverage analysis and carrier positioning.",
    items: [
      { section: "Client overview", text: "Business type, operations description, revenue and headcount, and what the risk profile actually looks like — not just the SIC code. What makes this account complex or interesting?" },
      { section: "Coverage analysis", text: "GL, property, auto, workers comp, umbrella, and any specialty lines. What's in place, what's missing, and are the limits appropriate for the current exposure? Contract and lease requirements reviewed?" },
      { section: "Service record", text: "Mid-term changes handled, certificates managed, claims advocated, and any operational changes that created coverage implications. What did you catch that the client didn't know to ask about?" },
      { section: "Growth strategy", text: "Cyber, EPLI, management liability, umbrella adequacy — which conversations are open? Any EB cross-sell? What business changes in the past year created new exposure that isn't yet addressed?" },
      { section: "Market positioning", text: "Current carrier appetite for this risk class, loss run trends, renewal strategy, and submission quality. Is this account well-positioned, or is there work to do before the next marketing cycle?" }
    ]
  },
  pl: {
    intro: "PL accounts are often underestimated for capstone purposes — but they demonstrate some of the most meaningful advisory skills. The sections that carry the most weight are coverage analysis and the growth strategy, particularly the proactive life-change conversations.",
    items: [
      { section: "Client overview", text: "Net worth profile, property ownership, lifestyle factors that affect exposure — vehicles, recreational assets, home-based activity. Relationship depth: do you know this client well enough to anticipate their needs?" },
      { section: "Coverage analysis", text: "Home, auto, umbrella, valuable articles, flood/earthquake. Are limits current? Has the home value been updated? Is the umbrella adequate given current assets and lifestyle? What's excluded that shouldn't be?" },
      { section: "Service record", text: "Any claims handled and how — was the client supported through the process? Renewals managed, any difficult pricing conversations, coverage changes made proactively vs. reactively." },
      { section: "Growth strategy", text: "Life changes in the past year — renovations, new vehicles, new drivers, business activity from home? Umbrella adequacy review overdue? Any CL cross-sell if the client owns a business?" },
      { section: "Market positioning", text: "Carrier performance and loyalty, renewal history, and whether the current program is competitively placed. PL markets have shifted — is this client's program still optimal?" }
    ]
  }
};

const PRESENTATION_SECTIONS = [
  {
    num: 1,
    title: "Client overview",
    sprints: "Sprints 1 & 2",
    color: "bg-primary",
    intro: "This section sets the foundation. Your leader needs to understand who this client is before they can evaluate anything else you say. Be concise and specific — not a data dump.",
    items: [
      { strong: "Segment and revenue tier:", text: "where does this account sit in your book — A, B, or C — and why?" },
      { strong: "Relationship health:", text: "Green, Yellow, or Red — and what's driving that rating right now?" },
      { strong: "Key contacts and relationship depth:", text: "who do you have relationships with, and are there gaps?" },
      { strong: "Industry and risk profile:", text: "what does this business do, and what does that mean for their exposure?" },
      { strong: "Tenure and history:", text: "how long has this client been with HUB, and what has the relationship looked like?" }
    ],
    think: "Don't just describe the client — tell your leader why this account matters and what you're paying attention to. What would change your relationship health rating in the next 90 days?"
  },
  {
    num: 2,
    title: "Coverage analysis",
    sprints: "Sprints 3, 4 & 7",
    color: "bg-accent",
    intro: "This section demonstrates that you understand what the client has — and what they don't. The Account Roundness Score from Sprint 4 is your diagnostic tool here.",
    items: [
      { strong: "Current program summary:", text: "what lines are in place, with which carriers, at what limits?" },
      { strong: "Gaps identified:", text: "what is missing relative to the client's risk profile — and how did you identify it?" },
      { strong: "Changes made or recommended:", text: "what has changed in the past year, and what do you still need to address?" },
      { strong: "Limit adequacy:", text: "are the limits in place appropriate for the client's current exposure — or have they been outgrown?" },
      { strong: "Renewal story:", text: "what happened at the last renewal, what did you do on the client's behalf, and what was the outcome?" }
    ],
    think: "For every gap you identify, connect it to something specific in the client's business. A gap without a client context is a product. A gap tied to their operations, contracts, or exposure is an advisory conversation."
  },
  {
    num: 3,
    title: "Service record",
    sprints: "Sprints 2, 5 & 6",
    color: "bg-blue-600",
    intro: "This section shows the work behind the relationship. What did you actually do for this client in the past year — not just process, but advocacy, responsiveness, and outcomes.",
    items: [
      { strong: "Major issues handled:", text: "what problems came up, how did you respond, and what was the result for the client?" },
      { strong: "Touchpoint quality:", text: "was outreach proactive or reactive? What did you initiate vs. what came to you?" },
      { strong: "Difficult conversations navigated:", text: "rate increases, service failures, competitive pressure — how were they handled?" },
      { strong: "Claims advocacy:", text: "any claims activity — what did you do on the client's behalf, and what was the outcome?" },
      { strong: "Value delivered and documented:", text: "what would you include in a business review for this client right now?" }
    ],
    think: "Frame outcomes, not activity. \"I processed 14 endorsements\" is activity. \"I identified a mid-term exposure change that would have left the client unprotected at a contract audit\" is an outcome. The difference is everything."
  },
  {
    num: 4,
    title: "Growth strategy",
    sprints: "Sprints 4 & 8",
    color: "bg-secondary",
    intro: "This section demonstrates forward-thinking. It's not about selling — it's about identifying where the client's coverage or relationship is incomplete, and having a plan to address it. Every item here should be tied to the client's actual situation.",
    items: [
      { strong: "Cross-sell opportunities identified:", text: "what lines are missing that the client's risk profile warrants?" },
      { strong: "Business changes creating new exposures:", text: "headcount growth, new locations, new contracts — what has changed and what does it mean?" },
      { strong: "Conversations initiated or planned:", text: "which gap conversations have you started, and what's the status?" },
      { strong: "Internal resources to activate:", text: "where does this account need specialty, analytics, or producer involvement?" },
      { strong: "Relationship depth opportunities:", text: "are there contacts you haven't reached, or relationships that could be stronger?" }
    ],
    think: "Growth strategy for an AM is not a sales pipeline. It's a map of where the client is underprotected and a plan to address it. Lead with their situation — the coverage conversation follows naturally."
  },
  {
    num: 5,
    title: "Carrier & market positioning",
    sprints: "Sprints 3 & 7",
    color: "bg-green-600",
    intro: "This section shows that you understand the market context around your client — not just the current program, but how it sits relative to the broader environment and what that means for the next renewal cycle.",
    items: [
      { strong: "Current carrier relationships:", text: "who is on the account, how long have they been there, and how is the relationship?" },
      { strong: "Market conditions relevant to this client:", text: "what is happening in their segment that will affect the next renewal?" },
      { strong: "Renewal strategy outlook:", text: "what will you do differently in the next cycle — and why?" },
      { strong: "Submission quality:", text: "if you went to market today with this account, what would your submission look like — and is it as strong as it could be?" },
      { strong: "Carrier appetite for this risk:", text: "is the current carrier the right long-term home for this account, or should alternatives be explored?" }
    ],
    think: "Don't just report the current carrier — have a perspective. Is this account well-positioned in the market, or are there vulnerabilities? What would you do differently if you were starting the program from scratch today?"
  }
];

function PresentationCard({ section }) {
  const [isOpen, setIsOpen] = useState(false);

  const numColors = {
    1: "bg-primary",
    2: "bg-accent",
    3: "bg-blue-600",
    4: "bg-secondary",
    5: "bg-green-600"
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`${numColors[section.num]} w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold`}>
            {section.num}
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm text-foreground">{section.title}</p>
            <p className="text-xs text-muted-foreground">{section.sprints}</p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="border-t border-border p-4 bg-muted/30 space-y-4">
          <p className="text-sm text-muted-foreground italic">{section.intro}</p>
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">{item.strong}</strong> {item.text}
                </span>
              </li>
            ))}
          </ul>
          <div className="bg-primary/10 border-l-2 border-primary rounded p-3">
            <p className="text-xs text-foreground/80">
              <strong>Strategic lens:</strong> {section.think}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Sprint9Learning() {
  const [activeTrack, setActiveTrack] = useState("eb");

  return (
    <div className="space-y-12 pb-8">
      {/* Hero */}
      <div className="bg-primary rounded-2xl p-8 md:p-12 text-primary-foreground">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/70 mb-3">AM Accelerator · Sprint 9</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Your account strategy <em className="italic text-secondary">presentation.</em>
        </h2>
        <p className="text-sm text-primary-foreground/80 mb-6 leading-relaxed max-w-2xl">
          Eight sprints. One client. This is where you bring it all together — not as a report of what you've done, but as a demonstration of how you think about a client's risk, their relationship, and their future.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Understand what makes a strong account for the capstone",
            "Know what belongs in each section of the presentation",
            "See how to connect each section back to your sprint frameworks",
            "Understand what your leader will be looking for in the review"
          ].map((outcome) => (
            <div key={outcome} className="flex gap-2 items-start bg-white/10 border border-white/20 rounded-lg p-3">
              <span className="text-secondary text-xs mt-0.5 shrink-0">✓</span>
              <span className="text-xs text-primary-foreground/70 leading-snug">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Core Idea */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">What this is</p>
        <div className="bg-foreground text-background rounded-2xl p-8 md:p-10">
          <div className="w-8 h-1 bg-secondary rounded mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            This isn't a report. <em className="italic text-secondary">It's a demonstration of how you think.</em>
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">
            Anyone can produce a summary of account activity. The capstone asks for something different: <strong>a demonstration that you understand the client's business, their risk, and your role as a trusted advisor</strong> — and that you have a clear, strategic plan for what comes next. Every section should connect back to the client's situation, not just to your task list. The question your leader is asking throughout is simple: does this AM think like an advisor?
          </p>
        </div>
      </div>

      {/* Account Selection */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Choosing your account</p>
        <h3 className="text-xl font-bold mb-2">Pick the right client</h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">The account you choose shapes everything. Pick one that gives you enough to work with — not necessarily your most complex client, but one where you can demonstrate multiple sprint competencies across segmentation, coverage, communication, and strategy.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {[
            { icon: "⭐", heading: "Your best work account", desc: "A client where you've delivered real value — a challenging renewal managed well, a coverage gap identified and addressed, a relationship repaired or deepened. This account lets you show what you're capable of." },
            { icon: "🎯", heading: "Your biggest opportunity account", desc: "A client with untapped complexity — cross-sell potential, a coverage review that's overdue, a relationship that needs more investment. This account lets you show how you think strategically, not just reactively." },
            { icon: "📊", heading: "Complexity across dimensions", desc: "The account should touch multiple sprints. Ideally it involves a coverage review (Sprint 4), a renewal story (Sprint 3), a stewardship angle (Sprint 2), and something meaningful to say about what comes next." },
            { icon: "🔍", heading: "Enough to be honest about", desc: "The capstone is stronger when it includes what you'd do differently — not just what went well. An account where you see real growth opportunity is more compelling than one where everything is already perfect." }
          ].map((card) => (
            <div key={card.heading} className="bg-card border border-border rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <p className="text-2xl mb-3">{card.icon}</p>
              <p className="font-semibold text-sm text-foreground mb-1">{card.heading}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-4">
          <p className="text-sm text-foreground/80">
            You don't need a perfect account. You need one that gives you <strong>enough complexity to demonstrate how you think</strong> — and enough honesty to show that you're growing, not just reporting.
          </p>
        </div>
      </div>

      {/* Presentation Sections */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">What to cover</p>
        <h3 className="text-xl font-bold mb-2">The five presentation sections</h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">Each section connects to one or more sprint frameworks. The goal is not to check boxes — it's to show how these elements connect to each other and to the client's actual situation. Click each section to explore what belongs and how to think about it.</p>

        <div className="space-y-2">
          {PRESENTATION_SECTIONS.map((section) => (
            <PresentationCard key={section.num} section={section} />
          ))}
        </div>
      </div>

      {/* Practice Area Focus */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">By practice area</p>
        <h3 className="text-xl font-bold mb-2">What to emphasize — EB, CL, and PL</h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">The five sections apply to every account. What you emphasize within each section depends on the type of client. Here's what tends to carry the most weight in each practice area.</p>

        <div className="flex gap-1 mb-0 border-b border-border">
          {Object.keys(TRACK_DATA).map((track) => (
            <button
              key={track}
              onClick={() => setActiveTrack(track)}
              className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
                activeTrack === track
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {track === "eb" ? "Employee benefits" : track === "cl" ? "Commercial lines" : "Personal lines"}
            </button>
          ))}
        </div>

        <div className="bg-card border border-t-0 border-border rounded-b-xl p-6">
          <p className="text-sm text-muted-foreground italic mb-4">{TRACK_DATA[activeTrack].intro}</p>
          <div className="space-y-2">
            {TRACK_DATA[activeTrack].items.map((item, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <p className="text-xs font-bold text-primary uppercase min-w-fit">{item.section}</p>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leader Review */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">The review conversation</p>
        <h3 className="text-xl font-bold mb-2">What your leader is listening for</h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">The leader review is a conversation, not an evaluation. Come prepared to discuss these three questions — not with polished answers, but with honest reflection. Your leader is looking for self-awareness as much as strategy.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: "⭐", q: "What are you most proud of with this account?", hint: "Be specific. Not \"the relationship\" — a moment, a decision, a conversation, an outcome. What did you do that you'd want every AM to do?" },
            { icon: "🔍", q: "Where do you see your biggest opportunity for growth?", hint: "This is about you as an AM, not the account. What would you do differently if you were starting the relationship today? What skill would have made the biggest difference?" },
            { icon: "📅", q: "What would you do differently in the next 90 days?", hint: "Not vague improvement — specific actions. What conversation haven't you had? What gap haven't you addressed? What relationship hasn't been built? This connects directly to your 90-day plan." }
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <p className="text-2xl mb-3">{item.icon}</p>
              <p className="font-semibold text-sm text-foreground mb-2 italic">{item.q}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.hint}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 90 Day Plan */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">The most important section</p>
        <h3 className="text-xl font-bold mb-2">Your 90-day forward action plan</h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">The capstone looks backward to demonstrate growth — but it earns its value by pointing forward. Your 90-day plan is your commitment: three specific, measurable actions, each tied to a sprint framework, each connected to something real about this account.</p>

        <div className="space-y-3 mb-5">
          {[
            { num: 1, label: "Action 1", heading: "One coverage or protection conversation", desc: "Identify the most meaningful unaddressed gap in this client's program. Name the conversation you will have, when you will have it, and what a successful outcome looks like. This is not a sales target — it's a professional commitment to make sure this client is fully protected.", sprint: "Connects to: Sprint 4 — Cross-sell & Rounding Out" },
            { num: 2, label: "Action 2", heading: "One proactive relationship or service touchpoint", desc: "Name a specific outreach you will make — a mid-year check-in, a value-add delivery, a stewardship conversation, or a business review. Define what you will cover, why it matters to this client now, and what you want the client to walk away knowing or feeling.", sprint: "Connects to: Sprints 2 & 6 — Proactive Outreach & Business Review" },
            { num: 3, label: "Action 3", heading: "One renewal or carrier strategy move", desc: "If renewal is within 120 days — name your pre-renewal action and timeline. If it's further out — name something you will do now to strengthen the account's market position, submission quality, or program structure before the next cycle begins.", sprint: "Connects to: Sprints 3 & 7 — Renewal Management & Build a Better Submission" }
          ].map((item) => (
            <div key={item.num} className="bg-card border border-border rounded-xl p-5 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">{item.num}</div>
              <div className="flex-1">
                <p className="text-xs font-bold text-primary uppercase mb-1">{item.label}</p>
                <p className="font-semibold text-sm text-foreground mb-2">{item.heading}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                <p className="text-xs bg-accent/10 text-accent px-2 py-1 rounded w-fit">{item.sprint}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-4">
          <p className="text-sm text-foreground/80">
            Each action should pass this test: <strong>could someone measure whether you did it or not?</strong> "Strengthen the relationship" fails. "Schedule a pre-renewal strategy call with the CFO by October 15th" passes. Specificity is the difference between a commitment and an intention.
          </p>
        </div>
      </div>

      {/* Closing */}
      <div className="bg-primary rounded-2xl p-10 text-center text-primary-foreground">
        <p className="text-xl font-bold mb-1 leading-snug">
          Eight sprints built the framework.
        </p>
        <p className="text-xl font-bold italic text-secondary mb-4 leading-snug">
          One client proves you own it.
        </p>
        <p className="text-sm text-primary-foreground/80">
          The capstone is not the end of the program. It's the beginning of how you work every day — with clarity, with intention, and with a plan.
        </p>
      </div>
    </div>
  );
}