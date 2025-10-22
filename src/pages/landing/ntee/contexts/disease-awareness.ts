import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const disease_awareness: PageContext = {
  meta_subject: {
    title: "Health Associations",
    description: "health associations",
  },
  hero_subject: {
    1: "health research",
    2: "association",
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
