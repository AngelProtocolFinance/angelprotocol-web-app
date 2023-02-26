import { BASE_DOMAIN } from "@giving/constants/common";
import { LITEPAPER } from "@giving/constants/urls";
import { LinkGroup, SocialMediaLink } from "layouts/types";

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
