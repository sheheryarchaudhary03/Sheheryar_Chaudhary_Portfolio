/**
 * Helpers for next/og image routes. Inter is fetched from Google Fonts at
 * build time as TTF (Satori can't read WOFF2); on failure we fall back to the
 * built-in font so builds never break offline.
 */
export async function loadInter(weight: 500 | 600 | 700) {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; OG-Image/1.0)" },
    }).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const data = await fetch(url).then((res) => res.arrayBuffer());
    return { name: "Inter", data, weight, style: "normal" as const };
  } catch {
    return null;
  }
}

export async function ogFonts() {
  const fonts = await Promise.all([loadInter(500), loadInter(700)]);
  return fonts.filter((f): f is NonNullable<typeof f> => f !== null);
}

export const OG_SIZE = { width: 1200, height: 630 };
