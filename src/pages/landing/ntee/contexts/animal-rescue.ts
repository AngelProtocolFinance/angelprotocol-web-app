import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const animal_rescue: PageContext = {
  meta_title: "Keep 100% for Animal Rescue",
  meta_description:
    "helps animal nonprofits raise funds without fees. More rescues, more shelters, more lives saved. Start fundraising today.",
  hero_copy: {
    1: "Zero platform fees. More ways to give. More funding for your animal welfare mission.",
    2: "helps animal nonprofits rescue, shelter, and protect with zero platform fees draining resources.",
  },
  red_copy:
    "Every dollar lost to fees is a tree that doesn’t get planted, a cleanup that doesn’t happen, a species closer to extinction",
  hero: blob("animal-rescue-hero.png"),
  left: blob("animal-rescue-left.png"),
  right: blob("animal-rescue-right.png"),
};
