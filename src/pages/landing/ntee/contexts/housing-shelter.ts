import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const housing_shelter: PageContext = {
  meta_subject: {
    title: "Housing Nonprofits",
    description: "housing nonprofits",
  },
  hero_subject: {
    1: "shelter",
    2: "housing mission",
  },
  cta: {
    pre: "Build. Shelter.",
    body: "For housing nonprofits providing homes and hope",
  },
  hero: blob("housing-shelter-hero.png"),
  left: blob("housing-shelter-left.png"),
  right: blob("housing-shelter-right.png"),
  partners: "health associations",
};
