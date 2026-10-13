"use client";

import { useEffect, useState } from "react";

import { siteConfig } from "@/content/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: siteConfig.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Live local time in Lahore. Renders a stable placeholder until mounted. */
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className={className} suppressHydrationWarning style={{ fontVariantNumeric: "tabular-nums" }}>
      {time ?? "--:--"} {siteConfig.timeZoneLabel}
    </time>
  );
}
