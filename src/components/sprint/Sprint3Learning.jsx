import React, { useState } from "react";

const SectionEyebrow = ({ label }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{label}</p>
);

const Divider = () => <div className="h-px bg-border" />;

const PHASES = [
  {
    num: "120", unit: "Days", label: "Phase 1 — 120 days out", title: "Set the stage",
    color: "bg-blue-50 border-blue-200", accentColor: "text-blue-600",
    items: [
      "Schedule the pre-renewal call — don't wait for the client to ask",
      "Update the client file with any changes from the past year",
      "Confirm communication preferences and key contacts are current",
      "Review loss runs and flag anything that needs to be addressed before submission",
    ],
    callout: { bold: "What the client feels: Fair treatment.", rest: " Showing up 120 days out signals that you're investing in their renewal — not waiting for a deadline to force your hand." }
  },
  {
    num: "90", unit: "Days", label: "Phase 2 — 90 days out", title: "Gather and diagnose",
    color: "bg-amber-50 border-amber-200", accentColor: "text-amber-600",
    items: [
      "Collect updated exposure data — headcount, locations, equipment, contracts",
      "Review loss runs and discuss any open claims or risk changes",
      "Conduct the structured pre-renewal stewardship conversation",
      "Build the strongest possible submission — complete, accurate, well-framed",
      "Surface any coverage gaps before going to market",
    ],
    callout: { bold: "The goal of this call is not to quote.", rest: " It's to align on the client's situation so that when markets respond, you're already on the same page — and there are no surprises in either direction." }
  },
  {
    num: "60–75", unit: "Days", label: "Phase 3 — 60 to 75 days out", title: "Go to market",
    color: "bg-green-50 border-green-200", accentColor: "text-green-700",
    items: [
      "Submit to carriers with a complete, well-organized submission",
      "Manage client expectations proactively — especially in a hard market",
      "Never go silent — update the client even without a final answer",
      "If difficult news is coming, give early warning now — not at 30 days",
    ],
    callout: { bold: `What the client feels: Certainty.`, rest: ` "I'm working on it and here's where we are" beats silence every time. Clients who don't hear from you assume the worst — or start shopping.` }
  },
  {
    num: "30", unit: "Days", label: "Phase 4 — 30 days out", title: "Deliver the renewal",
    color: "bg-purple-50 border-purple-200", accentColor: "text-purple-600",
    items: [
      "Present — don't just email a quote. A presentation demonstrates value; an email delivers a number.",
      "Frame clearly: what stayed the same, what changed, and why",
      "If there's a rate increase, lead with market context — not an apology",
      "Walk the client through options so they're making an informed decision, not just accepting an outcome",
      "Deliver tough news fast and personally — never let them find out by opening an attachment",
    ],
    callout: { bold: "What the client feels: Control.", rest: " The client who understands their options and the reasoning behind your recommendation feels in control. The one who just receives a quote does not." }
  },
  {
    num: "Post", unit: "Bind", label: "Phase 5 — post-renewal", title: "Close and steward",
    color: "bg-red-50 border-red-200", accentColor: "text-red-600",
    items: [
      "Confirm all documents are issued and the client has received confirmation",
      "Ask for feedback — what went well, what would they change (positive and delta)",
      "Begin the stewardship plan for the next cycle immediately — not at 120 days",
      "Schedule touchpoints for the coming year before you close the file",
      "Thank them for the partnership and acknowledge the relationship explicitly",
    ],
    callout: { bold: "What the client feels: Status and belonging.", rest: " The AM who closes with gratitude, asks for feedback, and schedules the next year signals that this is an ongoing relationship — not a transaction that just completed." }
  },
];

