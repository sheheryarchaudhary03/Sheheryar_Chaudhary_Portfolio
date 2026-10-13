import { SpotlightCard } from "@/components/effects/spotlight-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/content/profile";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          index="03"
          eyebrow="Services"
          title={["How I help", "brands grow."]}
          description="Strategy, design and execution under one roof — so the idea that wins the pitch is the one that ships."
        />

        <RevealGroup stagger={0.08} className="mt-16 grid gap-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <RevealItem key={service.title} className="h-full">
                <SpotlightCard
                  as="article"
                  className="group glass flex h-full flex-col rounded-[1.75rem] border border-border p-7 transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_30px_70px_-35px_rgb(0_0_0/0.35)] sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-foreground text-background transition-colors duration-500 group-hover:bg-brand group-hover:text-brand-foreground">
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
