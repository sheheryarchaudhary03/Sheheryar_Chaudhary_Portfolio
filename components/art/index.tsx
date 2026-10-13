import type { ComponentType } from "react";

import {
  AshwheelzCover,
  AshwheelzFeedback,
  AshwheelzLivery,
  AshwheelzStationery,
  AshwheelzWireframe,
} from "./ashwheelz";
import {
  DigivoraCover,
  DigivoraLogoSuite,
  DigivoraStationery,
  DigivoraWebsite,
  DigivoraWireframe,
} from "./digivora";
import {
  MealWheelzComponents,
  MealWheelzCover,
  MealWheelzScreens,
  MealWheelzTracking,
  MealWheelzWireframe,
} from "./mealwheelz";
import {
  SultanCover,
  SultanPackaging,
  SultanPoster,
  SultanSocial,
  SultanWireframe,
} from "./sultan";

type Panel = { title: string; caption: string; wide?: boolean; Art: ComponentType };

type ProjectArt = {
  Cover: ComponentType;
  Wireframe: ComponentType;
  panels: Panel[];
};

export const projectArt: Record<string, ProjectArt> = {
  ashwheelz: {
    Cover: AshwheelzCover,
    Wireframe: AshwheelzWireframe,
    panels: [
      { title: "Fleet livery", caption: "A continuous signal stripe and a wordmark sized to be read across a highway.", wide: true, Art: AshwheelzLivery },
      { title: "Stationery & employee IDs", caption: "Business cards and ID badges on one grid with the livery.", Art: AshwheelzStationery },
      { title: "Customer feedback system", caption: "One URL to rate delivery time, safety, driver, hygiene and service.", Art: AshwheelzFeedback },
    ],
  },
  "sultan-yakhni-pulao": {
    Cover: SultanCover,
    Wireframe: SultanWireframe,
    panels: [
      { title: "Packaging family", caption: "Rice boxes, cups and carry bags — each sealed with the crest.", wide: true, Art: SultanPackaging },
      { title: "Launch poster", caption: "“Patience, served hot.” — selling slow cooking as the premium ingredient.", Art: SultanPoster },
      { title: "Social launch grid", caption: "A nine-post grid that reads as one brand from the profile view.", Art: SultanSocial },
    ],
  },
  mealwheelz: {
    Cover: MealWheelzCover,
    Wireframe: MealWheelzWireframe,
    panels: [
      { title: "Core ordering flow", caption: "Craving-led home, all-in pricing and a three-tap checkout.", wide: true, Art: MealWheelzScreens },
      { title: "Live order tracking", caption: "One calm screen that answers “where's my food?” before it's asked.", Art: MealWheelzTracking },
      { title: "Component library", caption: "Buttons, chips, cards and controls with every state designed.", Art: MealWheelzComponents },
    ],
  },
  digivora: {
    Cover: DigivoraCover,
    Wireframe: DigivoraWireframe,
    panels: [
      { title: "Website concept", caption: "Results above the fold — proof first, adjectives last.", wide: true, Art: DigivoraWebsite },
      { title: "Logo suite", caption: "One mark that holds on dark, light and brand colour.", Art: DigivoraLogoSuite },
      { title: "Stationery & social", caption: "A monochrome-first system with a single electric accent.", Art: DigivoraStationery },
    ],
  },
};
