"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";

import { LocalTime } from "@/components/effects/local-time";
import { RotatingWords } from "@/components/effects/rotating-words";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitText } from "@/components/motion/split-text";
import { useIntro } from "@/components/providers/intro";
import { SceneSlot } from "@/components/three/scene-slot";
import { useScene } from "@/components/three/store";
import { Button } from "@/components/ui/button";
import { stats } from "@/content/profile";
import { siteConfig } from "@/content/site";
import { EASE } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay } }),
};

export function Hero() {
  const { ready } = useIntro();
  const state = ready ? "show" : "hidden";
  const portrait = siteConfig.portrait;
  // Once the WebGL portrait is drawn, the server-rendered image steps aside.
  const portrait3d = useScene((s) => s.portrait3d);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+0.5rem)]"
    >
      {/* Soft clay glow — visible before (or without) WebGL */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[62%] left-1/2 size-[min(80vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_40%_35%,var(--brand-soft),transparent_65%)] opacity-40 blur-3xl" />
      </div>

      <SceneSlot
        scene="hero"
        rootId="hero"
        anchorId="hero-stage"
        portrait={portrait && { src: portrait.src, glow: portrait.glow, aspect: portrait.width / portrait.height }}
        className="absolute inset-0"
      />

      <div className="container-page relative flex min-h-[calc(100svh-var(--header-h))] flex-col pb-8">
        <motion.div
          initial="hidden"
          animate={state}
          variants={fadeUp}
          custom={0.05}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <span className="clay inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-[13px] font-medium text-foreground">
            <span className="relative flex size-5 items-center justify-center">
              <span className="absolute size-2 animate-pulse-ring rounded-full bg-brand" />
              <span className="relative size-2 rounded-full bg-brand" />
            </span>
            Available for select projects
          </span>
          <p className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {siteConfig.location}
            <span aria-hidden="true">·</span>
            <LocalTime />
          </p>
        </motion.div>

        <h1 id="hero-title" className="mt-8 text-center sm:mt-6">
          <span className="sr-only">
            {siteConfig.name} — {siteConfig.roles.join(", ")}
          </span>
          <span
            aria-hidden="true"
            className="block text-[clamp(2.4rem,6vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-foreground"
          >
            <SplitText play={ready} delay={0.1} lines={["Hi, I'm Sheheryar"]} />
          </span>
          <motion.span
            aria-hidden="true"
            initial="hidden"
            animate={state}
            variants={fadeUp}
            custom={0.45}
            className="serif-italic block text-[clamp(2.9rem,8.6vw,8.25rem)] leading-[0.95] text-brand"
          >
            <RotatingWords words={siteConfig.heroRoles} />
          </motion.span>
        </h1>

        <div className="relative mt-2 grid flex-1 items-end gap-8 lg:mt-0 lg:grid-cols-[1fr_minmax(0,1.2fr)_1fr] lg:gap-6">
          {/* Stage: the 3D sculpture (or portrait) is anchored to this box */}
          <div
            id="hero-stage"
            className="relative order-1 mx-auto aspect-[1/0.92] w-full max-w-[34rem] lg:order-2 lg:max-w-none"
          >
            {portrait && (
              <Image
                src={portrait.src}
                width={portrait.width}
                height={portrait.height}
                alt={`Portrait of ${siteConfig.name}`}
                priority
                sizes="(min-width: 1024px) 34vw, 90vw"
                className={`absolute inset-x-0 bottom-0 mx-auto h-full w-auto object-contain object-bottom transition-opacity duration-700 ${portrait3d ? "opacity-0" : "opacity-100"}`}
              />
            )}
          </div>

          <motion.dl
            initial="hidden"
            animate={state}
            variants={fadeUp}
            custom={0.9}
            className="clay order-3 grid max-w-sm grid-cols-2 gap-x-6 gap-y-5 rounded-[1.75rem] p-5 sm:p-6 lg:order-1 lg:mb-8 lg:self-end"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="order-2 text-[12px] leading-snug text-muted-foreground">{stat.label}</dt>
                <dd className="order-1 text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none font-semibold tracking-[-0.05em] text-foreground">
                  <Counter value={stat.value} suffix={stat.suffix} play={ready} />
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            initial="hidden"
            animate={state}
            variants={fadeUp}
            custom={0.8}
            className="order-2 lg:order-3 lg:mb-8 lg:self-end"
          >
            <p className="max-w-md text-[clamp(1.15rem,1.55vw,1.4rem)] leading-snug font-medium tracking-[-0.02em] text-balance text-foreground">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-pretty text-muted-foreground">
              Branding, UI/UX, graphic design and marketing strategy — with business thinking at the core.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Magnetic>
                <Button asChild size="lg">
                  <Link href="/#work">
                    View selected work
                    <ArrowDown className="transition-transform duration-500 ease-out-expo group-hover/button:translate-y-0.5" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild size="lg" variant="glass">
                  <a href={siteConfig.resume.pdf} download="Sheheryar-Chaudhary-Resume.pdf">
                    Résumé
                    <Download className="transition-transform duration-500 ease-out-expo group-hover/button:translate-y-0.5" />
                  </a>
                </Button>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate={state}
          variants={fadeUp}
          custom={1}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <p className="eyebrow">Brands I&apos;ve shaped</p>
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {siteConfig.brands.map((brand) => (
              <li key={brand.name}>
                {/* Logos sit on a fixed light chip so they read in both themes. */}
                <span className="flex h-14 items-center justify-center rounded-2xl bg-[#f7f8f2]/95 px-5 shadow-[var(--clay-shadow)] ring-1 ring-black/5 transition-transform duration-500 ease-out-expo hover:-translate-y-1 sm:h-16 sm:px-6">
                  {brand.logo ? (
                    <Image
                      src={brand.logo.src}
                      width={brand.logo.width}
                      height={brand.logo.height}
                      alt={`${brand.name} logo`}
                      sizes="96px"
                      className="h-9 w-auto sm:h-11"
                    />
                  ) : (
                    <span className="text-[1.35rem] font-semibold tracking-[-0.055em] text-[#0b0b0f] lowercase">
                      {brand.name}
                      <span className="text-[#6d5bff]">.</span>
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
