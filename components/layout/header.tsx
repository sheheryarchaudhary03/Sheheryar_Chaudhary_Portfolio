"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Monogram, socialIcons } from "@/components/icons";
import { useLenis } from "@/components/providers/smooth-scroll";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/content/site";
import { cn, EASE } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const lenis = useLenis();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > 160 && latest > previous && !open);
  });

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [open, lenis]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-brand print:hidden"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-50 print:hidden"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-full"
          >
            <span className="sr-only sm:hidden">{siteConfig.name}</span>
            <Monogram className="size-9 text-foreground transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg]" />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[14px] font-semibold tracking-[-0.02em] text-foreground">
                {siteConfig.name}
              </span>
              <span className="text-[12px] text-muted-foreground">{siteConfig.role}</span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className={cn(
              "glass absolute left-1/2 hidden -translate-x-1/2 rounded-full border border-border p-1 transition-shadow duration-500 lg:block",
              scrolled && "shadow-[0_12px_40px_-16px_rgb(0_0_0/0.25)]",
            )}
            onMouseLeave={() => setHovered(null)}
          >
            <ul className="flex items-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    className="relative block rounded-full px-4 py-2 text-[13.5px] font-medium tracking-[-0.01em] text-foreground/75 transition-colors hover:text-foreground"
                  >
                    {hovered === link.href && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.06] dark:bg-white/[0.08]"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex">
              <Link href="/#contact">
                Let&apos;s talk
                <ArrowUpRight className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </Link>
            </Button>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="glass inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
            >
              <Menu className="size-[18px]" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{open && <MobileMenu onClose={close} />}</AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panel) return;
      // Minimal focus trap.
      const focusable = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      data-lenis-prevent
      className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-background"
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="container-page flex h-[var(--header-h)] shrink-0 items-center justify-between">
        <span className="eyebrow">Menu</span>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground"
        >
          <X className="size-[18px]" aria-hidden="true" />
          <span className="sr-only">Close menu</span>
        </button>
      </div>

      <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-center py-10">
        <ul className="flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-baseline gap-4 py-1 text-[clamp(2.75rem,12vw,5rem)] leading-[1.05] font-semibold tracking-[-0.05em] text-foreground"
                >
                  <span className="text-sm font-medium tracking-normal text-muted-foreground tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="transition-colors group-hover:text-brand">{link.label}</span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="container-page flex shrink-0 flex-col gap-6 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <a href={`mailto:${siteConfig.email}`} className="text-lg font-medium text-foreground underline-offset-4 hover:underline">
          {siteConfig.email}
        </a>
        <ul className="flex gap-2">
          {siteConfig.socials.map((social) => {
            const Icon = socialIcons[social.label];
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent"
                >
                  <Icon className="size-[18px]" />
                  <span className="sr-only">{social.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.div>
  );
}
