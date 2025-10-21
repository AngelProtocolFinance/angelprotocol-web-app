import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const environment: PageContext = {
  meta_title: "Fund Climate Action Without Fees",
  meta_description:
    "helps environmental nonprofits save more with zero fees. Protect land, water, and wildlife. Start your impact-driven fundraising today.",
  hero_copy: {
    1: "Zero platform fees. More ways to give. More funding for your environmental mission",
    2: "partners with environmental nonprofits to protect what can’t speak for itself forests, oceans, ecosystems.",
  },
  red_copy:
    "Every dollar lost to fees is a tree that doesn’t get planted, a cleanup that doesn’t happen, a species closer to extinction.",
  hero: blob("environment-hero.png"),
  left: blob("environment-left.png"),
  right: blob("environment-right.png"),
};
