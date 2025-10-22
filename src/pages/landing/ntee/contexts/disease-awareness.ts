import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const disease_awareness: PageContext = {
  meta_title: "Fund Treatment & Research Without Fees",
  meta_description:
    "removes platform fees for research nonprofits. Keep more for labs, studies, and cures. Start fundraising today.",
  hero_subject: {
    1: "research",
    2: "health progress",
  },
  cta: {
    pre: "Unite. Advance.",
    body: "For health associations leading progress in care and research",
  },
  hero: blob("disease-awareness-hero.png"),
  left: blob("disease-awareness-left.png"),
  right: blob("disease-awareness-right.png"),
  partners: "health associations",
};
