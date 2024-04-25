import Loader from "components/Loader";
import Seo from "components/Seo";
import { appRoutes } from "constants/routes";
import ErrorBoundary from "errors/ErrorBoundary";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/FooterV2";
import Header from "./Header";
import { CHARITY_LINKS } from "./constants";
import useHeaderLinks from "./useHeaderLinks";

const { SOCIAL_MEDIA_LINKS } = CHARITY_LINKS;

export default function Layout() {
  const headerLinks = useHeaderLinks();
  const { key, pathname } = useLocation();
  const isHome = pathname === appRoutes.home;
  return (
    <div
      className={`grid ${
        isHome ? "" : "grid-rows-[4rem_minmax(calc(100dvh-4rem),1fr)_auto]"
      }`}
    >
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header
        links={headerLinks}
        classes={`${isHome ? "mt-8" : ""} sticky z-[999] top-[-1px]`}
      />
      <Suspense fallback={<LoaderComponent />}>
        <ErrorBoundary key={key} /** allows for recovery when changing page */>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
      <Footer socials={SOCIAL_MEDIA_LINKS} />
    </div>
  );
}

const LoaderComponent = () => (
  <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
);
