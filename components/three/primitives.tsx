"use client";

import { useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";

import { palettes, type ScenePalette } from "./palette";
import { sceneStore, useScene } from "./store";

/* ------------------------------------------------------------------ */
/* State hooks                                                         */
/* ------------------------------------------------------------------ */

export function usePalette(): ScenePalette {
  return palettes[useScene((s) => s.theme)];
}

export const useReduced = () => useScene((s) => s.reduced);
export const useQuality = () => useScene((s) => s.quality);

/** Deterministic PRNG (mulberry32) so layouts are stable across renders. */
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * World-space size of the z=0 plane for a view's camera. The aspect comes
 * from the camera, which drei's View keeps in sync with the tracked element.
 */
export function useViewSize(fov: number, distance: number) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const [aspect, setAspect] = useState(() => camera.aspect || 1.6);
  useFrame(() => {
    if (camera.aspect && Math.abs(camera.aspect - aspect) > 0.01) setAspect(camera.aspect);
  });
  const height = 2 * distance * Math.tan(THREE.MathUtils.degToRad(fov / 2));
  return { width: height * aspect, height, aspect };
}

/* ------------------------------------------------------------------ */
/* Lighting                                                            */
/* ------------------------------------------------------------------ */

/** Soft studio light with a generated environment — no HDR downloads. */
export function Studio({ glow = 1 }: { glow?: number }) {
  const p = usePalette();
  const theme = useScene((s) => s.theme);
  return (
    <>
      <ambientLight intensity={p.ambient} />
      <directionalLight position={[3, 6, 6]} intensity={p.key} color="#fff8ec" />
      <directionalLight position={[-6, -1, -3]} intensity={0.55} color={p.glow} />
      {p.fog && <fog attach="fog" args={[p.fog, 12, 28]} />}
      <Environment key={theme} resolution={128} frames={1} environmentIntensity={p.env}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 6]} scale={[10, 4, 1]} />
        <Lightformer form="circle" intensity={1.4 * glow} color={p.glow} position={[-6, 0, 2]} scale={5} />
        <Lightformer form="rect" intensity={0.9} position={[6, -2, 2]} scale={[3, 8, 1]} />
        <Lightformer form="ring" intensity={0.6} color={p.greens[2]} position={[0, -5, -4]} scale={6} />
      </Environment>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Materials                                                           */
/* ------------------------------------------------------------------ */

let foamTexture: THREE.CanvasTexture | null = null;

/** Procedural pore texture for the porous "foam" spheres in the references. */
function getFoamTexture() {
  if (foamTexture) return foamTexture;
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#8a8a8a";
  ctx.fillRect(0, 0, size, size);
  const rand = seeded(11);
  for (let i = 0; i < 1600; i++) {
    const shade = Math.floor(30 + rand() * 70);
    ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
    ctx.beginPath();
    ctx.arc(rand() * size, rand() * size, 0.6 + rand() * 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  foamTexture = new THREE.CanvasTexture(canvas);
  foamTexture.wrapS = foamTexture.wrapT = THREE.RepeatWrapping;
  foamTexture.repeat.set(3, 2);
  return foamTexture;
}

export type Finish = "clay" | "gloss" | "foam";

export function finishProps(finish: Finish) {
  switch (finish) {
    case "gloss":
      return { roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.08, sheen: 0 };
    case "foam":
      return { roughness: 0.92, clearcoat: 0, sheen: 0.4, sheenRoughness: 0.9, bumpMap: getFoamTexture(), bumpScale: 2.2 };
    default:
      return { roughness: 0.55, clearcoat: 0.3, clearcoatRoughness: 0.45, sheen: 0.6, sheenRoughness: 0.6, sheenColor: "#ffffff" };
  }
}

/* ------------------------------------------------------------------ */
/* Shapes                                                              */
/* ------------------------------------------------------------------ */

type MeshProps = Omit<ThreeElements["mesh"], "ref">;

/** Soft-body clay blob that slowly breathes. */
export function Blob({
  color,
  distort = 0.32,
  speed = 1.2,
  ...props
}: MeshProps & { color: string; distort?: number; speed?: number }) {
  const reduced = useReduced();
  const segments = useQuality() === "high" ? 96 : 48;
  return (
    <mesh {...props}>
      <sphereGeometry args={[1, segments, segments]} />
      <MeshDistortMaterial color={color} distort={distort} speed={reduced ? 0 : speed} radius={1} {...finishProps("clay")} />
    </mesh>
  );
}

/** A clay, gloss or foam sphere. */
export function Ball({ color, finish = "clay", ...props }: MeshProps & { color: string; finish?: Finish }) {
  const segments = useQuality() === "high" ? 48 : 28;
  return (
    <mesh {...props}>
      <sphereGeometry args={[1, segments, segments]} />
      <meshPhysicalMaterial color={color} {...finishProps(finish)} />
    </mesh>
  );
}

/** Gentle floating motion; still for reduced-motion users. */
export function Drift({
  children,
  speed = 1,
  intensity = 1,
  ...props
}: { children: ReactNode; speed?: number; intensity?: number } & Omit<ThreeElements["group"], "ref">) {
  const reduced = useReduced();
  return (
    <Float enabled={!reduced} speed={speed} rotationIntensity={0.35 * intensity} floatIntensity={0.7 * intensity} {...props}>
      {children}
    </Float>
  );
}

/** Tilts its children toward the pointer for a tactile, dimensional feel. */
export function PointerParallax({
  children,
  strength = 0.18,
  ...props
}: { children: ReactNode; strength?: number } & Omit<ThreeElements["group"], "ref">) {
  const ref = useRef<THREE.Group>(null);
  const reduced = useReduced();
  useFrame((_, delta) => {
    if (!ref.current || reduced) return;
    const { x, y } = sceneStore.get().pointer;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, x * strength, 2.5, delta);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, -y * strength * 0.5, 2.5, delta);
  });
  return (
    <group ref={ref} {...props}>
      {children}
    </group>
  );
}

let shadowTexture: THREE.CanvasTexture | null = null;

function getShadowTexture() {
  if (shadowTexture) return shadowTexture;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  shadowTexture = new THREE.CanvasTexture(canvas);
  return shadowTexture;
}

/** Cheap camera-facing contact shadow (an ellipse), no shadow maps needed. */
export function SoftShadow({ opacity = 0.35, ...props }: MeshProps & { opacity?: number }) {
  const p = usePalette();
  return (
    <mesh renderOrder={-1} {...props}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={getShadowTexture()} color={p.deep} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}
