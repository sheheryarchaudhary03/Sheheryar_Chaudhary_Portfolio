import { projectArt } from "@/components/art";
import { SectionHeading } from "@/components/section-heading";
import { SceneSlot } from "@/components/three/scene-slot";
import { ProjectGrid, type ProjectGridItem } from "@/components/work/project-grid";
import { projects } from "@/content/projects";

export function Work() {
  // Covers are rendered on the server and handed to the client grid as nodes,
  // so none of the illustration code ships in the client bundle.
  const items: ProjectGridItem[] = projects.map((project) => {
    const { Cover } = projectArt[project.slug];
    return {
      slug: project.slug,
      title: project.title,
      tagline: project.tagline,
      year: project.year,
      sector: project.sector,
      categories: project.categories,
      services: project.services,
      cover: <Cover />,
    };
  });

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-28 sm:py-36">
      <SceneSlot scene="ambient" seed={5} count={8} className="absolute inset-0" />
      <div className="container-page relative">
        <SectionHeading
          id="work-title"
          index="05"
          eyebrow="Selected Work"
          title={["Selected", { text: "case studies.", className: "serif-italic text-brand" }]}
          description="Brands, products and the tools behind them — each solved by starting with the business, not the brief."
          className="mb-12"
        />
        <ProjectGrid items={items} />
      </div>
    </section>
  );
}
