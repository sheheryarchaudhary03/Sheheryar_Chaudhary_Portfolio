"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, RoundedBox } from "@react-three/drei";

import {
  Ball,
  Blob,
  Drift,
  PointerParallax,
  SoftShadow,
  Studio,
  seeded,
  usePalette,
  useQuality,
  useReduced,
  useViewSize,
  type Finish,
} from "./primitives";

const FOV = 30;
const DISTANCE = 12;

function Camera() {
  return <PerspectiveCamera makeDefault position={[0, 0, DISTANCE]} fov={FOV} near={0.1} far={60} />;
}

/** Scroll progress (0..1) of a DOM section through the viewport. */
function sectionProgress(id: string) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const travel = Math.max(rect.height - vh * 0.35, 1);
  return THREE.MathUtils.clamp((vh * 0.55 - rect.top) / travel, 0, 1);
}

/* ------------------------------------------------------------------ */
/* Hero — an arch of clay & foam spheres framing a breathing sculpture */
/* ------------------------------------------------------------------ */

const STAGE_UNITS = 4; // the stage composition is authored 4 units tall

export function HeroScene({
  rootId,
  anchorId,
  centerpiece = true,
}: {
  rootId: string;
  anchorId: string;
  /** The breathing sculpture; hidden when a portrait fills the stage. */
  centerpiece?: boolean;
}) {
  const p = usePalette();
  const quality = useQuality();
  const reduced = useReduced();
  const stage = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const moon = useRef<THREE.Group>(null);
  const view = useViewSize(FOV, DISTANCE);

  const arch = useMemo(() => {
    const rand = seeded(42);
    const count = quality === "high" ? 30 : 18;
    const colors = [p.greens[0], p.greens[1], p.beiges[0], p.greens[2], p.beiges[1], p.greens[3], p.cream];
    return Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1);
      const angle = THREE.MathUtils.degToRad(6 + t * 168);
      const jitter = (rand() - 0.5) * 0.35;
      const color = colors[Math.floor(rand() * colors.length)];
      const finish: Finish = color === p.beiges[0] || color === p.beiges[1] ? "foam" : rand() > 0.85 ? "gloss" : "clay";
      return {
        position: [Math.cos(angle) * (2.25 + jitter), -2 + Math.sin(angle) * (3.65 + jitter), (rand() - 0.5) * 0.9] as THREE.Vector3Tuple,
        scale: 0.2 + rand() * 0.36 + (Math.sin(t * Math.PI) < 0.35 ? 0.12 : 0),
        color,
        finish,
        speed: 0.6 + rand() * 0.8,
      };
    });
  }, [p, quality]);

  const floaters = useMemo(() => {
    const rand = seeded(7);
    const count = quality === "high" ? 12 : 6;
    return Array.from({ length: count }, () => ({
      position: [(rand() - 0.5) * 1.9, (rand() - 0.5) * 1.8, -1.5 - rand() * 3] as THREE.Vector3Tuple,
      scale: 0.06 + rand() * 0.16,
      color: [p.greens[2], p.beiges[1], p.cream, p.greens[0]][Math.floor(rand() * 4)],
      speed: 0.8 + rand(),
    }));
  }, [p, quality]);

  // Keep the sculpture locked to the DOM stage, at any viewport size.
  useFrame((state, delta) => {
    const root = document.getElementById(rootId)?.getBoundingClientRect();
    const anchor = document.getElementById(anchorId)?.getBoundingClientRect();
    if (stage.current && root && anchor && root.height > 0) {
      const cx = (anchor.left + anchor.width / 2 - root.left) / root.width - 0.5;
      const cy = 0.5 - (anchor.top + anchor.height / 2 - root.top) / root.height;
      stage.current.position.set(cx * view.width, cy * view.height, 0);
      stage.current.scale.setScalar(((anchor.height / root.height) * view.height) / STAGE_UNITS);
    }
    if (reduced) return;
    if (ring.current) ring.current.rotation.z += delta * 0.15;
    if (moon.current) moon.current.rotation.y = state.clock.elapsedTime * 0.35;
  });

  return (
    <>
      <Camera />
      <Studio />
      <PointerParallax strength={0.16}>
        <group ref={stage}>
          {/* Arch */}
          {arch.map((s, i) => (
            <Drift key={i} position={s.position} speed={s.speed} intensity={0.35}>
              <Ball scale={s.scale} color={s.color} finish={s.finish} />
            </Drift>
          ))}
          <Blob position={[-2.15, -1.75, 0.3]} scale={0.78} color={p.greens[1]} distort={0.38} />
          <Blob position={[2.2, -1.85, 0.1]} scale={0.66} color={p.beiges[0]} distort={0.3} speed={1} />

          {/* Centrepiece — the portrait slot until a photo is supplied */}
          <Drift speed={0.9} intensity={0.5}>
            {centerpiece && <Blob position={[0, -0.35, 0.2]} scale={1.08} color={p.greens[0]} distort={0.36} />}
            <mesh ref={ring} position={[0, -0.35, 0.2]} rotation={[1.15, 0.2, 0]}>
              <torusGeometry args={[1.62, 0.045, 24, 160]} />
              <meshPhysicalMaterial color={p.cream} roughness={0.25} clearcoat={1} />
            </mesh>
            <group ref={moon} position={[0, -0.35, 0.2]}>
              <Ball position={[1.55, 0.55, 0]} scale={0.3} color={p.beiges[1]} finish="foam" />
              <Ball position={[-1.35, -0.75, 0.2]} scale={0.17} color={p.greens[2]} finish="gloss" />
            </group>
          </Drift>
          <SoftShadow position={[0, -2.05, -0.4]} scale={[4.4, 0.9, 1]} opacity={0.3} />
        </group>

        {/* Small spheres scattered through the whole hero */}
        {floaters.map((f, i) => (
          <Drift
            key={i}
            position={[f.position[0] * view.width, f.position[1] * view.height, f.position[2]]}
            speed={f.speed}
            intensity={0.8}
          >
            <Ball scale={f.scale} color={f.color} finish="clay" />
          </Drift>
        ))}
      </PointerParallax>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Process — stairs; a glossy ball climbs one step per stage on scroll */
/* ------------------------------------------------------------------ */

export function StairsScene({ progressId, steps = 5 }: { progressId: string; steps?: number }) {
  const p = usePalette();
  const reduced = useReduced();
  const ball = useRef<THREE.Mesh>(null);
  const progress = useRef(0);
  const activeRef = useRef(-1);
  const materials = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);

  const blocks = useMemo(
    () =>
      Array.from({ length: steps }, (_, i) => {
        const height = 0.55 + i * 0.5;
        return { x: (i - (steps - 1) / 2) * 1.12, height, top: -1.9 + height };
      }),
    [steps],
  );

  useFrame((_, delta) => {
    const target = sectionProgress(progressId);
    progress.current = reduced ? target : THREE.MathUtils.damp(progress.current, target, 4, delta);
    const t = progress.current * (steps - 1);
    const i0 = Math.min(Math.floor(t), steps - 2);
    const f = t - i0;
    const a = blocks[i0];
    const b = blocks[i0 + 1];
    if (ball.current) {
      ball.current.position.set(
        THREE.MathUtils.lerp(a.x, b.x, f),
        THREE.MathUtils.lerp(a.top, b.top, f) + 0.34 + Math.sin(f * Math.PI) * 0.55,
        0,
      );
      ball.current.rotation.z -= delta * 1.5;
    }
    const active = Math.round(t);
    if (active !== activeRef.current) {
      activeRef.current = active;
      materials.current.forEach((m, i) => m?.color.set(i <= active ? p.greens[i === active ? 1 : 0] : i % 2 ? p.beiges[1] : p.beiges[0]));
    }
  });

  return (
    <>
      <Camera />
      <Studio />
      <PointerParallax strength={0.12}>
        <group rotation={[0.22, -0.55, 0]} position={[0, -0.2, 0]}>
          {blocks.map((block, i) => (
            <RoundedBox
              key={i}
              args={[1.05, block.height, 1.1]}
              radius={0.1}
              smoothness={4}
              position={[block.x, -1.9 + block.height / 2, 0]}
            >
              <meshPhysicalMaterial
                ref={(m) => {
                  materials.current[i] = m;
                }}
                color={i % 2 ? p.beiges[1] : p.beiges[0]}
                roughness={0.7}
                clearcoat={0.2}
                sheen={0.4}
              />
            </RoundedBox>
          ))}
          <mesh ref={ball} castShadow={false}>
            <sphereGeometry args={[0.34, 48, 48]} />
            <meshPhysicalMaterial color={p.greens[1]} roughness={0.15} clearcoat={1} clearcoatRoughness={0.06} />
          </mesh>
          <Drift position={[-3.5, 0.9, -1.6]} speed={0.8}>
            <Blob scale={0.42} color={p.greens[2]} />
          </Drift>
          <Drift position={[2.8, 1.6, -1.2]} speed={1.1}>
            <Ball scale={0.22} color={p.cream} finish="foam" />
          </Drift>
        </group>
        <SoftShadow position={[0, -2.15, -1]} scale={[6.5, 1.1, 1]} opacity={0.28} />
      </PointerParallax>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Contact — a glowing podium with a light beam and floating orb       */
/* ------------------------------------------------------------------ */

export function PlatformScene() {
  const p = usePalette();
  const reduced = useReduced();
  const orb = useRef<THREE.Group>(null);
  const beam = useRef<THREE.MeshBasicMaterial>(null);
  const { width } = useViewSize(FOV, DISTANCE);
  const scale = Math.min(1, width / 7.5);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    if (orb.current) {
      orb.current.position.y = 0.55 + Math.sin(t * 1.1) * 0.12;
      orb.current.rotation.y = t * 0.4;
    }
    if (beam.current) beam.current.opacity = 0.1 + Math.sin(t * 1.6) * 0.025;
  });

  return (
    <>
      <Camera />
      <Studio glow={1.6} />
      <pointLight position={[0, -0.6, 1.2]} intensity={6} distance={6} color={p.glow} />
      <PointerParallax strength={0.1}>
        <group position={[0, -1.15, 0]} rotation={[0.2, 0, 0]} scale={scale}>
          {/* Podium */}
          <mesh position={[0, -1.05, 0]}>
            <cylinderGeometry args={[2.05, 2.15, 0.5, 64]} />
            <meshPhysicalMaterial color={p.deep} roughness={0.6} clearcoat={0.3} />
          </mesh>
          <mesh position={[0, -0.66, 0]}>
            <cylinderGeometry args={[1.7, 1.78, 0.32, 64]} />
            <meshPhysicalMaterial color={p.beiges[0]} roughness={0.7} sheen={0.4} />
          </mesh>
          <mesh position={[0, -0.47, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 0.07, 64]} />
            <meshStandardMaterial color={p.glow} emissive={p.glow} emissiveIntensity={0.75} />
          </mesh>
          {/* Light beam */}
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[1.05, 1.45, 3.3, 48, 1, true]} />
            <meshBasicMaterial
              ref={beam}
              color={p.glow}
              transparent
              opacity={0.1}
              side={THREE.DoubleSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {/* Floating orb */}
          <group ref={orb} position={[0, 0.55, 0]}>
            <Ball scale={0.58} color={p.greens[1]} finish="gloss" />
            <mesh rotation={[1.3, 0, 0]}>
              <torusGeometry args={[0.9, 0.025, 16, 120]} />
              <meshPhysicalMaterial color={p.cream} roughness={0.2} clearcoat={1} />
            </mesh>
          </group>
          {/* Columns */}
          {[-3.4, 3.4].map((x) => (
            <group key={x} position={[x, 0.15, -1.6]}>
              <mesh>
                <cylinderGeometry args={[0.32, 0.36, 3.6, 20]} />
                <meshPhysicalMaterial color={p.beiges[1]} roughness={0.75} flatShading />
              </mesh>
              <RoundedBox args={[0.95, 0.24, 0.95]} radius={0.05} position={[0, 1.9, 0]}>
                <meshPhysicalMaterial color={p.beiges[0]} roughness={0.7} />
              </RoundedBox>
              <RoundedBox args={[0.95, 0.24, 0.95]} radius={0.05} position={[0, -1.9, 0]}>
                <meshPhysicalMaterial color={p.beiges[0]} roughness={0.7} />
              </RoundedBox>
            </group>
          ))}
          {/* Blobs around the base */}
          <Drift position={[-2.35, -0.9, 0.9]} speed={0.9}>
            <Blob scale={0.55} color={p.greens[0]} />
          </Drift>
          <Drift position={[2.4, -0.95, 0.8]} speed={1.2}>
            <Ball scale={0.38} color={p.beiges[1]} finish="foam" />
          </Drift>
          <Drift position={[1.9, 1.9, -0.6]} speed={1}>
            <Ball scale={0.18} color={p.greens[2]} />
          </Drift>
        </group>
      </PointerParallax>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Ambient — clay spheres drifting in a section's margins              */
/* ------------------------------------------------------------------ */

export function AmbientScene({ seed = 1, count = 7 }: { seed?: number; count?: number }) {
  const p = usePalette();
  const quality = useQuality();
  const pxHeight = useThree((s) => s.size.height) || 900;
  const view = useViewSize(FOV, DISTANCE);
  const unitsPerPx = view.height / pxHeight;
  // Narrow screens get smaller spheres that hug the edges, clear of the text.
  const pxWidth = pxHeight * view.aspect;
  const sizeScale = THREE.MathUtils.clamp(pxWidth / 1200, 0.42, 1);
  const edgeScale = pxWidth < 768 ? 0.15 : 1;

  const items = useMemo(() => {
    const rand = seeded(seed * 97);
    const total = quality === "high" ? count : Math.ceil(count / 2);
    return Array.from({ length: total }, (_, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      const sizePx = 26 + rand() * 90;
      const finish: Finish = rand() > 0.7 ? "foam" : rand() > 0.85 ? "gloss" : "clay";
      return {
        side,
        edge: 0.02 + rand() * 0.07, // fraction of width from the edge
        y: (i + 0.5) / total - 0.5 + (rand() - 0.5) * 0.12,
        z: -1.2 + rand() * 1.4,
        sizePx,
        blob: rand() > 0.72,
        color: [p.greens[0], p.greens[2], p.beiges[0], p.cream, p.greens[1]][Math.floor(rand() * 5)],
        finish,
        speed: 0.6 + rand() * 0.9,
      };
    });
  }, [seed, count, quality, p]);

  return (
    <>
      <Camera />
      <Studio />
      <PointerParallax strength={0.08}>
        {items.map((item, i) => {
          const radius = (item.sizePx / 2) * unitsPerPx * sizeScale;
          const x = item.side * (view.width / 2 - item.edge * edgeScale * view.width);
          // Keep every sphere (plus float travel) inside the view so the
          // scissor rect never slices it at a section boundary.
          const limit = view.height / 2 - radius * 1.6 - 0.25;
          const y = THREE.MathUtils.clamp(item.y * view.height, -limit, limit);
          const position: THREE.Vector3Tuple = [x, y, item.z];
          return (
            <Drift key={i} position={position} speed={item.speed} intensity={0.6}>
              {item.blob ? (
                <Blob scale={radius * 1.3} color={item.color} distort={0.28} />
              ) : (
                <Ball scale={radius} color={item.color} finish={item.finish} />
              )}
            </Drift>
          );
        })}
      </PointerParallax>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Frame — blobs peeking from behind a framed cover (case studies)     */
/* ------------------------------------------------------------------ */

export function FrameScene({ inset = 0.09 }: { inset?: number }) {
  const p = usePalette();
  const view = useViewSize(FOV, DISTANCE);
  const ix = view.width / 2 - view.width * inset;
  const iy = view.height / 2 - view.height * inset;
  const base = Math.min(view.width, view.height);

  const pieces: { position: THREE.Vector3Tuple; scale: number; color: string; blob?: boolean; finish?: Finish }[] = [
    { position: [-ix, iy * 0.75, -0.6], scale: base * 0.11, color: p.greens[0], blob: true },
    { position: [ix * 1.02, iy * 0.2, -0.6], scale: base * 0.08, color: p.beiges[0], finish: "foam" },
    { position: [ix * 0.86, -iy, -0.6], scale: base * 0.12, color: p.greens[1], blob: true },
    { position: [-ix * 0.7, -iy * 1.02, -0.6], scale: base * 0.07, color: p.cream, finish: "foam" },
    { position: [-ix * 1.04, -iy * 0.3, -0.8], scale: base * 0.045, color: p.greens[2], finish: "gloss" },
    { position: [ix * 0.4, iy * 1.03, -0.8], scale: base * 0.05, color: p.greens[3] },
  ];

  return (
    <>
      <Camera />
      <Studio />
      <PointerParallax strength={0.07}>
        {pieces.map((piece, i) => (
          <Drift key={i} position={piece.position} speed={0.7 + i * 0.15} intensity={0.5}>
            {piece.blob ? (
              <Blob scale={piece.scale} color={piece.color} />
            ) : (
              <Ball scale={piece.scale} color={piece.color} finish={piece.finish} />
            )}
          </Drift>
        ))}
      </PointerParallax>
    </>
  );
}