const CX_FEELINGS = [
  { feeling: "Fair treatment", phase: "Set the stage", body: "You showed up before they expected you. Starting 120 days out communicates investment, not obligation. The client who hears from you first feels like a priority — not a line item." },
  { feeling: "Certainty", phase: "Go to market", body: "Regular updates — even without a final answer — eliminate the anxiety of not knowing. Silence during the marketing phase erodes confidence faster than bad news." },
  { feeling: "Control", phase: "Deliver the renewal", body: "Walking clients through options and reasoning makes them participants in the outcome. Clients who understand the recommendation are far more likely to accept it — and stay." },
  { feeling: "Status", phase: "Close and steward", body: "A genuine thank-you, a request for feedback, and a proactive next-year plan communicates that the relationship matters beyond the transaction." },
  { feeling: "Enjoyment", phase: "All phases", body: "Reducing friction at every touchpoint — clear communication, no surprises, organized docs — makes the renewal something clients don't dread. That's rarer than it sounds." },
  { feeling: "Belonging", phase: "Year-round stewardship", body: "Market updates, risk ideas, and relevant resources between renewals build the sense that HUB is watching out for them — not just collecting a commission at renewal." },
];

const SKILLS = [
  { icon: "📞", title: "Stewardship communication", body: "Know the client's preferred channel. Show value all year — not just at renewal. Plan who gets contacted, with what message, and when — before the year begins." },
  { icon: "⚠️", title: "Delivering difficult news", body: "Frame rate increases with market context. Acknowledge, explain, recommend. Deliver early — and personally. Never let the client open an email to find out something changed." },
  { icon: "🏆", title: "Value demonstration", body: "Arrive at renewal with a stewardship report: claims handled, issues resolved, market access used, HUB resources deployed. The renewal presentation is a summary of a year's work — not just a quote." },
  { icon: "💬", title: "Asking for feedback", body: "Post-renewal: what went well, what would the client change? The plus/delta conversation closes the loop and builds a stronger next cycle — and signals that their experience matters." },
];



