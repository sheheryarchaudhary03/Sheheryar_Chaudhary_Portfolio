"use client";

import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

import type { SlotProps } from "./slot-view";
import { useScene } from "./store";

const SlotView = dynamic(() => import("./slot-view"), { ssr: false });

/**
 * A positioned placeholder that the WebGL world renders a scene into.
 * Decorative only: hidden from assistive tech and never intercepts input.
 */
export function SceneSlot({ className, ...props }: SlotProps & { className?: string }) {
  const ready = useScene((s) => s.gl);
  return (
    <div aria-hidden="true" className={cn("pointer-events-none", className)}>
      {ready && <SlotView {...props} />}
    </div>
  );
}
