import { IconTypes } from "components/Icon";
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
  [index in SocialMedia]: { iconType: IconTypes; link: string };
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
        href: "https://angelprotocol.io/non-profit-organizations/",
      },
      { text: "For Donors", href: "https://angelprotocol.io/donors/" },
      {
        text: "For Changemakers",
        href: "https://angelprotocol.io/changemakers/",
      },
      { text: "For Investors", href: "https://angelprotocol.io/investors/" },
      {
        text: "For CSR Partners",
        href: "https://angelprotocol.io/csr-partners/",
      },
      {
        text: "For Giftcards",
        href: "https://app.angelprotocol.io/gift",
      },
    ],
  },
  {
    title: "About",
    links: [
      { text: "About us", href: "https://angelprotocol.io/about/" },
      {
        text: "Meet the team",
        href: "https://angelprotocol.io/about/#:~:text=MEET%20THE%20TEAM-,Operations,-DUFFY%20CASEY",
      },
      { text: "News", href: "https://angelprotocol.io/news/" },
      { text: "Stories", href: "https://angelprotocol.io/stories/" },
      { text: "Careers", href: "https://angelprotocol.io/careers/" },
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
        href: "https://angelprotocol.io/privacy-policy/",
      },
      {
        text: "Terms of Use",
        href: "https://angelprotocol.io/terms-of-use/",
      },
    ],
  },
];