export default function Sprint3Learning() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <div className="space-y-8 pb-4">

      {/* Hero */}
      <div className="rounded-2xl bg-primary p-6 relative overflow-hidden">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40 mb-3">AM Accelerator · Sprint 3 of 8</p>
        <h2 className="text-2xl font-bold text-primary-foreground leading-tight mb-2">
          Own the renewal. <span className="text-secondary italic">Lead the relationship.</span>
        </h2>
        <p className="text-sm text-primary-foreground/60 mb-5 max-w-lg leading-relaxed">
          The renewal is not an event that happens to your clients — it's a CX moment you design. This sprint builds the framework, the skills, and the discipline to orchestrate it from 120 days out.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Execute a proactive renewal timeline with defined milestones",
            "Conduct a structured pre-renewal conversation that surfaces risk changes",
            "Deliver difficult renewal news clearly, early, and confidently",
            "Present renewal value — not just price — and close the cycle with stewardship",
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
          <p className="text-xl md:text-2xl font-bold text-primary-foreground leading-tight mb-3 italic">
            The renewal is the <span className="not-italic text-secondary">moment.</span>
          </p>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40 mb-4">Make sure you've been building to it all year.</p>
          <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xl">
            Great CX doesn't just happen at renewal — it's built across every touchpoint leading up to it.{" "}
            <strong className="text-primary-foreground/85 font-semibold">The AM who arrives at renewal with a plan, a story, and a relationship already in good shape</strong>{" "}
            is operating from a completely different position than the one scrambling to pull a quote together. One is delivering an outcome. The other is demonstrating a year of work.
          </p>
        </div>
      </div>

      <Divider />

      {/* Reactive vs Strategic */}
      <div>
        <SectionEyebrow label="Two ways to run a renewal" />
        <h3 className="text-xl font-bold mb-1">Reactive AM vs. strategic AM</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">The renewal exposes how you've been managing the relationship all year. It's hard to hide reactive service when the clock is running.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Reactive AM</p>
            <p className="italic text-base text-foreground mb-3 leading-snug">"I respond when the deadline arrives."</p>
            <ul className="space-y-1">
              {["Waits for the renewal to arrive", "Responds to deadlines instead of setting them", "Surprises clients with bad news at 30 days", "Presents a quote — not a recommendation", "Moves on to the next account after binding"].map(i => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2 items-start"><span className="text-blue-400 mt-0.5">·</span>{i}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-green-50 border border-green-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-2">Strategic AM</p>
            <p className="italic text-base text-foreground mb-3 leading-snug">"I've been building to this for 120 days."</p>
            <ul className="space-y-1">
              {["Orchestrates the renewal from 120 days out", "Shapes the client's experience at every phase", "Delivers difficult news early — never surprises", "Arrives with a plan, not just a quote", "Post-renewal stewardship seeds the next cycle"].map(i => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2 items-start"><span className="text-green-500 mt-0.5">·</span>{i}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex gap-3 items-start bg-primary rounded-xl p-4 border-l-4 border-secondary">
          <span className="text-secondary shrink-0 text-base mt-0.5">💡</span>
          <p className="text-sm text-primary-foreground/65 leading-relaxed">
            The renewal is your most important CX moment — and most clients judge the entire year by how it feels.{" "}
            <strong className="text-primary-foreground/85 font-medium">A smooth renewal in a hard market builds more loyalty than three easy renewals handled passively.</strong>{" "}
            How you show up at this moment is what they tell their colleagues about.
          </p>
        </div>
      </div>

      <Divider />

      {/* 5 Phase Journey */}
      <div>
        <SectionEyebrow label="The renewal journey framework" />
        <h3 className="text-xl font-bold mb-1">Five phases. Each a planned CX moment.</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">The renewal isn't a single event — it's five distinct phases, each with a different client emotional need and a different job for you to do.</p>
        <div className="flex gap-1 flex-wrap mb-0">
          {PHASES.map((phase, i) => (
            <button
              key={i}
              onClick={() => setActivePhase(i)}
              className={`px-3 py-2 text-xs rounded-t-lg border transition-all ${
                activePhase === i
                  ? "bg-card border-border border-b-card text-accent font-semibold relative z-10 -mb-px"
                  : "bg-muted border-transparent text-muted-foreground hover:text-foreground font-medium"
              }`}
            >
              <span className="block font-bold">{PHASES[i].num}</span>
              <span className="text-[10px] opacity-70">{PHASES[i].unit}</span>
            </button>
          ))}
        </div>
        <div className={`bg-card border border-border rounded-b-xl rounded-tr-xl p-5 ${PHASES[activePhase].color}`}>
          <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${PHASES[activePhase].accentColor}`}>{PHASES[activePhase].label}</p>
          <p className="font-bold text-base text-foreground mb-3">{PHASES[activePhase].title}</p>
          <ul className="space-y-1.5 mb-4">
            {PHASES[activePhase].items.map((item) => (
              <li key={item} className="flex gap-2 items-start text-xs text-muted-foreground leading-relaxed">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${PHASES[activePhase].accentColor.replace("text-", "bg-")}`} />
                {item}
              </li>
            ))}
          </ul>
          <div className="bg-white/60 border-l-4 border-current rounded-lg p-3">
            <p className="text-xs leading-relaxed text-foreground/80">
              <strong>{PHASES[activePhase].callout.bold}</strong>{PHASES[activePhase].callout.rest}
            </p>
          </div>
        </div>
      </div>

      <Divider />

      {/* CX Feelings */}
      <div>
        <SectionEyebrow label="The renewal through the lens of CX" />
        <h3 className="text-xl font-bold mb-1">How does your client feel at each stage?</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">That's what they remember. Not the rate. Not the carrier. How it felt to go through it with you.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CX_FEELINGS.map((item) => (
            <div key={item.feeling} className="bg-card border border-border rounded-xl p-4 hover:-translate-y-0.5 transition-transform">
              <p className="font-bold text-sm text-accent mb-0.5">{item.feeling}</p>
              <p className="text-xs font-medium text-muted-foreground mb-2">{item.phase}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 4 Skills */}
      <div>
        <SectionEyebrow label="What this sprint develops" />
        <h3 className="text-xl font-bold mb-1">Four skills practiced in this sprint</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">Each skill maps directly to a phase of the renewal journey and the HUB customer experience framework.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SKILLS.map((skill) => (
            <div key={skill.title} className="bg-card border border-border rounded-xl p-4 hover:-translate-y-0.5 transition-transform">
              <div className="text-2xl mb-2">{skill.icon}</div>
              <p className="font-semibold text-sm text-foreground mb-1">{skill.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{skill.body}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Closing Quote */}
      <div className="rounded-2xl bg-primary p-6 text-center">
        <p className="text-lg font-bold italic text-primary-foreground/90 mb-1">"The renewal is the moment."</p>
        <p className="text-sm text-primary-foreground/50">"Make sure you've been building to it all year."</p>
      </div>

    </div>
  );
}