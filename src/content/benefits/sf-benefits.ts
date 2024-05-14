import { APP_NAME } from "constants/env";
import icon1 from "./icons/roadmap1_wb.webp";
import icon2 from "./icons/roadmap2_wb.webp";
import icon3 from "./icons/roadmap3_wb.webp";
import icon4 from "./icons/roadmap4_wb.webp";
import { Benefit } from "./types";

export const sf: Benefit[] = [
  {
    title: "The gift that keeps on giving",
    description:
      "Donors can choose a portion of their donation to go into the Sustainability Fund, allowing it to grow and provide ongoing support to the nonprofit of their choice - forever.",
    img: icon1,
    cardBgClass: "",
  },
  {
    title: "Simple, sustainable growth",
    description: `The Sustainability fund is owned and managed by ${APP_NAME} and invested into a balanced portfolio to protect and grow over time - no admin work or liability for nonprofits.`,
    img: icon2,
    cardBgClass: "",
  },
  {
    title: "Reliable funding stream",
    description:
      "Sustainability Fund growth is paid out quarterly, providing nonprofits with a new source of recurring revenue - consistent funding that doesn't rely on donation cycles.",
    img: icon3,
    cardBgClass: "",
  },
  {
    title: "Result:",
    description: `${APP_NAME} provides nonprofits with a simple path to financial stability while giving donors a way to amplify their impact, ensuring their gift continues to provide support - not just today, but every day.`,
    img: icon4,
    cardBgClass: "",
  },
];
