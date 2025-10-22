import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const public_safety: PageContext = {
  meta_title: "Fund Public Safety Without Fees",
  meta_description:
    "helps safety nonprofits maximize every donation. Fund preparedness, response, and recovery. Start fundraising today.",
  hero_subject: {
    1: "preparedness",
    2: "safety mission",
  },
  cta: {
    pre: "Prepare. Respond.",
    body: "For disaster relief nonprofits protecting lives and communities",
  },
  hero: blob("public-safety-hero.png"),
  left: blob("public-safety-left.png"),
  right: blob("public-safety-right.png"),
  partners: "disaster relief nonprofits",
};
