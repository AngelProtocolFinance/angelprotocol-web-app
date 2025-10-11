import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const disease_awareness: PageContext = {
  meta_title: "Fund Treatment & Research Without Fees",
  meta_description:
    "removes platform fees for research nonprofits. Keep more for labs, studies, and cures. Start fundraising today.",
  hero_copy: {
    1: "Zero platform fees. More ways to give. More funding for your research mission.",
    2: "empowers medical researchers to pursue life-saving innovation without losing donations to fees.",
  },
  red_copy:
    "Every dollar lost is a lab left underfunded, a discovery shelved, a cure that stays out of reach.",
  hero: blob("disease-awareness-hero.png"),
  left: blob("disease-awareness-left.png"),
  right: blob("disease-awareness-right.png"),
};
