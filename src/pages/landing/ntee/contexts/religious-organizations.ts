import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const religious_organizations: PageContext = {
  meta_title: "Zero Fees for Faith-Based Giving",
  meta_description:
    "helps religious nonprofits keep 100% of donations. Fund missions, outreach, and services. Start fundraising today.",
  hero_subject: {
    1: "faith",
    2: "spiritual mission",
  },
  cta: {
    pre: "Faith. Serve.",
    body: "For faith-based nonprofits spreading hope and compassion",
  },
  hero: blob("religious-organizations-hero.png"),
  left: blob("religious-organizations-left.png"),
  right: blob("religious-organizations-right.png"),
  partners: "faith-based nonprofits",
};
