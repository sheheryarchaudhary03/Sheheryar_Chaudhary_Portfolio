import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { projectArt } from "@/components/art";
import { Counter } from "@/components/motion/counter";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { SceneSlot } from "@/components/three/scene-slot";
import { getAdjacentProjects, getProject, projects, type Project } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { absoluteUrl, cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — Case Study`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title: `${title} — ${siteConfig.name}`,
      description: project.summary,
    },
    twitter: { card: "summary_large_image", title: `${title} — ${siteConfig.name}`, description: project.summary },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const art = projectArt[project.slug];
  const { next } = getAdjacentProjects(project.slug);
  const NextCover = projectArt[next.slug].Cover;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title} — ${project.tagline}`,
    description: project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
    dateCreated: project.year,
    creator: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    keywords: project.services.join(", "),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ---------------------------------------------------------- */}
      {/* Hero                                                        */}
      {/* ---------------------------------------------------------- */}
      <header className="pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+4rem)]">
        <div className="container-page">
          <Reveal y={10}>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
              All work
            </Link>
          </Reveal>

          <Reveal y={10} delay={0.05} className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="eyebrow flex flex-wrap items-center gap-3">
              <span className="size-2 rounded-full" style={{ background: project.theme.accent }} aria-hidden="true" />
              {project.sector}
              <span aria-hidden="true">·</span>
              {project.year}
            </p>
            {project.logo && (
              <span className="flex h-16 items-center rounded-2xl bg-[#f7f8f2]/95 px-5 shadow-[var(--clay-shadow)] ring-1 ring-black/5 sm:h-20 sm:px-6">
                <Image
                  src={project.logo.src}
                  width={project.logo.width}
                  height={project.logo.height}
                  alt={project.logo.alt}
                  sizes="120px"
                  priority
                  className="h-11 w-auto sm:h-14"
                />
              </span>
            )}
          </Reveal>

          <h1 className="mt-6 text-[clamp(3rem,10vw,9.5rem)] text-display">
            <SplitText lines={[project.title]} />
          </h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Reveal delay={0.15} className="lg:col-span-6">
              <p className="text-[clamp(1.35rem,2.4vw,2rem)] leading-snug font-medium tracking-[-0.025em] text-balance text-foreground">
                {project.tagline}
              </p>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-pretty text-muted-foreground">{project.summary}</p>
              {project.links && project.links.length > 0 && (
                <ul className="mt-7 flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="clay inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium text-foreground transition-transform hover:-translate-y-0.5"
                      >
                        {link.label}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>

            <Reveal delay={0.25} className="lg:col-span-5 lg:col-start-8">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-6 text-[15px]">
                <MetaItem term="Client" detail={project.client} />
                <MetaItem term="Role" detail={project.role} />
                <MetaItem term="Year" detail={project.year} />
                <MetaItem term="Sector" detail={project.sector} />
                <div className="col-span-2">
                  <dt className="text-[13px] text-muted-foreground">Services</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.services.map((service) => (
                      <span key={service} className="rounded-full border border-border px-3 py-1 text-[12.5px] text-foreground/85">
                        {service}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="container-page relative mt-16 sm:mt-20">
          {/* Clay blobs peeking out from behind the framed cover */}
          <SceneSlot scene="frame" className="absolute -inset-x-[2%] -inset-y-[12%] sm:-inset-x-[4%]" />
          <Reveal y={60} delay={0.2} amount={0.05} className="relative">
            <div className="clay rounded-[2rem] p-2 sm:rounded-[2.6rem] sm:p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] sm:aspect-[16/9] sm:rounded-[2.1rem]">
                <Parallax offset={50} className="absolute -inset-y-[8%] inset-x-0">
                  <art.Cover />
                </Parallax>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---------------------------------------------------------- */}
      {/* Chapters                                                    */}
      {/* ---------------------------------------------------------- */}
      <div className="mt-24 sm:mt-32">
        <Chapter index="01" id="problem" title="Problem">
          <Reveal>
            <p className="text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-balance text-foreground">
              {project.problem.headline}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl text-[18px] leading-relaxed text-pretty text-muted-foreground">{project.problem.body}</p>
          </Reveal>
        </Chapter>

        <Chapter index="02" id="research" title="Research">
          <Reveal>
            <p className="max-w-3xl text-[18px] leading-relaxed text-pretty text-copy">{project.research.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Research methods">
              {project.research.methods.map((method) => (
                <li key={method} className="rounded-full bg-secondary px-3.5 py-1.5 text-[13px] text-foreground/85">
                  {method}
                </li>
              ))}
            </ul>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
            {project.research.insights.map((insight, i) => (
              <RevealItem
                key={insight.title}
                className="rounded-[1.5rem] border border-border bg-card p-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1"
              >
                <p className="text-xs text-muted-foreground tabular-nums">Insight 0{i + 1}</p>
                <h3 className="mt-6 text-[1.2rem] leading-snug font-semibold tracking-[-0.025em]">{insight.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{insight.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Chapter>

        <Chapter index="03" id="process" title="Process">
          <RevealGroup className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-2">
            {project.process.map((step, i) => (
              <RevealItem key={step.title} className="bg-background p-7">
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-8 items-center justify-center rounded-full text-[12px] font-semibold text-white tabular-nums"
                    style={{ background: i === project.process.length - 1 ? project.theme.accent : "var(--forest)" }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-[1.25rem] font-semibold tracking-[-0.025em]">{step.title}</h3>
                </div>
                <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">{step.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Chapter>

        <Chapter index="04" id="wireframes" title="Wireframes">
          <Reveal>
            <p className="max-w-3xl text-[18px] leading-relaxed text-pretty text-copy">{project.wireframes.body}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Frame className="aspect-[16/10]">
              <art.Wireframe />
            </Frame>
          </Reveal>
        </Chapter>

        <Chapter index="05" id="design-system" title="Design System">
          <Reveal>
            <p className="max-w-3xl text-[18px] leading-relaxed text-pretty text-copy">{project.designSystem.body}</p>
          </Reveal>
          <DesignSystem project={project} />
        </Chapter>

        <Chapter
          index="06"
          id="final-design"
          title="Final Design"
          media={
            <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
              {art.panels.map((panel) => (
                <Reveal key={panel.title} amount={0.15} className={cn(panel.wide && "md:col-span-2")}>
                  <figure>
                    <Frame className={panel.wide ? "aspect-[4/3] sm:aspect-[16/8]" : "aspect-[4/5]"}>
                      <panel.Art />
                    </Frame>
                    <figcaption className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                      <span className="text-[15px] font-semibold text-foreground">{panel.title}</span>
                      <span className="text-[14.5px] text-muted-foreground">{panel.caption}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          }
        >
          <Reveal>
            <p className="max-w-3xl text-[18px] leading-relaxed text-pretty text-copy">{project.finalDesign.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Deliverables">
              {project.finalDesign.highlights.map((highlight) => (
                <li key={highlight} className="rounded-full border border-border px-3.5 py-1.5 text-[13px] text-foreground/85">
                  {highlight}
                </li>
              ))}
            </ul>
          </Reveal>
        </Chapter>

        <Chapter index="07" id="outcome" title="Outcome">
          <Reveal>
            <p className="max-w-3xl text-[clamp(1.4rem,2.6vw,2.1rem)] leading-snug font-medium tracking-[-0.025em] text-pretty text-foreground">
              {project.outcome.body}
            </p>
          </Reveal>
          <dl className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-3">
            {project.outcome.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-3 bg-background p-7">
                <dt className="order-2 text-[14.5px] leading-snug text-muted-foreground">{metric.label}</dt>
                <dd className="order-1 text-[clamp(3rem,6vw,4.75rem)] leading-none font-semibold tracking-[-0.06em] text-foreground">
                  <Counter value={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
                </dd>
              </div>
            ))}
          </dl>
        </Chapter>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Next project                                                */}
      {/* ---------------------------------------------------------- */}
      <nav aria-label="Next case study" className="border-t border-border py-20 sm:py-28">
        <div className="container-page">
          <Link
            href={`/work/${next.slug}`}
            data-cursor="view"
            data-cursor-label="Next"
            className="group grid items-center gap-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <p className="eyebrow">Next case study</p>
              <p className="mt-5 text-[clamp(2.75rem,8vw,7rem)] text-display transition-colors duration-500 group-hover:text-brand">
                {next.title}
              </p>
              <p className="mt-4 max-w-md text-[17px] text-muted-foreground">{next.tagline}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-foreground">
                View case study
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-border transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5">
                <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]">
                  <NextCover />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function MetaItem({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <dt className="text-[13px] text-muted-foreground">{term}</dt>
      <dd className="mt-1 font-medium text-foreground">{detail}</dd>
    </div>
  );
}

function Chapter({
  index,
  id,
  title,
  children,
  media,
}: {
  index: string;
  id: string;
  title: string;
  children: React.ReactNode;
  media?: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-border py-20 sm:py-28">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow tabular-nums">({index})</p>
            <h2 id={`${id}-title`} className="mt-3 text-[1.6rem] font-semibold tracking-[-0.03em]">
              {title}
            </h2>
          </div>
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
      {media && <div className="container-page mt-14">{media}</div>}
    </section>
  );
}

function Frame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[1.5rem] border border-border sm:rounded-[1.75rem]", className)}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

/** WCAG relative luminance of a #RRGGBB colour. */
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Whichever of near-black or white reads better on the given colour. */
function inkFor(hex: string) {
  const l = luminance(hex);
  return (l + 0.05) / (luminance("#111111") + 0.05) >= 1.05 / (l + 0.05) ? "#111111" : "#ffffff";
}

function DesignSystem({ project }: { project: Project }) {
  const { colors, typography, principles } = project.designSystem;

  return (
    <div className="mt-12 grid gap-4">
      <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {colors.map((color) => {
          return (
            <RevealItem key={color.hex} className="overflow-hidden rounded-[1.5rem] border border-border bg-card">
              <div
                className="flex aspect-[4/3] items-end p-4 text-[12px] font-medium tabular-nums"
                style={{ background: color.hex, color: inkFor(color.hex) }}
              >
                {color.hex}
              </div>
              <div className="p-4">
                <p className="text-[15px] font-semibold text-foreground">{color.name}</p>
                <p className="text-[13px] text-muted-foreground">{color.role}</p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <div className="grid gap-4 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <div className="flex h-full flex-col justify-between gap-10 rounded-[1.5rem] border border-border bg-card p-7">
            <div className="flex items-start justify-between gap-6">
              <p className="text-[clamp(4.5rem,10vw,8rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-foreground">Aa</p>
              <div className="text-right text-[13px] text-muted-foreground">
                <p>
                  Display — <span className="text-foreground">{typography.display}</span>
                </p>
                <p className="mt-1">
                  Body — <span className="text-foreground">{typography.body}</span>
                </p>
              </div>
            </div>
            <div>
              <p className="font-mono text-[12px] tracking-wide text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ · 0123456789</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{typography.note}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <div
            className="h-full rounded-[1.5rem] p-7 text-white ring-1 ring-white/10 ring-inset"
            style={{ background: luminance(project.theme.background) < 0.05 ? project.theme.background : "var(--forest)" }}
          >
            <p className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-white/50 uppercase">
              <span className="size-1.5 rounded-full" style={{ background: project.theme.accent }} aria-hidden="true" />
              Principles
            </p>
            <ol className="mt-6 space-y-5">
              {principles.map((principle, i) => (
                <li key={principle} className="flex gap-4">
                  <span className="pt-1 text-[12px] text-white/45 tabular-nums">0{i + 1}</span>
                  <span className="text-[17px] leading-snug font-medium tracking-[-0.015em]">{principle}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
