import React, { useState } from "react";

const DIMENSIONS = [
  {
    title: "Revenue tier",
    sub: "Establishes the financial stakes of each relationship.",
    tiers: [
      { badge: "A", badgeClass: "bg-blue-600 text-white", label: "Tier A — High revenue", desc: "Top 20% of your book by premium or revenue contribution. These are your financial anchor. Losing one matters materially. They deserve your most consistent, proactive attention regardless of complexity or relationship health." },
      { badge: "B", badgeClass: "bg-slate-500 text-white", label: "Tier B — Mid revenue", desc: "The middle 50-60% of your book. This is where most of your time actually goes — and often where segmentation produces the most useful surprises. Some B accounts deserve A-level attention because of complexity or relationship risk." },
      { badge: "C", badgeClass: "bg-gray-200 text-gray-600", label: "Tier C — Lower revenue", desc: "The bottom 20-30%. These accounts still deserve good service — but they should not consume the same per-account time as your A tier. If they are, that is an attention allocation problem." }
    ],
    note: "Revenue tier is a starting point, not a destination. A C-tier account with significant growth potential, new ownership, or a complex risk profile may warrant more attention than its current premium suggests. Flag those when you find them."
  },
  {
    title: "Service complexity",
    sub: "Revenue tells you what an account is worth. Complexity tells you what it costs you in time and attention.",
    tiers: [
      { badge: "High", badgeClass: "bg-amber-400 text-amber-900", label: "High complexity", desc: "Multiple lines across EB and CL, active claims, frequent mid-term changes, coverage questions requiring research, compliance obligations, or high contact volume. Fine when matched by high revenue. A problem when it is not." },
      { badge: "Med", badgeClass: "bg-lime-100 text-lime-800 border border-lime-300", label: "Medium complexity", desc: "Standard renewal cycle, occasional service requests, manageable contact volume. Most of your book probably lives here." },
      { badge: "Low", badgeClass: "bg-gray-200 text-gray-600", label: "Low complexity", desc: "Simple programs, stable clients, minimal mid-term activity, low contact volume. Efficient to serve. Should not require heavy weekly attention." }
    ],
    note: "Key question for every account: is the complexity matched by the revenue it generates? If a C-tier account is consuming A-tier time, that is a mismatch worth naming."
  },
  {
    title: "Relationship health",
    sub: "The dimension that most directly predicts retention — and the one most AMs have the least visibility into until something goes wrong.",
    tiers: [
      { badge: "Green", badgeClass: "bg-green-500 text-white", label: "Green — Stable", desc: "Client is satisfied, engagement is positive, no friction. Renewal is not a concern. Your job here is maintenance and light proactive outreach, not intensive intervention." },
      { badge: "Yellow", badgeClass: "bg-amber-400 text-amber-900", label: "Yellow — Watch", desc: "Something has shifted. A service error, a key contact change, a less-responsive client, a competitor approaching. No active fire — but this relationship needs more intentional attention than it has been getting." },
      { badge: "Red", badgeClass: "bg-red-700 text-white", label: "Red — At risk", desc: "Active friction. A known service failure, a competitive situation, a CFO asking hard questions, a champion who has since left. These accounts need a recovery plan, not just a renewal process." }
    ],
    note: "Most AMs have more Yellow accounts than they realize — and they are almost always at risk of becoming Red before the next renewal."
  }
];

const MATRIX_CARDS = [
  {
    timing: "Act this week", title: "Immediate attention",
    topBar: "bg-red-600", timeColor: "text-red-600", dotColor: "bg-red-600",
    items: ["Any Red relationship, regardless of revenue tier", "Any A-tier account that is Yellow", "Renewal within 60 days + Yellow or Red status"]
  },
  {
    timing: "Weekly visibility", title: "Active management",
    topBar: "bg-blue-600", timeColor: "text-blue-600", dotColor: "bg-blue-600",
    items: ["A-tier Green accounts", "B-tier Yellow accounts", "High-complexity accounts in any tier"]
  },
  {
    timing: "Monthly touch", title: "Scheduled outreach",
    topBar: "bg-amber-400", timeColor: "text-amber-600", dotColor: "bg-amber-400",
    items: ["B-tier Green accounts with medium or low complexity", "C-tier accounts with any relationship concern"]
  },
  {
    timing: "Renewal cadence only", title: "Efficient service",
    topBar: "bg-green-500", timeColor: "text-green-700", dotColor: "bg-green-500",
    items: ["C-tier Green accounts with low complexity", "Excellent service on request — not proactive attention"]
  }
];

