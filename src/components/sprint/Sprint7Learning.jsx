import React, { useState } from "react";
import { FileText, BarChart3, Shield, CheckCircle2, Lightbulb } from "lucide-react";

const SectionEyebrow = ({ label }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{label}</p>
);

const Divider = () => <div className="h-px bg-border" />;

const SUBMISSION_ELEMENTS = [
  {
    icon: "📄",
    title: "Complete ACORD applications",
    desc: "No blanks, no \"TBD.\" Every field answered. Incomplete applications signal a broker who doesn't know their account."
  },
  {
    icon: "📖",
    title: "A clear risk narrative",
    desc: "A brief account overview that tells the story of the risk before the underwriter has to ask. This is what separates a submission from a form."
  },
  {
    icon: "📊",
    title: "Five years of loss runs",
    desc: "Or a clear explanation if the history is shorter. Loss runs without context invite assumptions — usually unfavorable ones."
  },
  {
    icon: "📋",
    title: "Current expiring policy",
    desc: "The underwriter needs to see what's in place. Missing the expiring policy creates unnecessary back-and-forth."
  },
  {
    icon: "✅",
    title: "Honest disclosure",
    desc: "Any losses, claims, or changes in operations — disclosed upfront, with context. Surprises discovered after quoting damage the relationship with both the carrier and the client."
  },
];

const COVER_MEMO_PARTS = [
  {
    num: "1",
    title: "What the account does",
    badge: "bg-blue-50 border-blue-200 text-blue-600",
    example: "ABC Manufacturing produces custom metal components for the automotive sector. 45 employees, 22 years in operation, no ownership changes.",
    desc: "A plain-language description of the business or individual — not the SIC code, not the NAICS classification. What do they actually do, who do they serve, how long have they been operating?"
  },
  {
    num: "2",
    title: "Why it's a good risk",
    badge: "bg-green-50 border-green-200 text-green-700",
    example: "Clean 5-year loss history. Active safety committee, OSHA-compliant facility, low employee turnover. Prior carrier non-renewed due to market withdrawal, not claims.",
    desc: "Make the case for the account. Clean loss history, safety programs, long tenure, strong management — anything that distinguishes this account from the average submission in this class."
  },
  {
    num: "3",
    title: "What you're asking for",
    badge: "bg-purple-50 border-purple-200 text-purple-600",
    example: "Targeting sub-$48K on GL and property combined. Need bindable terms by the 15th. Client is open to higher retention if it meaningfully moves the premium.",
    desc: "A specific ask — target premium range, particular coverage need, binding timeline. Vague submissions get vague quotes. Tell the underwriter exactly what a win looks like."
  },
];

