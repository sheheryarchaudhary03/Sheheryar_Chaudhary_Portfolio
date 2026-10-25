import Image from "next/image";

import { ArtCanvas, BrowserFrame, cq, Glow, GridBackdrop, Phone, Stage, StatusBar } from "./primitives";

const ORANGE = "#FD8109";
const GRAPHITE = "#211F1F";
const ASH_GREY = "#4C4C4A";
const CONCRETE = "#F4F4F2";
const LINE = "#E4E4E0";
const MUTED = "#64645f";

/** Logo sized by height in cqw of the nearest container. */
function Logo({ height }: { height: string }) {
  return (
    <Image
      src="/brands/ashwheelz-logo.webp"
      width={963}
      height={831}
      alt=""
      sizes="160px"
      style={{ height, width: "auto" }}
    />
  );
}

function Stars({ value, size }: { value: number; size: string }) {
  return (
    <span className="flex" style={{ gap: `calc(${size} * 0.22)` }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" style={{ width: size, height: size }}>
          <path
            d="M12 2l3 6.6 7.2.7-5.4 4.8 1.6 7.1L12 17.6 5.6 21.2l1.6-7.1L1.8 9.3 9 8.6z"
            fill={i < value ? ORANGE : "#dcdcd8"}
          />
        </svg>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

const ratings = [
  { label: "Delivery time", value: 5 },
  { label: "Safety", value: 5 },
  { label: "Driver", value: 4 },
  { label: "Hygiene", value: 5 },
  { label: "Service", value: 4 },
];

/** Phone screen; sizes in cqw of the screen. */
function FormScreen() {
  return (
    <div className="relative h-full" style={{ background: CONCRETE }}>
      <StatusBar />
      <div style={{ padding: "5cqw 6.5cqw" }}>
        <Logo height="12cqw" />
        <div style={{ fontSize: "8.4cqw", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1, color: GRAPHITE, marginTop: "5cqw" }}>
          How was your delivery?
        </div>
        <div style={{ fontSize: "3.4cqw", color: MUTED, marginTop: "2.4cqw" }}>One minute. Every answer is read.</div>
        <div className="flex flex-col" style={{ gap: "2.4cqw", marginTop: "5cqw" }}>
          {ratings.map((r, i) => (
            <div key={r.label} className="rounded-[3cqw] bg-white" style={{ padding: "3cqw 3.6cqw" }}>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "3.8cqw", fontWeight: 600, color: GRAPHITE }}>{r.label}</span>
                <Stars value={r.value} size="3.8cqw" />
              </div>
              {i === 2 && (
                <div className="rounded-[2cqw]" style={{ marginTop: "2.4cqw", padding: "2.2cqw 2.6cqw", background: CONCRETE, fontSize: "3cqw", color: MUTED }}>
                  Suggestion: call before arriving at the gate
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ fontSize: "3.4cqw", fontWeight: 600, color: GRAPHITE, marginTop: "4.4cqw" }}>How likely are you to recommend us?</div>
        <div className="flex justify-between" style={{ marginTop: "2.2cqw" }}>
          {Array.from({ length: 11 }).map((_, n) => (
            <span
              key={n}
              className="flex items-center justify-center rounded-[1.4cqw]"
              style={{
                width: "7cqw",
                height: "7cqw",
                fontSize: "3cqw",
                fontWeight: 600,
                background: n === 9 ? ORANGE : "#fff",
                color: n === 9 ? GRAPHITE : MUTED,
              }}
            >
              {n}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-center rounded-full" style={{ marginTop: "5cqw", height: "11.5cqw", background: GRAPHITE, color: "#fff", fontSize: "4cqw", fontWeight: 600 }}>
          Submit feedback
        </div>
      </div>
    </div>
  );
}

const rows = [
  { who: "A. R.", rating: 5, nps: 10, status: "New", date: "Today, 10:42" },
  { who: "S. K.", rating: 4, nps: 9, status: "Reviewed", date: "Today, 09:15" },
  { who: "H. I.", rating: 3, nps: 6, status: "Actioned", date: "Yesterday" },
  { who: "Z. M.", rating: 5, nps: 9, status: "Reviewed", date: "Yesterday" },
  { who: "B. H.", rating: 4, nps: 8, status: "New", date: "Mon" },
];

const statusStyle: Record<string, { bg: string; fg: string }> = {
  New: { bg: "#FFE9D2", fg: "#8A4300" },
  Reviewed: { bg: "#E6EEF9", fg: "#1F4C8A" },
  Actioned: { bg: "#E1F3E6", fg: "#1D6B3A" },
};

/** Browser viewport; sizes in cqw of the viewport. */
function AdminScreen() {
  return (
    <div className="flex" style={{ background: CONCRETE, minHeight: "58cqw" }}>
      <aside className="flex flex-col" style={{ width: "20cqw", background: GRAPHITE, padding: "3cqw 2.4cqw", gap: "1.2cqw" }}>
        <span className="flex items-center justify-center rounded-[1cqw] bg-white" style={{ padding: "1.2cqw", marginBottom: "2cqw" }}>
          <Logo height="6cqw" />
        </span>
        {["Responses", "Export", "Change password"].map((item, i) => (
          <span
            key={item}
            className="rounded-[0.8cqw]"
            style={{ padding: "1.1cqw 1.4cqw", fontSize: "1.35cqw", fontWeight: 500, color: i === 0 ? GRAPHITE : "rgb(255 255 255 / 0.7)", background: i === 0 ? ORANGE : "transparent" }}
          >
            {item}
          </span>
        ))}
      </aside>
      <div className="flex-1" style={{ padding: "3cqw 3.4cqw" }}>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: "2.6cqw", fontWeight: 700, color: GRAPHITE, letterSpacing: "-0.03em" }}>Responses</span>
          <span className="rounded-full" style={{ padding: "0.9cqw 2cqw", background: ORANGE, color: GRAPHITE, fontSize: "1.25cqw", fontWeight: 700 }}>
            Export to Excel
          </span>
        </div>
        <div className="flex" style={{ gap: "1.4cqw", marginTop: "2.2cqw" }}>
          {[
            ["Avg. rating", "4.6"],
            ["Recommend (NPS)", "+58"],
            ["Awaiting review", "12"],
          ].map(([k, v]) => (
            <div key={k} className="flex-1 rounded-[1.2cqw] bg-white" style={{ padding: "1.6cqw 1.8cqw" }}>
              <div style={{ fontSize: "1.1cqw", color: MUTED }}>{k}</div>
              <div style={{ fontSize: "2.6cqw", fontWeight: 700, color: GRAPHITE, letterSpacing: "-0.03em" }}>{v}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center" style={{ gap: "1cqw", marginTop: "2cqw" }}>
          <span className="flex-1 rounded-full bg-white" style={{ padding: "0.9cqw 1.8cqw", fontSize: "1.2cqw", color: MUTED, border: `0.1cqw solid ${LINE}` }}>
            Search name, phone or comment
          </span>
          {["All", "New", "Reviewed", "Actioned", "Archived"].map((f, i) => (
            <span
              key={f}
              className="rounded-full"
              style={{ padding: "0.8cqw 1.4cqw", fontSize: "1.15cqw", fontWeight: 600, background: i === 0 ? GRAPHITE : "#fff", color: i === 0 ? "#fff" : ASH_GREY }}
            >
              {f}
            </span>
          ))}
        </div>
        <div className="overflow-hidden rounded-[1.2cqw] bg-white" style={{ marginTop: "1.6cqw" }}>
          <div className="grid" style={{ gridTemplateColumns: "1.1fr 1.6fr 0.7fr 1fr 1fr", padding: "1cqw 1.8cqw", fontSize: "1.05cqw", color: MUTED, borderBottom: `0.1cqw solid ${LINE}` }}>
            <span>Customer</span>
            <span>Overall</span>
            <span>NPS</span>
            <span>Status</span>
            <span>Received</span>
          </div>
          {rows.map((r) => (
            <div
              key={r.who + r.date}
              className="grid items-center"
              style={{ gridTemplateColumns: "1.1fr 1.6fr 0.7fr 1fr 1fr", padding: "1.15cqw 1.8cqw", fontSize: "1.2cqw", color: GRAPHITE, borderBottom: `0.1cqw solid ${LINE}` }}
            >
              <span style={{ fontWeight: 600 }}>{r.who}</span>
              <Stars value={r.rating} size="1.35cqw" />
              <span>{r.nps}</span>
              <span>
                <span className="rounded-full" style={{ padding: "0.35cqw 1cqw", fontSize: "1.05cqw", fontWeight: 600, background: statusStyle[r.status].bg, color: statusStyle[r.status].fg }}>
                  {r.status}
                </span>
              </span>
              <span style={{ color: MUTED }}>{r.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cover                                                               */
/* ------------------------------------------------------------------ */

export function FeedbackCover() {
  return (
    <ArtCanvas label="Ashwheelz feedback form on a phone in front of the admin dashboard" style={{ background: "#1a1818" }}>
      <GridBackdrop />
      <Glow color="rgb(253 129 9 / 0.32)" x={70} y={30} size={80} />
      <Stage>
        <BrowserFrame width={62} url="Ashwheelz Feedback — Admin" style={{ left: cq(6), top: cq(10) }}>
          <AdminScreen />
        </BrowserFrame>
        <Phone width={22} style={{ right: cq(9), top: cq(5) }} screen={CONCRETE}>
          <FormScreen />
        </Phone>
      </Stage>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Wireframe                                                           */
/* ------------------------------------------------------------------ */

export function FeedbackWireframe() {
  const s = "#a3a39d";
  const f = "#e2e2de";
  const label = { fontFamily: "ui-monospace, monospace", fontSize: 11, fill: "#6d6d68", letterSpacing: 1.5 } as const;
  return (
    <ArtCanvas label="Wireframes of the mobile feedback form and the admin response table" style={{ background: "#EEEEEA" }}>
      <svg viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <text x="70" y="78" fontFamily="var(--font-inter), sans-serif" fontSize="15" fill={GRAPHITE}>01 — Customer form</text>
        <g transform="translate(70 100)" fill={f}>
          <rect width="220" height="460" rx="30" fill="#fff" stroke={s} strokeWidth="1.6" />
          <rect x="22" y="40" width="70" height="40" rx="6" />
          <rect x="22" y="96" width="170" height="20" rx="4" fill="#cfcfca" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(22 ${140 + i * 46})`}>
              <rect width="176" height="36" rx="8" fill="none" stroke={s} />
              <rect x="10" y="13" width="56" height="10" rx="3" />
              <rect x="110" y="13" width="56" height="10" rx="3" fill={ORANGE} fillOpacity="0.45" />
            </g>
          ))}
          <rect x="22" y="380" width="176" height="18" rx="4" />
          <rect x="22" y="412" width="176" height="30" rx="15" fill="#cfcfca" />
        </g>
        <g style={label}>
          <text x="300" y="260">5 × STAR + SUGGESTION</text>
          <text x="300" y="520">NPS 0–10 · ONE SUBMIT</text>
        </g>

        <text x="470" y="78" fontFamily="var(--font-inter), sans-serif" fontSize="15" fill={GRAPHITE}>02 — Admin portal</text>
        <g transform="translate(470 100)" fill={f}>
          <rect width="470" height="400" rx="12" fill="#fff" stroke={s} strokeWidth="1.6" />
          <rect x="0" y="0" width="96" height="400" rx="12" fill="#d6d6d1" />
          <rect x="116" y="22" width="120" height="18" rx="4" fill="#cfcfca" />
          <rect x="366" y="20" width="86" height="22" rx="11" fill={ORANGE} fillOpacity="0.5" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={116 + i * 114} y="58" width="104" height="48" rx="8" fill="none" stroke={s} />
          ))}
          <rect x="116" y="122" width="190" height="20" rx="10" fill="none" stroke={s} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={316 + i * 34} y="124" width="28" height="16" rx="8" />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} transform={`translate(116 ${158 + i * 36})`}>
              <rect width="336" height="28" rx="4" fill={i === 0 ? "#ededea" : "none"} stroke={i === 0 ? "none" : s} strokeOpacity="0.5" />
              <rect x="250" y="8" width="44" height="12" rx="6" fill={i % 2 ? "#cfcfca" : ORANGE} fillOpacity={i % 2 ? 1 : 0.35} />
            </g>
          ))}
        </g>
        <g style={label}>
          <text x="470" y="540">SEARCH · FILTER BY STATUS · ONE-CLICK EXCEL EXPORT</text>
        </g>
      </svg>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Final design panels                                                 */
/* ------------------------------------------------------------------ */

export function FeedbackAdmin() {
  return (
    <ArtCanvas label="Admin dashboard listing feedback responses with filters, statuses and Excel export" style={{ background: `linear-gradient(140deg, #2b2826, ${GRAPHITE} 60%)` }}>
      <Glow color="rgb(253 129 9 / 0.28)" x={80} y={10} size={70} />
      <BrowserFrame width={76} url="ashwheelz-feedback — /admin" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <AdminScreen />
      </BrowserFrame>
    </ArtCanvas>
  );
}

export function FeedbackForm() {
  return (
    <ArtCanvas label="Mobile feedback form with star ratings, a suggestion and an NPS score" style={{ background: ORANGE }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 20%, rgb(255 255 255 / 0.3), transparent 55%)" }} />
      <div className="absolute" style={{ left: cq(7), top: cq(8), width: cq(36) }}>
        <div style={{ fontSize: cq(2), letterSpacing: "0.18em", color: "rgb(33 31 31 / 0.65)" }}>ONE LINK · NO LOGIN</div>
        <div style={{ fontSize: cq(6.4), fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 0.95, color: GRAPHITE, marginTop: cq(2) }}>
          Rated in under a minute.
        </div>
      </div>
      <Phone width={46} style={{ right: cq(7), top: cq(12) }} screen={CONCRETE}>
        <FormScreen />
      </Phone>
    </ArtCanvas>
  );
}

export function FeedbackSheet() {
  const cols = ["Timestamp", "Time", "Safety", "Driver", "Hygiene", "Service"];
  const data = [
    ["10:42", "5", "5", "4", "5", "4"],
    ["09:15", "4", "5", "5", "4", "5"],
    ["Yest.", "3", "4", "3", "4", "3"],
    ["Yest.", "5", "5", "5", "5", "5"],
    ["Mon", "4", "4", "4", "5", "4"],
    ["Mon", "5", "4", "5", "5", "4"],
  ];
  return (
    <ArtCanvas label="Version one: Google Sheet of responses with an Ashwheelz menu to download Excel" style={{ background: "#E9EFE9" }}>
      <div
        className="absolute overflow-hidden bg-white"
        style={{ inset: `${cq(10)} ${cq(7)}`, borderRadius: cq(2.4), boxShadow: `0 ${cq(3)} ${cq(8)} -${cq(3)} rgb(0 0 0 / 0.3)` }}
      >
        <div className="flex items-center" style={{ gap: cq(2), padding: `${cq(2)} ${cq(2.4)}`, borderBottom: `${cq(0.15)} solid ${LINE}` }}>
          <span className="rounded-[0.6cqw]" style={{ width: cq(3.4), height: cq(4.4), background: "#1E8E4E" }} />
          <span style={{ fontSize: cq(2.2), fontWeight: 600, color: GRAPHITE }}>Ashwheelz Feedback Responses</span>
        </div>
        <div className="flex" style={{ gap: cq(2.4), padding: `${cq(1.2)} ${cq(2.4)}`, fontSize: cq(1.8), color: MUTED }}>
          {["File", "Edit", "View", "Extensions"].map((m) => (
            <span key={m}>{m}</span>
          ))}
          <span className="relative rounded-[0.6cqw]" style={{ color: GRAPHITE, fontWeight: 600, background: "#FFE9D2", padding: `0 ${cq(1)}` }}>
            Ashwheelz
            <span
              className="absolute bg-white"
              style={{ left: 0, top: "130%", whiteSpace: "nowrap", padding: `${cq(1.2)} ${cq(1.8)}`, borderRadius: cq(1), fontWeight: 500, boxShadow: `0 ${cq(1)} ${cq(3)} -${cq(1)} rgb(0 0 0 / 0.3)`, zIndex: 2 }}
            >
              Download responses as Excel
            </span>
          </span>
        </div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)`, marginTop: cq(4) }}>
          {cols.map((c) => (
            <span key={c} style={{ fontSize: cq(1.7), fontWeight: 600, padding: cq(1.2), background: "#F1F3F4", color: GRAPHITE, border: `${cq(0.1)} solid ${LINE}` }}>
              {c}
            </span>
          ))}
          {data.flat().map((v, i) => (
            <span key={i} style={{ fontSize: cq(1.7), padding: cq(1.2), color: GRAPHITE, border: `${cq(0.1)} solid ${LINE}` }}>
              {v}
            </span>
          ))}
        </div>
      </div>
    </ArtCanvas>
  );
}
