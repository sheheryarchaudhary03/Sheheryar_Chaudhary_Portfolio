"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny external store shared between the DOM and the WebGL scenes. Lives
 * outside React context so it works regardless of how scenes are portalled
 * into the canvas. Pointer updates never notify (read them in useFrame).
 */
export type SceneTheme = "light" | "dark";
export type SceneQuality = "high" | "low";

type SceneState = {
  /** Pointer position normalised to the window, -1..1 (y up). */
  pointer: { x: number; y: number };
  theme: SceneTheme;
  reduced: boolean;
  quality: SceneQuality;
  /** True once the WebGL canvas has mounted successfully. */
  gl: boolean;
};

const state: SceneState = {
  pointer: { x: 0, y: 0 },
  theme: "light",
  reduced: false,
  quality: "high",
  gl: false,
};

const listeners = new Set<() => void>();

export const sceneStore = {
  get: () => state,
  set(partial: Partial<Omit<SceneState, "pointer">>) {
    let changed = false;
    for (const [key, value] of Object.entries(partial) as [keyof SceneState, never][]) {
      if (state[key] !== value) {
        state[key] = value;
        changed = true;
      }
    }
    if (changed) listeners.forEach((listener) => listener());
  },
  setPointer(x: number, y: number) {
    state.pointer.x = x;
    state.pointer.y = y;
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

/** Subscribe to a primitive slice of the scene state. */
export function useScene<T extends string | number | boolean>(selector: (s: SceneState) => T): T {
  return useSyncExternalStore(
    sceneStore.subscribe,
    () => selector(state),
    () => selector(state),
  );
}
