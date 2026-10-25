import { ArtCanvas, BrowserFrame, cq, Glow, Phone, Stage, StatusBar } from "./primitives";

/* Colours from the tool's own stylesheet. */
const light = { bg: "#F3F5F8", surface: "#FFFFFF", ink: "#18202E", muted: "#5B6578", line: "#D9DEE7" };
const dark = { bg: "#10141C", surface: "#181E29", ink: "#E7EBF2", muted: "#9AA4B6", line: "#2B3442" };
const ACCENT = "#2346A8";
const ACCENT_SOFT = "#E3E9F8";
const STATUS = {
  P: { fg: "#1D7A46", bg: "#DCF1E4" },
  A: { fg: "#B4292F", bg: "#F8E0E0" },
  L: { fg: "#9A6200", bg: "#FBEDD2" },
} as const;
type Mark = keyof typeof STATUS;

const students: { roll: string; name: string; mark: Mark }[] = [
  { roll: "01", name: "Ali Raza", mark: "P" },
  { roll: "02", name: "Sara Ahmed", mark: "P" },
  { roll: "03", name: "Hamza Iqbal", mark: "A" },
  { roll: "04", name: "Zoya Malik", mark: "P" },
  { roll: "05", name: "Bilal Hussain", mark: "L" },
  { roll: "06", name: "Mariam Tariq", mark: "P" },
];

/** P / A / L segmented control; `unit` is the cqw scale of the container. */
function Segmented({ mark, unit }: { mark: Mark; unit: number }) {
  return (
    <span className="flex" style={{ gap: `${unit * 0.5}cqw` }}>
      {(Object.keys(STATUS) as Mark[]).map((m) => {
        const on = m === mark;
        return (
          <span
            key={m}
            className="flex items-center justify-center"
            style={{
              width: `${unit * 3.4}cqw`,
              height: `${unit * 3.4}cqw`,
              borderRadius: `${unit * 0.9}cqw`,
              fontSize: `${unit * 1.5}cqw`,
              fontWeight: 700,
              fontFamily: "ui-monospace, monospace",
              background: on ? STATUS[m].bg : "transparent",
              color: on ? STATUS[m].fg : light.muted,
              border: `${unit * 0.12}cqw solid ${on ? STATUS[m].fg : light.line}`,
            }}
          >
            {m}
          </span>
        );
      })}
    </span>
  );
}

