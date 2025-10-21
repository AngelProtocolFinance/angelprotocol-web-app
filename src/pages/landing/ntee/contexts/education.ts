import { blob } from "constants/urls";
import type { PageContext } from "../types";
export const education: PageContext = {
  meta_title: "Education Fundraising Without Fees",
  meta_description:
    "helps education nonprofits save on fees and grow impact without compromise. Fund schools, scholarships, and community programs.",
  hero_copy: {
    1: "Zero platform fees. More ways to give. More funding for your education mission.",
    2: "helps education nonprofits save on fees and grow impact without compromise.",
  },
  red_copy:
    "Every dollar lost to fees is a child left without a tutor, a classroom without technology, a future dimmed before it begins.",
  hero: blob("education-hero.png"),
  left: blob("education-left.png"),
  right: blob("education-right.png"),
};
