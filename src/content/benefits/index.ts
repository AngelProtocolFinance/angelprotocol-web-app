import icon1 from "./icons/Icon1_wb.webp";
import icon2 from "./icons/Icon2_wb.webp";
import icon3 from "./icons/Icon3_wb.webp";
import icon4 from "./icons/Icon4_wb.webp";
import icon5 from "./icons/Icon5_wb.webp";
import icon6 from "./icons/Icon6_wb.webp";
import icon7 from "./icons/Icon7_wb.webp";
import icon8 from "./icons/Icon8_wb.webp";
import { sf } from "./sf-benefits";
import { Benefit } from "./types";

const colors = ["bg-[#EDFCE2]", "bg-lilac", "bg-[#FCF6E2]", "bg-[#EDF2FE]"];

const donors: Benefit[] = [
  {
    title: "Sustainable Impact",
    description:
      "Your donation grows through our nonprofit Sustainability Fund. Give the gift that keeps on giving.",
    img: icon1,
    cardBgClass: colors[0],
  },
  {
    title: "The World At Your Fingertips",
    description:
      "Donate to any nonprofit, anywhere in the world. Support local grassroots organizations who understand the problems on the ground",
    img: icon2,
    cardBgClass: colors[1],
  },
  {
    title: "Receive and Track Tax Benefits",
    description:
      "Get automated receipts to claim deductions and eliminate capital gains tax when donating property such as stocks and crypto",
    img: icon3,
    cardBgClass: colors[2],
  },
  {
    title: "Your Donation, Your Way",
    description:
      "Use the giving method that works for you - from check, card and bank transfers to stock, DAF and crypto",
    img: icon4,
    cardBgClass: colors[3],
  },
];
const nonprofits: Benefit[] = [
  {
    title: "Expanded Funding Channels",
    description:
      "Tap into new sources of funding by accepting cash, crypto, stocks, donor funds, and more.",
    img: icon5,
    cardBgClass: colors[0],
  },
  {
    title: "Recurring Revenue Streams",
    description:
      "Get perpetual funding as your donor gifts grow inside our Sustainability Fund's balanced investment portfolio",
    img: icon6,
    cardBgClass: colors[1],
  },
  {
    title: "Simplified Donation Management",
    description:
      "Forget the admin hassle. We handle the complexity of processing diverse donations, issuing automated tax receipts, and consolidating donor data",
    img: icon7,
    cardBgClass: colors[2],
  },
  {
    title: "Global Reach and Fiscal Sponsorship",
    description:
      "Unlock new worldwide donor pipelines and accept cross-border gifts through fiscal sponsorship. Expand your global community.",
    img: icon8,
    cardBgClass: colors[3],
  },
];

export const benefits = { donors, nonprofits, sf };
export type { Benefit } from "./types";