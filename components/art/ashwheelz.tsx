import { useId } from "react";
import Image from "next/image";

import { ArtCanvas, cq, Glow, GridBackdrop, Phone, Stage, StatusBar } from "./primitives";

// Sampled from the Ashwheelz logo.
const ORANGE = "#FD8109";
const GRAPHITE = "#211F1F";
const ASH_GREY = "#4C4C4A";
const ASPHALT = "#2B2B2B";
const CONCRETE = "#F4F4F2";

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

const LOGO = { src: "/brands/ashwheelz-logo.webp", width: 963, height: 831 };

/** The Ashwheelz logo (marks above the wordmark), sized by height in cqw. */
function AshLogo({ height, style }: { height: number; style?: React.CSSProperties }) {
  return (
    <Image
      src={LOGO.src}
      width={LOGO.width}
      height={LOGO.height}
      alt=""
      sizes="(min-width: 1024px) 220px, 140px"
      style={{ height: cq(height), width: "auto", ...style }}
    />
  );
}

/** Side-view box van with the Ashwheelz livery. */
function Van({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const body = `aw-body-${id}`;
  const glass = `aw-glass-${id}`;
  return (
    <svg viewBox="0 0 400 190" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={body} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E6E6E2" />
        </linearGradient>
        <linearGradient id={glass} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="1" stopColor="#121212" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="176" rx="186" ry="7" fill="#000" opacity="0.35" />
      {/* cargo box */}
      <rect x="18" y="18" width="254" height="124" rx="7" fill={`url(#${body})`} />
      {/* cab */}
      <path d="M272 52 H322 Q336 52 343 63 L364 99 Q374 104 374 117 V142 H272 Z" fill={`url(#${body})`} />
      <path d="M284 62 H318 Q327 62 332 70 L351 102 H284 Z" fill={`url(#${glass})`} />
      <path d="M290 66 L300 66 L288 96 Z" fill="#fff" opacity="0.12" />
      <line x1="306" y1="106" x2="306" y2="140" stroke="#cfcfcb" strokeWidth="1.2" />
      <rect x="292" y="112" width="9" height="3" rx="1.5" fill="#9a9a96" />
      <rect x="364" y="108" width="10" height="7" rx="2" fill="#FFE2CF" />
      {/* signal stripe */}
      <path d="M18 116 H374 V128 H18 Z" fill={ORANGE} />
      <path d="M210 116 L238 84 H272 V96 H244 L227 116 Z" fill={ORANGE} />
      {/* chassis */}
      <rect x="18" y="140" width="358" height="12" rx="3" fill="#1c1c1c" />
      <rect x="352" y="130" width="26" height="12" rx="3" fill={ASPHALT} />
      {/* wordmark */}
      <image href={LOGO.src} x="34" y="24" width="104" height="90" preserveAspectRatio="xMidYMid meet" />
      <g fontFamily="var(--font-inter), system-ui, sans-serif" fontWeight="600" fontSize="10.5" letterSpacing="2.2" fill={ASH_GREY}>
        <text x="152" y="62">LOGISTICS &amp;</text>
        <text x="152" y="78">CONTRACTING</text>
      </g>
      {/* wheels */}
      {[82, 322].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="150" r="27" fill="#0d0d0d" />
          <circle cx={cx} cy="152" r="21" fill="#1a1a1a" />
          <circle cx={cx} cy="152" r="10" fill="#9d9d99" />
          <circle cx={cx} cy="152" r="4" fill="#2b2b2b" />
        </g>
      ))}
    </svg>
  );
}

