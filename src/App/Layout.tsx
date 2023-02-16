import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "./types";
import angelProtocolLogo from "assets/images/angelprotocol-beta-horiz-wht.svg";
import { LogoProps } from "components/APLogo";
import Loader from "components/Loader";
import Seo from "components/Seo";
import { appRoutes } from "constants/routes";
import Footer from "./Footer";
import Header from "./Header";
import { GROUPS_DATA } from "./constants";
import { SOCIAL_MEDIA_LINKS } from "./constants";

const HEADER_LINKS: Link[] = [
  { title: "Marketplace", href: appRoutes.index },
  { title: "Leaderboard", href: appRoutes.leaderboard },
  { title: "Register", href: appRoutes.register },
  // NOTE: governance will be reenabled when we relaunch the $HALO token
  // { title: "Governance", href: appRoutes.govern },
];

const LOGO: LogoProps = {
  href: "https://angelprotocol.io/",
  src: angelProtocolLogo,
  title: "Go to Marketing page",
};

export default function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header classes="sticky top-0 z-20" links={HEADER_LINKS} logo={LOGO} />
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
