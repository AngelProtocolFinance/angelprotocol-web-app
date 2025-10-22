import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const arts_culture: PageContext = {
  meta_title: "Zero Fees for Arts Nonprofits",
  meta_description:
    "helps arts nonprofits keep 100% of donations. Fund classes, shows, and creative access. Start your impact journey today.",
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
