import { BASE_URL, DAPP_URL, INTERCOM_HELP } from "constants/env";
import { appRoutes, wpRoutes } from "constants/routes";
import {
  PRIVACY_POLICY,
  TERMS_OF_USE_DONOR,
  TERMS_OF_USE_NPO,
} from "constants/urls";
import { Link, LinkGroup, SocialMediaLink } from "./types";

type LINKS = {
  HEADER_LINKS: Link[];
  HEADER_LINKS_WITH_AUTH: Link[];
  GROUPS_DATA: LinkGroup[];
  SOCIAL_MEDIA_LINKS: SocialMediaLink[];
};

const HEADER_LINKS: Link[] = [
  { title: "For Nonprofits", href: BASE_URL, external: true },
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
      title: "Blog",
      href: wpRoutes.blog,
  },
  {
    title: "About",
    href: `${BASE_URL}/better-giving-about/`,
    external: true,
  },
  { title: "Register NPO", href: appRoutes.register },
];

export const CHARITY_LINKS: LINKS = {
  HEADER_LINKS,
  HEADER_LINKS_WITH_AUTH: [
    ...HEADER_LINKS,
    { title: "Login", href: appRoutes.signin },
    { title: "Sign up", href: appRoutes.signup },
  ],
  GROUPS_DATA: [
    {
      title: "How We Can Help",
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
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "About us", href: `${BASE_URL}/about-better-giving/` },
        { text: "FAQs", href: INTERCOM_HELP },
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
      href: "https://twitter.com/BetterDotGiving",
    },
    {
      title: "Discord",
      icon: {
        type: "Discord",
        size: 24,
      },
      href: "https://discord.gg/kPjCcJCXX7",
    },
    {
      title: "YouTube",
      icon: {
        type: "Youtube",
        size: 24,
      },
      href: "https://www.youtube.com/@bettergiving",
    },
    {
      title: "Facebook",
      icon: {
        type: "FacebookCircle",
        size: 21,
      },
      href: "https://www.facebook.com/BetterGivingFB/",
    },
    {
      title: "Linkedin",
      icon: {
        type: "Linkedin",
        size: 20,
      },
      href: "https://www.linkedin.com/company/better-giving/",
    },
  ],
};
