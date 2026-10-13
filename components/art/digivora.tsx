import { useId } from "react";

import { ArtCanvas, BrowserFrame, cq, Glow, Stage } from "./primitives";

const VIOLET = "#6D5BFF";
const VOID = "#0B0B0F";
const LILAC = "#C9C2FF";
const PAPER = "#F7F7F5";

/* ------------------------------------------------------------------ */
/* Mark — a geometric "D" with a bite taken out: digital + voracious.  */
/* ------------------------------------------------------------------ */

function Mark({ color = VIOLET, className, style }: { color?: string; className?: string; style?: React.CSSProperties }) {
  const mask = `dv-bite-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <defs>
        <mask id={mask}>
          <rect width="100" height="100" fill="#fff" />
          <circle cx="80" cy="22" r="15" fill="#000" />
        </mask>
      </defs>
      <path d="M10 10 H50 A40 40 0 0 1 50 90 H10 Z" fill={color} mask={`url(#${mask})`} />
      <circle cx="93" cy="8" r="3.6" fill={color} />
    </svg>
  );
}

function Wordmark({ size, color = "#fff" }: { size: number; color?: string }) {
  return (
    <span style={{ fontSize: cq(size), fontWeight: 600, letterSpacing: "-0.055em", color, lineHeight: 1 }}>digivora</span>
  );
}

/* ------------------------------------------------------------------ */
/* Cover                                                               */
/* ------------------------------------------------------------------ */

