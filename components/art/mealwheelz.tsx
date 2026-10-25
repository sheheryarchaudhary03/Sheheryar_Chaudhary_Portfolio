import { ArtCanvas, cq, Glow, Phone, Stage, StatusBar } from "./primitives";

const ORANGE = "#F5891F";
const INK = "#1E1E1E";
const CREAM = "#FBF3EA";
const GREY = "#62615F";
const LINE = "#ECE7E0";
const GREEN = "#3BA55C";

/* All sizes inside screens are in cqw of the phone screen (100cqw = width). */

/** The MealWheelz mark: a cloche on a delivery cart with speed lines. */
function Mark({ width, style }: { width: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 80" style={{ width, height: "auto", ...style }} aria-hidden="true">
      <g fill="none" stroke={ORANGE} strokeLinecap="round" strokeWidth="4">
        <path d="M9 30h17M4 38h21M11 46h15" />
      </g>
      <circle cx="62" cy="13" r="4.2" fill={ORANGE} />
      <path d="M30 51a32 33 0 0 1 64 0z" fill={ORANGE} />
      <path d="M77 23a27 27 0 0 1 12 24" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="3.2" />
      <rect x="27" y="53" width="70" height="8" rx="3" fill={INK} />
      <circle cx="44" cy="66" r="7.5" fill={INK} />
      <circle cx="44" cy="66" r="2.8" fill="#fff" />
      <circle cx="80" cy="66" r="7.5" fill={INK} />
      <circle cx="80" cy="66" r="2.8" fill="#fff" />
    </svg>
  );
}

function Pill({ children, active, dark }: { children: React.ReactNode; active?: boolean; dark?: boolean }) {
  return (
    <span
      className="relative flex flex-1 items-center justify-center text-center"
      style={{
        padding: "2.6cqw 1cqw",
        borderRadius: "3cqw",
        fontSize: "3.4cqw",
        fontWeight: 600,
        lineHeight: 1.1,
        background: active ? ORANGE : "transparent",
        color: active ? INK : dark ? "#fff" : INK,
      }}
    >
      {children}
    </span>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="absolute flex items-center justify-center rounded-full"
      style={{ top: "-2.4cqw", right: "1cqw", width: "6cqw", height: "6cqw", background: ORANGE, color: INK, fontSize: "3cqw", fontWeight: 700 }}
    >
      {children}
    </span>
  );
}

