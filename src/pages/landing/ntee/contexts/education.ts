import { blob } from "constants/urls";
import type { PageContext } from "../types";
export const education: PageContext = {
  meta_subject: {
    title: "Education Nonprofits",
    description: "education nonprofits",
  },
  hero_subject: {
    1: "learning",
    2: "education mission",
  },
  cta: {
    pre: "Teach. Inspire.",
    body: "For education nonprofits shaping brighter futures",
  },
  hero: blob("education-hero.png"),
  left: blob("education-left.png"),
  right: blob("education-right.png"),
  partners: "education nonprofits",
};
