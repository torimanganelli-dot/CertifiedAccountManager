import React, { useState } from "react";

const SectionEyebrow = ({ label }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{label}</p>
);

const Divider = () => <div className="h-px bg-border" />;

const BARRIERS = [
  { num: "1", title: "No visibility into what clients already have", body: "Before you can spot a gap, you need a clear picture of the current program. The Account Roundness Score gives you that." },
  { num: "2", title: "No clear process for starting the conversation", body: "Without a framework, the conversation feels awkward or sales-y. The diagnostic questions eliminate that friction." },
  { num: "3", title: "Comp concerns and fear of losing control", body: "AMs sometimes hesitate to surface opportunities that involve other specialists. The diagnostic framework keeps you in the advisory seat — you identify the gap and stay central to the conversation." },
  { num: "4", title: "Lack of cross-line expertise", body: "You don't need to know every product deeply. Your job is to identify the gap and connect the client to the right resource. The diagnostic conversation opens the door — specialists close it." },
  { num: "5", title: "Culture — it doesn't feel like 'our job'", body: "The biggest barrier. Cross-selling feels like sales. This sprint reframes it as risk advisory — which is exactly the job description of a trusted AM." },
];

const CONVERSATION_QUESTIONS = [
  { num: "1", title: "Discover changes", question: `"What's changed in your business this year?"`, body: "Growth, acquisitions, new hires, new locations — all create new exposures the existing program may not reflect. This question alone surfaces more cross-sell opportunities than any product conversation." },
  { num: "2", title: "Surface the exposure", question: `"How are you thinking about [specific risk area] right now?"`, body: "Cyber, employment practices, executive exposure — tailor to what you already know about their industry and operations. This positions you as someone who's been thinking about their situation, not reading from a script." },
  { num: "3", title: "Reveal the gap", question: `"Do you know what your current program does — and doesn't — cover there?"`, body: "Most clients assume coverage exists where it doesn't. This question surfaces the gap without you having to declare it — the client reaches the conclusion themselves, which makes the next step their idea as much as yours." },
  { num: "4", title: "Earn the meeting", question: `"Would it be worth 20 minutes to review this together before your next renewal?"`, body: "Low-commitment ask. Positions you as proactive. Creates a structured entry point for the deeper conversation — without pressure. Most clients say yes to 20 minutes when the framing is their risk, not your product." },
];

const OBJECTIONS = [
  { objection: "We already have coverage through our parent company.", response: "Great — do you have a copy of their certificates? Let's confirm what's included and what flows through to your entity. Gaps at the subsidiary level are surprisingly common, and if there's a claim, that's when it matters." },
  { objection: "We can't afford to add anything right now.", response: "Totally understand. Let's just make sure you know where your exposure sits. If there's a meaningful gap, we can talk about options — including phased approaches or coverage adjustments. You should at least know what's there before you decide." },
  { objection: "We review everything at renewal — let's wait.", response: "That makes sense for most things. For Cyber / EPLI / etc., claims don't wait for renewal. I'd want to flag this now so you can make an informed decision before we get there — not after something happens." },
  { objection: "I'll need to check with our CFO / legal / HR first.", response: "Absolutely — and I can help you frame it for them. Would it be useful if I put together a one-page risk summary they could review? That might make the conversation easier on your end." },
];

const PITCH_VS_ADVISORY = [
  { label: "The sales pitch — don't do this", items: [`"I noticed you don't have Cyber — we can add that."`, `"We have a great D&O product that might interest you."`, `"Our renewal is coming up — want to look at adding EPLI?"`, `"I have a quote ready for umbrella coverage."`] },
  { label: "The risk advisory — do this", items: [`"I've been reviewing your program — you have a meaningful data exposure that isn't currently covered."`, `"Other companies in your space have faced $1M+ claims in this area. I want to make sure you're protected."`, `"I want to understand how you're managing your executive liability risk — can we talk through it?"`, `"Based on what I know about your operations, there's a gap I think we should address before renewal."`] },
];

