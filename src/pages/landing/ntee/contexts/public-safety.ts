import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const public_safety: PageContext = {
  meta_subject: {
    title: "Disaster Relief Nonprofits",
    description: "disaster relief nonprofits",
  },
  hero_subject: {
    1: "relief",
    2: "relief mission",
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
