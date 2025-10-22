import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const health_care: PageContext = {
  meta_title: "More Funding for Health Access",
  meta_description:
    "helps health nonprofits eliminate platform fees. Fund more care, clinics, and recovery. Start raising more today.",
  hero_subject: {
    1: "health access",
    2: "health mission",
  },
  cta: {
    pre: "Heal. Support.",
    body: "For health nonprofits improving lives every day",
  },
  hero: blob("health-care-hero.png"),
  left: blob("health-care-left.png"),
  right: blob("health-care-right.png"),
  partners: "health nonprofits",
};
