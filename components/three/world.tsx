"use client";

import { Component, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor, View } from "@react-three/drei";

import { sceneStore, useScene } from "./store";

class GLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    sceneStore.set({ gl: false });
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Views render with autoClear off, so on a transparent canvas the whole
 * surface must be wiped once per frame before any view draws (priority -1
 * runs first and does not take over rendering).
 */
function ClearEachFrame() {
  useFrame(({ gl }) => {
    gl.setScissorTest(false);
    gl.clear(true, true, true);
  }, -1);
  return null;
}

/**
 * One fixed, transparent WebGL canvas behind the page. Sections register
 * <View> slots that this canvas renders into (scissored), so every scene
 * scrolls with its DOM anchor and only on-screen scenes cost GPU time.
 */
export default function World() {
  const quality = useScene((s) => s.quality);
  const maxDpr = quality === "high" ? 1.75 : 1.25;
  const [dpr, setDpr] = useState(maxDpr);

  return (
    <GLBoundary>
      <Canvas
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
        dpr={[1, Math.min(dpr, maxDpr)]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => sceneStore.set({ gl: true })}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(maxDpr)} />
        <ClearEachFrame />
        <View.Port />
      </Canvas>
    </GLBoundary>
  );
}
