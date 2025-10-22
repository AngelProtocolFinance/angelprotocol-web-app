import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const animal_rescue: PageContext = {
  meta_title: "Keep 100% for Animal Rescue",
  meta_description:
    "helps animal nonprofits raise funds without fees. More rescues, more shelters, more lives saved. Start fundraising today.",
  hero_subject: {
    1: "animal care",
    2: "rescue mission",
  },
  cta: {
    pre: "Rescue. Care.",
    body: "For animal nonprofits protecting lives with compassion",
  },
  hero: blob("animal-rescue-hero.png"),
  left: blob("animal-rescue-left.png"),
  right: blob("animal-rescue-right.png"),
  partners: "animal rescue nonprofits",
};
