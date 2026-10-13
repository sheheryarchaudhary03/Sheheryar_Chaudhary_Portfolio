import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/contact/copy-email";
import { socialIcons } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { siteConfig } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-16 sm:py-24">
      <div className="container-page">
        <Reveal y={40} amount={0.1}>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#111111] px-5 py-14 text-white sm:rounded-[2.5rem] sm:px-12 sm:py-20 lg:px-16 lg:py-24 dark:ring-1 dark:ring-white/10">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-1/3 -right-1/4 size-[46rem] rounded-full bg-[radial-gradient(circle,rgb(241_105_45/0.32),transparent_62%)]" />
              <div
                className="absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_70%)]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="flex min-w-0 flex-col lg:col-span-6">
                <p className="flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-white/50 uppercase">
                  <span className="text-white tabular-nums">(08)</span>
                  <span aria-hidden="true" className="h-px w-8 bg-white/25" />
                  Contact
                </p>
                <h2 id="contact-title" className="mt-6 text-[clamp(2.6rem,6vw,5.5rem)] text-white text-display">
                  <SplitText
                    lines={[
                      { text: "Have a project", className: "text-white/45" },
                      { text: "in mind?", className: "text-white/45" },
                      "Let's make it",
                      "remarkable.",
                    ]}
                  />
                </h2>
                <p className="mt-8 max-w-md text-[17px] leading-relaxed text-white/60">
                  Brand, product, campaign — or something that doesn&apos;t fit a box yet. Tell me what you&apos;re building
                  and I&apos;ll come back with ideas.
                </p>

                <div className="mt-auto pt-12">
                  <p className="text-xs font-medium tracking-[0.14em] text-white/45 uppercase">Prefer email?</p>
                  <div className="mt-3 flex items-center gap-3">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="group relative min-w-0 truncate text-[clamp(0.95rem,4vw,1.6rem)] font-semibold tracking-[-0.025em] text-white"
                    >
                      {siteConfig.email}
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
                            className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/15 px-4 text-[13.5px] text-white/80 transition-colors hover:border-white hover:bg-white hover:text-[#111]"
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

              <div className="min-w-0 lg:col-span-6">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
