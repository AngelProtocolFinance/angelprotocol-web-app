import { IconType } from "components/Icon";
import { BASE_DOMAIN } from "constants/common";
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
    link: "https://twitter.com/angelprotocol",
  },
  Telegram: {
    iconType: "Telegram",
    link: "https://t.me/angelprotocoI",
  },
  Discord: {
    iconType: "Discord",
    link: "https://discord.gg/RhqA652ySA",
  },
  YouTube: {
    iconType: "Youtube",
    link: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
  },
  Medium: {
    iconType: "Medium",
    link: "https://angelprotocol.medium.com",
  },
  Facebook: {
    iconType: "FacebookCircle",
    link: "https://www.facebook.com/AngelProtocolFB/",
  },
  Linkedin: {
    iconType: "Linkedin",
    link: "https://www.linkedin.com/company/angel-protocol/",
  },
  Instagram: {
    iconType: "Instagram",
    link: "https://www.instagram.com/angelprotocol/",
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
        text: "For Non-profit orgs.",
        href: `${BASE_DOMAIN}/non-profit-organizations/`,
      },
      { text: "For Donors", href: `${BASE_DOMAIN}/donors/` },
      {
        text: "For Changemakers",
        href: `${BASE_DOMAIN}/changemakers/`,
      },
      { text: "For Investors", href: `${BASE_DOMAIN}/investors/` },
      {
        text: "For CSR Partners",
        href: `${BASE_DOMAIN}/csr-partners/`,
      },
      // {
      //   text: "For Giftcards",
      //   href: "https://app.angel.giving/gift",
      // },
    ],
  },
  {
    title: "About",
    links: [
      { text: "About us", href: `${BASE_DOMAIN}/about/` },
      {
        text: "Meet the team",
        href: `${BASE_DOMAIN}/about/#:~:text=MEET%20THE%20TEAM-,Operations,-DUFFY%20CASEY`,
      },
      { text: "News", href: `${BASE_DOMAIN}/news/` },
      { text: "Stories", href: `${BASE_DOMAIN}/stories/` },
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
    ],
  },
];
