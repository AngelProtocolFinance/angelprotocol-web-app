import { LOGO_DARK } from "constant/common";
import { IS_AST } from "constant/env";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "components/Loader";
import Seo from "components/Seo";
import Footer from "./Footer";
import Header from "./Header";
import { AST_LINKS, CHARITY_LINKS } from "./constants";

const { HEADER_LINKS, GROUPS_DATA, SOCIAL_MEDIA_LINKS } = IS_AST
  ? AST_LINKS
  : CHARITY_LINKS;

export default function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header
        classes="sticky top-0 z-20"
        links={HEADER_LINKS}
        logo={LOGO_DARK}
      />
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
