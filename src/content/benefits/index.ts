import { laira } from "assets/laira/laira";
import icon1 from "./icons/Icon1_wb.webp";
import icon2 from "./icons/Icon2_wb.webp";
import icon3 from "./icons/Icon3_wb.webp";
import icon4 from "./icons/Icon4_wb.webp";
import icon5 from "./icons/Icon5_wb.webp";
import icon7 from "./icons/Icon7_wb.webp";
import { sf } from "./sf-benefits";
import type { Benefit } from "./types";

const colors = ["bg-[#EDFCE2]", "bg-lilac", "bg-[#FCF6E2]", "bg-[#EDF2FE]"];

const donors: Benefit[] = [
  {
    title: "Sustainable Impact",
    description:
      "Your donation grows through our nonprofit Sustainability Fund. Give the gift that keeps on giving.",
    img: icon1,
    cardBgClass: colors[0],
    listIcon: { src: laira.openArms, width: 28 },
  },
  {
    title: "The World At Your Fingertips",
    description:
      "Donate to any nonprofit, anywhere in the world. Support local grassroots organizations who understand the problems on the ground",
    img: icon2,
    cardBgClass: colors[1],
    listIcon: { src: laira.sitting, width: 23 },
  },
  {
    title: "Receive and Track Tax Benefits",
    description:
      "Get automated receipts to claim deductions and eliminate capital gains tax when donating property such as stocks and crypto",
    img: icon3,
    cardBgClass: colors[2],
    listIcon: { src: laira.jumping, width: 30 },
  },
  {
    title: "Your Donation, Your Way",
    description:
      "Use the giving method that works for you - from check, card and bank transfers to stock, DAF and crypto",
    img: icon4,
    cardBgClass: colors[3],
    listIcon: { src: laira.standing, width: 20 },
  },
];
const nonprofits: Benefit[] = [
  {
    title: "Free Donation Processing",
    title2: "Keep 100% of your donations",
    description:
      "Maximize your nonprofit’s funds with no platform fees. Although third-party processing fees may apply, 95% of donors choose to cover these fees. We handle the tax receipts and admin work for accepting all types of donations, you enjoy grants directly to your bank account.",
    img: icon7,
    cardBgClass: colors[0],
  },
  {
    title: "High-Yield Savings Accounts",
    title2: "Secure, steady growth for your funds",
    description:
      "Choose to grow donations in a high-yield savings account at an annual rate of 4-5%, all without any market risk. Funds remain accessible and safe while earning interest, providing your nonprofit with a reliable way to increase reserves over time.",
    img: icon5,
    cardBgClass: colors[1],
  },
  {
    title: "Managed Investment Funds",
    title2: "Maximize long-term financial growth",
    description:
      "Unlock the potential of your donations with managed investment funds that have delivered an average annual return of 24% over the past five years. Our investment strategy is designed for long-term stability and growth, helping your nonprofit secure a sustainable financial future.",
    img: icon2,
    cardBgClass: colors[2],
  },
  {
    title: "Global Fiscal Sponsorship",
    title2: "Access U.S. grants and streamline international giving",
    description:
      "Our fiscal sponsorship program helps nonprofits outside the U.S. access tax-deductible donations from American donors and simplifies cross-border donations. With Better Giving as your fiscal sponsor, you can expand your reach and grow your donor base without navigating complex legal and tax processes on your own.",
    img: icon4,
    cardBgClass: colors[3],
  },
];

const donorsOrder2 = [donors[3], donors[0], donors[1], donors[2]];

export const benefits = { donors, nonprofits, sf, donorsOrder2 };
export type { Benefit } from "./types";
