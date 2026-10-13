"use client";

import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion } from "framer-motion";

import { siteConfig } from "@/content/site";
import { useIntro } from "@/components/providers/intro";
import { EASE } from "@/lib/utils";

const COUNT_DURATION = 1.25;

/**
 * First-visit intro: a counter runs to 100 while the name rises in, then the
 * curtain lifts. Server-rendered so there is no flash; CSS hides it for
 * returning visitors, reduced motion and no-JS (see globals.css).
 */
export function IntroLoader() {
  const { shouldPlay, ready, finish } = useIntro();
  const [visible, setVisible] = useState(true);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!shouldPlay) return;
    const controls = animate(0, 100, {
      duration: COUNT_DURATION,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (latest) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(latest)).padStart(3, "0");
        if (barRef.current) barRef.current.style.transform = `scaleX(${latest / 100})`;
      },
      onComplete: () => {
        setVisible(false);
        finish();
      },
    });
    return () => controls.stop();
  }, [shouldPlay, finish]);

  // Returning visitor / reduced motion: never animate, just unmount.
  if (ready && !shouldPlay) return null;

  const letters = siteConfig.name.split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          role="status"
          aria-label="Loading"
          className="intro-loader fixed inset-0 z-[100] flex flex-col justify-between bg-[#0a0a0a] p-5 text-white sm:p-10"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between text-[11px] tracking-[0.18em] text-white/50 uppercase">
            <span>Portfolio — {new Date().getFullYear()}</span>
            <span>{siteConfig.location}</span>
          </div>

          <div className="flex flex-col items-start gap-4">
            <p
              aria-hidden="true"
              className="flex overflow-hidden text-[clamp(2.2rem,7vw,6rem)] leading-[1.05] font-semibold tracking-[-0.05em]"
            >
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={shouldPlay ? { y: "0%" } : undefined}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.025 }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </p>
            <motion.p
              className="text-sm text-white/55"
              initial={{ opacity: 0 }}
              animate={shouldPlay ? { opacity: 1 } : undefined}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {siteConfig.roles.join("  ·  ")}
            </motion.p>
          </div>

          <div className="flex items-end justify-between gap-6">
            <span className="relative block h-px flex-1 overflow-hidden bg-white/12">
              <span
                ref={barRef}
                className="absolute inset-0 origin-left scale-x-0 bg-[#F1692D]"
              />
            </span>
            <span
              ref={countRef}
              className="text-[clamp(3rem,10vw,8rem)] leading-none font-semibold tracking-[-0.06em] tabular-nums"
            >
              000
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
