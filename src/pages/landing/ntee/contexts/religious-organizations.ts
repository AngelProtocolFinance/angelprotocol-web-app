import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const religious_organizations: PageContext = {
  meta_subject: {
    title: "Faith-Based Nonprofits",
    description: "faith-based nonprofits",
  },
  hero_subject: {
    1: "faith",
    2: "faith-based mission",
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
