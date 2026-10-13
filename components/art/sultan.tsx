import { useId } from "react";

import { ArtCanvas, cq, Glow, Stage } from "./primitives";

const SAFFRON = "#B8792A";
const POMEGRANATE = "#7A1F1F";
const IVORY = "#F3EADB";
const CLOVE = "#2A1A14";
const SERIF = "ui-serif, Georgia, 'Times New Roman', serif";

const safeId = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, "");

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

/** The Sultan seal — crest with a Mughal dome and circular legend. */
function Seal({
  className,
  style,
  base = POMEGRANATE,
  ink = IVORY,
  accent = SAFFRON,
}: {
  className?: string;
  style?: React.CSSProperties;
  base?: string;
  ink?: string;
  accent?: string;
}) {
  const ring = `sultan-ring-${safeId(useId())}`;
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
      <defs>
        <path id={ring} d="M100 100 m-72 0 a72 72 0 1 1 144 0 a72 72 0 1 1 -144 0" />
      </defs>
      <circle cx="100" cy="100" r="97" fill={base} />
      <circle cx="100" cy="100" r="89" fill="none" stroke={accent} strokeWidth="1.6" />
      <circle cx="100" cy="100" r="56" fill="none" stroke={accent} strokeWidth="1.2" />
      <text fontFamily={SERIF} fontSize="13.5" letterSpacing="4.2" fill={ink}>
        <textPath href={`#${ring}`} startOffset="0">
          SULTAN · YAKHNI PULAO · LAHORE · SLOW COOKED ·
        </textPath>
      </text>
      {/* dome */}
      <line x1="100" y1="58" x2="100" y2="66" stroke={accent} strokeWidth="1.6" />
      <circle cx="100" cy="56" r="2.4" fill={accent} />
      <path d="M100 66 C105 74 120 79 120 95 C120 103 114 107 114 107 H86 C86 107 80 103 80 95 C80 79 95 74 100 66 Z" fill={accent} />
      <rect x="82" y="108" width="36" height="4" rx="1" fill={accent} />
      <rect x="86" y="113" width="28" height="13" fill={accent} opacity="0.55" />
      <path d="M95 126 V119 Q100 114 105 119 V126 Z" fill={base} />
      <text x="100" y="140" textAnchor="middle" fontFamily={SERIF} fontSize="9" letterSpacing="3" fill={ink}>
        EST. LAHORE
      </text>
    </svg>
  );
}

function RiceBox({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={{ position: "absolute", ...style }}>
      <svg viewBox="0 0 240 230" className="h-auto w-full overflow-visible" aria-hidden="true">
        <ellipse cx="120" cy="214" rx="96" ry="8" fill="#000" opacity="0.18" />
        <path d="M30 20 H210 L220 40 H20 Z" fill="#FBF6EC" />
        <path d="M20 40 H220 L212 68 H28 Z" fill="#E7DAC2" />
        <path d="M34 70 H206 L194 206 H46 Z" fill={IVORY} />
        <path d="M34 70 H206 L205 80 H35 Z" fill="#000" opacity="0.06" />
        <path d="M36.4 96 H203.6 L201 128 H39 Z" fill={POMEGRANATE} />
        <path d="M37 100 H203 M39 124 H201" stroke={SAFFRON} strokeWidth="1" />
        <text x="120" y="164" textAnchor="middle" fontFamily={SERIF} fontSize="24" letterSpacing="7" fill={CLOVE}>
          SULTAN
        </text>
        <text x="120" y="182" textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontSize="7.5" letterSpacing="4" fill={SAFFRON}>
          YAKHNI PULAO
        </text>
      </svg>
      <Seal
        style={{ position: "absolute", left: "50%", top: "33%", width: "26%", transform: "translateX(-50%)" }}
      />
    </div>
  );
}

function Cup({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={{ position: "absolute", ...style }}>
      <svg viewBox="0 0 140 150" className="h-auto w-full overflow-visible" aria-hidden="true">
        <ellipse cx="70" cy="140" rx="48" ry="5" fill="#000" opacity="0.18" />
        <path d="M18 34 H122 L110 134 H30 Z" fill={IVORY} />
        <path d="M22 70 H118 L116 88 H24 Z" fill={SAFFRON} />
        <ellipse cx="70" cy="34" rx="54" ry="10" fill={POMEGRANATE} />
        <ellipse cx="70" cy="31" rx="46" ry="6" fill="#8d2a2a" />
      </svg>
      <Seal
        base={IVORY}
        ink={CLOVE}
        accent={POMEGRANATE}
        style={{ position: "absolute", left: "50%", top: "62%", width: "30%", transform: "translateX(-50%)" }}
      />
    </div>
  );
}

