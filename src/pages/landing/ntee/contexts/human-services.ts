import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const human_services: PageContext = {
  meta_title: "Fund Human Services Without Fees",
  meta_description:
    "helps nonprofits meet basic needs with zero fees. Fund care, stability, and dignity. Start your impact today.",
  hero_copy: {
    1: "Zero platform fees. More ways to give. More funding for your service mission.",
    2: "stands with human service nonprofits helping people survive and thrive with dignity.",
  },
  red_copy:
    "Every dollar lost is a family turned away, a shelter at capacity, a basic need unmet.",
  hero: blob("human-services-hero.png"),
  left: blob("human-services-left.png"),
  right: blob("human-services-right.png"),
};
