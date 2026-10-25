import type { ComponentType } from "react";

import {
  AshwheelzCover,
  AshwheelzFeedback,
  AshwheelzLivery,
  AshwheelzStationery,
  AshwheelzWireframe,
} from "./ashwheelz";
import { AttendanceCover, AttendanceMark, AttendancePhone, AttendanceRecords, AttendanceWireframe } from "./attendance";
import {
  DigivoraCover,
  DigivoraLogoSuite,
  DigivoraStationery,
  DigivoraWebsite,
  DigivoraWireframe,
} from "./digivora";
import { FeedbackAdmin, FeedbackCover, FeedbackForm, FeedbackSheet, FeedbackWireframe } from "./feedback";
import {
  MealWheelzApps,
  MealWheelzBrand,
  MealWheelzCover,
  MealWheelzRestaurant,
  MealWheelzRider,
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
      { title: "Fleet livery", caption: "A continuous signal stripe and the logo sized to be read across a highway.", wide: true, Art: AshwheelzLivery },
      { title: "Stationery & employee IDs", caption: "Business cards and ID badges on one grid with the livery.", Art: AshwheelzStationery },
      { title: "Customer feedback", caption: "One URL to rate delivery time, safety, driver, hygiene and service.", Art: AshwheelzFeedback },
    ],
  },
  mealwheelz: {
    Cover: MealWheelzCover,
    Wireframe: MealWheelzWireframe,
    panels: [
      { title: "Three apps, one platform", caption: "Customer, restaurant and rider — one brand, one order language.", wide: true, Art: MealWheelzApps },
      { title: "Restaurant partner app", caption: "New, processing, delivered — with an online switch for the kitchen.", Art: MealWheelzRestaurant },
      { title: "Rider app", caption: "Claim an order with one tap; track what's yours and what's delivered.", Art: MealWheelzRider },
      { title: "App icons & splash", caption: "The cloche-on-wheels mark carried across all three apps.", wide: true, Art: MealWheelzBrand },
    ],
  },
  "ashwheelz-feedback": {
    Cover: FeedbackCover,
    Wireframe: FeedbackWireframe,
    panels: [
      { title: "Admin portal", caption: "Search, filter by status and export every response to Excel.", wide: true, Art: FeedbackAdmin },
      { title: "Customer form", caption: "Five star ratings, a suggestion box and an NPS score — no login.", Art: FeedbackForm },
      { title: "Version one: automation", caption: "A Google Apps Script form feeding a Sheet, with an Excel menu.", Art: FeedbackSheet },
    ],
  },
  "sultan-yakhni-pulao": {
    Cover: SultanCover,
    Wireframe: SultanWireframe,
    panels: [
      { title: "Packaging family", caption: "Rice boxes, cups and carry bags — each carrying the Sultan emblem.", wide: true, Art: SultanPackaging },
      { title: "Launch poster", caption: "“Patience, served hot.” — selling slow cooking as the premium ingredient.", Art: SultanPoster },
      { title: "Social launch grid", caption: "A nine-post grid that reads as one brand from the profile view.", Art: SultanSocial },
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
  "attendance-register": {
    Cover: AttendanceCover,
    Wireframe: AttendanceWireframe,
    panels: [
      { title: "Mark attendance", caption: "Present, absent or leave in a tap — with shortcuts and a live tally.", wide: true, Art: AttendanceMark },
      { title: "On a phone", caption: "The same roll call, thumb-sized, for teachers on the move.", Art: AttendancePhone },
      { title: "Records & Excel", caption: "Filter by dates, class, batch and subject, then download .xlsx.", Art: AttendanceRecords },
    ],
  },
};
