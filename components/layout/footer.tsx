import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";

import { socialIcons } from "@/components/icons";
import { LocalTime } from "@/components/effects/local-time";
import { navLinks, siteConfig } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background pt-20 sm:pt-28 print:hidden">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-sm text-2xl leading-snug font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
              Brands, products and campaigns — designed to perform.
            </p>
            <Link
              href="/#contact"
              className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-foreground"
            >
              <span className="relative">
                Start a project
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-100 bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-0" />
              </span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] text-foreground/75 transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={siteConfig.resume.page} className="text-[15px] text-foreground/75 transition-colors hover:text-foreground">
                  Résumé
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="eyebrow">Social</p>
            <ul className="mt-5 space-y-3">
              {siteConfig.socials.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-[15px] text-foreground/75 transition-colors hover:text-foreground"
                    >
                      <Icon className="size-4" />
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="break-all text-foreground/75 transition-colors hover:text-foreground">
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-foreground/75">{siteConfig.location}</li>
              <li className="text-foreground/75">
                Local time — <LocalTime />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="relative mt-20 overflow-hidden select-none sm:mt-28">
        <p className="container-page -mb-[0.16em] bg-linear-to-b from-foreground from-30% to-foreground/0 to-95% bg-clip-text serif-italic text-center text-[21vw] leading-[0.95] whitespace-nowrap text-transparent">
            {siteConfig.firstName}
        </p>
      </div>

      <div className="container-page flex flex-col items-start justify-between gap-4 border-t border-border py-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-full text-foreground/80 transition-colors hover:text-foreground"
        >
          Back to top
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-border transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </span>
        </a>
      </div>
    </footer>
  );
}
