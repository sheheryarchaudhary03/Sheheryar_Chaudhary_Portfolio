"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";

import { LocalTime } from "@/components/effects/local-time";
import { RotatingWords } from "@/components/effects/rotating-words";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitText } from "@/components/motion/split-text";
import { useIntro } from "@/components/providers/intro";
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  const state = ready ? "show" : "hidden";

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[calc(var(--header-h)+1.5rem)]"
    >
      {/* Background: masked grid, parallax glow orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0" />
        <motion.div
          style={{ y: orbY, scale: orbScale }}
          className="absolute -top-[18%] -right-[12%] size-[min(78vw,920px)] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_62%)]"
        />
        <motion.div
          style={{ y: orbY }}
          className="absolute -bottom-[30%] -left-[18%] size-[min(70vw,760px)] rounded-full bg-[radial-gradient(circle,rgb(17_17_17/0.05),transparent_65%)] dark:bg-[radial-gradient(circle,rgb(255_255_255/0.05),transparent_65%)]"
        />
      </div>

      <div className="container-page flex flex-1 flex-col justify-between gap-12 pb-8 sm:gap-16 sm:pb-10">
        <motion.div
          initial="hidden"
          animate={state}
          variants={fadeUp}
          custom={0.05}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <span className="glass inline-flex items-center gap-2.5 rounded-full border border-border py-1.5 pr-4 pl-2 text-[13px] font-medium text-foreground">
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

        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.p
            initial="hidden"
            animate={state}
            variants={fadeUp}
            custom={0.1}
            className="mb-6 flex flex-wrap items-baseline gap-x-2 text-[clamp(1rem,1.6vw,1.25rem)] text-muted-foreground sm:mb-8"
          >
            <span className="font-medium text-foreground">{siteConfig.name}</span>
            <span aria-hidden="true" className="text-border-strong">
              —
            </span>
            <RotatingWords words={siteConfig.roles} className="text-foreground/80" />
          </motion.p>

          <h1 id="hero-title" className="text-[clamp(2.6rem,8.4vw,8.75rem)] text-display text-balance">
            <SplitText
              play={ready}
              delay={0.15}
              stagger={0.055}
              lines={[
                "Creating brands,",
                { text: "digital experiences", className: "text-muted-foreground" },
                "& marketing that",
                "drive results.",
              ]}
            />
          </h1>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <motion.p
            initial="hidden"
            animate={state}
            variants={fadeUp}
            custom={0.75}
            className="max-w-md text-[17px] leading-relaxed text-pretty text-muted-foreground lg:col-span-5"
          >
            I combine branding, UI/UX, graphic design and marketing strategy — with business thinking at the core — to
            build brands people remember and choose.
          </motion.p>
          <motion.div
            initial="hidden"
            animate={state}
            variants={fadeUp}
            custom={0.85}
            className="flex flex-wrap gap-3 lg:col-span-7 lg:justify-end"
          >
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/#work">
                  View selected work
                  <ArrowDown className="transition-transform duration-500 ease-out-expo group-hover/button:translate-y-0.5" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="glass" className="border-border-strong">
                <a href={siteConfig.resume.pdf} download="Sheheryar-Chaudhary-Resume.pdf">
                  Download résumé
                  <Download className="transition-transform duration-500 ease-out-expo group-hover/button:translate-y-0.5" />
                </a>
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        <motion.dl
          initial="hidden"
          animate={state}
          variants={fadeUp}
          custom={0.95}
          className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1.5">
              <dt className="order-2 max-w-[14rem] text-[13px] leading-snug text-muted-foreground">{stat.label}</dt>
              <dd className="order-1 text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.05em] text-foreground">
                <Counter value={stat.value} suffix={stat.suffix} play={ready} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
