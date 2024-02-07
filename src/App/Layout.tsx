import Loader from "components/Loader";
import Seo from "components/Seo";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { CHARITY_LINKS } from "./constants";
import useHeaderLinks from "./useHeaderLinks";

const { GROUPS_DATA, SOCIAL_MEDIA_LINKS } = CHARITY_LINKS;

export default function Layout() {
  const headerLinks = useHeaderLinks();
  return (
    <div className="grid grid-rows-[auto_1fr_auto] bg-gray">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header classes="top-0 sticky z-20" links={headerLinks} />
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
