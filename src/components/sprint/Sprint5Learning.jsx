import React, { useState } from "react";

const PRINCIPLES = [
  {
    icon: "⚡",
    title: "Speed signals respect",
    body: "A fast acknowledgment — even without a full answer — tells the client they matter. Silence or delay communicates the opposite."
  },
  {
    icon: "🎯",
    title: "Own what you can own",
    body: "Clients can tell the difference between a genuine acknowledgment and a deflection. Own the part that belongs to you. It builds credibility for everything else you say."
  },
  {
    icon: "🔍",
    title: "Understand before you solve",
    body: "The client's version of the problem may be different from yours. Ask before you answer. The right solution for the wrong problem is still the wrong solution."
  },
  {
    icon: "📋",
    title: "Close every loop",
    body: "A conversation without a clear next step leaves the client in uncertainty. Always end with who will do what, and by when — and then follow through."
  }
];

const CLARA_STEPS = [
  {
    letter: "C",
    step: "Step 1",
    title: "Calm the moment",
    body: "Before anything else — acknowledge the client's concern directly. Not defensively, not with excuses. Just acknowledge it. A client who feels heard is far more receptive to what comes next. This step takes thirty seconds and changes the entire tone of the conversation.",
    example: '"I hear you — and I want to make sure we address this properly. Thank you for telling me directly."',
    avoid: "Jumping to explanation or justification before the client feels acknowledged. Solving a problem the client doesn't feel you've heard creates more friction, not less."
  },
  {
    letter: "L",
    step: "Step 2",
    title: "Learn the full picture",
    body: "Ask questions before you respond. You may think you know what the concern is — but the client's experience of it may include details that change what the right response looks like. This step also signals that you're taking the situation seriously rather than moving to a pre-packaged answer.",
    example: '"Can you walk me through what happened from your perspective? I want to make sure I understand the full picture before we talk about next steps."',
    avoid: "Interrupting, correcting facts mid-story, or asking questions that feel like cross-examination. Your goal here is understanding — not your defence."
  },
  {
    letter: "A",
    step: "Step 3",
    title: "Acknowledge and align",
    body: "Confirm what you heard, acknowledge the impact on the client, and where appropriate — own it. You do not need to accept blame for things outside your control. But you can acknowledge that the client experienced something that was frustrating, costly, or confusing, and that it matters.",
    example: '"What I\'m hearing is that the response time was unacceptable and it left you in a difficult position. That\'s a fair concern, and I take it seriously."',
    avoid: "Over-apologizing in a way that assigns fault prematurely, or under-acknowledging in a way that minimizes the client's experience. Both erode trust."
  },
  {
    letter: "R",
    step: "Step 4",
    title: "Respond with a plan",
    body: "Now — and only now — move to resolution. Be specific about what will happen, who will do it, and by when. Vague commitments (\u201cI\u2019ll look into it\u201d) are worse than no commitment because they create an expectation without a deadline. The plan does not need to solve everything immediately — it needs to be honest and actionable.",
    example: '"Here\'s what I\'m going to do: I\'ll have a full response to you by end of day Thursday. If I need more time than that, I\'ll tell you that before Thursday — not after."',
    avoid: "Over-promising to ease the tension in the moment. A commitment you can't keep creates a second problem on top of the first."
  },
  {
    letter: "A",
    step: "Step 5",
    title: "Advance the relationship",
    body: "After the issue is resolved, close the loop deliberately. Follow up to confirm the resolution landed as expected, ask whether there's anything else on the client's mind, and treat this as a natural moment to reset the relationship going forward. A difficult conversation handled well is an opportunity to demonstrate exactly what kind of partner you are.",
    example: '"I wanted to check in now that everything is resolved — does this feel like it\'s been addressed to your satisfaction? And is there anything else I should know about how things are going on your end?"',
    avoid: null
  }
];

