import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "./types";
import Loader from "components/Loader";
import Seo from "components/Seo";
import { AP_LOGO, BASE_DOMAIN } from "constants/common";
import { IS_AST } from "constants/env";
import { appRoutes } from "constants/routes";
import Footer from "./Footer";
import Header from "./Header";
import { GROUPS_DATA, SOCIAL_MEDIA_LINKS } from "./constants";

const HEADER_LINKS: Link[] = [
  { title: "For Non-Profits", href: BASE_DOMAIN, external: true },
  {
    title: "Marketplace",
    href: appRoutes.marketplace,
  },
  {
    title: "Giving Partners",
    href: `${BASE_DOMAIN}/giving-partners-csr/`,
    external: true,
  },
  {
    title: "About",
    href: `${BASE_DOMAIN}/about-angel-giving/`,
    external: true,
  },
  { title: "Register", href: appRoutes.register },
  // NOTE: governance will be reenabled when we relaunch the $HALO token
  // { title: "Governance", href: appRoutes.govern },
];

export default function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header classes="sticky top-0 z-20" links={HEADER_LINKS} logo={AP_LOGO} />
      <Suspense fallback={<LoaderComponent />}>
        <Outlet />
      </Suspense>
      <Footer linkGroups={GROUPS_DATA} socials={SOCIAL_MEDIA_LINKS} />
    </div>
  );
}

const LoaderComponent = () => (
  <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
);
