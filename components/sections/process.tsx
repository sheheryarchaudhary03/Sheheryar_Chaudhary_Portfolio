"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { processSteps } from "@/content/profile";
import { EASE } from "@/lib/utils";

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="process" aria-labelledby="process-title" className="bg-secondary py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          index="06"
          eyebrow="Design Process"
          title={["A process built", "around outcomes."]}
          description="Five deliberate stages that keep creativity accountable to the business — and make every decision explainable."
        />

        <ol ref={ref} className="relative mt-16 sm:mt-24">
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-5 w-px bg-border-strong sm:left-6" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute top-0 bottom-0 left-5 w-px origin-top bg-brand sm:left-6"
          />

          {processSteps.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-16 last:pb-0 sm:grid-cols-[3rem_1fr] sm:gap-x-8 sm:pb-20">
              <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-border-strong bg-background text-[12px] font-semibold text-foreground tabular-nums sm:size-12">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-brand"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ amount: 1, margin: "0px 0px -35% 0px" }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
                <span className="relative">{String(i + 1).padStart(2, "0")}</span>
              </span>

              <Reveal className="grid gap-6 pt-1 lg:grid-cols-12 lg:gap-10">
                <h3 className="text-[clamp(2rem,4.4vw,3.75rem)] leading-[0.95] font-semibold tracking-[-0.045em] lg:col-span-5">
                  {step.title}
                </h3>
                <div className="lg:col-span-7 lg:pt-2">
                  <p className="max-w-xl text-[17px] leading-relaxed text-pretty text-muted-foreground">{step.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${step.title} outputs`}>
                    {step.outputs.map((output) => (
                      <li
                        key={output}
                        className="rounded-full border border-border bg-background px-3 py-1 text-[12.5px] text-foreground/80"
                      >
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
