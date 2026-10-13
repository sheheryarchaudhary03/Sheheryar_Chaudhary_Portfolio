"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { EASE } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Distance in px the element slides up from. */
  y?: number;
  duration?: number;
  /** Fraction of the element that must be visible before revealing. */
  amount?: number;
  as?: "div" | "li" | "section" | "article" | "span";
};

/** Fade + slide-up on first entry into the viewport. */
export function Reveal({
  delay = 0,
  y = 28,
  duration = 0.9,
  amount = 0.25,
  as = "div",
  children,
  ...props
}: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </Component>
  );
}

/** Staggers direct <RevealItem> children as the group scrolls into view. */
export function RevealGroup({
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  children,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number; delay?: number; amount?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const revealItemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function RevealItem({
  as = "div",
  children,
  ...props
}: HTMLMotionProps<"div"> & { as?: "div" | "li" | "article" }) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component variants={revealItemVariants} {...props}>
      {children}
    </Component>
  );
}