const RHYTHM_STEPS = [
  { day: "Monday", action: "Open with your Immediate Attention accounts", detail: "Scan every Red and Yellow in your top priority tier. What needs a call this week?" },
  { day: "Tue – Thu", action: "Log status changes as they happen", detail: "Any Yellow moving to Red? Any complexity shift? Note it in real time — not at renewal." },
  { day: "Friday", action: "Confirm next week's outreach list", detail: "Run your 60-day renewal check. Are any of those accounts Yellow or Red right now?" }
];

const SectionEyebrow = ({ label }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{label}</p>
);

const Divider = () => <div className="h-px bg-border" />;

export default function Sprint1Learning() {
  const [activeDim, setActiveDim] = useState(0);
  const dim = DIMENSIONS[activeDim];

  return (
    <div className="space-y-8 pb-4">

      {/* Hero / Outcomes */}
      <div className="rounded-2xl bg-primary p-6 relative overflow-hidden">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40 mb-3">AM Accelerator · Sprint 1 of 8</p>
        <h2 className="text-2xl font-bold text-primary-foreground leading-tight mb-2">
          Know your <span className="text-secondary">book</span>
        </h2>
        <p className="text-sm text-primary-foreground/60 mb-5 max-w-lg leading-relaxed">
          Most AMs manage their book like a queue. This sprint teaches you to manage it like a strategy — so you walk into every Monday with a clear picture of where your attention belongs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "A fully segmented account map across your entire book",
            "Clarity on where your time is going vs. where it should go",
            "3+ accounts flagged for immediate proactive outreach",
            "A 15-minute weekly book review you can actually sustain"
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
        <SectionEyebrow label="The core reframe" />
        <div className="rounded-2xl bg-primary p-6 md:p-8 relative overflow-hidden">
          <div className="w-10 h-0.5 bg-secondary rounded mb-4" />
          <p className="text-xl md:text-2xl font-bold text-primary-foreground leading-tight mb-3">
            Busy is not the same as effective.
          </p>
          <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xl">
            The AM who is always responding is not the same as the AM who always knows where their attention belongs.{" "}
            <strong className="text-primary-foreground/85 font-semibold">Reactive service feels productive. Intentional service is productive.</strong>{" "}
            The difference comes down to one question: do you know where your time produces the most value — and are you actually spending it there?
          </p>
        </div>
      </div>

      <Divider />

      {/* AM vs SAE */}
      <div>
        <SectionEyebrow label="Before the framework" />
        <h3 className="text-xl font-bold mb-1">The AM lens vs. the SAE lens</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">
          Your segmentation question is fundamentally different from an SAE's. Knowing that difference changes everything about how you read your book.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">SAE</p>
            <p className="italic text-base text-foreground mb-2 leading-snug">"Where is the revenue opportunity?"</p>
            <p className="text-sm text-muted-foreground leading-relaxed">Commercial growth lens. Focused on expansion, new lines, and producer collaboration. Revenue is the primary signal.</p>
          </div>
          <div className="rounded-xl bg-green-50 border border-green-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-2">AM</p>
            <p className="italic text-base text-foreground mb-2 leading-snug">"Where is the relationship at risk — and am I spending my time there?"</p>
            <p className="text-sm text-muted-foreground leading-relaxed">Service and retention lens. Focused on proactive care, complexity management, and relationship health.</p>
          </div>
        </div>
        <div className="flex gap-3 items-start bg-primary rounded-xl p-4 border-l-4 border-secondary">
          <span className="text-secondary shrink-0 text-base mt-0.5">⚠</span>
          <p className="text-sm text-primary-foreground/65 leading-relaxed">
            A <strong className="text-primary-foreground/85 font-medium">$50K account</strong> with a new risk manager, three recent service errors, and a renewal in 60 days may demand more of your attention right now than your{" "}
            <strong className="text-primary-foreground/85 font-medium">$200K anchor account</strong> that has been smooth for four years. Revenue matters — but relationship health and service complexity often determine where your time actually needs to go.
          </p>
        </div>
      </div>

      <Divider />

      {/* Three Dimensions — Tabbed */}
      <div>
        <SectionEyebrow label="The AM book segmentation framework" />
        <h3 className="text-xl font-bold mb-1">Three dimensions. Every account.</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">Every account in your book scores on all three dimensions. The combination tells you where to focus. Explore each dimension below.</p>

        <div className="flex gap-1 flex-wrap">
          {DIMENSIONS.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDim(i)}
              className={`px-4 py-2 text-xs rounded-t-lg border transition-all ${
                activeDim === i
                  ? "bg-card border-border border-b-card text-accent font-semibold relative z-10 -mb-px"
                  : "bg-muted border-transparent text-muted-foreground hover:text-foreground font-medium"
              }`}
            >
              <span className="block text-[10px] opacity-60 font-normal mb-0.5">Dimension {i + 1}</span>
              {d.title}
            </button>
          ))}
        </div>
        <div className="bg-card border border-border rounded-b-xl rounded-tr-xl p-5 relative z-0">
          <h4 className="font-bold text-base mb-1">{dim.title}</h4>
          <p className="text-xs text-muted-foreground italic mb-4">{dim.sub}</p>
          <div className="space-y-2 mb-4">
            {dim.tiers.map((tier) => (
              <div key={tier.label} className="flex gap-3 items-start p-3 bg-muted/40 border border-border rounded-lg hover:translate-x-0.5 transition-transform">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${tier.badgeClass}`}>{tier.badge}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">{tier.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tier.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-3">
            <p className="text-xs text-blue-800 leading-relaxed">{dim.note}</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* Priority Matrix */}
      <div>
        <SectionEyebrow label="Putting it together" />
        <h3 className="text-xl font-bold mb-1">The priority matrix</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">Plot each account across all three dimensions. The matrix tells you how frequently to engage — and how urgently to act.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MATRIX_CARDS.map((card) => (
            <div key={card.title} className="bg-card border border-border rounded-xl p-5 relative overflow-hidden hover:-translate-y-0.5 transition-transform">
              <div className={`absolute top-0 left-0 right-0 h-[3px] ${card.topBar}`} />
              <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${card.timeColor}`}>{card.timing}</p>
              <p className="font-semibold text-sm text-foreground mb-3">{card.title}</p>
              <ul className="space-y-1.5">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-xs text-muted-foreground leading-relaxed">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${card.dotColor}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Weekly Rhythm */}
      <div>
        <SectionEyebrow label="The operating habit" />
        <h3 className="text-xl font-bold mb-1">Your 15-minute monthly book review</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">This sprint works because you build visibility before something forces your hand. A short monthly habit replaces last-minute renewal scrambles.</p>
        <div className="flex flex-col md:flex-row bg-card border border-border rounded-xl overflow-hidden">
          {RHYTHM_STEPS.map((step, i) => (
            <div
              key={step.day}
              className={`flex-1 p-5 hover:bg-muted/30 transition-colors ${
                i < RHYTHM_STEPS.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : ""
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">{step.day}</p>
              <p className="text-sm font-semibold text-foreground mb-1 leading-snug">{step.action}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground italic mt-3 bg-muted rounded-lg p-3">
          The goal is visibility all year — not just at renewal time. 15 minutes a month prevents a last-minute scramble.
        </p>
      </div>

    </div>
  );
}