function BottomNav({ items, active }: { items: string[]; active: string }) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 flex items-center justify-around"
      style={{ height: "16cqw", paddingBottom: "3cqw", background: INK, borderRadius: "5cqw 5cqw 0 0" }}
    >
      {items.map((item) => (
        <span key={item} className="flex flex-col items-center" style={{ gap: "1cqw", color: item === active ? ORANGE : "#fff" }}>
          <span style={{ width: "5cqw", height: "5cqw", borderRadius: "1.4cqw", background: "currentColor", opacity: 0.9 }} />
          <span style={{ fontSize: "3.1cqw", fontWeight: 600 }}>{item}</span>
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

function Burger({ width }: { width: string }) {
  const layer = (h: string, bg: string, r: string, w = "100%", mt = "0") => (
    <div style={{ height: h, background: bg, borderRadius: r, width: w, margin: `${mt} auto 0` }} />
  );
  return (
    <div style={{ width, filter: "drop-shadow(0 2cqw 2.5cqw rgb(0 0 0 / 0.25))" }}>
      {layer("13cqw", "radial-gradient(circle at 40% 30%, #f3b25a, #d98a2b)", "50% 50% 12% 12% / 90% 90% 12% 12%")}
      {layer("2.6cqw", "#5aa83a", "2cqw", "104%", "-0.6cqw")}
      {layer("2.4cqw", "#e8483a", "2cqw", "96%", "0.3cqw")}
      {layer("5cqw", "#5a3221", "3cqw", "98%", "0.4cqw")}
      {layer("2.2cqw", "#f6c344", "1cqw", "104%", "-0.6cqw")}
      {layer("5cqw", "#4f2b1c", "3cqw", "96%", "0.3cqw")}
      {layer("5.5cqw", "#e09a43", "12% 12% 40% 40% / 30% 30% 90% 90%", "100%", "0.4cqw")}
    </div>
  );
}

function CustomerScreen() {
  return (
    <div className="relative h-full bg-white">
      <div className="relative" style={{ height: "52cqw", background: ORANGE, borderRadius: "0 0 50% 50% / 0 0 22% 22%" }}>
        <StatusBar color="#fff" />
        <div className="text-center" style={{ color: "#fff", fontSize: "6cqw", fontWeight: 700, marginTop: "4cqw", letterSpacing: "-0.02em" }}>
          MealWheelz
        </div>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "22cqw" }}>
          <Burger width="44cqw" />
        </div>
      </div>
      <div className="text-center" style={{ padding: "18cqw 7cqw 0" }}>
        <div style={{ fontSize: "7cqw", fontWeight: 700, color: INK, letterSpacing: "-0.03em" }}>Welcome to MealWheelz</div>
        <div style={{ fontSize: "3.5cqw", color: GREY, lineHeight: 1.45, marginTop: "2cqw" }}>
          Enjoy the best restaurants or get what you need from nearby stores, delivered
        </div>
        <div
          className="flex items-center justify-center rounded-full"
          style={{ marginTop: "7cqw", height: "12cqw", border: `0.4cqw solid ${INK}`, fontSize: "4cqw", fontWeight: 600, color: INK, gap: "2.5cqw" }}
        >
          <span style={{ width: "4.6cqw", height: "3.4cqw", border: `0.5cqw solid ${INK}`, borderRadius: "0.6cqw" }} />
          Continue with Email
        </div>
        <div className="flex items-center" style={{ gap: "3cqw", margin: "4cqw 0", color: INK, fontSize: "3.6cqw", fontWeight: 600 }}>
          <span className="flex-1" style={{ height: "0.3cqw", background: LINE }} />
          or
          <span className="flex-1" style={{ height: "0.3cqw", background: LINE }} />
        </div>
        <div
          className="flex items-center justify-center rounded-full"
          style={{ height: "12cqw", background: ORANGE, fontSize: "4cqw", fontWeight: 600, color: INK }}
        >
          Continue as Guest
        </div>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 flex justify-around bg-white"
        style={{ height: "15cqw", paddingTop: "2.5cqw", borderTop: `0.3cqw solid ${LINE}` }}
      >
        {["Discovery", "Restaurants", "Search", "Profile"].map((t) => (
          <span key={t} className="flex flex-col items-center" style={{ gap: "1cqw", fontSize: "2.8cqw", color: t === "Profile" ? ORANGE : GREY }}>
            <span style={{ width: "4.6cqw", height: "4.6cqw", borderRadius: "50%", border: "0.5cqw solid currentColor" }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Chefs() {
  const chef = (apron: string, x: string) => (
    <div className="absolute flex flex-col items-center" style={{ left: x, bottom: "4cqw" }}>
      <span style={{ width: "7cqw", height: "4cqw", background: GREEN, borderRadius: "3cqw 3cqw 1cqw 1cqw" }} />
      <span style={{ width: "6cqw", height: "6cqw", background: "#f2c9a5", borderRadius: "50%", marginTop: "-0.8cqw" }} />
      <span style={{ width: "9cqw", height: "12cqw", background: INK, borderRadius: "3cqw 3cqw 1cqw 1cqw", marginTop: "0.4cqw", position: "relative" }}>
        <span className="absolute inset-x-[1.5cqw] bottom-0" style={{ height: "8cqw", background: apron, borderRadius: "1cqw" }} />
      </span>
    </div>
  );
  return (
    <div className="relative mx-auto" style={{ width: "62cqw", height: "30cqw" }}>
      {chef(GREEN, "6cqw")}
      {chef(GREEN, "44cqw")}
      <div className="absolute inset-x-[16cqw]" style={{ bottom: "4cqw", height: "9cqw", background: "#c9ccd2", borderRadius: "1cqw" }} />
      <div className="absolute inset-x-0" style={{ bottom: "2cqw", height: "2.6cqw", background: "#565b6e", borderRadius: "1cqw" }} />
    </div>
  );
}

function OrderCard({ items, time }: { items: string; time: string }) {
  return (
    <div className="rounded-[3.5cqw] bg-white" style={{ padding: "4cqw", boxShadow: "0 1.6cqw 4cqw -1.5cqw rgb(0 0 0 / 0.25)" }}>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: "3.6cqw", fontWeight: 700, color: INK }}>#2026101123</span>
        <span style={{ fontSize: "3cqw", color: GREY }}>{time}</span>
      </div>
      <div style={{ fontSize: "3.4cqw", color: GREY, marginTop: "1.4cqw" }}>{items}</div>
      <div className="flex" style={{ gap: "2.4cqw", marginTop: "3cqw" }}>
        <span className="flex flex-1 items-center justify-center rounded-[2.4cqw]" style={{ height: "9cqw", background: INK, color: "#fff", fontSize: "3.4cqw", fontWeight: 600 }}>
          Accept
        </span>
        <span className="flex flex-1 items-center justify-center rounded-[2.4cqw]" style={{ height: "9cqw", border: `0.4cqw solid ${LINE}`, color: INK, fontSize: "3.4cqw", fontWeight: 600 }}>
          Details
        </span>
      </div>
    </div>
  );
}

function RestaurantScreen() {
  return (
    <div className="relative h-full" style={{ background: "#F2F2F0" }}>
      <StatusBar />
      <div style={{ marginTop: "3cqw" }}>
        <Chefs />
      </div>
      <div className="relative z-10 mx-[5cqw] flex items-center rounded-[3cqw] bg-white" style={{ padding: "1.4cqw", boxShadow: "0 1cqw 3cqw -1cqw rgb(0 0 0 / 0.2)" }}>
        <Pill active>New Orders</Pill>
        <Pill>
          Processing
          <span className="absolute rounded-full" style={{ top: "0.6cqw", left: "50%", width: "1.4cqw", height: "1.4cqw", background: ORANGE }} />
        </Pill>
        <Pill>Delivered</Pill>
      </div>
      <div
        className="absolute inset-x-[3cqw] flex flex-col"
        style={{ top: "47cqw", bottom: "14cqw", background: ORANGE, borderRadius: "5cqw 5cqw 0 0", padding: "8cqw 4cqw 4cqw", gap: "3.4cqw" }}
      >
        <OrderCard items="Yakhni Pulao × 2 · Raita × 1" time="2 min ago" />
        <OrderCard items="Chicken Pulao × 1 · Salad × 1" time="6 min ago" />
      </div>
      <BottomNav items={["Profile", "Home", "Language"]} active="Home" />
    </div>
  );
}

function Rider() {
  return (
    <div className="relative mx-auto" style={{ width: "54cqw", height: "30cqw" }}>
      <div className="absolute" style={{ left: "16cqw", top: "1cqw", width: "20cqw", height: "24cqw", background: "#7bc47f", borderRadius: "2cqw", opacity: 0.6 }} />
      <div className="absolute" style={{ left: "14cqw", top: "0", width: "24cqw", height: "3.4cqw", background: "repeating-linear-gradient(90deg, #e8483a 0 3cqw, #fff 3cqw 6cqw)", borderRadius: "1cqw" }} />
      {[12, 38].map((x) => (
        <span key={x} className="absolute rounded-full" style={{ left: `${x}cqw`, bottom: "1cqw", width: "11cqw", height: "11cqw", border: `0.9cqw solid ${INK}` }} />
      ))}
      <span className="absolute" style={{ left: "22cqw", bottom: "8cqw", width: "16cqw", height: "1cqw", background: INK, transform: "rotate(-12deg)" }} />
      <span className="absolute rounded-full" style={{ left: "30cqw", top: "6cqw", width: "6cqw", height: "6cqw", background: "#f2c9a5" }} />
      <span className="absolute" style={{ left: "28cqw", top: "11cqw", width: "8cqw", height: "10cqw", background: GREEN, borderRadius: "2cqw" }} />
    </div>
  );
}

function RiderScreen() {
  const row = (label: string, value: string) => (
    <div className="flex items-center justify-between" style={{ marginTop: "2.4cqw" }}>
      <span style={{ fontSize: "3.5cqw", color: GREY }}>{label}</span>
      <span style={{ fontSize: "3.7cqw", fontWeight: 600, color: INK }}>{value}</span>
    </div>
  );
  return (
    <div className="relative h-full" style={{ background: "#F2F2F0" }}>
      <StatusBar />
      <div style={{ marginTop: "3cqw" }}>
        <Rider />
      </div>
      <div className="mx-[4cqw] flex items-center rounded-[3.4cqw]" style={{ background: INK, padding: "1.6cqw", marginTop: "2cqw" }}>
        <Pill active>New Orders</Pill>
        <Pill dark>
          My Orders
          <Badge>10</Badge>
        </Pill>
        <Pill dark>
          Delivered
          <Badge>5</Badge>
        </Pill>
      </div>
      <div className="mx-[5cqw] rounded-[4cqw] bg-white" style={{ marginTop: "5cqw", padding: "5cqw", boxShadow: "0 1.6cqw 4cqw -1.5cqw rgb(0 0 0 / 0.2)" }}>
        <div className="flex items-start justify-between">
          <span style={{ fontSize: "3.8cqw", fontWeight: 700, color: INK }}>Order ID</span>
          <span style={{ fontSize: "3.6cqw", fontWeight: 600, color: INK, textAlign: "right" }}>2026101123-PHJ3MR</span>
        </div>
        {row("Order Amount", "Rs 6,903")}
        {row("Payment Method", "CASH")}
        <div style={{ height: "0.3cqw", background: LINE, margin: "3.4cqw 0" }} />
        <div className="flex items-center justify-between">
          <span style={{ color: GREY, fontSize: "3.2cqw" }}>
            Time left <b style={{ color: INK, fontSize: "6cqw", letterSpacing: "-0.02em" }}>12:00</b>
          </span>
          <span className="flex items-center justify-center rounded-[2.4cqw]" style={{ height: "10cqw", padding: "0 5cqw", background: INK, color: "#fff", fontSize: "3.6cqw", fontWeight: 600 }}>
            Assign Me
          </span>
        </div>
      </div>
      <BottomNav items={["Home", "Profile"]} active="Home" />
    </div>
  );
}

function SplashScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-white">
      <Mark width="34cqw" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cover                                                               */
/* ------------------------------------------------------------------ */

export function MealWheelzCover() {
  return (
    <ArtCanvas label="MealWheelz customer, restaurant and rider apps on three phones" style={{ background: CREAM }}>
      <Glow color="rgb(245 137 31 / 0.35)" x={50} y={40} size={90} />
      <Stage>
        <Phone width={21} style={{ left: cq(15), top: cq(9), transform: "rotate(-5deg)" }} screen="#F2F2F0">
          <RestaurantScreen />
        </Phone>
        <Phone width={21} style={{ right: cq(15), top: cq(9), transform: "rotate(5deg)" }} screen="#F2F2F0">
          <RiderScreen />
        </Phone>
        <Phone width={23} style={{ left: "50%", top: cq(4), transform: "translateX(-50%)" }}>
          <CustomerScreen />
        </Phone>
        <div
          className="absolute flex items-center rounded-full bg-white"
          style={{ left: cq(5), top: cq(5), gap: cq(1), padding: `${cq(0.8)} ${cq(1.8)} ${cq(0.8)} ${cq(1)}`, boxShadow: `0 ${cq(1)} ${cq(3)} -${cq(1)} rgb(0 0 0 / 0.25)` }}
        >
          <Mark width={cq(4.4)} />
          <span style={{ fontSize: cq(1.5), fontWeight: 700, color: INK }}>MealWheelz</span>
        </div>
      </Stage>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Wireframe — one order across three apps                             */
/* ------------------------------------------------------------------ */

export function MealWheelzWireframe() {
  const s = "#a8a29a";
  const f = "#e3ddd5";
  const label = { fontFamily: "ui-monospace, monospace", fontSize: 12, fill: "#6d675f", letterSpacing: 1.6 } as const;
  const phone = (x: number, title: string, body: React.ReactNode) => (
    <g transform={`translate(${x} 95)`}>
      <rect width="210" height="440" rx="30" fill="#fff" stroke={s} strokeWidth="1.6" />
      <rect x="80" y="12" width="50" height="12" rx="6" fill={f} />
      {body}
      <text x="0" y="-22" style={{ ...label, fill: INK, fontSize: 15, letterSpacing: 0 }}>{title}</text>
    </g>
  );
  return (
    <ArtCanvas label="Wireframes of one order moving through the customer, restaurant and rider apps" style={{ background: "#F4EFE8" }}>
      <svg viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {phone(
          90,
          "01 — Customer",
          <g fill={f}>
            <rect x="0" y="0" width="210" height="120" rx="30" />
            <circle cx="105" cy="118" r="36" fill="#fff" stroke={s} />
            <rect x="35" y="176" width="140" height="14" rx="4" />
            <rect x="45" y="198" width="120" height="8" rx="3" />
            <rect x="25" y="260" width="160" height="34" rx="17" fill="none" stroke={s} />
            <rect x="25" y="320" width="160" height="34" rx="17" fill={ORANGE} fillOpacity="0.45" />
            <rect x="0" y="400" width="210" height="40" fill="none" stroke={s} />
          </g>,
        )}
        {phone(
          395,
          "02 — Restaurant",
          <g fill={f}>
            <rect x="40" y="40" width="130" height="64" rx="6" />
            <rect x="20" y="120" width="170" height="30" rx="8" fill="none" stroke={s} />
            <rect x="24" y="124" width="56" height="22" rx="6" fill={ORANGE} fillOpacity="0.45" />
            <rect x="10" y="166" width="190" height="230" rx="16" fill={ORANGE} fillOpacity="0.2" />
            <rect x="24" y="186" width="162" height="70" rx="10" fill="#fff" stroke={s} />
            <rect x="24" y="268" width="162" height="70" rx="10" fill="#fff" stroke={s} />
            <rect x="0" y="404" width="210" height="36" rx="10" fill="#cfc8bf" />
          </g>,
        )}
        {phone(
          700,
          "03 — Rider",
          <g fill={f}>
            <rect x="40" y="40" width="130" height="64" rx="6" />
            <rect x="16" y="120" width="178" height="30" rx="8" fill="#cfc8bf" />
            <rect x="20" y="124" width="56" height="22" rx="6" fill={ORANGE} fillOpacity="0.45" />
            <rect x="20" y="170" width="170" height="150" rx="14" fill="#fff" stroke={s} />
            <rect x="34" y="186" width="70" height="10" rx="3" />
            <rect x="34" y="208" width="140" height="8" rx="3" />
            <rect x="34" y="226" width="120" height="8" rx="3" />
            <rect x="110" y="276" width="66" height="28" rx="8" fill="#cfc8bf" />
            <rect x="0" y="404" width="210" height="36" rx="10" fill="#cfc8bf" />
          </g>,
        )}
        <g stroke={ORANGE} strokeWidth="1.8" fill="none" strokeLinecap="round">
          <path d="M310 300 H382 M372 290 L382 300 L372 310" />
          <path d="M615 300 H687 M677 290 L687 300 L677 310" />
        </g>
        <g style={label}>
          <text x="346" y="330" textAnchor="middle">ORDER</text>
          <text x="651" y="330" textAnchor="middle">READY</text>
          <text x="90" y="580">ONE ORDER · THREE APPS · SHARED STATES: NEW → PROCESSING → DELIVERED</text>
        </g>
      </svg>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Final design panels                                                 */
/* ------------------------------------------------------------------ */

export function MealWheelzApps() {
  return (
    <ArtCanvas label="MealWheelz customer, restaurant and rider apps side by side" style={{ background: `linear-gradient(140deg, #2a2a2a, ${INK} 55%, #121212)` }}>
      <Glow color="rgb(245 137 31 / 0.35)" x={50} y={20} size={80} />
      {[
        { screen: <RestaurantScreen />, pos: { left: "16%" }, label: "Restaurant", bg: "#F2F2F0" },
        { screen: <CustomerScreen />, pos: { left: "50%", transform: "translateX(-50%)" }, label: "Customer", bg: "#fff" },
        { screen: <RiderScreen />, pos: { right: "16%" }, label: "Rider", bg: "#F2F2F0" },
      ].map((app, i) => (
        <Phone key={app.label} width={19} screen={app.bg} style={{ top: i === 1 ? "6%" : "11%", ...app.pos }}>
          {app.screen}
        </Phone>
      ))}
    </ArtCanvas>
  );
}

function FloatingCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="absolute flex items-center bg-white"
      style={{ gap: cq(2.4), padding: cq(2.6), borderRadius: cq(3.6), boxShadow: `0 ${cq(3)} ${cq(8)} -${cq(2)} rgb(0 0 0 / 0.3)`, ...style }}
    >
      {children}
    </div>
  );
}

export function MealWheelzRestaurant() {
  return (
    <ArtCanvas label="Restaurant partner app with incoming orders and online status" style={{ background: CREAM }}>
      <Glow color="rgb(245 137 31 / 0.3)" x={70} y={25} size={70} />
      <Phone width={48} screen="#F2F2F0" style={{ left: "50%", top: "50%", transform: "translate(-50%, -46%)" }}>
        <RestaurantScreen />
      </Phone>
      <FloatingCard style={{ left: "6%", top: "9%" }}>
        <span className="shrink-0 rounded-[2cqw]" style={{ width: cq(8), height: cq(8), background: "radial-gradient(circle at 35% 35%, #f6c344, #e8483a 60%, #5aa83a)" }} />
        <div>
          <div style={{ fontSize: cq(2.9), fontWeight: 700, color: INK }}>Sultan Restaurant Lahore</div>
          <div className="flex items-center" style={{ gap: cq(1.4), fontSize: cq(2.5), color: GREY, marginTop: cq(0.6) }}>
            Status · Online
            <span className="flex items-center rounded-full" style={{ width: cq(6.4), height: cq(3.6), padding: cq(0.5), background: ORANGE, justifyContent: "flex-end" }}>
              <span className="rounded-full bg-white" style={{ width: cq(2.6), height: cq(2.6) }} />
            </span>
          </div>
        </div>
      </FloatingCard>
    </ArtCanvas>
  );
}

export function MealWheelzRider() {
  return (
    <ArtCanvas label="Rider app showing a new order with an Assign me button" style={{ background: "#EEE9E2" }}>
      <Glow color="rgb(59 165 92 / 0.22)" x={30} y={20} size={70} />
      <Phone width={48} screen="#F2F2F0" style={{ left: "50%", top: "50%", transform: "translate(-50%, -46%)" }}>
        <RiderScreen />
      </Phone>
      <FloatingCard style={{ right: "6%", top: "10%" }}>
        <span className="flex shrink-0 items-center justify-center rounded-[2cqw]" style={{ width: cq(8), height: cq(8), background: INK }}>
          <Mark width={cq(6)} />
        </span>
        <div>
          <div style={{ fontSize: cq(2.9), fontWeight: 700, color: INK }}>New order nearby</div>
          <div style={{ fontSize: cq(2.5), color: GREY, marginTop: cq(0.4) }}>Tap “Assign Me” to claim it</div>
        </div>
      </FloatingCard>
    </ArtCanvas>
  );
}

export function MealWheelzBrand() {
  const icons = ["Customer", "Restaurant", "Rider"];
  return (
    <ArtCanvas label="MealWheelz app icons and splash screen" style={{ background: `linear-gradient(135deg, ${ORANGE}, #e8741a)` }}>
      <div className="absolute flex items-center" style={{ left: "8%", top: "50%", transform: "translateY(-50%)", gap: cq(4) }}>
        {icons.map((name) => (
          <div key={name} className="flex flex-col items-center" style={{ gap: cq(1.4) }}>
            <span
              className="flex items-center justify-center bg-white"
              style={{ width: cq(13), height: cq(13), borderRadius: cq(3.4), boxShadow: `0 ${cq(1.6)} ${cq(4)} -${cq(1.4)} rgb(0 0 0 / 0.35)` }}
            >
              <Mark width={cq(9.5)} />
            </span>
            <span style={{ fontSize: cq(1.6), fontWeight: 600, color: INK }}>MealWheelz {name}</span>
          </div>
        ))}
      </div>
      <Phone width={19} style={{ right: "9%", top: "50%", transform: "translateY(-50%)" }}>
        <SplashScreen />
      </Phone>
    </ArtCanvas>
  );
}
