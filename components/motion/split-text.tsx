"use client";

import { motion } from "framer-motion";

import { cn, EASE } from "@/lib/utils";

type Line = string | { text: string; className?: string };

type SplitTextProps = {
  /** Each entry renders on its own line; words slide up from a mask. */
  lines: Line[];
  className?: string;
  lineClassName?: string;
  /** When provided, animation is driven by this flag instead of viewport entry. */
  play?: boolean;
  delay?: number;
  stagger?: number;
};

/**
 * Editorial headline reveal — every word rises out of an overflow mask.
 * Screen readers get the plain sentence once via an sr-only copy.
 */
export function SplitText({
  lines,
  className,
  lineClassName,
  play,
  delay = 0,
  stagger = 0.06,
}: SplitTextProps) {
  const normalized = lines.map((line) => (typeof line === "string" ? { text: line } : line));
  const label = normalized.map((l) => l.text).join(" ");
  const controlled = play !== undefined;

  let wordIndex = 0;

  return (
    <span className={cn("block", className)}>
      <span className="sr-only">{label}</span>
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        {...(controlled
          ? { animate: play ? "show" : "hidden" }
          : { whileInView: "show", viewport: { once: true, amount: 0.4 } })}
      >
        {normalized.map((line, li) => (
          <span key={li} className={cn("block", lineClassName, line.className)}>
            {line.text.split(" ").map((word, wi) => {
              const i = wordIndex++;
              return (
                <span
                  key={wi}
                  className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    variants={{
                      hidden: { y: "110%", rotate: 4 },
                      show: {
                        y: "0%",
                        rotate: 0,
                        transition: { duration: 1.05, ease: EASE, delay: delay + i * stagger },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                  {wi < line.text.split(" ").length - 1 && " "}
                </span>
              );
            })}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
