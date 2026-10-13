"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "hidden" | "default" | "link" | "view";

const INTERACTIVE = "a, button, [role='button'], summary, label, select";
const TEXT_INPUT = "input, textarea, [contenteditable='true']";

/**
 * A soft follower ring that complements (never replaces) the native cursor.
 * Grows over interactive elements and becomes a "View" bubble over elements
 * marked with data-cursor="view". Only runs for fine pointers with motion on.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("hidden");
  const [label, setLabel] = useState("View");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.6 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as Element | null;
      const viewTarget = target?.closest?.("[data-cursor='view']");
      if (viewTarget) {
        setLabel(viewTarget.getAttribute("data-cursor-label") ?? "View");
        setVariant("view");
      } else if (target?.closest?.(TEXT_INPUT)) {
        setVariant("hidden");
      } else if (target?.closest?.(INTERACTIVE)) {
        setVariant("link");
      } else {
        setVariant("default");
      }
    };
    const onLeave = () => setVariant("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isView = variant === "view";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90]"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        initial={false}
        animate={variant}
        variants={{
          hidden: { width: 8, height: 8, opacity: 0 },
          default: { width: 32, height: 32, opacity: 1 },
          link: { width: 56, height: 56, opacity: 1 },
          view: { width: 96, height: 96, opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.5 }}
        style={{
          mixBlendMode: isView ? "normal" : "difference",
          backgroundColor: isView ? "#F1692D" : variant === "link" ? "#ffffff" : "transparent",
          border: isView || variant === "link" ? "0px solid transparent" : "1.5px solid #ffffff",
        }}
      >
        <AnimatePresence>
          {isView && (
            <motion.span
              key="label"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              className="text-[13px] font-semibold tracking-[-0.01em] text-[#111111]"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
