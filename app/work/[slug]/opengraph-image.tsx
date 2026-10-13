import { ImageResponse } from "next/og";

import { getProject, projects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { OG_SIZE, ogFonts } from "@/lib/og";

export const alt = "Case study";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug) ?? projects[0];
  const fonts = await ogFonts();
  const { background, foreground, accent } = project.theme;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background,
          color: foreground,
          fontFamily: fonts.length ? "Inter" : undefined,
          backgroundImage: `radial-gradient(circle at 90% 10%, ${accent}55, transparent 50%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, fontWeight: 500 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: accent }} />
            Case study · {project.year}
          </div>
          <div style={{ display: "flex", opacity: 0.65 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -6, lineHeight: 0.95 }}>{project.title}</div>
          <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: -1, opacity: 0.75, maxWidth: 980 }}>{project.tagline}</div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {project.services.slice(0, 4).map((service) => (
            <div
              key={service}
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 500,
                padding: "10px 18px",
                borderRadius: 999,
                border: `1px solid ${foreground}33`,
              }}
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
