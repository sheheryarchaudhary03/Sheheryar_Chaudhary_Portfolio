import { cn } from "@/lib/utils";

/** CSS-only infinite marquee. Content is duplicated once for a seamless loop. */
export function Marquee({
  items,
  className,
  duration = 45,
  separator,
}: {
  items: readonly string[];
  className?: string;
  duration?: number;
  separator?: React.ReactNode;
}) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 sm:px-8">{item}</span>
          {separator ?? <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("group mask-fade-x flex overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
