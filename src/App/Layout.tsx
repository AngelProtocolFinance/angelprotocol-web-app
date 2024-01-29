import Loader from "components/Loader";
import Seo from "components/Seo";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { CHARITY_LINKS } from "./constants";

const { HEADER_LINKS, GROUPS_DATA, SOCIAL_MEDIA_LINKS } = CHARITY_LINKS;

export default function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header classes="top-0 sticky z-20" links={HEADER_LINKS} />
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
