import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const public_safety: PageContext = {
  meta_title: "Fund Public Safety Without Fees",
  meta_description:
    "helps safety nonprofits maximize every donation. Fund preparedness, response, and recovery. Start fundraising today.",
  hero_copy: {
    1: "Zero platform fees. More ways to give. More funding for your public safety mission.",
    2: "equips safety-focused nonprofits with the resources to prepare, respond, and rebuild.",
  },
  red_copy:
    "Every dollar lost is a fire alarm unfunded, a training skipped, a neighborhood left exposed.",
  hero: blob("public-safety-hero.png"),
  left: blob("public-safety-left.png"),
  right: blob("public-safety-right.png"),
};
