import { Check } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/content/profile";

/** Layered paper-cut waves — the "Pushing Boundaries" panel from the references. */
function Waves() {
  const layers = [
    { d: "M0 220 C 180 140 320 300 520 210 S 860 120 1000 190 V 600 H 0 Z", fill: "#2a3d26", opacity: 1 },
    { d: "M0 300 C 160 230 360 380 560 290 S 880 230 1000 300 V 600 H 0 Z", fill: "#35502f", opacity: 1 },
    { d: "M0 390 C 200 320 380 470 600 380 S 860 330 1000 400 V 600 H 0 Z", fill: "#456a3c", opacity: 0.9 },
    { d: "M0 480 C 220 420 420 540 640 470 S 880 440 1000 500 V 600 H 0 Z", fill: "#5c8a4c", opacity: 0.75 },
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full"
    >
      <defs>
        <filter id="wave-shadow" x="-5%" y="-20%" width="110%" height="140%">
          <feDropShadow dx="0" dy="-6" stdDeviation="8" floodColor="#0b120a" floodOpacity="0.45" />
        </filter>
      </defs>
      {layers.map((layer) => (
        <path key={layer.d} d={layer.d} fill={layer.fill} fillOpacity={layer.opacity} filter="url(#wave-shadow)" />
      ))}
    </svg>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title={["Pushing", { text: "boundaries.", className: "serif-italic text-brand" }]}
          description="One role, eighteen responsibilities and a single goal: make the brand impossible to ignore — and easy to choose."
        />

        <Reveal className="mt-16 sm:mt-20">
          <article className="relative isolate overflow-hidden rounded-[2.25rem] bg-forest text-forest-foreground shadow-[var(--clay-shadow)] ring-1 ring-white/10">
            <Waves />
            <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:p-14">
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                    <span className="size-1.5 rounded-full bg-[#a9d18d]" aria-hidden="true" />
                    {experience.period}
                  </span>
                  <span className="text-[13px] text-forest-foreground/65">
                    {experience.department} · {experience.location}
                  </span>
                </div>
                <h3 className="mt-6 text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-forest-foreground">
                  Marketing &amp; <span className="serif-italic font-normal">Creative</span> Executive
                </h3>
                <p className="mt-3 text-[17px] font-medium">
                  {experience.company}
                  <span className="mt-1 block text-[13px] font-normal text-forest-foreground/60">
                    {experience.companyLegal}
                  </span>
                </p>
                <p className="mt-6 text-[17px] leading-relaxed text-pretty text-forest-foreground/75">{experience.summary}</p>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-xs font-medium tracking-[0.14em] text-forest-foreground/55 uppercase">Highlights</p>
                <ul className="mt-5 space-y-4">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3.5 text-[16px] leading-relaxed">
                      <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#a9d18d] text-[#122012]">
                        <Check className="size-3" aria-hidden="true" strokeWidth={3} />
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <RevealGroup stagger={0.08} className="relative grid gap-3 p-4 pt-0 sm:grid-cols-2 sm:p-6 sm:pt-0 lg:grid-cols-4 lg:p-8 lg:pt-0">
              {experience.groups.map((group, i) => (
                <RevealItem
                  key={group.title}
                  className="rounded-[1.5rem] bg-white/[0.07] p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md"
                >
                  <p className="flex items-center justify-between">
                    <span className="text-[15px] font-semibold tracking-[-0.01em]">{group.title}</span>
                    <span className="text-xs text-forest-foreground/55 tabular-nums">0{i + 1}</span>
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[14.5px] text-forest-foreground/80">
                        <span aria-hidden="true" className="h-px w-3 bg-forest-foreground/35" />
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
