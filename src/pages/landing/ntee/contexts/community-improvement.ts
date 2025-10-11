import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const community_improvement: PageContext = {
  meta_title: "Fund Local Impact Without Platform Fees",
  meta_description:
    "helps community nonprofits raise more with zero fees. Fund programs, spaces, and equity. Start fundraising today.",
  hero_copy: {
    1: "Zero platform fees. More ways to give. More funding for your community mission.",
    2: "fuels local leaders and nonprofits restoring neighborhoods and building futures.",
  },
  red_copy:
    "Every dollar lost is a playground never fixed, a program unfunded, a voice left unheard at city hall.",
  hero: blob("community-improvement-hero.png"),
  left: blob("community-improvement-left.png"),
  right: blob("community-improvement-right.png"),
};
