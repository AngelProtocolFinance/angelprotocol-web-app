import { INTERCOM_HELP } from "constants/env";
import { appRoutes } from "constants/routes";
import type { Link, LinkGroup } from "./types";

type LINKS = {
  HEADER_LINKS: Link[];
  HEADER_LINKS_WITH_AUTH: Link[];
  GROUPS_DATA: LinkGroup[];
};

const HEADER_LINKS: Link[] = [
  { title: "Home", href: appRoutes.home },
  {
    title: "Marketplace",
    href: appRoutes.marketplace,
    end: true,
  },
  {
    title: "Blog",
    href: appRoutes.blog,
  },
  { title: "Register NPO", href: appRoutes.register },
  { title: "For Nonprofits", href: appRoutes.nonprofit_info },
  { title: "For Donors", href: appRoutes.donor_info },
];

export const CHARITY_LINKS: LINKS = {
  HEADER_LINKS,
  HEADER_LINKS_WITH_AUTH: [
    ...HEADER_LINKS,
    { title: "Login", href: appRoutes.signin },
    { title: "Sign up", href: appRoutes.signup },
  ],
  GROUPS_DATA: [
    // {
    //   title: "How We Can Help",
    //   links: [
    //     {
    //       text: "Nonprofits",
    //       href: appRoutes.home,
    //     },
    //     {
    //       text: "Giving Partners (CSR)",
    //       href: `${BASE_URL}/giving-partners-csr/`,
    //     },
    //   ],
    // },
    {
      title: "Resources",
      links: [
        // { text: "About us", href: `${BASE_URL}/about-better-giving/` },
        { text: "FAQs", href: INTERCOM_HELP },
        { text: "News", href: appRoutes.blog },
      ],
    },
    {
      title: "Legal",
      links: [
        {
          text: "Privacy policy",
          href: appRoutes.privacy_policy,
        },
        {
          text: "Terms of Use (Donors)",
          href: appRoutes.terms_donors,
        },
        { text: "Terms of Use (Nonprofits)", href: appRoutes.terms_nonprofits },
      ],
    },
  ],
};
