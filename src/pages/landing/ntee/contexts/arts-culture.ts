import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const arts_culture: PageContext = {
  meta_subject: {
    title: "Arts and Culture Nonprofits",
    description: "arts and culture nonprofits",
  },
  hero_subject: {
    1: "creativity",
    2: "arts mission",
  },
  cta: {
    pre: "Create. Share.",
    body: "For arts and culture nonprofits building lasting impact",
  },
  hero: blob("arts-culture-hero.png"),
  left: blob("arts-culture-left.png"),
  right: blob("arts-culture-right.png"),
  partners: "arts and culture nonprofits",
};
