"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn, EASE } from "@/lib/utils";

/** Cycles through words with a vertical mask transition. */
export function RotatingWords({
  words,
  interval = 2600,
  className,
}: {
  words: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval, reduced]);

  return (
    <span className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      {/* Reserve width for the longest word to avoid layout shift. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden="true"
          className="col-start-1 row-start-1"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
