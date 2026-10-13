import type { Metadata } from "next";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { about, experience, skills, tools } from "@/content/profile";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${siteConfig.name} — ${siteConfig.roles.join(", ")}.`,
  alternates: { canonical: "/resume" },
};

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-3 text-[10.5px] font-semibold tracking-[0.16em] text-[#6b6b6b] uppercase">
      <span className="size-1.5 rounded-full bg-[#F1692D]" aria-hidden="true" />
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const host = siteConfig.url.replace(/^https?:\/\//, "");

  return (
    <div className="container-page pt-[calc(var(--header-h)+2rem)] pb-24 print:p-0">
      <div className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="text-sm text-muted-foreground">A4 · print-ready</p>
        <div className="flex flex-wrap gap-2">
          <PrintButton />
          <Button asChild size="sm" className="h-11">
            <a href={siteConfig.resume.pdf} download="Sheheryar-Chaudhary-Resume.pdf">
              <Download aria-hidden="true" />
              Download PDF
            </a>
          </Button>
        </div>
      </div>

      <article className="mx-auto max-w-[210mm] rounded-[1.25rem] bg-white px-7 py-10 text-[13px] leading-relaxed text-[#222] shadow-[0_40px_120px_-40px_rgb(0_0_0/0.35)] ring-1 ring-black/5 sm:px-14 sm:py-14 print:max-w-none print:rounded-none print:p-0 print:shadow-none print:ring-0">
        <header className="border-b border-black/10 pb-8">
          <h1 className="text-[34px] leading-none font-semibold tracking-[-0.04em] text-[#111]">{siteConfig.name}</h1>
          <p className="mt-2.5 text-[14px] font-medium text-[#111]">{siteConfig.roles.join(" · ")}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[12px] whitespace-nowrap text-[#555]">
            <li>{siteConfig.location}</li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="underline-offset-2 hover:underline">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.url} className="underline-offset-2 hover:underline">
                {host}
              </a>
            </li>
          </ul>
        </header>

        <section className="mt-8">
          <Heading>Profile</Heading>
          <p className="text-[13.5px] text-[#222]">{about.statement}</p>
          <p className="mt-2 text-[#555]">{about.paragraphs[1]}</p>
        </section>

        <section className="mt-8 break-inside-avoid">
          <Heading>Experience</Heading>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-[15px] font-semibold tracking-[-0.015em] text-[#111]">
              {experience.role} — {experience.company}
            </h3>
            <span className="text-[12px] text-[#6b6b6b]">
              {experience.department} · {experience.location} · {experience.period}
            </span>
          </div>
          <p className="mt-0.5 text-[11.5px] text-[#6b6b6b]">{experience.companyLegal}</p>
          <p className="mt-3 text-[#333]">{experience.summary}</p>
          <ul className="mt-3 list-disc space-y-1 pl-4 text-[#333] marker:text-[#F1692D]">
            {experience.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
            {experience.groups.map((group) => (
              <div key={group.title}>
                <p className="text-[12px] font-semibold text-[#111]">{group.title}</p>
                <ul className="mt-1.5 space-y-0.5 text-[12px] text-[#555]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 break-inside-avoid">
          <Heading>Selected projects</Heading>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <p className="font-semibold text-[#111]">
                  {project.title} <span className="font-normal text-[#6b6b6b]">· {project.sector}</span>
                </p>
                <p className="text-[12px] text-[#555]">{project.services.join(", ")}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <section className="break-inside-avoid">
            <Heading>Skills</Heading>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[#333]">
              {skills.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </section>
          <section className="break-inside-avoid">
            <Heading>Tools</Heading>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[#333]">
              {tools.map((t) => (
                <li key={t.name}>{t.name}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-8 break-inside-avoid">
          <Heading>Disciplines</Heading>
          <p className="text-[#555]">{about.disciplines.join(" · ")}</p>
        </section>
      </article>
    </div>
  );
}
