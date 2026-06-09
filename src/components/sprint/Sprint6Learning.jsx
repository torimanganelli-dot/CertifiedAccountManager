import React, { useState } from "react";

const SectionEyebrow = ({ label }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{label}</p>
);

const Divider = () => <div className="h-px bg-border" />;

const REVIEW_PARTS = [
  {
    num: "1", title: "What we've done", color: "bg-blue-50 border-blue-200", accentColor: "text-blue-600",
    body: "The work completed in the past year — savings achieved, claims advocated, issues resolved, vendors held accountable, compliance managed. Specific, documented, with outcomes where possible."
  },
  {
    num: "2", title: "What we're working on", color: "bg-amber-50 border-amber-200", accentColor: "text-amber-600",
    body: "Initiatives currently in progress — benchmarking analysis, pending negotiations, open projects. Shows continuous momentum and signals that the relationship doesn't go quiet between renewals."
  },
  {
    num: "3", title: "What's coming", color: "bg-green-50 border-green-200", accentColor: "text-green-700",
    body: "Upcoming priorities — renewal preparation, open enrollment, market conditions to watch, regulatory changes on the horizon. This section sets the agenda for the next cycle before it starts."
  },
  {
    num: "4", title: "Your feedback", color: "bg-purple-50 border-purple-200", accentColor: "text-purple-600",
    body: "A direct ask: what went well, what would you change? The plus/delta conversation closes the loop, surfaces concerns before they become defections, and signals that the client's experience actually matters to you."
  },
];

const VALUE_COMPARISON = [
  {
    label: "Instead of this",
    type: "bad",
    example: `"We marketed your renewal to three carriers and managed the submission process."`,
    explanation: "This describes your activity. The client assumes you do this anyway — it's table stakes. It creates no impression of value."
  },
  {
    label: "Say this",
    type: "good",
    example: `"We challenged your carrier's renewal proposal, demonstrated favorable claims experience, and secured a 53% reduction to the proposed rate — saving $83,000 this year."`,
    explanation: "This describes the outcome the client experienced. It's specific, quantified, and connects directly to something they care about. That's what stays with them — and what a competitor would have to disprove."
  },
];

const WITH_WITHOUT = [
  {
    version: "Without a business review",
    quote: `"I'm not sure what HUB actually does for us."`,
    items: [
      "Client judges the relationship by the last problem",
      "Renewal feels like the only touchpoint that matters",
      "Value is invisible — even when it's real",
      "Competitor walks in with a lower quote and wins easily",
    ]
  },
  {
    version: "With a business review",
    quote: `"I don't know what we'd do without this team."`,
    items: [
      "Client sees a year of work in one structured conversation",
      "Savings, advocacy, and outcomes are documented",
      "HUB's depth becomes visible — specialists, tools, resources",
      "Competitor faces a relationship with a clear track record",
    ]
  },
];

