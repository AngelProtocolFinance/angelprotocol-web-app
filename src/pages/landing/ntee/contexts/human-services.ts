import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const human_services: PageContext = {
  meta_title: "Fund Human Services Without Fees",
  meta_description:
    "helps nonprofits meet basic needs with zero fees. Fund care, stability, and dignity. Start your impact today.",
  hero_subject: {
    1: "care",
    2: "service mission",
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
