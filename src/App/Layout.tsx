import Loader from "components/Loader";
import Seo from "components/Seo";
import { appRoutes } from "constants/routes";
import ErrorBoundary from "errors/ErrorBoundary";
import { Suspense } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { CHARITY_LINKS } from "./constants";
import useHeaderLinks from "./useHeaderLinks";

const { SOCIAL_MEDIA_LINKS } = CHARITY_LINKS;

export default function Layout() {
  const headerLinks = useHeaderLinks();
  const { key, pathname } = useLocation();
  const isWpPost = !!useMatch(`${appRoutes.blog}/:slug`);
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
        classes={`${isHome ? "mt-8 px-4" : ""} ${
          isWpPost ? "override-wp-overrides" : ""
        } sticky z-40 top-[-1px]`}
      />
      <Suspense fallback={<LoaderComponent />}>
        <ErrorBoundary key={key} /** allows for recovery when changing page */>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
      <Footer
        socials={SOCIAL_MEDIA_LINKS}
        classes={isWpPost ? "override-wp-overrides" : ""}
      />
    </div>
  );
}

const LoaderComponent = () => (
  <Loader bgColorClass="bg-blue" gapClass="gap-2" widthClass="w-4" />
);
