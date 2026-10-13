import { ArtCanvas, cq, Glow, Phone, Stage, StatusBar } from "./primitives";

const BASIL = "#0E7C66";
const INK = "#111111";
const PAPRIKA = "#F1692D";
const CLOUD = "#F4F5F2";
const GREY = "#646962";

/* All sizes inside screens are in cqw of the phone screen (100cqw = width). */

function Dish({ size, a, b }: { size: string; a: string; b: string }) {
  return (
    <div
      className="shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 42% 40%, ${a} 0 22%, ${b} 23% 47%, #ffffff 48% 60%, #e6e7e2 61% 66%, transparent 67%)`,
        filter: "drop-shadow(0 1.6cqw 2cqw rgb(0 0 0 / 0.22))",
      }}
    />
  );
}

function FoodTile({
  height,
  from,
  to,
  dish,
  radius = "4cqw",
}: {
  height: string;
  from: string;
  to: string;
  dish: { size: string; a: string; b: string };
  radius?: string;
}) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center overflow-hidden"
      style={{ height, borderRadius: radius, background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <Dish {...dish} />
    </div>
  );
}

function Chip({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className="shrink-0 rounded-full"
      style={{
        padding: "2cqw 4cqw",
        fontSize: "3.5cqw",
        fontWeight: 500,
        background: active ? BASIL : "#ffffff",
        color: active ? "#ffffff" : INK,
        border: active ? "none" : "0.3cqw solid #e6e7e2",
      }}
    >
      {children}
    </span>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{ height: "13cqw", background: BASIL, color: "#fff", fontSize: "4.2cqw", fontWeight: 600 }}
    >
      {children}
    </div>
  );
}

