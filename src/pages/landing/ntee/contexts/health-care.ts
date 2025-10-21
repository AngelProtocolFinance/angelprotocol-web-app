import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const health_care: PageContext = {
  meta_title: "More Funding for Health Access",
  meta_description:
    "helps health nonprofits eliminate platform fees. Fund more care, clinics, and recovery. Start raising more today.",
  hero_copy: {
    1: "Zero platform fees. More ways to give. More funding for your health mission.",
    2: "supports health-focused nonprofits in keeping clinics open, treatments affordable, and lives intact.",
  },
  red_copy:
    "Every dollar lost is a kennel left empty, a treatment unaffordable, a life left in pain or danger.",
  hero: blob("health-care-hero.png"),
  left: blob("health-care-left.png"),
  right: blob("health-care-right.png"),
};
