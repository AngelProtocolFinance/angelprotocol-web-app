import Loader from "components/Loader";
import Seo from "components/Seo";
import ErrorBoundary from "errors/ErrorBoundary";
import Footer from "pages/Home/Footer";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import useHeaderLinks from "./useHeaderLinks";

export default function Layout() {
  const headerLinks = useHeaderLinks();
  const { key } = useLocation();
  return (
    <div className="grid grid-rows-[4rem_minmax(calc(100dvh-4rem),1fr)_auto]">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header links={headerLinks} classes="sticky top-0 z-20" />
      <Suspense fallback={<LoaderComponent />}>
        <ErrorBoundary key={key} /** allows for recovery when changing page */>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
      <Footer />
    </div>
  );
}

const LoaderComponent = () => (
  <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
);
