"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { categories, type Category } from "@/content/projects";
import { cn, EASE } from "@/lib/utils";

export type ProjectGridItem = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  sector: string;
  categories: Category[];
  services: string[];
  cover: React.ReactNode;
};

type Filter = (typeof categories)[number];

export function ProjectGrid({ items }: { items: ProjectGridItem[] }) {
  const [active, setActive] = useState<Filter>("All");

  const counts = useMemo(
    () =>
      Object.fromEntries(
        categories.map((c) => [c, c === "All" ? items.length : items.filter((i) => i.categories.includes(c)).length]),
      ) as Record<Filter, number>,
    [items],
  );

  const visible = active === "All" ? items : items.filter((item) => item.categories.includes(active));

  return (
    <LayoutGroup>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const selected = active === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(category)}
              className={cn(
                "relative isolate inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-[13.5px] font-medium transition-colors duration-300",
                selected
                  ? "border-transparent text-background"
                  : "border-border text-foreground/75 hover:border-border-strong hover:text-foreground",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {category}
              <span className={cn("text-[11px] tabular-nums", selected ? "text-background/60" : "text-muted-foreground")}>
                {counts[category]}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {active === "All" ? "" : ` in ${active}`}
      </p>

      <motion.ul layout className="mt-12 grid gap-x-6 gap-y-16 sm:mt-14 md:grid-cols-2 lg:gap-x-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => (
            <motion.li
              key={item.slug}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
              transition={{ duration: 0.7, ease: EASE }}
              className={cn(i % 2 === 1 && "md:mt-28")}
            >
              <ProjectCard item={item} index={items.indexOf(item)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}

function ProjectCard({ item, index }: { item: ProjectGridItem; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <Link
        ref={ref}
        href={`/work/${item.slug}`}
        data-cursor="view"
        data-cursor-label="View"
        className="group block rounded-[1.75rem]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border bg-muted transition-[transform,box-shadow] duration-700 ease-out-expo group-hover:-translate-y-1.5 group-hover:shadow-[0_40px_90px_-45px_rgb(0_0_0/0.55)]">
          <motion.div style={{ y }} className="absolute -inset-[6%]">
            <div className="h-full w-full transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.045]">
              {item.cover}
            </div>
          </motion.div>

          <span className="glass absolute top-4 left-4 rounded-full border border-white/20 px-3 py-1 text-[12px] font-medium text-foreground tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>

          <ul
            aria-label="Categories"
            className="absolute inset-x-4 bottom-4 flex translate-y-3 flex-wrap gap-1.5 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
          >
            {item.categories.map((category) => (
              <li key={category} className="glass-strong rounded-full px-3 py-1 text-[12px] font-medium text-foreground">
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-semibold tracking-[-0.035em]">{item.title}</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-pretty text-muted-foreground">{item.tagline}</p>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background"
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>
        <p className="mt-4 flex flex-wrap items-center gap-x-2 text-[13px] text-muted-foreground">
          <span className="text-foreground/80">{item.year}</span>
          <span aria-hidden="true">·</span>
          <span>{item.sector}</span>
          <span aria-hidden="true">·</span>
          <span>{item.services.slice(0, 2).join(", ")}</span>
        </p>
      </Link>
    </motion.div>
  );
}
