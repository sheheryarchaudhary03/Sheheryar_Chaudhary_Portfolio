import { Check } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/content/profile";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-secondary py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title={["Where I'm making", "an impact today."]}
          description="One role, eighteen responsibilities and a single goal: make the brand impossible to ignore — and easy to choose."
        />

        <Reveal className="mt-16 sm:mt-20">
          <article className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_30px_80px_-40px_rgb(0_0_0/0.25)]">
            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:p-14">
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand/12 px-3 py-1 text-xs font-medium text-foreground">
                    <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
                    {experience.period}
                  </span>
                  <span className="text-[13px] text-muted-foreground">
                    {experience.department} · {experience.location}
                  </span>
                </div>
                <h3 className="mt-6 text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
                  {experience.role}
                </h3>
                <p className="mt-3 text-[17px] font-medium text-foreground">
                  {experience.company}
                  <span className="mt-1 block text-[13px] font-normal text-muted-foreground">{experience.companyLegal}</span>
                </p>
                <p className="mt-6 text-[17px] leading-relaxed text-pretty text-muted-foreground">{experience.summary}</p>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <p className="eyebrow">Highlights</p>
                <ul className="mt-5 space-y-4">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3.5 text-[16px] leading-relaxed text-copy">
                      <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                        <Check className="size-3" aria-hidden="true" strokeWidth={3} />
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <RevealGroup
              stagger={0.08}
              className="grid gap-px border-t border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
            >
              {experience.groups.map((group, i) => (
                <RevealItem key={group.title} className="bg-card p-7 sm:p-8">
                  <p className="flex items-center justify-between">
                    <span className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">{group.title}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">0{i + 1}</span>
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[14.5px] text-muted-foreground">
                        <span aria-hidden="true" className="h-px w-3 bg-border-strong" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              ))}
            </RevealGroup>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
