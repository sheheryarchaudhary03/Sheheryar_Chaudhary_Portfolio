import { SpotlightCard } from "@/components/effects/spotlight-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SceneSlot } from "@/components/three/scene-slot";
import { services } from "@/content/profile";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-28 sm:py-36">
      <SceneSlot scene="ambient" seed={3} count={6} className="absolute inset-0" />
      <div className="container-page relative">
        <SectionHeading
          id="services-title"
          index="03"
          eyebrow="Services"
          title={["How I help", { text: "brands grow.", className: "serif-italic text-brand" }]}
          description="Strategy, design and execution under one roof — so the idea that wins the pitch is the one that ships."
        />

        <RevealGroup stagger={0.08} className="mt-16 grid gap-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <RevealItem
                key={service.title}
                className={cn(
                  "h-full",
                  // A lone final card spans the row instead of sitting orphaned.
                  i === services.length - 1 && services.length % 2 === 1 && "md:col-span-2",
                  i === services.length - 1 && services.length % 3 === 1 && "lg:col-span-3",
                )}
              >
                <SpotlightCard
                  as="article"
                  className="group clay flex h-full flex-col rounded-[2rem] p-7 transition-transform duration-500 ease-out-expo hover:-translate-y-2 sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-forest text-forest-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.15),0_10px_20px_-10px_rgb(20_32_18/0.6)] transition-colors duration-500 group-hover:bg-brand group-hover:text-brand-foreground">
                      <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
                    </span>
                    <span className="text-xs text-muted-foreground tabular-nums">0{i + 1}</span>
                  </div>
                  <h3 className="mt-10 text-[1.4rem] leading-tight font-semibold tracking-[-0.03em]">{service.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-pretty text-muted-foreground">{service.description}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label={`${service.title} deliverables`}>
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-[12.5px] text-foreground/80"
                      >
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
