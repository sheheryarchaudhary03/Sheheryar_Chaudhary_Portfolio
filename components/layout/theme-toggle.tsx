"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

/**
 * Both icons are always rendered and swapped with the `dark:` variant, so the
 * server markup is identical in either theme — no hydration flicker.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "glass relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full border border-border text-foreground transition-colors hover:bg-glass-strong",
        className,
      )}
    >
      <span className="sr-only">Toggle colour theme</span>
      <Sun
        aria-hidden="true"
        className="absolute size-[18px] rotate-0 scale-100 transition-transform duration-500 ease-out-expo dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute size-[18px] rotate-90 scale-0 transition-transform duration-500 ease-out-expo dark:rotate-0 dark:scale-100"
      />
    </button>
  );
}