export default function Sprint7Learning() {
  const [activeMemo, setActiveMemo] = useState(0);

  return (
    <div className="space-y-8 pb-4">

      {/* Hero */}
      <div className="rounded-2xl bg-primary p-6 relative overflow-hidden">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40 mb-3">AM Accelerator · Sprint 7 of 8</p>
        <h2 className="text-2xl font-bold text-primary-foreground leading-tight mb-2">
          Build a better <span className="text-secondary italic">submission.</span>
        </h2>
        <p className="text-sm text-primary-foreground/60 mb-5 max-w-lg leading-relaxed">
          Underwriters make decisions based on what you send them. A clean, complete, well-framed submission moves to the top of the stack. A half-built one gets quoted worst-case — or not at all.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Understand what every underwriter needs regardless of line",
            "Know what makes a CL, EB, and PL submission stand out",
            "Learn how narrative and context change the terms you get back",
            "Understand the cover memo structure that sets every submission apart"
          ].map((item) => (
            <div key={item} className="flex gap-2 items-start bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="text-secondary text-xs mt-0.5 shrink-0">✓</span>
              <span className="text-xs text-primary-foreground/70 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Core Idea */}
      <div>
        <SectionEyebrow label="The core idea" />
        <div className="rounded-2xl bg-primary p-6 md:p-8 relative overflow-hidden">
          <div className="w-10 h-0.5 bg-secondary rounded mb-4" />
          <p className="text-xl md:text-2xl font-bold text-primary-foreground leading-tight mb-3">
            The underwriter needs to understand
          </p>
          <p className="text-xl md:text-2xl font-bold text-secondary italic mb-4">
            the risk quickly — and trust the broker presenting it.
          </p>
          <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xl">
            Every submission is a first impression.{" "}
            <strong className="text-primary-foreground/85 font-semibold">
              The broker who sends clean, complete packages gets callbacks, preferred treatment, and better terms.
            </strong>{" "}
            The one who sends incomplete submissions — missing loss runs, vague descriptions, blanks in the application — loses priority before the underwriter has even read the account. Your submission quality is a direct reflection of your professionalism and your knowledge of the account.
          </p>
        </div>
      </div>

      <Divider />

      {/* Foundation */}
      <div>
        <SectionEyebrow label="The foundation" />
        <h3 className="text-xl font-bold mb-1">What every good submission has</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">These elements apply across all lines. Think of them as the floor — not the ceiling. Depending on the client, carrier, or coverage type, additional items may strengthen or be required in your submission.</p>
        <div className="space-y-2 mb-4">
          {SUBMISSION_ELEMENTS.map((el) => (
            <div key={el.title} className="flex gap-3 items-start bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <span className="text-2xl shrink-0 leading-none">{el.icon}</span>
              <div>
                <p className="font-semibold text-sm text-foreground mb-1">{el.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{el.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 items-start bg-primary rounded-xl p-4 border-l-4 border-secondary">
          <span className="text-secondary shrink-0 text-base mt-0.5">⚡</span>
          <p className="text-sm text-primary-foreground/65 leading-relaxed">
            The broker who submits clean, complete packages gets callbacks. The one who sends half-built submissions{" "}
            <strong className="text-primary-foreground/85 font-medium">loses priority</strong> — and often gets quoted at rates that assume the worst about what's missing.
          </p>
        </div>
        <p className="text-center text-xs text-muted-foreground italic mt-3 bg-muted rounded-lg p-3">
          This is a guide, not a checklist. Every client and carrier relationship is different. Use this as a strong starting point — and be alert to what else might be relevant or impactful for a specific account, market, or coverage type.
        </p>
      </div>

      <Divider />

      {/* Cover Memo */}
      <div>
        <SectionEyebrow label="The universal differentiator" />
        <h3 className="text-xl font-bold mb-1">The submission cover memo</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">The best submissions include a cover email or memo that gives the underwriter a clear, confident picture before they open a single attachment. Underwriters have dozens of submissions — the ones with a clear ask and a credible advocate behind them get the best terms.</p>
        
        <p className="text-sm font-semibold text-foreground mb-4">Three things every cover memo hits</p>
        <p className="text-xs text-muted-foreground mb-4 italic">In any order — in any format — but always all three</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          {COVER_MEMO_PARTS.map((part, i) => (
            <button
              key={i}
              onClick={() => setActiveMemo(i)}
              className={`p-4 rounded-lg border text-left transition-all ${
                activeMemo === i
                  ? `${part.badge} border-current`
                  : "bg-muted border-border text-muted-foreground hover:bg-muted/70"
              }`}
            >
              <span className="block text-2xl font-bold mb-2">{part.num}</span>
              <span className="text-xs font-semibold leading-snug block">{part.title}</span>
            </button>
          ))}
        </div>

        <div className={`border rounded-xl p-5 ${COVER_MEMO_PARTS[activeMemo].badge}`}>
          <p className="text-base font-semibold text-foreground mb-2">{COVER_MEMO_PARTS[activeMemo].title}</p>
          <div className="bg-white/40 rounded-lg p-3 mb-3 border border-white/20">
            <p className="text-sm text-foreground italic font-medium">"{COVER_MEMO_PARTS[activeMemo].example}"</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{COVER_MEMO_PARTS[activeMemo].desc}</p>
        </div>
      </div>

      {/* Closing */}
      <div className="rounded-2xl bg-primary p-6 text-center">
        <p className="text-lg font-bold text-primary-foreground/90 mb-1">Your submission is your first impression.</p>
        <p className="text-sm text-primary-foreground/60">Make it easy for the underwriter to say yes.</p>
      </div>

    </div>
  );
}