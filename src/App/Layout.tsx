import Footer from "components/Footer";
import Seo from "components/Seo";
import { appRoutes } from "constants/routes";
import ErrorBoundary from "errors/ErrorBoundary";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const { key } = useLocation();
  const isWpPost = !!useMatch(`${appRoutes.blog}/:slug`);
  return (
    <div className={`grid grid-rows-[4rem_minmax(calc(100dvh-4rem),1fr)_auto]`}>
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header classes="sticky z-40 top-[-1px]" />
      <ErrorBoundary key={key} /** allows for recovery when changing page */>
        <Outlet />
      </ErrorBoundary>
      <Footer classes={isWpPost ? "override-wp-overrides" : ""} />
    </div>
  );
}
