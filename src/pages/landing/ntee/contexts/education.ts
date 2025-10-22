import { blob } from "constants/urls";
import type { PageContext } from "../types";
export const education: PageContext = {
  meta_title: "Education Fundraising Without Fees",
  meta_description:
    "helps education nonprofits save on fees and grow impact without compromise. Fund schools, scholarships, and community programs.",
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