function Tabs({ active, unit, theme = light }: { active: number; unit: number; theme?: typeof light }) {
  return (
    <div className="flex" style={{ gap: `${unit * 0.8}cqw`, borderBottom: `${unit * 0.12}cqw solid ${theme.line}` }}>
      {["Mark attendance", "Records & Excel", "Classes & students"].map((t, i) => (
        <span
          key={t}
          style={{
            padding: `${unit * 1}cqw ${unit * 0.4}cqw`,
            fontSize: `${unit * 1.35}cqw`,
            fontWeight: 600,
            color: i === active ? (theme === light ? ACCENT : "#8EA8F2") : theme.muted,
            borderBottom: `${unit * 0.25}cqw solid ${i === active ? (theme === light ? ACCENT : "#8EA8F2") : "transparent"}`,
            marginBottom: `-${unit * 0.12}cqw`,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Field({ label, value, unit, theme = light }: { label: string; value: string; unit: number; theme?: typeof light }) {
  return (
    <span className="flex flex-1 flex-col" style={{ gap: `${unit * 0.4}cqw` }}>
      <span style={{ fontSize: `${unit * 1}cqw`, color: theme.muted }}>{label}</span>
      <span
        style={{
          padding: `${unit * 0.8}cqw ${unit * 1}cqw`,
          borderRadius: `${unit * 0.7}cqw`,
          border: `${unit * 0.12}cqw solid ${theme.line}`,
          background: theme.surface,
          fontSize: `${unit * 1.25}cqw`,
          color: theme.ink,
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </span>
  );
}

/** Desktop "Mark attendance" view (browser viewport; 100cqw = viewport). */
function MarkScreen() {
  const u = 1;
  const tally = { P: 4, A: 1, L: 1 };
  return (
    <div style={{ background: light.bg, padding: "2.6cqw 3cqw", minHeight: "56cqw" }}>
      <div className="flex items-baseline justify-between">
        <span style={{ fontSize: "2.6cqw", fontWeight: 700, color: light.ink, letterSpacing: "-0.03em" }}>Attendance Register</span>
        <span style={{ fontSize: "1.2cqw", color: light.muted, fontFamily: "ui-monospace, monospace" }}>Mon 26 Oct</span>
      </div>
      <div style={{ marginTop: "1.6cqw" }}>
        <Tabs active={0} unit={u} />
      </div>
      <div className="flex" style={{ gap: "1.2cqw", marginTop: "2cqw" }}>
        <Field label="Date" value="2026-10-26" unit={u} />
        <Field label="Class" value="Grade 8" unit={u} />
        <Field label="Batch" value="A" unit={u} />
        <Field label="Subject" value="Mathematics" unit={u} />
        <Field label="Your name" value="Ms. Fatima" unit={u} />
      </div>
      <div className="rounded-[1.2cqw]" style={{ marginTop: "2cqw", background: light.surface, border: `0.12cqw solid ${light.line}` }}>
        <div className="flex items-center justify-between" style={{ padding: "1.2cqw 1.8cqw", borderBottom: `0.12cqw solid ${light.line}` }}>
          <span className="flex" style={{ gap: "0.8cqw" }}>
            {["All present", "All absent"].map((b) => (
              <span key={b} className="rounded-full" style={{ padding: "0.6cqw 1.4cqw", fontSize: "1.15cqw", fontWeight: 600, background: ACCENT_SOFT, color: ACCENT }}>
                {b}
              </span>
            ))}
          </span>
          <span className="flex" style={{ gap: "0.8cqw", fontFamily: "ui-monospace, monospace", fontSize: "1.2cqw" }}>
            {(Object.keys(tally) as Mark[]).map((m) => (
              <span key={m} className="rounded-full" style={{ padding: "0.4cqw 1.1cqw", background: STATUS[m].bg, color: STATUS[m].fg, fontWeight: 700 }}>
                {m} {tally[m]}
              </span>
            ))}
          </span>
        </div>
        {students.map((s) => (
          <div key={s.roll} className="flex items-center justify-between" style={{ padding: "0.9cqw 1.8cqw", borderBottom: `0.12cqw solid ${light.line}` }}>
            <span className="flex items-center" style={{ gap: "1.6cqw" }}>
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "1.2cqw", color: light.muted }}>{s.roll}</span>
              <span style={{ fontSize: "1.35cqw", color: light.ink, fontWeight: 500 }}>{s.name}</span>
            </span>
            <Segmented mark={s.mark} unit={0.7} />
          </div>
        ))}
        <div className="flex justify-end" style={{ padding: "1.2cqw 1.8cqw" }}>
          <span className="rounded-[0.8cqw]" style={{ padding: "0.9cqw 2cqw", background: ACCENT, color: "#fff", fontSize: "1.25cqw", fontWeight: 600 }}>
            Save attendance
          </span>
        </div>
      </div>
    </div>
  );
}

/** Phone marking view (100cqw = screen). */
function PhoneMarkScreen() {
  return (
    <div className="relative h-full" style={{ background: light.bg }}>
      <StatusBar color={light.ink} />
      <div style={{ padding: "4cqw 5cqw" }}>
        <div style={{ fontSize: "6.4cqw", fontWeight: 700, color: light.ink, letterSpacing: "-0.03em" }}>Attendance</div>
        <div style={{ fontSize: "3.2cqw", color: light.muted, marginTop: "1cqw" }}>Grade 8 · A · Mathematics</div>
        <div className="flex" style={{ gap: "2cqw", marginTop: "4cqw" }}>
          {["All present", "All absent"].map((b) => (
            <span key={b} className="flex-1 rounded-full text-center" style={{ padding: "2.4cqw 0", fontSize: "3.3cqw", fontWeight: 600, background: ACCENT_SOFT, color: ACCENT }}>
              {b}
            </span>
          ))}
        </div>
        <div className="rounded-[3cqw]" style={{ marginTop: "4cqw", background: light.surface, border: `0.3cqw solid ${light.line}` }}>
          {students.map((s) => (
            <div key={s.roll} className="flex items-center justify-between" style={{ padding: "3cqw 3.4cqw", borderBottom: `0.3cqw solid ${light.line}` }}>
              <span style={{ fontSize: "3.6cqw", color: light.ink }}>
                <span style={{ fontFamily: "ui-monospace, monospace", color: light.muted, marginRight: "2cqw" }}>{s.roll}</span>
                {s.name}
              </span>
              <Segmented mark={s.mark} unit={2.2} />
            </div>
          ))}
        </div>
        <div className="rounded-[2.6cqw] text-center" style={{ marginTop: "4cqw", padding: "3.4cqw 0", background: ACCENT, color: "#fff", fontSize: "3.8cqw", fontWeight: 600 }}>
          Save attendance
        </div>
      </div>
    </div>
  );
}

/** Records & Excel in the dark theme (browser viewport). */
function RecordsScreen() {
  const u = 1;
  const records = [
    ["2026-10-26", "Grade 8", "A", "Maths", "18", "2", "1"],
    ["2026-10-26", "Grade 8", "B", "Maths", "20", "1", "0"],
    ["2026-10-25", "Grade 7", "A", "English", "17", "3", "1"],
    ["2026-10-25", "Grade 8", "A", "Science", "19", "1", "1"],
    ["2026-10-24", "Grade 7", "B", "Maths", "21", "0", "0"],
  ];
  return (
    <div style={{ background: dark.bg, padding: "2.6cqw 3cqw", minHeight: "56cqw" }}>
      <span style={{ fontSize: "2.6cqw", fontWeight: 700, color: dark.ink, letterSpacing: "-0.03em" }}>Attendance Register</span>
      <div style={{ marginTop: "1.6cqw" }}>
        <Tabs active={1} unit={u} theme={dark} />
      </div>
      <div className="flex items-end" style={{ gap: "1.2cqw", marginTop: "2cqw" }}>
        <Field label="From" value="2026-10-01" unit={u} theme={dark} />
        <Field label="To" value="2026-10-31" unit={u} theme={dark} />
        <Field label="Class" value="All" unit={u} theme={dark} />
        <Field label="Subject" value="All" unit={u} theme={dark} />
        <span className="rounded-[0.8cqw]" style={{ padding: "0.95cqw 1.6cqw", background: "#8EA8F2", color: dark.bg, fontSize: "1.2cqw", fontWeight: 700, whiteSpace: "nowrap" }}>
          Download Excel (.xlsx)
        </span>
      </div>
      <div className="overflow-hidden rounded-[1.2cqw]" style={{ marginTop: "2cqw", background: dark.surface, border: `0.12cqw solid ${dark.line}` }}>
        <div className="grid" style={{ gridTemplateColumns: "1.3fr 1fr 0.6fr 1fr 0.5fr 0.5fr 0.5fr", padding: "1cqw 1.8cqw", fontSize: "1.1cqw", color: dark.muted, borderBottom: `0.12cqw solid ${dark.line}` }}>
          {["Date", "Class", "Batch", "Subject", "P", "A", "L"].map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
        {records.map((r, i) => (
          <div
            key={i}
            className="grid"
            style={{ gridTemplateColumns: "1.3fr 1fr 0.6fr 1fr 0.5fr 0.5fr 0.5fr", padding: "1.05cqw 1.8cqw", fontSize: "1.25cqw", color: dark.ink, borderBottom: `0.12cqw solid ${dark.line}`, fontFamily: "ui-monospace, monospace" }}
          >
            {r.map((c, j) => (
              <span key={j} style={{ color: j === 4 ? "#7fd3a0" : j === 5 ? "#f19a9e" : j === 6 ? "#f0c77a" : undefined }}>
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cover                                                               */
/* ------------------------------------------------------------------ */

export function AttendanceCover() {
  return (
    <ArtCanvas label="Attendance Register web app marking a class, with an Excel export" style={{ background: "#E7ECF5" }}>
      <Glow color="rgb(35 70 168 / 0.22)" x={30} y={30} size={80} />
      <Stage>
        <BrowserFrame width={66} url="attendance-register.html" style={{ left: cq(6), top: cq(7) }}>
          <MarkScreen />
        </BrowserFrame>
        <div
          className="absolute flex items-center bg-white"
          style={{ right: cq(6), top: cq(36), gap: cq(1.6), padding: cq(1.8), borderRadius: cq(2), boxShadow: `0 ${cq(2)} ${cq(6)} -${cq(2)} rgb(24 32 46 / 0.35)` }}
        >
          <span className="flex items-center justify-center rounded-[0.8cqw]" style={{ width: cq(5), height: cq(6), background: "#1E7145", color: "#fff", fontSize: cq(1.8), fontWeight: 800 }}>
            X
          </span>
          <span>
            <span className="block" style={{ fontSize: cq(1.7), fontWeight: 700, color: light.ink }}>attendance-oct.xlsx</span>
            <span className="block" style={{ fontSize: cq(1.3), color: light.muted }}>Exported in one click</span>
          </span>
        </div>
      </Stage>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Wireframe                                                           */
/* ------------------------------------------------------------------ */

export function AttendanceWireframe() {
  const s = "#a2a9b6";
  const f = "#dfe3ea";
  const label = { fontFamily: "ui-monospace, monospace", fontSize: 11, fill: "#5b6578", letterSpacing: 1.5 } as const;
  const panel = (x: number, title: string, body: React.ReactNode) => (
    <g transform={`translate(${x} 110)`}>
      <text x="0" y="-20" fontFamily="var(--font-inter), sans-serif" fontSize="15" fill={light.ink}>{title}</text>
      <rect width="270" height="400" rx="12" fill="#fff" stroke={s} strokeWidth="1.6" />
      {body}
    </g>
  );
  return (
    <ArtCanvas label="Wireframes of the three tabs: mark attendance, records and classes" style={{ background: "#EEF1F6" }}>
      <svg viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {panel(
          50,
          "01 — Mark attendance",
          <g fill={f}>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={16 + i * 62} y="20" width="54" height="22" rx="5" fill="none" stroke={s} />
            ))}
            <rect x="16" y="56" width="70" height="18" rx="9" fill={ACCENT} fillOpacity="0.25" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <g key={i} transform={`translate(16 ${90 + i * 36})`}>
                <rect width="120" height="10" rx="3" y="9" />
                <rect x="150" width="24" height="24" rx="5" fill={i === 2 ? "#f3c9cb" : "#bfe3cd"} />
                <rect x="180" width="24" height="24" rx="5" fill="none" stroke={s} />
                <rect x="210" width="24" height="24" rx="5" fill="none" stroke={s} />
              </g>
            ))}
            <rect x="160" y="356" width="94" height="26" rx="6" fill={ACCENT} fillOpacity="0.5" />
          </g>,
        )}
        {panel(
          365,
          "02 — Records & Excel",
          <g fill={f}>
            {[0, 1, 2].map((i) => (
              <rect key={i} x={16 + i * 66} y="20" width="58" height="22" rx="5" fill="none" stroke={s} />
            ))}
            <rect x="16" y="54" width="238" height="26" rx="6" fill={ACCENT} fillOpacity="0.4" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <rect key={i} x="16" y={96 + i * 32} width="238" height="24" rx="4" fill={i === 0 ? "#cfd6e2" : "none"} stroke={s} strokeOpacity="0.5" />
            ))}
          </g>,
        )}
        {panel(
          680,
          "03 — Classes & students",
          <g fill={f}>
            {[0, 1, 2].map((i) => (
              <rect key={i} x="16" y={20 + i * 40} width="238" height="28" rx="5" fill="none" stroke={s} />
            ))}
            <rect x="16" y="140" width="238" height="130" rx="6" fill="none" stroke={s} />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="28" y={154 + i * 22} width={150 - i * 12} height="9" rx="3" />
            ))}
            <rect x="16" y="284" width="96" height="26" rx="6" fill={ACCENT} fillOpacity="0.5" />
            <rect x="16" y="330" width="238" height="54" rx="6" fill="#eef1f6" />
          </g>,
        )}
        <g style={label}>
          <text x="50" y="570">P / A / L WITH SHORTCUTS · FILTER BY DATE, CLASS, BATCH, SUBJECT · .XLSX EXPORT · OFFLINE</text>
        </g>
      </svg>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Final design panels                                                 */
/* ------------------------------------------------------------------ */

export function AttendanceMark() {
  return (
    <ArtCanvas label="Marking attendance with present, absent and leave controls and a live tally" style={{ background: `linear-gradient(140deg, #dfe6f4, #f3f5f8)` }}>
      <Glow color="rgb(35 70 168 / 0.18)" x={80} y={10} size={70} />
      <BrowserFrame width={76} url="attendance-register.html" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <MarkScreen />
      </BrowserFrame>
    </ArtCanvas>
  );
}

export function AttendancePhone() {
  return (
    <ArtCanvas label="Attendance marking on a phone" style={{ background: ACCENT }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 15%, rgb(255 255 255 / 0.22), transparent 55%)" }} />
      <Phone width={50} style={{ left: "50%", top: "50%", transform: "translate(-50%, -47%)" }} screen={light.bg}>
        <PhoneMarkScreen />
      </Phone>
    </ArtCanvas>
  );
}

export function AttendanceRecords() {
  return (
    <ArtCanvas label="Filtered attendance records in the dark theme with an Excel download button" style={{ background: "#0b0f15" }}>
      <Glow color="rgb(142 168 242 / 0.25)" x={70} y={20} size={70} />
      <BrowserFrame width={88} dark url="attendance-register.html — Records" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <RecordsScreen />
      </BrowserFrame>
    </ArtCanvas>
  );
}
