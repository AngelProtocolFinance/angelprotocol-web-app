import Seo from "components/Seo";
import { appRoutes } from "constants/routes";
import ErrorBoundary from "errors/ErrorBoundary";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import useHeaderLinks from "./useHeaderLinks";

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
        classes={`${isHome ? "mt-8 px-4" : ""} sticky z-40 top-[-1px]`}
      />
      <ErrorBoundary key={key} /** allows for recovery when changing page */>
        <Outlet />
      </ErrorBoundary>
      <Footer classes={isWpPost ? "override-wp-overrides" : ""} />
    </div>
  );
}
