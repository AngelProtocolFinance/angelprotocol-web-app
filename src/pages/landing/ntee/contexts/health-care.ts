import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const health_care: PageContext = {
  meta_subject: {
    title: "Health Nonprofits",
    description: "health nonprofits",
  },
  hero_subject: {
    1: "health",
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