function Bag({
  className,
  style,
  tone = "pomegranate",
}: {
  className?: string;
  style?: React.CSSProperties;
  tone?: "pomegranate" | "ivory";
}) {
  const fill = tone === "pomegranate" ? POMEGRANATE : IVORY;
  const ink = tone === "pomegranate" ? IVORY : POMEGRANATE;
  return (
    <div className={className} style={{ position: "absolute", ...style }}>
      <svg viewBox="0 0 180 250" className="h-auto w-full overflow-visible" aria-hidden="true">
        <ellipse cx="90" cy="240" rx="80" ry="7" fill="#000" opacity="0.18" />
        <path d="M58 70 C58 22 122 22 122 70" fill="none" stroke={tone === "pomegranate" ? SAFFRON : CLOVE} strokeWidth="5" strokeLinecap="round" />
        <path d="M18 64 H162 L168 236 H12 Z" fill={fill} />
        <path d="M18 64 H162 L163 84 H17 Z" fill="#000" opacity="0.12" />
        <text x="90" y="210" textAnchor="middle" fontFamily={SERIF} fontSize="19" letterSpacing="6" fill={ink}>
          SULTAN
        </text>
      </svg>
      <Seal
        base={tone === "pomegranate" ? IVORY : POMEGRANATE}
        ink={tone === "pomegranate" ? CLOVE : IVORY}
        accent={SAFFRON}
        style={{ position: "absolute", left: "50%", top: "40%", width: "44%", transform: "translateX(-50%)" }}
      />
    </div>
  );
}

