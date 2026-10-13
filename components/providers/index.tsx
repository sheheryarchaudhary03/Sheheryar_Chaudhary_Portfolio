"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import { IntroProvider } from "./intro";
import { SmoothScroll } from "./smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <IntroProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </IntroProvider>
      </MotionConfig>
      <Toaster
        position="bottom-center"
        toastOptions={{
          classNames: {
            toast:
              "!rounded-2xl !border !border-border !bg-popover !text-popover-foreground !shadow-[0_20px_60px_-20px_rgb(0_0_0/0.35)] !font-sans",
            description: "!text-muted-foreground",
          },
        }}
      />
    </ThemeProvider>
  );
}
