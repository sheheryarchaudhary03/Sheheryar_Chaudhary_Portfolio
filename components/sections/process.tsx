"use client";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SceneSlot } from "@/components/three/scene-slot";
import { processSteps } from "@/content/profile";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          index="06"
          eyebrow="Design Process"
          title={["A process built", { text: "around outcomes.", className: "serif-italic text-brand" }]}
          description="Five deliberate stages that keep creativity accountable to the business — each one a step up from the last."
        />

        <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* The ball climbs one step per stage as the section scrolls */}
          <div className="lg:col-span-5">
            <div className="relative h-[min(72vw,340px)] lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:h-[min(70vh,560px)]">
              <SceneSlot scene="stairs" progressId="process" className="absolute inset-0" />
            </div>
          </div>

          <ol className="flex flex-col gap-4 lg:col-span-7">
            {processSteps.map((step, i) => (
              <li key={step.title}>
                <Reveal>
                  <article className="clay group rounded-[2rem] p-6 sm:p-8">
                    <div className="flex items-start gap-5">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-forest text-[13px] font-semibold text-forest-foreground tabular-nums shadow-[inset_0_1px_0_rgb(255_255_255/0.15),0_10px_20px_-10px_rgb(20_32_18/0.6)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[clamp(1.7rem,3vw,2.5rem)] leading-none font-semibold tracking-[-0.04em]">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-pretty text-muted-foreground">
                          {step.description}
                        </p>
                        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${step.title} outputs`}>
                          {step.outputs.map((output) => (
                            <li
                              key={output}
                              className="rounded-full border border-border bg-background/60 px-3 py-1 text-[12.5px] text-foreground/80"
                            >
                              {output}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