function Steam({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 80" style={{ position: "absolute", ...style }} aria-hidden="true">
      {[20, 55, 90].map((x, i) => (
        <path
          key={x}
          d={`M${x} 78 C${x - 12} 60 ${x + 12} 46 ${x} 28 C${x - 10} 16 ${x + 6} 8 ${x} 2`}
          fill="none"
          stroke={CLOVE}
          strokeOpacity={0.18 + i * 0.04}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Cover                                                               */
/* ------------------------------------------------------------------ */

export function SultanCover() {
  return (
    <ArtCanvas label="Sultan Yakhni Pulao packaging family: carry bag, rice box and sealed cup" style={{ background: IVORY }}>
      <Glow color="rgb(184 121 42 / 0.35)" x={52} y={40} size={90} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 120%, rgb(122 31 31 / 0.18), transparent 60%)" }} />
      <Stage>
        <Bag style={{ left: cq(10), top: cq(13), width: cq(24) }} />
        <Steam style={{ left: cq(43), top: cq(4), width: cq(14) }} />
        <RiceBox style={{ left: cq(31), top: cq(14), width: cq(38) }} />
        <Cup style={{ left: cq(68), top: cq(31), width: cq(19) }} />
      </Stage>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Wireframe — packaging dieline                                       */
/* ------------------------------------------------------------------ */

export function SultanWireframe() {
  const cut = "#3a2a22";
  const fold = SAFFRON;
  const label = { fontFamily: "ui-monospace, monospace", fontSize: 11, fill: "#7a6a5c", letterSpacing: 1.6 } as const;

  return (
    <ArtCanvas label="Rice box dieline with cut and fold lines and seal position" style={{ background: "#F1EBDF" }}>
      <svg viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <text x="60" y="70" fontFamily="var(--font-inter), sans-serif" fontSize="16" fill={CLOVE}>
          Rice box dieline — 1:4
        </text>
        <g style={label}>
          <text x="60" y="94">CUT ——   FOLD - - -</text>
        </g>

        <g fill="none" strokeWidth="1.6">
          {/* panels (cut outline) */}
          <path
            stroke={cut}
            d="M380 130 V92 Q380 80 392 80 H608 Q620 80 620 92 V130 H650 L640 230 H720 V230 H960 V420 H720 V420 H620 V520 H380 V420 H280 V410 L250 400 V250 L280 240 V230 H360 L350 130 Z"
          />
          {/* folds */}
          <path stroke={fold} strokeDasharray="7 6" d="M380 130 H620 M380 230 H620 M380 420 H620 M380 230 V420 M620 230 V420 M720 230 V420 M280 230 V420 M380 130 V230 M620 130 V230" />
          {/* seal position */}
          <circle cx="500" cy="318" r="42" stroke={POMEGRANATE} strokeDasharray="4 5" />
          <path d="M488 318 H512 M500 306 V330" stroke={POMEGRANATE} />
          {/* band */}
          <rect x="380" y="292" width="240" height="52" fill={POMEGRANATE} fillOpacity="0.08" stroke="none" />
        </g>

        <g style={label}>
          <text x="470" y="112">TUCK FLAP</text>
          <text x="485" y="186">LID</text>
          <text x="476" y="260">FRONT</text>
          <text x="455" y="384">SEAL · Ø 34 MM</text>
          <text x="483" y="476">BASE</text>
          <text x="306" y="330">SIDE</text>
          <text x="648" y="330">SIDE</text>
          <text x="815" y="330">BACK</text>
          <text x="254" y="330" transform="rotate(-90 262 326)">GLUE</text>
        </g>

        {/* dimension */}
        <g stroke={cut} strokeWidth="1" style={label}>
          <path d="M380 560 H620 M380 552 V568 M620 552 V568" />
          <text x="476" y="584" stroke="none">180 MM</text>
          <path d="M990 230 V420 M982 230 H998 M982 420 H998" />
        </g>
      </svg>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Final design panels                                                 */
/* ------------------------------------------------------------------ */

export function SultanPackaging() {
  return (
    <ArtCanvas label="Sultan packaging family on pomegranate red" style={{ background: `radial-gradient(ellipse at 50% 30%, #8f2a2a, ${POMEGRANATE} 55%, #5e1616)` }}>
      <div className="absolute" style={{ left: cq(5), top: cq(4.5) }}>
        <div style={{ fontFamily: SERIF, fontSize: cq(2.6), color: IVORY, letterSpacing: "0.3em" }}>SULTAN</div>
        <div style={{ fontSize: cq(1.1), color: "rgb(243 234 219 / 0.6)", letterSpacing: "0.25em", marginTop: cq(0.6) }}>PACKAGING SYSTEM</div>
      </div>
      <Bag tone="ivory" style={{ left: "10%", bottom: "8%", width: cq(20) }} />
      <RiceBox style={{ left: "50%", bottom: "8%", width: cq(31), transform: "translateX(-50%)" }} />
      <Cup style={{ right: "22%", bottom: "8%", width: cq(13) }} />
      <Cup style={{ right: "8%", bottom: "8%", width: cq(11) }} />
    </ArtCanvas>
  );
}

export function SultanPoster() {
  return (
    <ArtCanvas label="Launch campaign poster reading Patience, served hot" style={{ background: "#E4D8C2" }}>
      <div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between text-center"
        style={{
          width: "58%",
          aspectRatio: "3 / 4.2",
          background: IVORY,
          padding: `${cq(6)} ${cq(5)}`,
          boxShadow: `0 ${cq(4)} ${cq(9)} -${cq(3)} rgb(42 26 20 / 0.45)`,
          border: `${cq(0.5)} solid ${POMEGRANATE}`,
        }}
      >
        <div className="relative flex w-full flex-col items-center">
          <Steam style={{ top: `-${cq(5)}`, width: cq(12) }} />
          <Seal style={{ width: cq(20), marginTop: cq(4) }} />
        </div>
        <div style={{ fontFamily: SERIF, fontSize: cq(7.2), lineHeight: 1, color: POMEGRANATE, letterSpacing: "-0.02em" }}>
          Patience,
          <br />
          <em>served hot.</em>
        </div>
        <div>
          <div style={{ width: cq(8), height: cq(0.3), background: SAFFRON, margin: `0 auto ${cq(2)}` }} />
          <div style={{ fontSize: cq(1.7), color: CLOVE, letterSpacing: "0.18em" }}>SLOW-COOKED YAKHNI · AGED BASMATI</div>
        </div>
      </div>
    </ArtCanvas>
  );
}

const posts: { bg: string; content: React.ReactNode }[] = [
  { bg: POMEGRANATE, content: <Seal style={{ width: "62%" }} /> },
  { bg: IVORY, content: <PostWord color={POMEGRANATE}>Slow.</PostWord> },
  { bg: SAFFRON, content: <PostWord color={IVORY} small>Patience, served hot.</PostWord> },
  { bg: CLOVE, content: <PostWord color={SAFFRON} small>Made to share.</PostWord> },
  { bg: IVORY, content: <Seal base={IVORY} ink={CLOVE} accent={POMEGRANATE} style={{ width: "62%" }} /> },
  { bg: POMEGRANATE, content: <PostWord color={IVORY}>Hot.</PostWord> },
  { bg: IVORY, content: <PostWord color={CLOVE} small>Order on your favourite app.</PostWord> },
  { bg: POMEGRANATE, content: <PostWord color={SAFFRON}>Rich.</PostWord> },
  { bg: SAFFRON, content: <Seal base={SAFFRON} ink={CLOVE} accent={POMEGRANATE} style={{ width: "62%" }} /> },
];

function PostWord({ children, color, small }: { children: React.ReactNode; color: string; small?: boolean }) {
  return (
    <span
      className="px-[8%] text-center"
      style={{ fontFamily: SERIF, color, fontSize: small ? cq(3) : cq(5.4), lineHeight: 1.05, fontStyle: small ? "italic" : "normal" }}
    >
      {children}
    </span>
  );
}

export function SultanSocial() {
  return (
    <ArtCanvas label="Grid of nine Sultan launch social posts" style={{ background: "#170E0B" }}>
      <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 grid-cols-3" style={{ width: "74%", gap: cq(1.2) }}>
        {posts.map((post, i) => (
          <div key={i} className="flex aspect-square items-center justify-center overflow-hidden" style={{ background: post.bg, borderRadius: cq(0.8) }}>
            {post.content}
          </div>
        ))}
      </div>
    </ArtCanvas>
  );
}
