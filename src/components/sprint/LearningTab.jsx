import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, BookOpen, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sprint1Learning from "./Sprint1Learning";
import Sprint2Learning from "./Sprint2Learning";
import Sprint3Learning from "./Sprint3Learning";
import Sprint4Learning from "./Sprint4Learning";
import Sprint5Learning from "./Sprint5Learning";
import Sprint6Learning from "./Sprint6Learning";
import Sprint7Learning from "./Sprint7Learning";
import Sprint8Learning from "./Sprint8Learning";
import Sprint9Learning from "./Sprint9Learning";

const CARD_ACCENTS = [
  { bg: "from-primary/10 to-primary/5", border: "border-primary/20", badge: "bg-primary/10 text-primary", dot: "bg-primary" },
  { bg: "from-secondary/20 to-secondary/10", border: "border-secondary/30", badge: "bg-secondary/20 text-secondary-foreground", dot: "bg-secondary" },
  { bg: "from-accent/10 to-accent/5", border: "border-accent/20", badge: "bg-accent/10 text-accent", dot: "bg-accent" },
  { bg: "from-green-500/10 to-green-500/5", border: "border-green-500/20", badge: "bg-green-500/10 text-green-700", dot: "bg-green-500" },
  { bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/20", badge: "bg-purple-500/10 text-purple-700", dot: "bg-purple-500" },
];

function ConceptCard({ concept, index }) {
  const [expanded, setExpanded] = useState(false);
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 300, damping: 28 }}
    >
      <Card
        className={`border shadow-none hover:shadow-lg transition-all duration-250 cursor-pointer overflow-hidden ${accent.border}`}
        onClick={() => setExpanded((p) => !p)}
      >
        <CardContent className="p-0">
          {/* Collapsed header */}
          <div className={`flex items-center gap-4 p-5 bg-gradient-to-r ${accent.bg}`}>
            <div className="text-2xl shrink-0 leading-none">{concept.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${accent.badge}`}>
                  Concept {index + 1}
                </span>
              </div>
              <p className="font-inter font-bold text-sm text-foreground leading-tight">{concept.title}</p>
              {!expanded && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{concept.body}</p>
              )}
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""} ${accent.badge}`}>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Expanded body */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <div className="px-5 py-4 border-t border-border/40 bg-card">
                  <div className="flex gap-3">
                    <div className={`w-0.5 rounded-full shrink-0 self-stretch ${accent.dot}`} />
                    <p className="text-sm text-foreground/85 leading-relaxed">{concept.body}</p>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function LearningTab({ sprint }) {
  const [allExpanded, setAllExpanded] = useState(false);
  const [expandKey, setExpandKey] = useState(0);

  if (sprint.number === 1) {
    return <Sprint1Learning />;
  }
  if (sprint.number === 2) {
    return <Sprint2Learning />;
  }
  if (sprint.number === 3) {
    return <Sprint3Learning />;
  }
  if (sprint.number === 4) {
    return <Sprint4Learning />;
  }
  if (sprint.number === 5) {
    return <Sprint5Learning />;
  }
  if (sprint.number === 6) {
    return <Sprint6Learning />;
  }
  if (sprint.number === 7) {
    return <Sprint7Learning />;
  }
  if (sprint.number === 8) {
    return <Sprint8Learning />;
  }
  if (sprint.number === 9) {
    return <Sprint9Learning />;
  }

  return (
    <div className="space-y-6">
      {/* Header card */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-inter font-bold text-lg text-foreground mb-1">{sprint.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{sprint.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Concepts */}
      {sprint.keyConcepts?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-secondary-foreground" />
              </div>
              <div>
                <h4 className="font-inter font-bold text-base leading-tight">Key Concepts</h4>
                <p className="text-xs text-muted-foreground">Click any card to expand the full framework</p>
              </div>
            </div>
            <span className="text-xs bg-muted text-muted-foreground rounded-full px-2.5 py-1 font-semibold">{sprint.keyConcepts.length} concepts</span>
          </div>
          <div className="space-y-3">
            {sprint.keyConcepts.map((concept, i) => (
              <ConceptCard key={i} concept={concept} index={i} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}