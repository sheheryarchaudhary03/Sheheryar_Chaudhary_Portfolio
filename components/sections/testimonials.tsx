"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/content/profile";
import { cn, EASE } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(regionRef, { amount: 0.4 });
  const count = testimonials.length;
  const autoplay = inView && !paused && !reduced;

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, autoplay, go]);

  const current = testimonials[index];

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          id="testimonials-title"
          index="07"
          eyebrow="Testimonials"
          title={["Kind words from", { text: "the people I work with.", className: "serif-italic text-brand" }]}
        />

        <div
          ref={regionRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          className="clay mt-16 rounded-[2.25rem] p-6 sm:mt-20 sm:p-10 lg:p-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <svg aria-hidden="true" viewBox="0 0 48 36" className="h-auto w-14 text-brand sm:w-16">
                <path
                  fill="currentColor"
                  d="M0 36V22.6C0 9.9 6.4 2.4 18.2 0l2.2 4.6C13.7 6.6 10.4 10.4 10 16h9.2v20H0Zm27.6 0V22.6C27.6 9.9 34 2.4 45.8 0L48 4.6c-6.7 2-10 5.8-10.4 11.4h9.2v20H27.6Z"
                />
              </svg>
            </div>

            <div className="lg:col-span-10">
              <div aria-live={paused ? "polite" : "off"} className="grid min-h-[16rem] sm:min-h-[14rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={index}
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${count}`}
                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="col-start-1 row-start-1"
                  >
                    <blockquote className="text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.15] font-semibold tracking-[-0.035em] text-balance text-foreground">
                      {current.quote}
                    </blockquote>
                    <figcaption className="mt-10 flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="flex size-12 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background"
                      >
                        {current.author
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                      <span>
                        <span className="block text-[15px] font-semibold text-foreground">{current.author}</span>
                        <span className="block text-[14px] text-muted-foreground">{current.context}</span>
                      </span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              <div className="mt-12 flex items-center justify-between gap-6 border-t border-border pt-6">
                <div className="flex items-center gap-2" role="group" aria-label="Choose testimonial">
                  {testimonials.map((t, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-pressed={i === index}
                      aria-label={`Testimonial ${i + 1}: ${t.author}, ${t.context}`}
                      onClick={() => setIndex(i)}
                      className="group relative h-8 w-10 sm:w-14"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-border-strong">
                        <span
                          key={i === index ? `active-${index}` : "idle"}
                          className={cn(
                            "absolute inset-0 origin-left rounded-full bg-foreground",
                            i === index ? "scale-x-100" : "scale-x-0",
                          )}
                          style={
                            i === index && autoplay
                              ? { animation: `testimonial-progress ${AUTOPLAY_MS}ms linear` }
                              : undefined
                          }
                        />
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="inline-flex size-12 items-center justify-center rounded-full border border-border-strong text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    <span className="sr-only">Previous testimonial</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="inline-flex size-12 items-center justify-center rounded-full border border-border-strong text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    <ArrowRight className="size-4" aria-hidden="true" />
                    <span className="sr-only">Next testimonial</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