export default function Sprint6Learning() {
  const [activePart, setActivePart] = useState(0);

  return (
    <div className="space-y-8 pb-4">

      {/* Hero */}
      <div className="rounded-2xl bg-primary p-6 relative overflow-hidden">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40 mb-3">AM Accelerator · Sprint 6 of 8</p>
        <h2 className="text-2xl font-bold text-primary-foreground leading-tight mb-2">
          The business review. <span className="text-secondary italic">Show your work.</span>
        </h2>
        <p className="text-sm text-primary-foreground/60 mb-5 max-w-lg leading-relaxed">
          Renewal is not the only moment clients evaluate you. The business review is how you prove the value of the relationship all year — and how you make sure clients never have to wonder what you've actually done for them.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Understand why a structured business review changes the client relationship",
            "Know the six components of a strong stewardship review across EB, CL, and PL",
            "See how past work becomes future opportunity when framed well",
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
        <SectionEyebrow label="The core idea" />
        <div className="rounded-2xl bg-primary p-6 md:p-8 relative overflow-hidden">
          <div className="w-10 h-0.5 bg-secondary rounded mb-4" />
          <p className="text-xl md:text-2xl font-bold text-primary-foreground leading-tight mb-3">
            If you don't show your work,
          </p>
          <p className="text-xl md:text-2xl font-bold text-secondary italic mb-4">
            clients assume you haven't done any.
          </p>
          <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xl">
            Most AMs do more for their clients than clients realize. Claims advocated. Renewals challenged. Vendors held accountable. Compliance issues flagged before they became problems.{" "}
            <strong className="text-primary-foreground/85 font-semibold">None of it lands unless it's communicated.</strong>{" "}
            The business review is the structured moment where everything you've done becomes visible — and where the client understands exactly what they'd be giving up if they left.
          </p>
        </div>
      </div>

      <Divider />

      {/* With/Without Review */}
      <div>
        <SectionEyebrow label="Two versions of the same relationship" />
        <h3 className="text-xl font-bold mb-1">Without a review vs. with one</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">The difference isn't the work you do — it's whether the client ever sees it. A structured business review changes what clients remember about you.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {WITH_WITHOUT.map((section) => (
            <div key={section.version} className={`rounded-xl border p-5 ${section.version.includes("Without") ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
              <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${section.version.includes("Without") ? "text-red-600" : "text-green-700"}`}>
                {section.version}
              </p>
              <p className={`italic text-base text-foreground mb-3 leading-snug ${section.version.includes("Without") ? "text-red-700/80" : "text-green-700/80"}`}>
                {section.quote}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-xs text-muted-foreground">
                    <span className={`shrink-0 mt-1 ${section.version.includes("Without") ? "text-red-400" : "text-green-500"}`}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex gap-3 items-start bg-primary rounded-xl p-4 border-l-4 border-secondary">
          <span className="text-secondary shrink-0 text-base mt-0.5">💡</span>
          <p className="text-sm text-primary-foreground/65 leading-relaxed">
            A business review does something a smooth renewal never can:{" "}
            <strong className="text-primary-foreground/85 font-medium">it makes retention a deliberate outcome, not an assumption.</strong>{" "}
            Clients who understand what they have don't shop casually — because they know exactly what they'd be walking away from.
          </p>
        </div>
      </div>

      <Divider />

      {/* Four Part Structure */}
      <div>
        <SectionEyebrow label="How to structure the conversation" />
        <h3 className="text-xl font-bold mb-1">A four-part review structure that works</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">The business review has a natural flow. Each part serves a different purpose — and the order matters.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
          {REVIEW_PARTS.map((part, i) => (
            <button
              key={i}
              onClick={() => setActivePart(i)}
              className={`p-3 rounded-lg border text-left transition-all ${
                activePart === i
                  ? `${part.color} border-current`
                  : "bg-muted border-border text-muted-foreground hover:bg-muted/70"
              }`}
            >
              <span className={`block text-sm font-bold mb-1 ${activePart === i ? part.accentColor : "text-accent"}`}>
                Part {part.num}
              </span>
              <span className="text-xs font-semibold leading-snug">{part.title}</span>
            </button>
          ))}
        </div>
        <div className={`border rounded-xl p-5 ${REVIEW_PARTS[activePart].color}`}>
          <p className={`text-base font-semibold text-foreground mb-2 ${REVIEW_PARTS[activePart].accentColor}`}>
            Part {REVIEW_PARTS[activePart].num} — {REVIEW_PARTS[activePart].title}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">{REVIEW_PARTS[activePart].body}</p>
        </div>
      </div>

      <Divider />

      {/* Value Storytelling */}
      <div>
        <SectionEyebrow label="Telling the value story" />
        <h3 className="text-xl font-bold mb-1">Outcomes, not activity</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">A business review fails when it lists what HUB did instead of what the client gained. The difference is framing — and it matters more than you think.</p>
        <div className="space-y-3 mb-4">
          {VALUE_COMPARISON.map((item) => (
            <div key={item.label} className={`border rounded-xl p-4 ${item.type === "bad" ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
              <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${item.type === "bad" ? "text-red-600" : "text-green-700"}`}>
                {item.label}
              </p>
              <p className="text-sm font-semibold text-foreground mb-2 italic">{item.example}</p>
              <p className={`text-xs leading-relaxed ${item.type === "bad" ? "text-red-700/70" : "text-green-700/70"}`}>
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 items-start bg-accent/10 rounded-xl p-4 border border-accent/20">
          <span className="text-accent shrink-0 text-base mt-0.5">📊</span>
          <p className="text-sm text-foreground leading-relaxed">
            Where exact numbers aren't available, use directional language: <strong className="text-foreground">"reduced by approximately X%," "resolved within two weeks," "prevented a gap that would have left you exposed."</strong> Precision is ideal. Direction is still far better than silence.
          </p>
        </div>
      </div>

      {/* Closing */}
      <div className="rounded-2xl bg-primary p-6 text-center">
        <p className="text-lg font-bold text-primary-foreground/90 mb-1">Don't let great work go unseen.</p>
        <p className="text-sm text-primary-foreground/60">The review is how value becomes visible — and visible value is what stays.</p>
      </div>

    </div>
  );
}