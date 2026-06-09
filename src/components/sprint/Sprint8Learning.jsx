import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const OUTCOMES = [
  "Understand why internal collaboration is a client protection strategy",
  "Know how to align with producers in a way that serves the client",
  "Learn when and how to activate HUB's internal resources",
  "Recognize the signals that mean a client needs more than you can give alone"
];

const COMPARISONS = [
  {
    type: "task",
    label: "Task-focused AM",
    heading: '"I manage what\'s assigned to me."',
    items: [
      "Waits for work to come in",
      "Completes renewals without producer input",
      "Rarely engages with other parts of the team",
      "Doesn't always know what HUB resources exist",
      "Client gets good service — but not the full picture"
    ]
  },
  {
    type: "asset",
    label: "Team-asset AM",
    heading: '"My clients have access to everything HUB can offer."',
    items: [
      "Proactively shares what they know with the producer",
      "Flags risk changes, client signals, and open gaps",
      "Brings in the right specialists when the situation calls for it",
      "Keeps the full team informed so nothing falls through",
      "Client gets the depth of a whole team, not just one person"
    ]
  }
];

const ALIGN_STEPS = [
  {
    num: "01",
    heading: "Know their priorities",
    desc: "Before your next team meeting, ask your producer which accounts they're most focused on. Understanding what they're working on helps you direct your service energy where it creates the most impact for the client."
  },
  {
    num: "02",
    heading: "Bring intelligence, not just status",
    desc: "Don't just report what happened. Tell your producer what you noticed: how the client is feeling, what's changed in their operations, where friction exists. That context shapes strategy in ways a renewal summary never can."
  },
  {
    num: "03",
    heading: "Agree on roles before client meetings",
    desc: "Five minutes of pre-call alignment prevents confusion in front of the client. Who's leading? Who's covering what? What's the goal? A client who sees a coordinated team trusts that team more."
  }
];

const MANAGE_ITEMS = {
  up: [
    "Give proactive updates — don't wait to be asked",
    "Flag issues early, with a proposed path forward — not just the problem",
    "Seek input on accounts that feel at-risk before the situation escalates",
    "Share credit for wins that were a team effort",
    "Ask what support they need from you — then deliver on it"
  ],
  across: [
    "Provide clear, complete information — reduce back-and-forth",
    "Respect deadlines and the workloads of people depending on your input",
    "Acknowledge their contributions to the client outcome",
    "Loop in the right person before something becomes urgent",
    "Build relationships, not just transactions — it makes everything faster"
  ]
};

const RESOURCES = [
  {
    name: "HUB Specialty Practices",
    when: "A client has a complex or niche exposure that goes beyond standard lines — construction, healthcare, education, management liability, cyber. You don't need to know the specialty; you need to know when to call.",
    how: "Reach out to your regional specialty contact or flag it to your producer to initiate the connection."
  },
  {
    name: "Risk Services",
    when: "A client is struggling with loss history, claims frequency, or safety concerns. Risk services can help address the underlying problem — which protects the client and improves their renewability.",
    how: "Engage early in the renewal cycle — not after the carrier has already reacted. Early intervention changes what's possible."
  },
  {
    name: "Analytics & Benchmarking",
    when: "A client wants peer comparisons, loss ratio context, or data to evaluate whether their program is competitive. This turns a gut-feel conversation into an evidence-based one.",
    how: "Request a benchmark report from your analytics team with the client's industry and size profile."
  },
  {
    name: "Marketing / Placement",
    when: "A risk needs broader market outreach, creative carrier solutions, or mid-term changes that require market involvement. Marketing gets the best terms when they have the best information.",
    how: "Submit a clean, complete package with all required documentation ahead of deadline — Sprint 7 applies here."
  }
];

