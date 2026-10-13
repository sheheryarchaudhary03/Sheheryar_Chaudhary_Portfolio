"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const INTRO_STORAGE_KEY = "sc:intro-seen";

type IntroState = {
  /** True once the intro loader has finished (or was skipped). */
  ready: boolean;
  /** Whether the loader should play on this page view. */
  shouldPlay: boolean;
  finish: () => void;
};

const IntroContext = createContext<IntroState>({ ready: true, shouldPlay: false, finish: () => {} });

export function useIntro() {
  return useContext(IntroContext);
}

/**
 * Inline script for <head>: marks returning visitors before first paint so the
 * loader (rendered on the server) is hidden by CSS with no flash.
 */
export const introScript = `try{if(sessionStorage.getItem("${INTRO_STORAGE_KEY}"))document.documentElement.dataset.intro="seen"}catch(e){}`;

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const seen = document.documentElement.dataset.intro === "seen";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with pre-paint DOM flag
      setReady(true);
    } else {
      setShouldPlay(true);
    }
  }, []);

  const finish = useCallback(() => {
    setReady(true);
    document.documentElement.dataset.intro = "seen";
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      /* storage unavailable — loader simply replays next visit */
    }
  }, []);

  const value = useMemo(() => ({ ready, shouldPlay, finish }), [ready, shouldPlay, finish]);

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}
