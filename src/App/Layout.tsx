import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "components/Loader";
import Seo from "components/Seo";
import Footer from "./Footer";
import Header from "./Header";
import { GROUPS_DATA } from "./constants";
import { SOCIAL_MEDIA_LINKS } from "./constants";

export default function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header classes="sticky top-0 z-20" />
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
