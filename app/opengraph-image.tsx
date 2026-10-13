import { ImageResponse } from "next/og";

import { siteConfig } from "@/content/site";
import { OG_SIZE, ogFonts } from "@/lib/og";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const fonts = await ogFonts();

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
          background: "#0a0a0a",
          color: "#ffffff",
          fontFamily: fonts.length ? "Inter" : undefined,
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(241,105,45,0.38), transparent 46%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 64px 64px, 64px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: "#ffffff",
                color: "#111111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: -1,
              }}
            >
              SC
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>{siteConfig.name}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{siteConfig.location}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 18, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#F1692D" }} />
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1, maxWidth: 1000 }}>
            Creating brands, digital experiences & marketing that drive results.
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {siteConfig.roles.map((role) => (
              <div
                key={role}
                style={{
                  display: "flex",
                  fontSize: 19,
                  fontWeight: 500,
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {role}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
