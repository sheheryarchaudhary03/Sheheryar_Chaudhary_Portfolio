"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Inertial smooth scrolling via Lenis. Disabled entirely for users who
 * prefer reduced motion. Same-page anchor links are routed through Lenis so
 * they glide instead of jumping.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    setLenis(instance);

    let frame = requestAnimationFrame(function raf(time: number) {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    });

    // Capture phase so we run before Next's <Link>; it skips navigation when
    // the event is already defaultPrevented, while other onClick handlers
    // (e.g. closing the mobile menu) still fire.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;

      const id = decodeURIComponent(url.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!url.hash || (id && !target)) return;

      event.preventDefault();
      instance.scrollTo(target ?? 0, { duration: 1.4, force: true });
      window.history.pushState(null, "", url.hash || url.pathname);
      // Keep keyboard users in sync (e.g. the skip link targets a tabindex=-1 <main>).
      if (target?.hasAttribute("tabindex")) target.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Keep Lenis' cached dimensions fresh after client-side navigations.
  useEffect(() => {
    lenis?.resize();
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
