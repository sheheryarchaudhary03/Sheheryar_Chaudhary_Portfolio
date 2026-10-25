import { readFile } from "node:fs/promises";
import { join } from "node:path";
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

// Orb positions in px from the top-left of the card.
const orbs = [
  { size: 300, x: 820, y: 250, from: "#a7c493", to: "#4e7244" },
  { size: 150, x: 1010, y: 150, from: "#efe8d8", to: "#b6ac90" },
  { size: 90, x: 760, y: 140, from: "#cfe6b8", to: "#5f8853" },
  { size: 60, x: 1080, y: 500, from: "#d5edbb", to: "#6e9160" },
];
const orbsWithPortrait = [
  { size: 380, x: 720, y: 120, from: "#a7c493", to: "#3d5c36" },
  { size: 76, x: 1100, y: 52, from: "#efe8d8", to: "#b6ac90" },
  { size: 56, x: 660, y: 70, from: "#cfe6b8", to: "#5f8853" },
];

/** The cut-out portrait as a data URL (Satori needs the bytes, not a path). */
async function portraitDataUrl() {
  if (!siteConfig.portrait) return null;
  try {
    const png = await readFile(join(process.cwd(), "public", siteConfig.portrait.og));
    return `data:image/png;base64,${png.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const [fonts, portrait] = await Promise.all([ogFonts(), portraitDataUrl()]);
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
        {/* No fragments here: @vercel/og only preloads <img> sources it can reach directly. */}
        {(portrait ? orbsWithPortrait : orbs).map((orb) => (
          <Orb key={`${orb.x}-${orb.y}`} {...orb} />
        ))}
        {portrait && (
          // eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img
          <img src={portrait} alt="" width={437} height={580} style={{ position: "absolute", right: 0, bottom: -64 }} />
        )}

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
