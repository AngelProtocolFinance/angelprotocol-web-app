import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ExtLink from "components/ExtLink";
import Loader from "components/Loader";
import Seo from "components/Seo";
import { LOGO_DARK } from "constant/common";
import { IS_AST } from "constant/env";
import Footer from "./Footer";
import Header from "./Header";
import { AST_LINKS, CHARITY_LINKS } from "./constants";

const { HEADER_LINKS, GROUPS_DATA, SOCIAL_MEDIA_LINKS } = IS_AST
  ? AST_LINKS
  : CHARITY_LINKS;

export default function Layout() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto]">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <div className="text-center dark:bg-blue bg-blue-d3">
        <span className="md:text-sm md:uppercase text-white">
          Looking for the old site? It has moved to{" "}
          <ExtLink
            key="banner-link-legacy"
            className="transition ease-in-out duration-300 hover:text-orange-l1"
            href="https://legacy.angelgiving.io"
          >
            https://legacy.angelgiving.io
          </ExtLink>{" "}
          and will be sunset on Oct 13, 2023. Migrate to Polygon today!
        </span>
      </div>
      <Header
        classes="top-0 sticky z-20"
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
