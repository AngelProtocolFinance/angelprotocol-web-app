import { LinkGroup, SocialMediaLink } from "./types";
import { LITEPAPER } from "constants/urls";

export const SOCIAL_MEDIA_LINKS: SocialMediaLink[] = [
  {
    title: "Twitter",
    icon: {
      type: "Twitter",
      size: 24,
    },
    href: "https://twitter.com/angelprotocol",
  },
  {
    title: "Telegram",
    icon: {
      type: "Telegram",
      size: 24,
    },
    href: "https://t.me/angelprotocoI",
  },
  {
    title: "Discord",
    icon: {
      type: "Discord",
      size: 24,
    },
    href: "https://discord.gg/RhqA652ySA",
  },
  {
    title: "YouTube",
    icon: {
      type: "Youtube",
      size: 24,
    },
    href: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
  },
  {
    title: "Medium",
    icon: {
      type: "Medium",
      size: 24,
    },
    href: "https://angelprotocol.medium.com",
  },
  {
    title: "Facebook",
    icon: {
      type: "FacebookCircle",
      size: 24,
    },
    href: "https://www.facebook.com/AngelProtocolFB/",
  },
  {
    title: "Linkedin",
    icon: {
      type: "Linkedin",
      size: 24,
    },
    href: "https://www.linkedin.com/company/angel-protocol/",
  },
  {
    title: "Instagram",
    icon: {
      type: "Instagram",
      size: 24,
    },
    href: "https://www.instagram.com/angelprotocol/",
  },
];

export const GROUPS_DATA: LinkGroup[] = [
  {
    title: "Products",
    links: [
      {
        text: "For Non-profit orgs.",
        href: "https://angel.giving/non-profit-organizations/",
      },
      { text: "For Donors", href: "https://angel.giving/donors/" },
      {
        text: "For Changemakers",
        href: "https://angel.giving/changemakers/",
      },
      { text: "For Investors", href: "https://angelprotocol.io/investors/" },
      {
        text: "For CSR Partners",
        href: "https://angel.giving/csr-partners/",
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
      { text: "About us", href: "https://angel.giving/about/" },
      {
        text: "Meet the team",
        href: "https://angel.giving/about/#:~:text=MEET%20THE%20TEAM-,Operations,-DUFFY%20CASEY",
      },
      { text: "News", href: "https://angel.giving/news/" },
      { text: "Stories", href: "https://angel.giving/stories/" },
      { text: "Careers", href: "https://angel.giving/careers/" },
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
        href: "https://angel.giving/privacy-policy/",
      },
      {
        text: "Terms of Use",
        href: "https://angel.giving/terms-of-use/",
      },
    ],
  },
];