export function DigivoraCover() {
  return (
    <ArtCanvas label="Digivora logo: a geometric D with a bite, beside the wordmark" style={{ background: VOID }}>
      <Glow color="rgb(109 91 255 / 0.45)" x={32} y={52} size={70} />
      <svg viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="1">
          <circle cx="320" cy="312" r="180" />
          <circle cx="320" cy="312" r="240" />
          <path d="M0 132 H1000 M0 492 H1000 M140 0 V625 M500 0 V625" />
        </g>
      </svg>
      <Stage>
        <Mark className="absolute" style={{ left: cq(17), top: cq(13), width: cq(30) }} />
        <div className="absolute" style={{ left: cq(54), top: cq(25) }}>
          <Wordmark size={7.6} />
          <div style={{ fontSize: cq(1.7), color: "rgb(255 255 255 / 0.55)", marginTop: cq(1.6), letterSpacing: "-0.01em" }}>
            Growth, with an appetite.
          </div>
          <div className="flex" style={{ gap: cq(0.8), marginTop: cq(3) }}>
            {["Identity", "Web", "Strategy"].map((t) => (
              <span key={t} className="rounded-full" style={{ fontSize: cq(1.1), padding: `${cq(0.5)} ${cq(1.3)}`, color: "rgb(255 255 255 / 0.7)", border: `${cq(0.1)} solid rgb(255 255 255 / 0.18)` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </Stage>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Wireframe — logo construction + site wireframe                      */
/* ------------------------------------------------------------------ */

export function DigivoraWireframe() {
  const s = "#a3a3ad";
  const label = { fontFamily: "ui-monospace, monospace", fontSize: 11, fill: "#73737d", letterSpacing: 1.5 } as const;
  return (
    <ArtCanvas label="Digivora logo construction grid and website wireframe" style={{ background: PAPER }}>
      <svg viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="dv-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#000" strokeOpacity="0.05" />
          </pattern>
        </defs>
        <rect width="1000" height="625" fill="url(#dv-grid)" />

        <text x="70" y="80" fontFamily="var(--font-inter), sans-serif" fontSize="16" fill={VOID}>01 — Mark construction</text>
        <g transform="translate(90 130)" fill="none" strokeWidth="1.4">
          <rect x="0" y="0" width="400" height="400" stroke={s} strokeDasharray="4 5" />
          <path d="M40 40 H200 A160 160 0 0 1 200 360 H40 Z" stroke={VOID} strokeWidth="2" />
          <circle cx="200" cy="200" r="160" stroke={VIOLET} strokeDasharray="6 5" />
          <circle cx="320" cy="88" r="60" stroke={VIOLET} />
          <circle cx="372" cy="32" r="14" stroke={VIOLET} />
          <path d="M200 200 L313 87" stroke={s} />
          <path d="M0 200 H400 M200 0 V400" stroke={s} strokeOpacity="0.6" />
          <rect x="40" y="40" width="160" height="320" fill={VOID} fillOpacity="0.04" stroke="none" />
        </g>
        <g style={label}>
          <text x="98" y="555">1x = 80 · CURVE R 0.5x · BITE R 0.19x · CRUMB R 0.045x</text>
          <text x="300" y="352">R 0.5x</text>
          <text x="420" y="200">BITE</text>
        </g>

        <text x="590" y="80" fontFamily="var(--font-inter), sans-serif" fontSize="16" fill={VOID}>02 — Homepage</text>
        <g transform="translate(590 110)" fill="#e1e1e6">
          <rect width="340" height="430" rx="10" fill="#fff" stroke={s} />
          <rect x="18" y="18" width="24" height="24" rx="4" />
          <rect x="190" y="24" width="90" height="10" rx="3" />
          <rect x="290" y="20" width="34" height="18" rx="9" fill={VIOLET} fillOpacity="0.5" />
          <rect x="18" y="74" width="270" height="28" rx="4" fill="#cfcfd6" />
          <rect x="18" y="110" width="200" height="28" rx="4" fill="#cfcfd6" />
          <rect x="18" y="154" width="230" height="9" rx="3" />
          <rect x="18" y="170" width="180" height="9" rx="3" />
          <rect x="18" y="196" width="96" height="30" rx="15" fill={VIOLET} fillOpacity="0.5" />
          <rect x="18" y="250" width="96" height="58" rx="6" />
          <rect x="122" y="250" width="96" height="58" rx="6" />
          <rect x="226" y="250" width="96" height="58" rx="6" />
          <rect x="18" y="324" width="148" height="90" rx="6" />
          <rect x="174" y="324" width="148" height="90" rx="6" />
        </g>
        <g style={label}>
          <text x="610" y="580">RESULTS FIRST · PROOF ABOVE THE FOLD</text>
        </g>
      </svg>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Final design panels                                                 */
/* ------------------------------------------------------------------ */

export function DigivoraWebsite() {
  const stats = [
    { value: "3.2×", label: "Average ROAS" },
    { value: "−48%", label: "Cost per lead" },
    { value: "120+", label: "Campaigns shipped" },
  ];
  return (
    <ArtCanvas label="Digivora website concept homepage in a browser window" style={{ background: `linear-gradient(135deg, ${LILAC}, #ECE9FF 60%, #F7F7F5)` }}>
      <BrowserFrame width={66} dark url="digivora — website concept" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <div style={{ background: VOID, padding: "3cqw 4cqw 4cqw", position: "relative", overflow: "hidden" }}>
          <div className="absolute rounded-full" style={{ right: "-10cqw", top: "-14cqw", width: "50cqw", height: "50cqw", background: "radial-gradient(circle, rgb(109 91 255 / 0.5), transparent 65%)" }} />
          <div className="relative flex items-center justify-between">
            <span className="flex items-center" style={{ gap: "1cqw" }}>
              <Mark style={{ width: "3cqw" }} />
              <span style={{ fontSize: "1.9cqw", fontWeight: 600, color: "#fff", letterSpacing: "-0.04em" }}>digivora</span>
            </span>
            <span className="flex items-center" style={{ gap: "2.6cqw", fontSize: "1.25cqw", color: "rgb(255 255 255 / 0.6)" }}>
              <span>Work</span>
              <span>Services</span>
              <span>About</span>
              <span className="rounded-full" style={{ padding: "0.8cqw 1.8cqw", background: VIOLET, color: "#fff", fontWeight: 600 }}>
                Book a call
              </span>
            </span>
          </div>
          <div className="relative" style={{ marginTop: "6cqw", fontSize: "7cqw", fontWeight: 600, letterSpacing: "-0.06em", lineHeight: 0.95, color: "#fff" }}>
            Growth, with
            <br />
            an <span style={{ color: VIOLET }}>appetite.</span>
          </div>
          <div className="relative flex items-end justify-between" style={{ marginTop: "3cqw" }}>
            <div style={{ fontSize: "1.45cqw", lineHeight: 1.5, color: "rgb(255 255 255 / 0.6)", maxWidth: "34cqw" }}>
              Performance marketing, brand and web for ambitious companies that would rather show results than adjectives.
            </div>
            <div className="flex" style={{ gap: "3.4cqw" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: "3.4cqw", fontWeight: 600, color: "#fff", letterSpacing: "-0.05em" }}>{s.value}</div>
                  <div style={{ fontSize: "1.1cqw", color: "rgb(255 255 255 / 0.5)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative grid grid-cols-3" style={{ gap: "1.4cqw", marginTop: "4cqw" }}>
            {[
              `linear-gradient(135deg, ${VIOLET}, #3b2fd1)`,
              "linear-gradient(135deg, #2a2a33, #15151b)",
              `linear-gradient(135deg, ${LILAC}, #8f84ff)`,
            ].map((bg, i) => (
              <div key={i} style={{ aspectRatio: "4 / 2.2", borderRadius: "1.2cqw", background: bg }} />
            ))}
          </div>
        </div>
      </BrowserFrame>
    </ArtCanvas>
  );
}

export function DigivoraLogoSuite() {
  const tiles: { bg: string; content: React.ReactNode }[] = [
    { bg: VOID, content: <Mark style={{ width: "46%" }} /> },
    { bg: PAPER, content: <Mark color={VOID} style={{ width: "46%" }} /> },
    {
      bg: VIOLET,
      content: (
        <span className="flex items-center" style={{ gap: cq(1.4) }}>
          <Mark color="#fff" style={{ width: cq(7) }} />
          <Wordmark size={5.2} />
        </span>
      ),
    },
    { bg: LILAC, content: <Mark color={VOID} style={{ width: "46%" }} /> },
  ];
  return (
    <ArtCanvas label="Digivora logo suite on dark, light, violet and lilac backgrounds" style={{ background: "#E9E8EE" }}>
      <div className="absolute grid grid-cols-2" style={{ inset: cq(6), gap: cq(2.4) }}>
        {tiles.map((t, i) => (
          <div key={i} className="flex items-center justify-center" style={{ background: t.bg, borderRadius: cq(2.6) }}>
            {t.content}
          </div>
        ))}
      </div>
    </ArtCanvas>
  );
}

export function DigivoraStationery() {
  return (
    <ArtCanvas label="Digivora letterhead, business card and social post" style={{ background: "#E4E3EA" }}>
      {/* letterhead */}
      <div
        className="absolute bg-white"
        style={{ left: "8%", top: "10%", width: cq(46), aspectRatio: "1 / 1.414", padding: cq(4), transform: "rotate(-4deg)", boxShadow: `0 ${cq(3)} ${cq(8)} -${cq(3)} rgb(0 0 0 / 0.3)` }}
      >
        <span className="flex items-center" style={{ gap: cq(1) }}>
          <Mark style={{ width: cq(4.4) }} />
          <Wordmark size={2.8} color={VOID} />
        </span>
        <div style={{ marginTop: cq(8) }}>
          {[80, 92, 70, 88, 60, 0, 90, 76, 84, 50].map((w, i) => (
            <div key={i} style={{ height: cq(0.9), width: `${w}%`, background: w ? "#e5e5ea" : "transparent", borderRadius: cq(0.4), marginTop: cq(1.6) }} />
          ))}
        </div>
      </div>
      {/* social post */}
      <div
        className="absolute flex flex-col justify-between"
        style={{ right: "7%", top: "8%", width: cq(38), aspectRatio: "1", padding: cq(3.4), background: VIOLET, borderRadius: cq(2), transform: "rotate(5deg)", boxShadow: `0 ${cq(3)} ${cq(8)} -${cq(3)} rgb(0 0 0 / 0.35)` }}
      >
        <Mark color="#fff" style={{ width: cq(6) }} />
        <div style={{ fontSize: cq(5), fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 0.95, color: "#fff" }}>
          Hungry for
          <br />
          growth?
        </div>
      </div>
      {/* business card */}
      <div
        className="absolute flex flex-col justify-between"
        style={{ right: "10%", bottom: "9%", width: cq(46), aspectRatio: "1.75", padding: cq(3.4), background: VOID, borderRadius: cq(1.6), transform: "rotate(-3deg)", boxShadow: `0 ${cq(3)} ${cq(8)} -${cq(3)} rgb(0 0 0 / 0.45)` }}
      >
        <span className="flex items-center" style={{ gap: cq(1) }}>
          <Mark style={{ width: cq(4) }} />
          <Wordmark size={2.6} />
        </span>
        <div className="flex items-end justify-between">
          <span style={{ fontSize: cq(1.5), color: "rgb(255 255 255 / 0.55)", lineHeight: 1.6 }}>
            Brand & Growth Studio
            <br />
            Lahore · Remote
          </span>
          <span className="rounded-full" style={{ width: cq(3), height: cq(3), background: VIOLET }} />
        </div>
      </div>
    </ArtCanvas>
  );
}
