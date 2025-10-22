import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const environment: PageContext = {
  meta_title: "Fund Climate Action Without Fees",
  meta_description:
    "helps environmental nonprofits save more with zero fees. Protect land, water, and wildlife. Start your impact-driven fundraising today.",
  hero_subject: {
    1: "conservation",
    2: "environmental mission",
  },
  cta: {
    pre: "Protect. Restore.",
    body: "For environmental nonprofits safeguarding our planet",
  },
  hero: blob("environment-hero.png"),
  left: blob("environment-left.png"),
  right: blob("environment-right.png"),
  partners: "environmental nonprofits",
};
