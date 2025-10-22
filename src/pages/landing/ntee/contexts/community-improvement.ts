import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const community_improvement: PageContext = {
  meta_title: "Fund Local Impact Without Platform Fees",
  meta_description:
    "helps community nonprofits raise more with zero fees. Fund programs, spaces, and equity. Start fundraising today.",
  hero_subject: {
    1: "community",
    2: "local impact",
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
