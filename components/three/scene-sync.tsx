"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

import { sceneStore } from "./store";

/** Feeds theme, pointer, motion and device-quality signals into the scene store. */
export function SceneSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    sceneStore.set({ theme: resolvedTheme === "dark" ? "dark" : "light" });
  }, [resolvedTheme]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

    const update = () => {
      const lowPower =
        (nav.hardwareConcurrency ?? 8) <= 4 ||
        (nav.deviceMemory ?? 8) <= 4 ||
        nav.connection?.saveData === true ||
        (coarse.matches && window.innerWidth < 768);
      sceneStore.set({ reduced: reduced.matches, quality: lowPower ? "low" : "high" });
    };
    update();
    reduced.addEventListener("change", update);

    const onPointer = (event: PointerEvent) => {
      sceneStore.setPointer((event.clientX / window.innerWidth) * 2 - 1, -((event.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      reduced.removeEventListener("change", update);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return null;
}
