import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const human_services: PageContext = {
  meta_subject: {
    title: "Human Services Nonprofits",
    description: "human services nonprofits",
  },
  hero_subject: {
    1: "care",
    2: "human services mission",
  },
  cta: {
    pre: "Support. Uplift.",
    body: "For human services nonprofits meeting vital needs",
  },
  hero: blob("human-services-hero.png"),
  left: blob("human-services-left.png"),
  right: blob("human-services-right.png"),
  partners: "human services nonprofits",
};
