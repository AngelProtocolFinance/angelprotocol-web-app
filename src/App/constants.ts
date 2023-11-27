import { Link, LinkGroup, SocialMediaLink } from "./types";
import { BASE_URL, DAPP_URL } from "constant/env";
import { appRoutes } from "constant/routes";
import {
  LITEPAPER,
  PRIVACY_POLICY,
  TERMS_OF_USE_DONOR,
  TERMS_OF_USE_NPO,
} from "constant/urls";

type LINKS = {
  HEADER_LINKS: Link[];
  GROUPS_DATA: LinkGroup[];
  SOCIAL_MEDIA_LINKS: SocialMediaLink[];
};

export const CHARITY_LINKS: LINKS = {
  HEADER_LINKS: [
    { title: "For Non-Profits", href: BASE_URL, external: true },
    {
      title: "Marketplace",
      href: appRoutes.marketplace,
      end: true,
    },
    {
      title: "Giving Partners",
      href: `${BASE_URL}/giving-partners-csr/`,
      external: true,
    },
    {
      title: "About",
      href: `${BASE_URL}/about-better-giving/`,
      external: true,
    },
    { title: "Register", href: appRoutes.register },
    // NOTE: governance will be reenabled when we relaunch the $HALO token
    // { title: "Governance", href: appRoutes.govern },
  ],
  GROUPS_DATA: [
    {
      title: "Products",
      links: [
        {
          text: "Non-profits",
          href: BASE_URL,
        },
        {
          text: "Giving Partners (CSR)",
          href: `${BASE_URL}/giving-partners-csr/`,
        },
        { text: "Impact Board", href: `${DAPP_URL}/leaderboard/` },
        // {
        //   text: "For Giftcards",
        //   href: "https://app.angel.giving/gift",
        // },
      ],
    },
    {
      title: "About",
      links: [
        { text: "About us", href: `${BASE_URL}/about-better-giving/` },
        {
          text: "Meet the team",
          href: `${BASE_URL}/about/#:~:text=MEET%20THE%20TEAM-`,
        },
        { text: "News", href: `${BASE_URL}/news/` },
        { text: "Careers", href: `${BASE_URL}/careers/` },
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
          href: PRIVACY_POLICY,
        },
        {
          text: "Terms of Use",
          href: TERMS_OF_USE_DONOR,
        },
        { text: "Terms for NPO", href: TERMS_OF_USE_NPO },
      ],
    },
  ],
  SOCIAL_MEDIA_LINKS: [
    {
      title: "Twitter",
      icon: {
        type: "Twitter",
        size: 24,
      },
      href: "https://twitter.com/angelgiving_",
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
      href: "https://discord.gg/angelprotocol",
    },
    {
      title: "YouTube",
      icon: {
        type: "Youtube",
        size: 24,
      },
      href: "https://www.youtube.com/@AngelGiving",
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
      href: "https://www.facebook.com/AngelgivingFB/",
    },
    {
      title: "Linkedin",
      icon: {
        type: "Linkedin",
        size: 24,
      },
      href: "https://www.linkedin.com/company/angel-giving/",
    },
    {
      title: "Instagram",
      icon: {
        type: "Instagram",
        size: 24,
      },
      href: "https://www.instagram.com/angel.giving/",
    },
  ],
};
