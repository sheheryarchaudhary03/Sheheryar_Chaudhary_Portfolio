import { ArrowUpRight } from "lucide-react";

import { SpotlightCard } from "@/components/effects/spotlight-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { skills, tools } from "@/content/profile";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="bg-secondary py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          index="04"
          eyebrow="Skills & Tools"
          title={["Craft across", "the full funnel."]}
          description="From the first sketch to the final report — the disciplines and tools I bring to every brief."
        />

        <div className="mt-16 grid gap-16 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <RevealGroup stagger={0.05} className="lg:col-span-7">
            <ul className="border-t border-border">
              {skills.map((skill, i) => (
                <RevealItem
                  as="li"
                  key={skill.title}
                  className="group relative grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-border py-5 sm:grid-cols-[3rem_1fr_auto] sm:py-6"
                >
                  <span className="text-xs text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[clamp(1.35rem,2.4vw,1.9rem)] leading-tight font-semibold tracking-[-0.035em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
                      {skill.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{skill.detail}</p>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 -translate-x-2 text-brand opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h3 className="eyebrow">Daily toolkit</h3>
              </Reveal>
              <RevealGroup stagger={0.05} className="mt-6 grid grid-cols-2 gap-3">
                {tools.map((tool) => (
                  <RevealItem key={tool.name}>
                    <SpotlightCard className="group h-full rounded-2xl border border-border bg-card p-5 transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-border-strong">
                      <span
                        aria-hidden="true"
                        className="flex size-10 items-center justify-center rounded-xl bg-foreground text-[13px] font-semibold tracking-[-0.02em] text-background transition-colors duration-500 group-hover:bg-brand group-hover:text-brand-foreground"
                      >
                        {tool.short}
                      </span>
                      <p className="mt-5 text-[15px] font-semibold tracking-[-0.015em] text-foreground">{tool.name}</p>
                      <p className="mt-0.5 text-[13px] text-muted-foreground">{tool.use}</p>
                    </SpotlightCard>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