export default function Sprint4Learning() {
  const [activeBarrier, setActiveBarrier] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);

  return (
    <div className="space-y-8 pb-4">

      {/* Hero */}
      <div className="rounded-2xl bg-primary p-6 relative overflow-hidden">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40 mb-3">AM Accelerator · Sprint 4 of 8</p>
        <h2 className="text-2xl font-bold text-primary-foreground leading-tight mb-2">
          Cross-sell & rounding out. <span className="text-secondary italic">Spot the gap.</span>
        </h2>
        <p className="text-sm text-primary-foreground/60 mb-5 max-w-lg leading-relaxed">
          Your best new business is already in your book. This sprint teaches you to identify what's missing, frame the conversation as a risk advisor, and open the door — without it ever feeling like a sales call.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Understand why cross-selling is a service obligation, not a sales tactic",
            "Use the Coverage Gap framework and Account Roundness Score to prioritize",
            "Replace the pitch with the diagnostic conversation",
            "Handle common objections without losing the advisory frame",
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
            Your clients don't know <span className="text-secondary italic">what they're missing.</span> <span className="text-primary-foreground/60">You do.</span>
          </p>
          <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xl">
            Cross-selling isn't about adding lines to a policy — it's about closing the gap between what your clients have and what they actually need.{" "}
            <strong className="text-primary-foreground/85 font-semibold">When a client has an uninsured exposure, they don't know it. You do.</strong>{" "}
            That makes identifying and addressing gaps a service obligation, not a sales opportunity. When you approach it that way, the conversation lands completely differently — and so does the outcome.
          </p>
        </div>
      </div>

      <Divider />

      {/* Opportunity Stats */}
      <div>
        <SectionEyebrow label="The untapped opportunity" />
        <h3 className="text-xl font-bold mb-1">The revenue is already in your book</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">HUB's national cross-sell strategy starts from one observation: most clients only buy one thing from us. The opportunity to change that is sitting in accounts you already manage.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {[
            { stat: "60–70%", label: "of clients have at least one uncovered exposure relevant to their industry" },
            { stat: "5×", label: "less costly to grow an existing account than to acquire a new one" },
            { stat: "$0", label: "additional prospecting cost — the relationship is already yours to develop" },
          ].map((item) => (
            <div key={item.stat} className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-accent mb-1">{item.stat}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 items-start bg-primary rounded-xl p-4 border-l-4 border-secondary">
          <span className="text-secondary shrink-0 text-base mt-0.5">💡</span>
          <p className="text-sm text-primary-foreground/65 leading-relaxed">
            "We're leaving millions on the table. Our clients need what we sell —{" "}
            <strong className="text-primary-foreground/85 font-medium">we're just not having the conversations.</strong>" Cross-selling needs systems and process, not just good intentions. Goodwill doesn't convert to revenue without a clear approach.
          </p>
        </div>
      </div>

      <Divider />

      {/* 5 Barriers */}
      <div>
        <SectionEyebrow label="Why cross-sell conversations don't happen" />
        <h3 className="text-xl font-bold mb-1">Five barriers — and how this sprint addresses them</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">Cross-selling fails for predictable reasons. Each one has a solution — and most of them live in how AMs approach the conversation.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-3">
          {BARRIERS.map((b, i) => (
            <button
              key={i}
              onClick={() => setActiveBarrier(i)}
              className={`p-3 rounded-lg border text-left transition-all text-xs font-semibold ${
                activeBarrier === i
                  ? "bg-accent text-white border-accent"
                  : "bg-muted border-border text-muted-foreground hover:bg-muted/70"
              }`}
            >
              <span className="block text-sm mb-1">{b.num}</span>
              <span className="line-clamp-3 leading-snug">{b.title}</span>
            </button>
          ))}
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-base font-semibold text-foreground mb-2">{BARRIERS[activeBarrier].title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{BARRIERS[activeBarrier].body}</p>
        </div>
      </div>

      <Divider />

      {/* Conversation Framework */}
      <div>
        <SectionEyebrow label="The conversation framework" />
        <h3 className="text-xl font-bold mb-1">Four questions that open every cross-sell door</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">You don't need a pitch deck. You need four questions — asked in the right order, tailored to what you already know about the client.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
          {CONVERSATION_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => setActiveQuestion(i)}
              className={`p-3 rounded-lg border text-left transition-all ${
                activeQuestion === i
                  ? "bg-secondary text-secondary-foreground border-secondary"
                  : "bg-muted border-border text-muted-foreground hover:bg-muted/70"
              }`}
            >
              <span className={`text-sm font-bold block mb-1 ${activeQuestion === i ? "" : "text-accent"}`}>{q.num}</span>
              <span className="text-xs font-semibold leading-snug">{q.title}</span>
            </button>
          ))}
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-base font-semibold text-foreground mb-2">{CONVERSATION_QUESTIONS[activeQuestion].title}</p>
          <p className="italic text-sm text-accent mb-3">{CONVERSATION_QUESTIONS[activeQuestion].question}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{CONVERSATION_QUESTIONS[activeQuestion].body}</p>
        </div>
      </div>

      <Divider />

      {/* Pitch vs Advisory */}
      <div>
        <SectionEyebrow label="The mindset shift" />
        <h3 className="text-xl font-bold mb-1">Risk advisory, not sales pitch</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">The language you use determines whether this conversation feels like your job or like an upsell. Here's the difference — in plain language.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PITCH_VS_ADVISORY.map((section) => (
            <div key={section.label} className="bg-card border border-border rounded-xl p-5">
              <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${section.label.includes("don't") ? "text-destructive" : "text-green-600"}`}>
                {section.label}
              </p>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-xs text-muted-foreground leading-relaxed">
                    <span className={`shrink-0 mt-1 font-bold ${section.label.includes("don't") ? "text-destructive" : "text-green-600"}`}>
                      {section.label.includes("don't") ? "✗" : "✓"}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground italic mt-3 bg-muted rounded-lg p-3">
          <strong className="text-foreground">The difference is the starting point.</strong> The pitch starts with a product. The advisory starts with the client's situation. Same coverage. Completely different conversation.
        </p>
      </div>

      <Divider />

      {/* Objections */}
      <div>
        <SectionEyebrow label="When they push back" />
        <h3 className="text-xl font-bold mb-1">Handling the common objections</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">Every cross-sell conversation hits one of four responses. Knowing the answer in advance is the difference between a stalled conversation and a scheduled meeting.</p>
        <div className="space-y-2">
          {OBJECTIONS.map((obj) => (
            <div key={obj.objection} className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm font-semibold text-foreground mb-2">{obj.objection}</p>
              <div className="flex gap-3 items-start">
                <span className="text-green-600 shrink-0 font-bold">→</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{obj.response}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing */}
      <div className="rounded-2xl bg-primary p-6 text-center">
        <p className="text-lg font-bold text-primary-foreground/90 mb-1">Your clients don't know what they're missing.</p>
        <p className="text-sm text-primary-foreground/60">You do. Approach it as your obligation — not your opportunity.</p>
      </div>

    </div>
  );
}