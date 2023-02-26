import Loader from "@giving/components/Loader";
import Seo from "@giving/components/Seo";
import { LOGO } from "@giving/constants/common";
import { appRoutes } from "@giving/constants/routes";
import Footer from "layouts/footer";
import Header from "layouts/header";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "layouts/types";

const HEADER_LINKS: Link[] = [
  { title: "Marketplace", href: appRoutes.index },
  { title: "Leaderboard", href: appRoutes.leaderboard },
  { title: "Register", href: appRoutes.register },
  // NOTE: governance will be reenabled when we relaunch the $HALO token
  // { title: "Governance", href: appRoutes.govern },
];

export default function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header classes="sticky top-0 z-20" links={HEADER_LINKS} logo={LOGO} />
      <Suspense fallback={<LoaderComponent />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

const LoaderComponent = () => (
  <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
);
