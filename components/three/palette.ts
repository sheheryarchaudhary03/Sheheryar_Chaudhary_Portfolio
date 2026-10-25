import type { SceneTheme } from "./store";

/** Clay colours for the 3D scenes — sage studio (light) and deep forest (dark). */
export type ScenePalette = {
  greens: [string, string, string, string];
  beiges: [string, string, string];
  cream: string;
  deep: string;
  glow: string;
  fog: string | null;
  ambient: number;
  key: number;
  env: number;
};

export const palettes: Record<SceneTheme, ScenePalette> = {
  light: {
    greens: ["#8dae78", "#6f935e", "#a7c493", "#57794a"],
    beiges: ["#ded3b9", "#e8e0cb", "#cdbf9f"],
    cream: "#f1ecdf",
    deep: "#3e5a36",
    glow: "#d5edbb",
    fog: null,
    ambient: 0.7,
    key: 1.7,
    env: 1,
  },
  dark: {
    greens: ["#4e7244", "#5f8853", "#3d5c36", "#729a63"],
    beiges: ["#a49a7e", "#b6ac90", "#8c8369"],
    cream: "#c8c0a6",
    deep: "#253823",
    glow: "#c3eba2",
    fog: "#101710",
    ambient: 0.35,
    key: 1.15,
    env: 0.7,
  },
};
