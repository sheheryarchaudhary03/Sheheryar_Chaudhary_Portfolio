"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Glass card with a soft brand-tinted light that tracks the pointer.
 * Purely decorative; content stays fully static and accessible.
 */
export function SpotlightCard({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <Component
      ref={ref as React.Ref<never>}
      onPointerMove={onPointerMove}
      className={cn("spotlight relative isolate overflow-hidden", className)}
    >
      {children}
    </Component>
  );
}
