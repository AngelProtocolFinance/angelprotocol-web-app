import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const community_improvement: PageContext = {
  meta_subject: {
    title: "Community Nonprofits",
    description: "community nonprofits",
  },
  hero_subject: {
    1: "communities",
    2: "community mission",
  },
  cta: {
    pre: "Unite. Build.",
    body: "For community nonprofits strengthening local impact",
  },
  hero: blob("community-improvement-hero.png"),
  left: blob("community-improvement-left.png"),
  right: blob("community-improvement-right.png"),
  partners: "community nonprofits",
};