const SIGNALS = [
  {
    icon: "🔍",
    bg: "bg-blue-50",
    name: "Coverage gap signal",
    desc: "A client adds a new location, hires significantly, signs a new contract, or changes operations. These are exposure changes — and the existing program may no longer fit. Flagging this is a service act, not a sales act.",
    trigger: "Trigger: mid-term change request, renewal review, or casual conversation"
  },
  {
    icon: "📊",
    bg: "bg-amber-50",
    name: "Business change signal",
    desc: "M&A activity, headcount growth, executive changes, new ownership — all of these change risk profiles in ways the existing program was not built for. The client may not realize they need to tell you. Your job is to ask.",
    trigger: "Trigger: renewal call, news, or client conversation"
  },
  {
    icon: "⚠️",
    bg: "bg-red-50",
    name: "Dissatisfaction signal",
    desc: "A client questions pricing, response time, or carrier performance. They may not say it directly — but the tone of service calls, the questions they ask, and the silence after a renewal all carry information. This belongs with the producer before it becomes a retention problem.",
    trigger: "Trigger: service call, renewal negotiation, or change in client responsiveness"
  },
  {
    icon: "🔗",
    bg: "bg-green-50",
    name: "Cross-line protection gap",
    desc: "A client carries EB but has no CL program in place — or CL without benefits. This is not a sales observation. It's a client who may have meaningful uninsured exposure and doesn't know it. Sharing this with your producer is part of fully protecting them.",
    trigger: "Trigger: account review, onboarding, or annual business review"
  }
];

const FAILURES = [
  {
    name: "Siloed renewal work",
    problem: "The AM completes the renewal without ever looping in the producer on strategy. The renewal gets done — but the client misses out on a more informed approach.",
    fix: "Schedule a 15-minute strategy sync before every significant renewal. Align on goals and client context, not just tasks and deadlines."
  },
  {
    name: "Late escalations",
    problem: "An issue sits unresolved for weeks before the producer finds out. By then, the options are narrower and the client's confidence has already been affected.",
    fix: "Flag early, with a brief summary and a proposed next step. A heads-up with a plan is far easier to act on than a problem that's been sitting."
  },
  {
    name: "Not using internal resources",
    problem: "The AM handles a complex risk alone rather than bringing in specialty or analytics. The client gets a narrower response than HUB is capable of providing.",
    fix: "Know your referral triggers. When the situation goes beyond your lane, bring in the right resource fast. That's not a limitation — it's professional judgment."
  },
  {
    name: "Ownership ambiguity",
    problem: "It's unclear who owns what on the account. The AM assumes one thing, the producer assumes another. The client experiences inconsistency — or things simply don't get done.",
    fix: "Create a simple account ownership map for your key accounts. Who calls the client, who handles service requests, who manages the renewal strategy."
  }
];

