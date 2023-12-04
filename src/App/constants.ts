import { Link, LinkGroup, SocialMediaLink } from "./types";
import { BASE_URL, DAPP_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import {
  PRIVACY_POLICY,
  TERMS_OF_USE_DONOR,
  TERMS_OF_USE_NPO,
} from "constants/urls";

type LINKS = {
  HEADER_LINKS: Link[];
  GROUPS_DATA: LinkGroup[];
  SOCIAL_MEDIA_LINKS: SocialMediaLink[];
};

export const CHARITY_LINKS: LINKS = {
  HEADER_LINKS: [
    { title: "For nonprofits", href: BASE_URL, external: true },
    {
      title: "Marketplace",
      href: appRoutes.marketplace,
      end: true,
    },
    {
      title: "Giving Partners (CSR)",
      href: `${BASE_URL}/giving-partners-csr/`,
      external: true,
    },
    {
      title: "About",
      href: `${BASE_URL}/about-better-giving/`,
      external: true,
    },
    { title: "Register", href: appRoutes.register },
  ],
  GROUPS_DATA: [
    {
      title: "How We Can Help",
      links: [
        {
          text: "nonprofits",
          href: BASE_URL,
        },
        {
          text: "Giving Partners (CSR)",
          href: `${BASE_URL}/giving-partners-csr/`,
        },
        { text: "Impact Board", href: `${DAPP_URL}/leaderboard/` },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "About us", href: `${BASE_URL}/about-better-giving/` },
        { text: "FAQs", href: "https://intercom.help/angel-protocol/en" },
        { text: "News", href: `${BASE_URL}/news/` },
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
          text: "Terms of Use (Donors)",
          href: TERMS_OF_USE_DONOR,
        },
        { text: "Terms of Use (Nonprofits)", href: TERMS_OF_USE_NPO },
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
      href: "https://twitter.com/@BetterDotGiving",
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
  ],
};
