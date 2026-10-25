/**
 * Helpers for next/og image routes. Fonts are fetched from Google Fonts at
 * build time as TTF (Satori can't read WOFF2); on failure we fall back to the
 * built-in font so builds never break offline.
 */
type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 500 | 700; style: "normal" | "italic" };

async function loadGoogleFont(family: string, query: string, weight: OgFont["weight"], style: OgFont["style"]) {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${query}&display=swap`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; OG-Image/1.0)" },
    }).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const data = await fetch(url).then((res) => res.arrayBuffer());
    return { name: family, data, weight, style } satisfies OgFont;
  } catch {
    return null;
  }
}

export async function ogFonts() {
  const fonts = await Promise.all([
    loadGoogleFont("Inter", "Inter:wght@500", 500, "normal"),
    loadGoogleFont("Inter", "Inter:wght@700", 700, "normal"),
    loadGoogleFont("Instrument Serif", "Instrument+Serif:ital@1", 400, "italic"),
  ]);
  return fonts.filter((f): f is OgFont => f !== null);
}

export const OG_SIZE = { width: 1200, height: 630 };

/** Shared OG palette — deep forest with sage light. */
export const OG = {
  bg: "#142014",
  bg2: "#1f2e1c",
  ink: "#eef3e7",
  muted: "rgba(238,243,231,0.62)",
  sage: "#a9d18d",
  line: "rgba(220,235,205,0.16)",
};
