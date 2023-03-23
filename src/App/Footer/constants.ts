import { IconType } from "components/Icon";
import { BASE_DOMAIN, DAPP_DOMAIN } from "constants/common";
import { LITEPAPER } from "constants/urls";

type SocialMedia =
  | "Twitter"
  | "Telegram"
  | "Discord"
  | "YouTube"
  | "Medium"
  | "Facebook"
  | "Linkedin"
  | "Instagram";

type SocialMediaLinks = {
  [index in SocialMedia]: { iconType: IconType; link: string };
};

export const SOCIAL_MEDIA_LINKS: SocialMediaLinks = {
  Twitter: {
    iconType: "Twitter",
    link: "https://twitter.com/angelgiving_",
  },
  Telegram: {
    iconType: "Telegram",
    link: "https://t.me/angelprotocoI",
  },
  Discord: {
    iconType: "Discord",
    link: "https://discord.gg/angelprotocol",
  },
  YouTube: {
    iconType: "Youtube",
    link: "https://www.youtube.com/@AngelGiving",
  },
  Medium: {
    iconType: "Medium",
    link: "https://angelprotocol.medium.com",
  },
  Facebook: {
    iconType: "FacebookCircle",
    link: "https://www.facebook.com/AngelgivingFB/",
  },
  Linkedin: {
    iconType: "Linkedin",
    link: "https://www.linkedin.com/company/angel-giving",
  },
  Instagram: {
    iconType: "Instagram",
    link: "https://www.instagram.com/angel.giving",
  },
};

type Section = {
  title: string;
  links: {
    text: string;
    href?: string;
  }[];
};

export const SECTIONS_DATA: Section[] = [
  {
    title: "Products",
    links: [
      {
        text: "Non-profits",
        href: `${BASE_DOMAIN}`,
      },
      {
        text: "Giving Partners (CSR)",
        href: `${BASE_DOMAIN}/giving-partners-csr/`,
      },
      { text: "Impact Board", href: `${DAPP_DOMAIN}/leaderboard/` },
      // {
      //   text: "For Giftcards",
      //   href: "https://app.angel.giving/gift",
      // },
    ],
  },
  {
    title: "About",
    links: [
      { text: "About us", href: `${BASE_DOMAIN}/about-angel-giving/` },
      {
        text: "Meet the team",
        href: `${BASE_DOMAIN}/about/#:~:text=MEET%20THE%20TEAM-`,
      },
      { text: "News", href: `${BASE_DOMAIN}/news/` },
      { text: "Careers", href: `${BASE_DOMAIN}/careers/` },
    ],
  },
  {
    title: "Docs",
    links: [
      { text: "Litepaper", href: LITEPAPER },
      { text: "FAQs", href: "https://intercom.help/angel-protocol/en" },
      { text: "Technical doc (coming soon)" },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        text: "Privacy policy",
        href: `${BASE_DOMAIN}/privacy-policy/`,
      },
      {
        text: "Terms of Use",
        href: `${BASE_DOMAIN}/terms-of-use/`,
      },
      { text: "Terms for NPO", href: `${BASE_DOMAIN}/terms-of-use-npo/` },
    ],
  },
];
