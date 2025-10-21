import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const arts_culture: PageContext = {
  meta_title: "Zero Fees for Arts Nonprofits",
  meta_description:
    "helps arts nonprofits keep 100% of donations. Fund classes, shows, and creative access. Start your impact journey today.",
  hero_copy: {
    1: "Zero platform fees. More ways to give.. More funding for your arts mission.",
    2: "helps arts and culture nonprofits save on fees and grow impact without compromise.",
  },
  red_copy:
    "Every dollar lost to fees, every dollar turned away, is a student who can't take art classes. A show that can't be produced.",
  hero: blob("arts-culture-hero.png"),
  left: blob("arts-culture-left.png"),
  right: blob("arts-culture-right.png"),
};
