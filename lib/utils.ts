import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { siteConfig } from "@/content/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing curve — a soft "expo out" used across all motion. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