export default function Sprint5Learning() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-10 pb-8">

      {/* Hero */}
      <div className="rounded-2xl bg-primary p-8 md:p-12 relative overflow-hidden">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/50 mb-3">AM Accelerator · Sprint 5 of 8</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
            Handle it. <em className="text-secondary italic">Turn difficulty into trust.</em>
          </h2>
          <p className="text-sm text-primary-foreground/70 mb-6 leading-relaxed max-w-2xl">
            Every difficult client conversation is a retention moment. How you handle a service failure, a rate increase, or a client who is shopping tells them more about the relationship than any smooth renewal ever could.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Understand why difficult conversations are retention opportunities",
              "Learn the five-step CLARA framework for any difficult conversation"
            ].map((outcome) => (
              <div key={outcome} className="flex gap-2 items-start bg-white/5 border border-white/10 rounded-lg p-3">
                <span className="text-secondary text-xs mt-0.5 shrink-0">✓</span>
                <span className="text-xs text-primary-foreground/70 leading-snug">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Idea */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">The core idea</p>
        <div className="bg-foreground text-background rounded-2xl p-8 md:p-10">
          <div className="w-8 h-1 bg-secondary rounded mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            Difficult conversations are <em className="italic text-secondary">retention conversations.</em>
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">
            Clients don't leave because something went wrong. They leave because of how it was handled — or not handled.{" "}
            <strong className="text-background font-semibold">A service failure addressed with honesty, speed, and a clear path forward builds more loyalty than three years of smooth renewals.</strong>{" "}
            The AM who can walk into a hard conversation with confidence and a framework comes out of it with a stronger relationship. The one who avoids it, deflects, or over-promises does not.
          </p>
        </div>
      </div>

      {/* Four Principles */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Before the framework</p>
        <h3 className="text-xl font-bold mb-2">Four principles that apply to every difficult conversation</h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">Regardless of the situation, these principles determine whether the conversation strengthens or weakens the relationship.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="bg-card border border-border rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <div className="text-2xl mb-3">{p.icon}</div>
              <p className="font-semibold text-sm text-foreground mb-1">{p.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CLARA Framework */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">The core framework</p>
        <h3 className="text-xl font-bold mb-2">CLARA — five steps for any difficult conversation</h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">CLARA gives you a consistent structure to work from regardless of the situation. It keeps you grounded, keeps the client heard, and keeps the conversation moving toward resolution rather than escalation.</p>

        {/* Step tabs */}
        <div className="flex gap-1 flex-wrap mb-0">
          {CLARA_STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`px-4 py-2.5 text-sm rounded-t-lg border transition-all font-bold ${
                activeStep === i
                  ? "bg-card border-border border-b-card text-primary relative z-10 -mb-px"
                  : "bg-muted border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.letter}
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-b-xl rounded-tr-xl p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{CLARA_STEPS[activeStep].step}</p>
          <p className="text-lg font-bold text-foreground mb-3">{CLARA_STEPS[activeStep].title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{CLARA_STEPS[activeStep].body}</p>

          <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-4 mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Try saying</p>
            <p className="text-sm text-foreground/80 italic leading-relaxed">{CLARA_STEPS[activeStep].example}</p>
          </div>

          {CLARA_STEPS[activeStep].avoid && (
            <div className="bg-destructive/5 border-l-4 border-destructive rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-destructive mb-1">Avoid</p>
              <p className="text-sm text-foreground/70 leading-relaxed">{CLARA_STEPS[activeStep].avoid}</p>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-xl">
          CLARA is a starting point, not a script. <strong className="text-foreground">The goal is consistent structure — not identical conversations.</strong> Adapt the language to the client, the situation, and your relationship.
        </p>
      </div>

      {/* Closing */}
      <div className="bg-primary rounded-2xl p-10 text-center">
        <p className="text-xl font-bold text-primary-foreground mb-1 leading-snug">
          How you handle the hard moment
        </p>
        <p className="text-xl font-bold italic text-secondary mb-4 leading-snug">
          is what the client remembers.
        </p>
        <p className="text-sm text-primary-foreground/60">Confidence and consistency turn difficulty into loyalty.</p>
      </div>

    </div>
  );
}