function FailureCard({ failure }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive flex-shrink-0" />
          <span className="font-medium text-sm text-foreground">{failure.name}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border bg-card p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold uppercase text-destructive mb-2">The problem</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{failure.problem}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-green-700 mb-2">The fix</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{failure.fix}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Sprint8Learning() {
  return (
    <div className="space-y-12 pb-8">
      {/* Hero */}
      <div className="rounded-2xl bg-primary p-8 md:p-12 relative overflow-hidden">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/50 mb-3">AM Accelerator · Sprint 8 of 8</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4 leading-tight">
            Support the producer. <em className="text-secondary italic">Protect the client.</em>
          </h2>
          <p className="text-sm text-primary-foreground/70 mb-6 leading-relaxed max-w-2xl">
            This sprint is not about selling. It's about operating as a complete professional — one who connects the right people, surfaces the right information, and makes sure nothing falls through the cracks. That's what protecting a client actually looks like from the inside.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {OUTCOMES.map((outcome) => (
              <div key={outcome} className="flex gap-2 items-start bg-white/5 border border-white/10 rounded-lg p-3">
                <span className="text-secondary text-xs mt-0.5 shrink-0">✓</span>
                <span className="text-xs text-primary-foreground/70 leading-snug">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reframe */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">The core idea</p>
        <div className="bg-foreground text-background rounded-2xl p-8 md:p-10">
          <div className="w-8 h-1 bg-secondary rounded mb-6" />
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-tight">
            This is not about sales. <em className="italic text-secondary">It's about making sure your clients are truly protected.</em>
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">
            The best AMs are not salespeople. They are the person in the room who knows the client best — and who has the professional responsibility to make sure that knowledge gets to the right places. <strong className="text-background font-medium">When you share what you know with the producer, activate HUB's specialists, or flag a risk before it becomes a problem, you are doing your job at the highest level.</strong> Not selling. Serving.
          </p>
        </div>
      </div>

      {/* Task vs Asset */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Two ways to show up</p>
        <h3 className="text-2xl font-serif font-bold mb-2">Task-focused vs. team-asset</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">Both AMs care about their clients. The difference is whether their work stays within their own lane — or reaches across the team to create better outcomes for the people they serve.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {COMPARISONS.map((comp) => (
            <div key={comp.type} className={`rounded-xl border p-5 ${comp.type === "task" ? "bg-muted border-border" : "bg-blue-50 border-blue-200"}`}>
              <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${comp.type === "task" ? "text-muted-foreground" : "text-primary"}`}>
                {comp.label}
              </p>
              <p className="text-sm font-serif italic text-foreground mb-3">{comp.heading}</p>
              <ul className="space-y-1.5">
                {comp.items.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-xs text-muted-foreground leading-snug">
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 mt-1.5 ${comp.type === "task" ? "bg-muted-foreground" : "bg-primary"}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-secondary/10 border-l-2 border-secondary rounded-lg p-4">
          <p className="text-xs text-foreground/80 leading-relaxed">
            Your value as an AM multiplies when you activate the network around you. <strong>A client who only benefits from what one person knows is underserved</strong> — even if that person is excellent. The team-asset AM makes sure their clients have access to everything HUB can offer.
          </p>
        </div>
      </div>

      {/* Ecosystem */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Your working environment</p>
        <h3 className="text-2xl font-serif font-bold mb-2">You work within an ecosystem</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">You are not a solo operator. You sit at the center of a team — and every person on that team has something your clients can benefit from. Knowing who does what, and when to involve them, is a core service skill.</p>
        
        <div className="bg-white border border-border rounded-2xl p-8">
          <div className="bg-primary text-primary-foreground rounded-lg p-4 text-center mb-6 max-w-xs mx-auto">
            <p className="text-sm font-bold">You</p>
            <p className="text-xs text-primary-foreground/70 mt-1">Account Manager</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div className="bg-foreground text-background rounded-lg p-4">
              <p className="text-xs font-bold text-background mb-1">SAE / Producer</p>
              <p className="text-xs text-background/75 leading-relaxed">Owns account strategy, growth, and the client relationship at the senior level. Needs your intel to make good decisions.</p>
            </div>
            <div className="bg-foreground text-background rounded-lg p-4">
              <p className="text-xs font-bold text-background mb-1">Account Coordinator</p>
              <p className="text-xs text-background/75 leading-relaxed">Handles admin, documentation, and certificates. Your partner in making the day-to-day run cleanly for the client.</p>
            </div>
            <div className="bg-foreground text-background rounded-lg p-4">
              <p className="text-xs font-bold text-background mb-1">HUB Specialty & Analytics</p>
              <p className="text-xs text-background/75 leading-relaxed">Risk data, benchmarking, niche coverages. When a client's situation is complex, this team has tools you don't have alone.</p>
            </div>
            <div className="bg-foreground text-background rounded-lg p-4">
              <p className="text-xs font-bold text-background mb-1">Marketing / Placement</p>
              <p className="text-xs text-background/75 leading-relaxed">Carrier relationships, RFPs, and submissions. Your conduit to the market — and the people who need clean information to get the best terms.</p>
            </div>
          </div>
          
          <p className="text-center text-xs text-muted-foreground italic">An AM who only works with one person on this team is leaving client protection on the table.</p>
        </div>
      </div>

      {/* Align */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">The AM–producer relationship</p>
        <h3 className="text-2xl font-serif font-bold mb-2">Three ways to align that serve your clients</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">Working closely with your producer isn't about sales strategy. It's about making sure the people responsible for the client's program have the full picture — especially the parts that only you can see from where you sit.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ALIGN_STEPS.map((step) => (
            <div key={step.num} className="bg-white border border-border rounded-lg p-5 hover:-translate-y-0.5 transition-transform">
              <p className="text-2xl font-serif font-bold text-secondary mb-2">{step.num}</p>
              <p className="font-medium text-sm text-foreground mb-2">{step.heading}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Manage Up/Across */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">How you show up internally</p>
        <h3 className="text-2xl font-serif font-bold mb-2">Managing up and across</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">Good AMs make the people around them better — and that's directly connected to better outcomes for clients. How you communicate internally shapes what's possible externally.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-foreground text-primary-foreground p-4">
              <p className="text-sm font-bold">Managing up</p>
              <p className="text-xs text-primary-foreground/70 mt-1">With your SAE / producer</p>
            </div>
            <div className="p-4 space-y-3">
              {MANAGE_ITEMS.up.map((item) => (
                <div key={item} className="flex gap-2 items-start text-xs text-muted-foreground">
                  <span className="text-primary mt-0.5 shrink-0">→</span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <p className="text-sm font-bold text-foreground">Managing across</p>
              <p className="text-xs text-muted-foreground mt-1">With coordinators, marketing, specialty</p>
            </div>
            <div className="p-4 space-y-3">
              {MANAGE_ITEMS.across.map((item) => (
                <div key={item} className="flex gap-2 items-start text-xs text-muted-foreground">
                  <span className="text-primary mt-0.5 shrink-0">→</span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">HUB's infrastructure</p>
        <h3 className="text-2xl font-serif font-bold mb-2">Your competitive advantage — know when to use it</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">HUB has resources most brokers don't. Knowing when to activate them — and how — is part of giving your clients the full benefit of what HUB can do. This is not about selling more. It's about making sure clients aren't underserved by a gap in the team's response.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RESOURCES.map((resource) => (
            <div key={resource.name} className="bg-white border-l-4 border-primary border border-border rounded-lg p-5 hover:-translate-y-0.5 transition-transform">
              <p className="font-medium text-sm text-foreground mb-3">{resource.name}</p>
              <div className="mb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">When to engage</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{resource.when}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">How to engage</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{resource.how}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signals */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">What only you can see</p>
        <h3 className="text-2xl font-serif font-bold mb-2">Client signals worth sharing</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">You are closer to the client's day-to-day reality than anyone else on the team. That proximity gives you access to signals that matter — not because of sales, but because they represent a client who may be underprotected or at risk. When you flag these to your producer, you are doing right by the client.</p>
        
        <div className="space-y-3">
          {SIGNALS.map((signal) => (
            <div key={signal.name} className="bg-white border border-border rounded-lg p-5 flex gap-4">
              <div className={`${signal.bg} rounded-lg w-10 h-10 flex items-center justify-center flex-shrink-0 text-lg`}>
                {signal.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground mb-1">{signal.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{signal.desc}</p>
                <p className="text-xs font-medium text-primary bg-blue-50 rounded px-2 py-1 inline-block">{signal.trigger}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Failures */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Where things go wrong</p>
        <h3 className="text-2xl font-serif font-bold mb-2">Common collaboration failures — and the fix</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">Most service breakdowns come from inside the team, not from the client. These patterns are predictable — which means they're preventable.</p>
        
        <div className="space-y-3">
          {FAILURES.map((failure) => (
            <FailureCard key={failure.name} failure={failure} />
          ))}
        </div>
      </div>

      {/* Mantra */}
      <div className="bg-foreground text-primary-foreground rounded-2xl p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3 leading-tight">
          The best service you can give a client<br />is the full weight of your team behind them.
        </h3>
        <p className="text-lg font-serif italic text-foreground/70 mb-6">That only happens when you operate beyond your own lane.</p>
        <div className="w-12 h-1 bg-secondary rounded mx-auto" />
      </div>
    </div>
  );
}