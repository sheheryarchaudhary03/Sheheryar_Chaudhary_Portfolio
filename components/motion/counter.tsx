"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

type CounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  /** Gate the animation (e.g. until an intro finishes). Defaults to true. */
  play?: boolean;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Counts up from zero the first time it scrolls into view. The final value is
 * server-rendered (SEO, no-JS) and reset to zero before paint on hydration.
 */
export function Counter({ value, suffix = "", prefix = "", duration = 1.8, className, play = true }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const format = (n: number) => `${prefix}${n}${suffix}`;

  useLayoutEffect(() => {
    if (ref.current && !prefersReducedMotion()) ref.current.textContent = `${prefix}0${suffix}`;
  }, [prefix, suffix]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || !play || prefersReducedMotion()) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, play, value, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(value)}
    </span>
  );
}
