"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { SceneSync } from "./scene-sync";

const World = dynamic(() => import("./world"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

/**
 * Mounts the WebGL world after the page is interactive, and only where WebGL
 * exists. Content never waits on three.js.
 */
export function WorldLoader() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!supportsWebGL()) return;
    const start = () => setMount(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 250);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <SceneSync />
      {mount && <World />}
    </>
  );
}
