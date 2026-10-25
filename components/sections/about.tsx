import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Monogram } from "@/components/icons";
import { LocalTime } from "@/components/effects/local-time";
import { Marquee } from "@/components/effects/marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ScrollText } from "@/components/motion/scroll-text";
import { about } from "@/content/profile";
import { siteConfig } from "@/content/site";
import { SceneSlot } from "@/components/three/scene-slot";

export function DisciplinesMarquee() {
  return (
    <div className="clay-band border-y border-border py-6 sm:py-8">
      <Marquee
        items={about.disciplines}
        duration={60}
        className="text-[clamp(1.5rem,3.2vw,2.75rem)] font-semibold tracking-[-0.04em] text-foreground/85"
      />
    </div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 sm:py-36">
      <SceneSlot scene="ambient" seed={2} count={6} className="absolute inset-0" />
      <div className="container-page relative">
        <Reveal y={12}>
          <h2 id="about-title" className="eyebrow flex items-center gap-3">
            <span className="text-foreground tabular-nums">(01)</span>
            <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
            About
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <ScrollText
              text={about.statement}
              className="text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-foreground"
            />

            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-[17px] leading-relaxed text-pretty text-muted-foreground">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="lg:col-span-4" delay={0.1}>
            <aside
              aria-label="Profile"
              className="clay relative overflow-hidden rounded-[2rem] p-7 lg:sticky lg:top-28"
            >
              <div aria-hidden="true" className="absolute -top-20 -right-20 size-56 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)]" />
              <div className="relative flex items-center gap-4">
                <Monogram className="size-16 text-foreground" />
                <div>
                  <p className="text-lg font-semibold tracking-[-0.02em] text-foreground">{siteConfig.name}</p>
                  <p className="text-sm text-muted-foreground">{siteConfig.role}</p>
                </div>
              </div>

              <dl className="relative mt-8 divide-y divide-border border-y border-border text-sm">
                {[
                  { term: "Currently", detail: `${siteConfig.currently.role} at ${siteConfig.currently.company}` },
                  { term: "Based in", detail: siteConfig.location },
                  { term: "Local time", detail: <LocalTime /> },
                  { term: "Focus", detail: "Brand · UI/UX · Marketing" },
                ].map((row) => (
                  <div key={row.term} className="flex justify-between gap-6 py-3.5">
                    <dt className="text-muted-foreground">{row.term}</dt>
                    <dd className="text-right font-medium text-foreground">{row.detail}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href={siteConfig.resume.page}
                className="group relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                View full résumé
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </aside>
          </Reveal>
        </div>

        <div className="mt-24 sm:mt-32">
          <Reveal y={12}>
            <h3 className="eyebrow">What I do</h3>
          </Reveal>
          <RevealGroup
            stagger={0.035}
            className="clay mt-8 grid grid-cols-1 overflow-hidden rounded-[2rem] px-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4"
          >
            {about.disciplines.map((discipline, i) => (
              <RevealItem
                key={discipline}
                className="group flex items-baseline gap-4 border-b border-border py-5 sm:pr-6 [&:nth-last-child(-n+4)]:lg:border-b-0"
              >
                <span className="text-xs text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[17px] font-medium tracking-[-0.015em] text-foreground transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                  {discipline}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