function BusinessCard({
  side,
  width,
  style,
}: {
  side: "front" | "back";
  width: number;
  style?: React.CSSProperties;
}) {
  const h = width / 1.75;
  const shared: React.CSSProperties = {
    width: cq(width),
    height: cq(h),
    borderRadius: cq(width * 0.035),
    boxShadow: `0 ${cq(width * 0.06)} ${cq(width * 0.14)} -${cq(width * 0.04)} rgb(0 0 0 / 0.45)`,
    ...style,
  };

  if (side === "front") {
    return (
      <div className="absolute flex flex-col justify-between overflow-hidden" style={{ ...shared, background: CONCRETE, padding: cq(width * 0.08) }}>
        <AshLogo height={width * 0.3} />
        <div className="absolute right-0 bottom-0" style={{ width: "34%", height: "100%", background: `linear-gradient(135deg, transparent 50%, ${ORANGE} 50%)` }} />
        <span className="relative" style={{ fontSize: cq(width * 0.032), color: ASH_GREY, letterSpacing: "0.2em" }}>ASHWHEELZ.COM</span>
      </div>
    );
  }

  return (
    <div className="absolute flex flex-col justify-between" style={{ ...shared, background: GRAPHITE, padding: cq(width * 0.08) }}>
      <div>
        <div style={{ fontSize: cq(width * 0.06), fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>Sheheryar Chaudhary</div>
        <div style={{ fontSize: cq(width * 0.036), color: "rgb(255 255 255 / 0.65)", marginTop: cq(width * 0.012) }}>Marketing & Creative Executive</div>
      </div>
      <div className="flex items-end justify-between">
        <div style={{ fontSize: cq(width * 0.032), color: "rgb(255 255 255 / 0.6)", lineHeight: 1.6 }}>
          Lahore Office
          <br />
          Sales & Marketing
        </div>
        <span className="rounded-full" style={{ width: cq(width * 0.07), height: cq(width * 0.07), background: ORANGE }} />
      </div>
    </div>
  );
}

function IdCard({ width, style }: { width: number; style?: React.CSSProperties }) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        width: cq(width),
        aspectRatio: "54 / 86",
        borderRadius: cq(width * 0.07),
        background: "#fff",
        boxShadow: `0 ${cq(width * 0.1)} ${cq(width * 0.24)} -${cq(width * 0.08)} rgb(0 0 0 / 0.5)`,
        ...style,
      }}
    >
      <div className="relative flex flex-col items-center" style={{ background: CONCRETE, height: "38%", paddingTop: cq(width * 0.06) }}>
        <span className="rounded-full" style={{ width: cq(width * 0.22), height: cq(width * 0.045), background: "rgb(0 0 0 / 0.12)" }} />
        <span style={{ marginTop: cq(width * 0.04) }}>
          <AshLogo height={width * 0.22} />
        </span>
        <div className="absolute inset-x-0 bottom-0" style={{ height: cq(width * 0.03), background: ORANGE }} />
      </div>
      <div className="flex flex-col items-center" style={{ padding: `0 ${cq(width * 0.1)}` }}>
        <div
          className="relative z-10 rounded-full"
          style={{
            width: cq(width * 0.36),
            height: cq(width * 0.36),
            marginTop: cq(-width * 0.12),
            border: `${cq(width * 0.02)} solid #fff`,
            background: "radial-gradient(circle at 50% 38%, #c9c9c5 0 22%, transparent 23%), radial-gradient(ellipse at 50% 100%, #c9c9c5 0 45%, transparent 46%), #e9e9e6",
          }}
        />
        <div style={{ marginTop: cq(width * 0.05), fontSize: cq(width * 0.075), fontWeight: 700, color: GRAPHITE, letterSpacing: "-0.03em" }}>
          Employee Name
        </div>
        <div style={{ fontSize: cq(width * 0.05), color: "#646460", marginTop: cq(width * 0.015) }}>Field Operations</div>
        <div className="flex w-full items-end justify-between" style={{ marginTop: cq(width * 0.08) }}>
          <span style={{ fontSize: cq(width * 0.045), color: "#6b6b6b", letterSpacing: "0.1em" }}>ID · AW-0042</span>
          <span className="flex items-end" style={{ gap: cq(width * 0.006), height: cq(width * 0.1) }}>
            {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2].map((w, i) => (
              <span key={i} style={{ width: cq(width * 0.006 * w), height: "100%", background: GRAPHITE }} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cover                                                               */
/* ------------------------------------------------------------------ */

export function AshwheelzCover() {
  return (
    <ArtCanvas label="Ashwheelz fleet van in orange-and-white livery with business card and employee ID" style={{ background: "#121212" }}>
      <GridBackdrop />
      <Glow color="rgb(253 129 9 / 0.35)" x={30} y={70} size={90} />
      <Stage>
        <Van className="absolute" style={{ left: cq(8), top: cq(19), width: cq(58) }} />
        <BusinessCard side="back" width={27} style={{ right: cq(7), top: cq(9), transform: "rotate(7deg)" }} />
        <IdCard width={15} style={{ right: cq(24), top: cq(25), transform: "rotate(-8deg)" }} />
      </Stage>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Wireframe                                                           */
/* ------------------------------------------------------------------ */

export function AshwheelzWireframe() {
  const stroke = "#9b9b97";
  const label = { fontFamily: "ui-monospace, monospace", fontSize: 11, fill: "#6f6f6b", letterSpacing: 1.5 } as const;
  return (
    <ArtCanvas label="Grayscale wireframes of livery zones, stationery templates and social grid" style={{ background: "#EDEDEA" }}>
      <svg viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="aw-wf-grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M25 0H0V25" fill="none" stroke="#000" strokeOpacity="0.04" />
          </pattern>
        </defs>
        <rect width="1000" height="625" fill="url(#aw-wf-grid)" />

        {/* van outline with zones */}
        <g transform="translate(60 200)" fill="none" stroke={stroke} strokeWidth="1.6">
          <rect x="0" y="0" width="380" height="186" rx="10" />
          <path d="M380 52 H455 Q475 52 485 68 L515 120 Q528 128 528 145 V186 H380 Z" />
          <circle cx="95" cy="200" r="34" />
          <circle cx="455" cy="200" r="34" />
          <rect x="28" y="40" width="210" height="62" strokeDasharray="6 5" stroke="#FD8109" />
          <rect x="28" y="140" width="500" height="18" strokeDasharray="6 5" />
          <rect x="270" y="36" width="88" height="66" strokeDasharray="6 5" />
        </g>
        <g style={label}>
          <text x="102" y="276">LOGO ZONE · 55% OF PANEL</text>
          <text x="340" y="274">QR / CONTACT</text>
          <text x="60" y="476">SIGNAL STRIPE · CONTINUOUS ACROSS CAB</text>
          <text x="60" y="160" fontSize="15" fill="#111" letterSpacing="0">01 — Livery placement</text>
        </g>

        {/* stationery */}
        <g transform="translate(640 110)" fill="none" stroke={stroke} strokeWidth="1.4">
          <text x="0" y="-22" style={{ ...label, fontSize: 15, fill: "#111", letterSpacing: 0 }} stroke="none">02 — Collateral</text>
          <rect x="0" y="0" width="175" height="100" rx="6" />
          <rect x="16" y="16" width="70" height="12" fill="#cfcfcb" stroke="none" />
          <rect x="16" y="70" width="50" height="6" fill="#dcdcd8" stroke="none" />
          <path d="M120 100 L175 45 V100 Z" fill="#dcdcd8" stroke="none" />
          <rect x="0" y="118" width="175" height="100" rx="6" />
          <rect x="16" y="134" width="95" height="10" fill="#cfcfcb" stroke="none" />
          <rect x="16" y="150" width="70" height="6" fill="#dcdcd8" stroke="none" />
          <rect x="195" y="0" width="110" height="175" rx="10" />
          <circle cx="250" cy="70" r="22" />
          <rect x="215" y="105" width="70" height="9" fill="#cfcfcb" stroke="none" />
          <rect x="228" y="120" width="44" height="6" fill="#dcdcd8" stroke="none" />
          <rect x="195" y="0" width="110" height="44" fill="#dcdcd8" stroke="none" />
        </g>

        {/* social grid */}
        <g transform="translate(640 380)" fill="none" stroke={stroke} strokeWidth="1.4">
          <text x="0" y="-18" style={{ ...label, fontSize: 15, fill: "#111", letterSpacing: 0 }} stroke="none">03 — Social grid</text>
          {[0, 1, 2].map((col) =>
            [0, 1].map((row) => (
              <g key={`${col}-${row}`} transform={`translate(${col * 105} ${row * 105})`}>
                <rect width="95" height="95" rx="6" />
                <path d="M0 0 L95 95 M95 0 L0 95" strokeOpacity="0.5" />
              </g>
            )),
          )}
        </g>
      </svg>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Final design panels                                                 */
/* ------------------------------------------------------------------ */

export function AshwheelzLivery() {
  return (
    <ArtCanvas label="Ashwheelz van livery on the road" style={{ background: "linear-gradient(180deg, #ECEBE7 0%, #F6F6F3 62%, #1c1c1c 62%)" }}>
      <div className="absolute inset-x-0" style={{ top: "79%", height: cq(0.6), backgroundImage: "linear-gradient(to right, rgb(255 255 255 / 0.7) 50%, transparent 50%)", backgroundSize: `${cq(6)} 100%` }} />
      <div className="absolute" style={{ left: cq(5), bottom: cq(4) }}>
        <div style={{ fontSize: cq(1), color: "rgb(255 255 255 / 0.5)", letterSpacing: "0.2em", marginTop: cq(0.8) }}>FLEET LIVERY · SIDE ELEVATION</div>
      </div>
      <Van className="absolute left-1/2 -translate-x-1/2" style={{ bottom: "36%", width: cq(56) }} />
    </ArtCanvas>
  );
}

export function AshwheelzStationery() {
  return (
    <ArtCanvas label="Ashwheelz business cards and employee ID card" style={{ background: "#171717" }}>
      <Glow color="rgb(253 129 9 / 0.28)" x={70} y={30} size={80} />
      <div className="absolute inset-0">
        <div className="absolute" style={{ left: "50%", top: "-4%", width: cq(1.2), height: "34%", background: `linear-gradient(${ORANGE}, #b84b1c)`, transform: "translateX(18cqw) rotate(4deg)" }} />
        <IdCard width={30} style={{ left: "50%", top: "26%", transform: "translateX(4cqw) rotate(4deg)" }} />
        <BusinessCard side="front" width={46} style={{ left: "6%", top: "18%", transform: "rotate(-6deg)" }} />
        <BusinessCard side="back" width={46} style={{ left: "10%", top: "56%", transform: "rotate(-2deg)" }} />
      </div>
    </ArtCanvas>
  );
}

const ratings = [
  { label: "Delivery time", value: 5 },
  { label: "Safety", value: 5 },
  { label: "Driver", value: 4 },
  { label: "Hygiene", value: 5 },
  { label: "Service", value: 4 },
];

export function AshwheelzFeedback() {
  return (
    <ArtCanvas label="Ashwheelz customer feedback form on a phone" style={{ background: ORANGE }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 20%, rgb(255 255 255 / 0.25), transparent 55%)" }} />
      <div className="absolute" style={{ left: cq(7), top: cq(8), width: cq(38) }}>
        <div style={{ fontSize: cq(1.6), letterSpacing: "0.18em", color: "rgb(17 17 17 / 0.6)" }}>FEEDBACK SYSTEM</div>
        <div style={{ fontSize: cq(5.4), fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 0.95, color: GRAPHITE, marginTop: cq(2) }}>
          One link.
          <br />
          Every delivery rated.
        </div>
      </div>
      <Phone width={36} style={{ right: cq(8), top: cq(10) }} screen={CONCRETE}>
        <StatusBar />
        <div style={{ padding: "6cqw 8cqw" }}>
          <AshLogo height={13} />
          <div style={{ fontSize: "9cqw", fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, color: GRAPHITE, marginTop: "8cqw" }}>
            How was your delivery?
          </div>
          <div style={{ fontSize: "3.6cqw", color: "#646464", marginTop: "3cqw" }}>Takes 30 seconds. Every answer is read.</div>
          <div style={{ marginTop: "6cqw", display: "flex", flexDirection: "column", gap: "3cqw" }}>
            {ratings.map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-[3cqw] bg-white" style={{ padding: "3.4cqw 4cqw" }}>
                <span style={{ fontSize: "4cqw", fontWeight: 500, color: GRAPHITE }}>{r.label}</span>
                <span className="flex" style={{ gap: "1cqw" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" style={{ width: "4cqw", height: "4cqw" }}>
                      <path d="M12 2l3 6.6 7.2.7-5.4 4.8 1.6 7.1L12 17.6 5.6 21.2l1.6-7.1L1.8 9.3 9 8.6z" fill={i < r.value ? ORANGE : "#dcdcd8"} />
                    </svg>
                  ))}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center rounded-full" style={{ marginTop: "6cqw", height: "12cqw", background: GRAPHITE, color: "#fff", fontSize: "4.2cqw", fontWeight: 600 }}>
            Submit feedback
          </div>
        </div>
      </Phone>
    </ArtCanvas>
  );
}
