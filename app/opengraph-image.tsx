import { ImageResponse } from "next/og";

import { siteConfig } from "@/content/site";
import { OG, OG_SIZE, ogFonts } from "@/lib/og";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

/** Clay sphere for the social card (Satori renders gradients, not WebGL). */
function Orb({ size: d, x, y, from, to }: { size: number; x: number; y: number; from: string; to: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: d,
        height: d,
        borderRadius: 999,
        background: `radial-gradient(circle at 35% 30%, ${from}, ${to} 70%)`,
        boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
      }}
    />
  );
}

export default async function OpenGraphImage() {
  const fonts = await ogFonts();
  const hasSerif = fonts.some((f) => f.name === "Instrument Serif");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          padding: "64px 72px",
          background: `radial-gradient(ellipse at 70% 0%, ${OG.bg2}, ${OG.bg} 70%)`,
          color: OG.ink,
          fontFamily: fonts.length ? "Inter" : undefined,
        }}
      >
        <Orb size={300} x={820} y={250} from="#a7c493" to="#4e7244" />
        <Orb size={150} x={1010} y={150} from="#efe8d8" to="#b6ac90" />
        <Orb size={90} x={760} y={140} from="#cfe6b8" to="#5f8853" />
        <Orb size={60} x={1080} y={500} from="#d5edbb" to="#6e9160" />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                background: OG.ink,
                color: OG.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: -1,
              }}
            >
              SC
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{siteConfig.name}</div>
              <div style={{ fontSize: 19, color: OG.muted, fontWeight: 500 }}>{siteConfig.location}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
            <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1 }}>Hi, I&apos;m Sheheryar</div>
            <div
              style={{
                fontSize: 92,
                lineHeight: 1,
                color: OG.sage,
                fontFamily: hasSerif ? "Instrument Serif" : undefined,
                fontStyle: "italic",
                letterSpacing: -1,
                marginTop: 6,
              }}
            >
              Creative Executive
            </div>
            <div style={{ fontSize: 24, color: OG.muted, marginTop: 26, lineHeight: 1.35, fontWeight: 500 }}>
              Creating brands, digital experiences &amp; marketing that drive results.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