function TabBar() {
  return (
    <div
      className="absolute inset-x-0 bottom-0 flex items-center justify-around bg-white"
      style={{ height: "17cqw", paddingBottom: "4cqw", borderTop: "0.3cqw solid #ecede8" }}
    >
      {[true, false, false, false].map((active, i) => (
        <span key={i} className="flex flex-col items-center" style={{ gap: "1cqw" }}>
          <span style={{ width: "5.5cqw", height: "5.5cqw", borderRadius: "1.6cqw", background: active ? BASIL : "#d5d7d1" }} />
          <span style={{ width: "1.2cqw", height: "1.2cqw", borderRadius: 9, background: active ? BASIL : "transparent" }} />
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

function HomeScreen() {
  return (
    <>
      <StatusBar />
      <div style={{ padding: "5cqw 6cqw 0" }}>
        <div className="flex items-center justify-between">
          <div>
            <div style={{ fontSize: "3.2cqw", color: GREY }}>Deliver to</div>
            <div style={{ fontSize: "4.2cqw", fontWeight: 600, color: INK }}>Home · Gulberg III ▾</div>
          </div>
          <span className="rounded-full" style={{ width: "10cqw", height: "10cqw", background: "linear-gradient(135deg,#f6c7a8,#e59a6c)" }} />
        </div>
        <div style={{ fontSize: "8.4cqw", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.02, color: INK, marginTop: "6cqw" }}>
          What are you
          <br />
          craving tonight?
        </div>
        <div className="flex items-center rounded-full" style={{ marginTop: "5cqw", height: "11.5cqw", background: CLOUD, padding: "0 4.5cqw", gap: "2.5cqw" }}>
          <span className="rounded-full" style={{ width: "3.6cqw", height: "3.6cqw", border: `0.6cqw solid ${GREY}` }} />
          <span style={{ fontSize: "3.6cqw", color: GREY }}>Search dishes or restaurants</span>
        </div>
        <div className="flex overflow-hidden" style={{ gap: "2cqw", marginTop: "4.5cqw" }}>
          <Chip active>Spicy</Chip>
          <Chip>Desi</Chip>
          <Chip>Burgers</Chip>
          <Chip>Healthy</Chip>
        </div>

        <div style={{ fontSize: "4.4cqw", fontWeight: 600, color: INK, marginTop: "6cqw" }}>Order again</div>
        <div className="flex items-center rounded-[4cqw] bg-white" style={{ marginTop: "3cqw", padding: "2.5cqw", gap: "3.5cqw", border: "0.3cqw solid #ecede8" }}>
          <FoodTile height="17cqw" from="#fbe3cf" to="#f3c39e" dish={{ size: "13cqw", a: "#b4471b", b: "#d9783a" }} radius="3cqw" />
          <div className="flex-1" style={{ minWidth: 0 }}>
            <div style={{ fontSize: "3.9cqw", fontWeight: 600, color: INK }}>Chicken Karahi</div>
            <div style={{ fontSize: "3.2cqw", color: GREY, marginTop: "0.8cqw" }}>Lahori Kitchen · Rs 1,450</div>
          </div>
          <span className="rounded-full" style={{ padding: "2.2cqw 3.6cqw", background: BASIL, color: "#fff", fontSize: "3.3cqw", fontWeight: 600 }}>
            Reorder
          </span>
        </div>

        <div style={{ fontSize: "4.4cqw", fontWeight: 600, color: INK, marginTop: "5.5cqw" }}>Near you</div>
        <div style={{ marginTop: "3cqw" }}>
          <FoodTile height="30cqw" from="#e3efe9" to="#bfdccf" dish={{ size: "24cqw", a: "#e2a33b", b: "#f2d48a" }} />
          <div className="flex items-center justify-between" style={{ marginTop: "2.5cqw" }}>
            <span style={{ fontSize: "3.9cqw", fontWeight: 600, color: INK }}>The Tandoor House</span>
            <span style={{ fontSize: "3.3cqw", color: GREY }}>4.8 ★ · 25 min</span>
          </div>
        </div>
      </div>
      <TabBar />
    </>
  );
}

function ItemScreen() {
  return (
    <>
      <div className="relative" style={{ height: "82cqw", background: "linear-gradient(160deg,#fde8d6,#f6c6a0)" }}>
        <div className="absolute inset-x-0 top-0">
          <StatusBar />
        </div>
        <div className="absolute flex items-center justify-between" style={{ left: "6cqw", right: "6cqw", top: "15cqw" }}>
          <span className="rounded-full bg-white/90" style={{ width: "10cqw", height: "10cqw" }} />
          <span className="rounded-full bg-white/90" style={{ width: "10cqw", height: "10cqw" }} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: "8cqw" }}>
          <Dish size="52cqw" a="#c2531f" b="#e9a15a" />
        </div>
      </div>
      <div className="relative bg-white" style={{ marginTop: "-6cqw", borderRadius: "6cqw 6cqw 0 0", padding: "6cqw" }}>
        <div style={{ fontSize: "7cqw", fontWeight: 700, letterSpacing: "-0.04em", color: INK }}>Chicken Tikka Bowl</div>
        <div className="flex items-center" style={{ gap: "2cqw", marginTop: "1.5cqw" }}>
          <span style={{ fontSize: "4.4cqw", fontWeight: 600, color: BASIL }}>Rs 1,250</span>
          <span className="rounded-full" style={{ fontSize: "2.8cqw", padding: "0.8cqw 2.4cqw", background: "#EEF7F3", color: BASIL }}>
            All-in price
          </span>
        </div>
        <div style={{ fontSize: "3.4cqw", lineHeight: 1.5, color: GREY, marginTop: "3cqw" }}>
          Charred tikka, saffron rice, mint raita and pickled onions.
        </div>
        <div style={{ fontSize: "3.8cqw", fontWeight: 600, color: INK, marginTop: "5cqw" }}>Spice level</div>
        <div className="flex" style={{ gap: "2cqw", marginTop: "2.5cqw" }}>
          <Chip>Mild</Chip>
          <Chip active>Medium</Chip>
          <Chip>Hot</Chip>
        </div>
        <div className="flex items-center" style={{ gap: "3cqw", marginTop: "7cqw" }}>
          <div className="flex items-center justify-between rounded-full" style={{ width: "30cqw", height: "13cqw", border: "0.3cqw solid #e6e7e2", padding: "0 4cqw", fontSize: "4.6cqw", color: INK }}>
            <span>−</span>
            <span style={{ fontWeight: 600 }}>1</span>
            <span>+</span>
          </div>
          <div className="flex-1">
            <PrimaryButton>Add · Rs 1,250</PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}

function CheckoutScreen() {
  const row = (label: string, value: string, strong?: boolean) => (
    <div className="flex items-center justify-between" style={{ fontSize: strong ? "4.4cqw" : "3.6cqw", fontWeight: strong ? 700 : 400, color: strong ? INK : "#555", marginTop: "2.4cqw" }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
  const card = (title: string, value: string, tag?: string) => (
    <div className="rounded-[4cqw] bg-white" style={{ padding: "4cqw", marginTop: "3cqw", border: "0.3cqw solid #ecede8" }}>
      <div style={{ fontSize: "3.1cqw", color: GREY }}>{title}</div>
      <div className="flex items-center justify-between" style={{ marginTop: "1cqw" }}>
        <span style={{ fontSize: "4cqw", fontWeight: 600, color: INK }}>{value}</span>
        {tag && <span style={{ fontSize: "3.2cqw", color: BASIL, fontWeight: 600 }}>{tag}</span>}
      </div>
    </div>
  );
  return (
    <div className="relative h-full" style={{ background: CLOUD }}>
      <StatusBar />
      <div style={{ padding: "5cqw 6cqw" }}>
        <div style={{ fontSize: "8cqw", fontWeight: 700, letterSpacing: "-0.04em", color: INK }}>Checkout</div>
        {card("Deliver to", "Home · Gulberg III", "Change")}
        {card("Arriving", "25–30 min")}
        {card("Payment", "Cash on delivery", "Change")}
        <div className="rounded-[4cqw] bg-white" style={{ padding: "4cqw", marginTop: "3cqw", border: "0.3cqw solid #ecede8" }}>
          {row("Chicken Tikka Bowl × 1", "Rs 1,250")}
          {row("Chicken Karahi × 1", "Rs 1,450")}
          {row("Delivery", "Free")}
          <div style={{ height: "0.3cqw", background: "#ecede8", margin: "3cqw 0 1cqw" }} />
          {row("Total", "Rs 2,700", true)}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0" style={{ padding: "0 6cqw 8cqw" }}>
        <PrimaryButton>Place order · Rs 2,700</PrimaryButton>
        <div className="text-center" style={{ fontSize: "3cqw", color: GREY, marginTop: "2.4cqw" }}>
          The price you see is the price you pay.
        </div>
      </div>
    </div>
  );
}

function TrackingScreen() {
  const steps = [
    { label: "Confirmed", done: true },
    { label: "Cooking", done: true },
    { label: "On the way", active: true },
    { label: "Delivered" },
  ];
  return (
    <div className="relative h-full" style={{ background: "#E7EBE3" }}>
      <svg viewBox="0 0 100 120" className="absolute inset-x-0 top-0 w-full" aria-hidden="true">
        <g stroke="#ffffff" strokeWidth="3.2" fill="none">
          <path d="M-5 30 H110 M-5 70 H110 M25 -5 V130 M70 -5 V130 M-5 100 L60 10" />
        </g>
        <path d="M18 92 L25 70 H70 V30 L82 22" stroke={BASIL} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeDasharray="0" />
        <circle cx="18" cy="92" r="3.2" fill={INK} />
        <circle cx="55" cy="70" r="5.5" fill={BASIL} opacity="0.2" />
        <circle cx="55" cy="70" r="3" fill={BASIL} stroke="#fff" strokeWidth="1.2" />
        <circle cx="82" cy="22" r="3.2" fill={PAPRIKA} />
      </svg>
      <div className="absolute inset-x-0 top-0">
        <StatusBar />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-white" style={{ borderRadius: "7cqw 7cqw 0 0", padding: "6cqw 6cqw 9cqw", boxShadow: "0 -2cqw 6cqw rgb(0 0 0 / 0.08)" }}>
        <div className="mx-auto rounded-full" style={{ width: "12cqw", height: "1.2cqw", background: "#e2e3de" }} />
        <div style={{ fontSize: "3.4cqw", color: GREY, marginTop: "4cqw" }}>Lahori Kitchen</div>
        <div style={{ fontSize: "7.6cqw", fontWeight: 700, letterSpacing: "-0.04em", color: INK }}>Arriving in 12 min</div>
        <div className="flex" style={{ gap: "1.6cqw", marginTop: "4cqw" }}>
          {steps.map((s) => (
            <div key={s.label} className="flex-1">
              <div className="rounded-full" style={{ height: "1.4cqw", background: s.done ? BASIL : s.active ? `linear-gradient(90deg, ${BASIL} 55%, #dfe3dc 55%)` : "#dfe3dc" }} />
              <div style={{ fontSize: "2.7cqw", marginTop: "1.6cqw", color: s.done || s.active ? INK : GREY, fontWeight: s.active ? 600 : 400 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center rounded-[4cqw]" style={{ marginTop: "5cqw", padding: "3cqw", gap: "3cqw", background: CLOUD }}>
          <span className="rounded-full" style={{ width: "11cqw", height: "11cqw", background: "linear-gradient(135deg,#c9d6cf,#8fb3a3)" }} />
          <div className="flex-1">
            <div style={{ fontSize: "3.8cqw", fontWeight: 600, color: INK }}>Your rider</div>
            <div style={{ fontSize: "3.1cqw", color: GREY }}>Bike · 1.8 km away</div>
          </div>
          <span className="rounded-full" style={{ width: "11cqw", height: "11cqw", background: BASIL }} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cover                                                               */
/* ------------------------------------------------------------------ */

export function MealWheelzCover() {
  return (
    <ArtCanvas label="MealWheelz app home and dish detail screens on two phones" style={{ background: "#E9ECE6" }}>
      <Glow color="rgb(14 124 102 / 0.28)" x={50} y={35} size={80} />
      <Stage>
        <Phone width={25} style={{ left: cq(22), top: cq(4) }}>
          <HomeScreen />
        </Phone>
        <Phone width={25} style={{ left: cq(53), top: cq(8) }}>
          <ItemScreen />
        </Phone>
        <div
          className="absolute flex items-center rounded-full bg-white"
          style={{ left: cq(41), top: cq(48), gap: cq(1), padding: `${cq(1)} ${cq(1.8)} ${cq(1)} ${cq(1)}`, boxShadow: `0 ${cq(1.5)} ${cq(4)} -${cq(1)} rgb(0 0 0 / 0.25)` }}
        >
          <span className="rounded-full" style={{ width: cq(3), height: cq(3), background: BASIL }} />
          <span style={{ fontSize: cq(1.4), fontWeight: 600, color: INK }}>Reorder in one tap</span>
        </div>
      </Stage>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Wireframe — user flow                                               */
/* ------------------------------------------------------------------ */

export function MealWheelzWireframe() {
  const s = "#9da29b";
  const f = "#d9dcd5";
  const label = { fontFamily: "ui-monospace, monospace", fontSize: 12, fill: "#6d726b", letterSpacing: 1.6 } as const;
  const phone = (x: number, title: string, body: React.ReactNode) => (
    <g transform={`translate(${x} 95)`}>
      <rect width="210" height="440" rx="30" fill="#fff" stroke={s} strokeWidth="1.6" />
      <rect x="80" y="12" width="50" height="12" rx="6" fill={f} />
      {body}
      <text x="0" y="-22" style={{ ...label, fill: "#111", fontSize: 15, letterSpacing: 0 }}>{title}</text>
    </g>
  );
  return (
    <ArtCanvas label="Low-fidelity user flow wireframes: home, item and checkout" style={{ background: "#EEF0EC" }}>
      <svg viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {phone(
          90,
          "01 — Home",
          <g fill={f}>
            <rect x="20" y="50" width="120" height="14" rx="4" />
            <rect x="20" y="78" width="170" height="26" rx="6" />
            <rect x="20" y="118" width="170" height="30" rx="15" fill="none" stroke={s} />
            <rect x="20" y="162" width="46" height="20" rx="10" fill="#0E7C66" fillOpacity="0.35" />
            <rect x="72" y="162" width="46" height="20" rx="10" />
            <rect x="124" y="162" width="46" height="20" rx="10" />
            <rect x="20" y="200" width="170" height="56" rx="10" fill="none" stroke="#0E7C66" strokeDasharray="5 4" />
            <rect x="28" y="208" width="40" height="40" rx="6" />
            <rect x="78" y="216" width="60" height="9" rx="3" />
            <rect x="78" y="232" width="40" height="7" rx="3" />
            <rect x="20" y="272" width="170" height="90" rx="10" />
            <rect x="20" y="370" width="110" height="10" rx="3" />
          </g>,
        )}
        {phone(
          395,
          "02 — Item",
          <g fill={f}>
            <rect x="0" y="0" width="210" height="180" rx="30" />
            <circle cx="105" cy="100" r="56" fill="#fff" />
            <rect x="20" y="196" width="140" height="16" rx="4" />
            <rect x="20" y="220" width="70" height="12" rx="4" fill="#0E7C66" fillOpacity="0.35" />
            <rect x="20" y="244" width="170" height="8" rx="3" />
            <rect x="20" y="258" width="130" height="8" rx="3" />
            <rect x="20" y="284" width="46" height="20" rx="10" />
            <rect x="72" y="284" width="46" height="20" rx="10" />
            <rect x="124" y="284" width="46" height="20" rx="10" />
            <rect x="20" y="380" width="60" height="34" rx="17" fill="none" stroke={s} />
            <rect x="88" y="380" width="102" height="34" rx="17" fill="#0E7C66" fillOpacity="0.5" />
          </g>,
        )}
        {phone(
          700,
          "03 — Checkout",
          <g fill={f}>
            <rect x="20" y="50" width="110" height="18" rx="4" />
            <rect x="20" y="84" width="170" height="44" rx="8" fill="none" stroke={s} />
            <rect x="20" y="138" width="170" height="44" rx="8" fill="none" stroke={s} />
            <rect x="20" y="192" width="170" height="44" rx="8" fill="none" stroke={s} />
            <rect x="20" y="248" width="170" height="96" rx="8" />
            <rect x="20" y="380" width="170" height="34" rx="17" fill="#0E7C66" fillOpacity="0.5" />
          </g>,
        )}
        <g stroke="#0E7C66" strokeWidth="1.8" fill="none" strokeLinecap="round">
          <path d="M310 300 H382 M372 290 L382 300 L372 310" />
          <path d="M615 300 H687 M677 290 L687 300 L677 310" />
        </g>
        <g style={label}>
          <text x="346" y="330" textAnchor="middle">TAP ITEM</text>
          <text x="651" y="330" textAnchor="middle">ADD + PAY</text>
          <text x="90" y="580">REORDER SURFACED ON HOME · ALL-IN PRICE ON EVERY CARD · 3 TAPS TO ORDER</text>
        </g>
      </svg>
    </ArtCanvas>
  );
}

/* ------------------------------------------------------------------ */
/* Final design panels                                                 */
/* ------------------------------------------------------------------ */

export function MealWheelzScreens() {
  return (
    <ArtCanvas label="MealWheelz home, item and checkout screens" style={{ background: `linear-gradient(140deg, #13906f, ${BASIL} 45%, #0a5c4b)` }}>
      <Glow color="rgb(255 255 255 / 0.18)" x={50} y={10} size={70} />
      <Phone width={19} style={{ left: "17%", top: "50%", transform: "translateY(-46%)" }}>
        <HomeScreen />
      </Phone>
      <Phone width={19} style={{ left: "50%", top: "50%", transform: "translate(-50%, -54%)" }}>
        <ItemScreen />
      </Phone>
      <Phone width={19} style={{ right: "17%", top: "50%", transform: "translateY(-46%)" }} screen={CLOUD}>
        <CheckoutScreen />
      </Phone>
    </ArtCanvas>
  );
}

export function MealWheelzTracking() {
  return (
    <ArtCanvas label="Live order tracking screen with rider notification" style={{ background: "#E9ECE6" }}>
      <Glow color="rgb(241 105 45 / 0.22)" x={75} y={20} size={70} />
      <Phone width={50} style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <TrackingScreen />
      </Phone>
      <div
        className="absolute flex items-center backdrop-blur-xl"
        style={{
          background: "rgb(255 255 255 / 0.78)",
          left: "8%",
          top: "16%",
          width: cq(58),
          gap: cq(2.4),
          padding: cq(2.6),
          borderRadius: cq(3.6),
          border: `${cq(0.2)} solid rgb(255 255 255 / 0.6)`,
          boxShadow: `0 ${cq(3)} ${cq(8)} -${cq(2)} rgb(0 0 0 / 0.25)`,
        }}
      >
        <span className="shrink-0 rounded-[2.2cqw]" style={{ width: cq(8), height: cq(8), background: BASIL }} />
        <div>
          <div style={{ fontSize: cq(3), fontWeight: 600, color: INK }}>Your rider is 2 min away</div>
          <div style={{ fontSize: cq(2.5), color: "#5b605a", marginTop: cq(0.4) }}>Get ready — dinner is almost there.</div>
        </div>
      </div>
    </ArtCanvas>
  );
}

export function MealWheelzComponents() {
  const label = (text: string) => (
    <div style={{ fontSize: cq(2), letterSpacing: "0.16em", color: GREY, marginBottom: cq(2) }}>{text}</div>
  );
  return (
    <ArtCanvas label="MealWheelz design system component sheet" style={{ background: "#ffffff" }}>
      <div className="absolute inset-0 flex flex-col" style={{ padding: cq(8), gap: cq(6) }}>
        <div>
          {label("BUTTONS")}
          <div className="flex flex-wrap" style={{ gap: cq(2) }}>
            <span className="rounded-full" style={{ padding: `${cq(2.4)} ${cq(5)}`, background: BASIL, color: "#fff", fontSize: cq(3), fontWeight: 600 }}>Add to cart</span>
            <span className="rounded-full" style={{ padding: `${cq(2.4)} ${cq(5)}`, background: "#EEF7F3", color: BASIL, fontSize: cq(3), fontWeight: 600 }}>Reorder</span>
            <span className="rounded-full" style={{ padding: `${cq(2.4)} ${cq(5)}`, border: `${cq(0.3)} solid #dfe1db`, color: INK, fontSize: cq(3), fontWeight: 600 }}>Cancel</span>
          </div>
        </div>
        <div>
          {label("CHIPS & TAGS")}
          <div className="flex flex-wrap" style={{ gap: cq(1.6) }}>
            {["Spicy", "Desi", "Healthy"].map((c, i) => (
              <span key={c} className="rounded-full" style={{ padding: `${cq(1.6)} ${cq(3.6)}`, fontSize: cq(2.7), background: i === 0 ? INK : CLOUD, color: i === 0 ? "#fff" : INK }}>{c}</span>
            ))}
            <span className="rounded-full" style={{ padding: `${cq(1.6)} ${cq(3.6)}`, fontSize: cq(2.7), background: "rgb(241 105 45 / 0.12)", color: "#b9471a", fontWeight: 600 }}>20% off</span>
          </div>
        </div>
        <div>
          {label("ITEM CARD")}
          <div className="flex items-center" style={{ gap: cq(3), padding: cq(2.4), borderRadius: cq(3.4), border: `${cq(0.3)} solid #ecede8` }}>
            <div className="flex items-center justify-center" style={{ width: cq(16), height: cq(16), borderRadius: cq(2.6), background: "linear-gradient(135deg,#fbe3cf,#f3c39e)" }}>
              <div className="rounded-full" style={{ width: cq(12), height: cq(12), background: "radial-gradient(circle at 42% 40%, #b4471b 0 22%, #d9783a 23% 47%, #fff 48% 62%, transparent 63%)" }} />
            </div>
            <div className="flex-1">
              <div style={{ fontSize: cq(3.2), fontWeight: 600, color: INK }}>Chicken Karahi</div>
              <div style={{ fontSize: cq(2.6), color: GREY, marginTop: cq(0.6) }}>Rs 1,450 · all-in</div>
            </div>
            <div className="flex items-center justify-between rounded-full" style={{ width: cq(19), height: cq(8), padding: `0 ${cq(2.6)}`, background: CLOUD, fontSize: cq(3.2), color: INK }}>
              <span>−</span>
              <span style={{ fontWeight: 600 }}>2</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div className="flex" style={{ gap: cq(6) }}>
          <div>
            {label("TOGGLE")}
            <span className="flex items-center rounded-full" style={{ width: cq(12), height: cq(7), padding: cq(0.8), background: BASIL, justifyContent: "flex-end" }}>
              <span className="rounded-full bg-white" style={{ width: cq(5.4), height: cq(5.4) }} />
            </span>
          </div>
          <div>
            {label("RATING")}
            <span style={{ fontSize: cq(4), color: PAPRIKA, letterSpacing: "0.1em" }}>★★★★★</span>
          </div>
        </div>
      </div>
    </ArtCanvas>
  );
}
