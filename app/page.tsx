import { About, DisciplinesMarquee } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { Work } from "@/components/sections/work";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      description: siteConfig.description,
      url: siteConfig.url,
      ...(siteConfig.portrait && { image: absoluteUrl(siteConfig.portrait.src) }),
      email: `mailto:${siteConfig.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
      worksFor: { "@type": "Organization", name: siteConfig.currently.company },
      knowsAbout: ["Brand Identity", "UI/UX Design", "Graphic Design", "Marketing Strategy", "Social Media Marketing", "Packaging Design", "Creative Direction"],
      // Only real profile URLs (not bare platform homepages) belong in sameAs.
      sameAs: siteConfig.socials.map((s) => s.href).filter((href) => new URL(href).pathname.length > 1),
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: siteConfig.url,
      name: siteConfig.name,
      author: { "@id": absoluteUrl("/#person") },
    },
    {
      "@type": "ItemList",
      name: "Selected case studies",
      itemListElement: projects.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/work/${project.slug}`),
        name: project.title,
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <DisciplinesMarquee />
      <About />
      <Experience />
      <Services />
      <Skills />
      <Work />
      <Process />
      <Testimonials />
      <Contact />
    </>
  );
}
