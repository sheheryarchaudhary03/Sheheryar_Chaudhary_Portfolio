import { ArrowDown, Mail } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/contact/copy-email";
import { socialIcons } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { SceneSlot } from "@/components/three/scene-slot";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

export function Contact() {
  const [local, domain] = siteConfig.email.split("@");

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative pt-20 pb-16 sm:pt-28 sm:pb-24">
      <div className="container-page">
        {/* Stage — headline over a glowing podium */}
        <div className="relative flex min-h-[min(92svh,860px)] flex-col items-center text-center">
          <SceneSlot scene="platform" className="absolute inset-x-[-4%] top-[34%] bottom-0" />

          <Reveal y={12}>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-foreground tabular-nums">(08)</span>
              <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
              Contact
            </p>
          </Reveal>
          <h2 id="contact-title" className="mt-6 text-[clamp(2.8rem,7.5vw,7rem)] text-display">
            <SplitText lines={["Let's make it", { text: "happen.", className: "serif-italic text-brand" }]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-pretty text-muted-foreground">
              Brand, product, campaign — or something that doesn&apos;t fit a box yet. Tell me what you&apos;re
              building and I&apos;ll come back with ideas.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <a href="#contact-form">
                Start a project
                <ArrowDown />
              </a>
            </Button>
            <Button asChild size="lg" variant="glass">
              <a href={`mailto:${siteConfig.email}`}>
                <Mail />
                Email me
              </a>
            </Button>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal y={40} amount={0.1}>
          <div
            id="contact-form"
            className="clay grid scroll-mt-28 grid-cols-1 gap-12 rounded-[2.25rem] p-5 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14"
          >
            <div className="flex min-w-0 flex-col lg:col-span-5">
              <h3 className="text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
                Tell me about <span className="serif-italic font-normal text-brand">your project.</span>
              </h3>
              <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-muted-foreground">
                Share the goal, the timeline and anything that helps. Every message is read.
              </p>

              <div className="mt-auto pt-10">
                <p className="eyebrow">Prefer email?</p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group relative min-w-0 text-[clamp(1rem,2vw,1.35rem)] leading-tight font-semibold tracking-[-0.025em] break-words text-foreground"
                  >
                    {/* Allow a line break before "@" on narrow phones instead of truncating. */}
                    {local}
                    <wbr />@{domain}
                    <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
                  </a>
                  <CopyEmail email={siteConfig.email} />
                </div>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {siteConfig.socials.map((social) => {
                    const Icon = socialIcons[social.label];
                    return (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-11 items-center gap-2.5 rounded-full border border-border-strong px-4 text-[13.5px] text-foreground/80 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                        >
                          <Icon className="size-4" />
                          {social.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
