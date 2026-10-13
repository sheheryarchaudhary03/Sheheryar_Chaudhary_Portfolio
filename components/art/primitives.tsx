import { cn } from "@/lib/utils";

/**
 * Art is drawn with container-query units so every illustration scales
 * fluidly with its frame — no raster images, no layout shift, tiny payload.
 */
export const cq = (n: number) => `${n}cqw`;

export function ArtCanvas({
  label,
  className,
  style,
  children,
}: {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("@container relative isolate h-full w-full overflow-hidden select-none", className)}
      style={style}
    >
      {children}
    </div>
  );
}

/** A centred 16:10 stage; compositions are laid out inside it in cqw. */
export function Stage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn("absolute top-1/2 left-0 w-full -translate-y-1/2", className)}
      style={{ height: cq(62.5) }}
    >
      {children}
    </div>
  );
}

/** Fine engineering grid used as a backdrop on several covers. */
export function GridBackdrop({ color = "rgb(255 255 255 / 0.05)", size = 4 }: { color?: string; size?: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
        backgroundSize: `${cq(size)} ${cq(size)}`,
      }}
    />
  );
}

export function Glow({
  color,
  x,
  y,
  size,
  opacity = 1,
}: {
  color: string;
  x: number;
  y: number;
  size: number;
  opacity?: number;
}) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        left: cq(x - size / 2),
        top: cq(y - size / 2),
        width: cq(size),
        height: cq(size),
        background: `radial-gradient(circle, ${color}, transparent 68%)`,
        opacity,
      }}
    />
  );
}

/**
 * Phone mockup. The screen is its own size container, so anything inside can
 * be sized in cqw relative to the screen width (100cqw = screen width).
 */
export function Phone({
  width,
  className,
  style,
  screen = "#ffffff",
  children,
}: {
  width: number;
  className?: string;
  style?: React.CSSProperties;
  screen?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("absolute", className)}
      style={{
        width: cq(width),
        aspectRatio: "9 / 19.5",
        borderRadius: cq(width * 0.16),
        padding: cq(width * 0.032),
        background: "linear-gradient(145deg, #2a2a2a, #0b0b0b 45%)",
        boxShadow: `0 ${cq(width * 0.14)} ${cq(width * 0.32)} -${cq(width * 0.1)} rgb(0 0 0 / 0.5), inset 0 0 0 ${cq(0.12)} rgb(255 255 255 / 0.14)`,
        ...style,
      }}
    >
      <div
        className="@container relative h-full w-full overflow-hidden"
        style={{ borderRadius: cq(width * 0.13), background: screen }}
      >
        <div
          className="absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black"
          style={{ top: "2.2cqw", width: "30cqw", height: "8.5cqw" }}
        />
        {children}
      </div>
    </div>
  );
}

/** iOS-style status bar for phone screens. */
export function StatusBar({ color = "#111111" }: { color?: string }) {
  return (
    <div className="flex items-center justify-between" style={{ padding: "3.6cqw 8cqw 0", color }}>
      <span style={{ fontSize: "4.2cqw", fontWeight: 600 }}>9:41</span>
      <span className="flex items-center" style={{ gap: "1.4cqw" }}>
        <span className="flex items-end" style={{ gap: "0.6cqw", height: "3cqw" }}>
          {[1.2, 1.8, 2.4, 3].map((h) => (
            <span key={h} style={{ width: "0.9cqw", height: `${h}cqw`, background: color, borderRadius: "0.3cqw" }} />
          ))}
        </span>
        <span style={{ width: "6.2cqw", height: "3cqw", border: `0.4cqw solid ${color}`, borderRadius: "1cqw", padding: "0.4cqw" }}>
          <span className="block h-full" style={{ width: "70%", background: color, borderRadius: "0.4cqw" }} />
        </span>
      </span>
    </div>
  );
}

/** Minimal browser chrome. The viewport is a size container. */
export function BrowserFrame({
  width,
  className,
  style,
  url,
  dark = false,
  children,
}: {
  width: number;
  className?: string;
  style?: React.CSSProperties;
  url: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("absolute overflow-hidden", className)}
      style={{
        width: cq(width),
        borderRadius: cq(width * 0.018),
        background: dark ? "#16161b" : "#ffffff",
        boxShadow: `0 ${cq(width * 0.05)} ${cq(width * 0.12)} -${cq(width * 0.03)} rgb(0 0 0 / 0.45), 0 0 0 ${cq(0.1)} rgb(255 255 255 / ${dark ? 0.1 : 0})`,
        ...style,
      }}
    >
      <div
        className="flex items-center"
        style={{
          gap: cq(width * 0.008),
          padding: `${cq(width * 0.012)} ${cq(width * 0.016)}`,
          background: dark ? "#1d1d23" : "#f1f1ef",
          borderBottom: `${cq(0.1)} solid ${dark ? "rgb(255 255 255 / 0.06)" : "rgb(0 0 0 / 0.06)"}`,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="rounded-full" style={{ width: cq(width * 0.011), height: cq(width * 0.011), background: c }} />
        ))}
        <span
          className="mx-auto rounded-full text-center"
          style={{
            width: "38%",
            fontSize: cq(width * 0.011),
            padding: `${cq(width * 0.003)} 0`,
            background: dark ? "rgb(255 255 255 / 0.06)" : "rgb(0 0 0 / 0.05)",
            color: dark ? "rgb(255 255 255 / 0.55)" : "rgb(0 0 0 / 0.5)",
          }}
        >
          {url}
        </span>
      </div>
      <div className="@container relative">{children}</div>
    </div>
  );
}
