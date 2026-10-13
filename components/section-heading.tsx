import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string[];
  description?: string;
  className?: string;
  align?: "split" | "stack";
  id?: string;
};

/**
 * Editorial section header: numbered eyebrow, oversized split-reveal title
 * and an optional supporting paragraph.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  align = "split",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "grid gap-8",
        align === "split" && "lg:grid-cols-12 lg:items-end",
        className,
      )}
    >
      <div className={cn(align === "split" && "lg:col-span-8")}>
        <Reveal y={12}>
          <p className="eyebrow flex items-center gap-3">
            <span className="tabular-nums text-foreground">({index})</span>
            <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
        <h2
          id={id}
          className="mt-6 text-[clamp(2.4rem,6vw,5.25rem)] text-display"
        >
          <SplitText lines={title} />
        </h2>
      </div>
      {description && (
        <Reveal delay={0.15} className={cn(align === "split" && "lg:col-span-4 lg:pb-3")}>
          <p className="max-w-md text-[17px] leading-relaxed text-muted-foreground text-pretty">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
