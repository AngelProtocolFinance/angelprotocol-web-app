import { Suspense } from "react";
import { Location, Outlet } from "react-router-dom";
import ErrorBoundary from "components/ErrorBoundary";
import Loader from "components/Loader";
import Seo from "components/Seo";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ key }: Pick<Location, "key">) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header classes="sticky top-0 z-20" />
      <Suspense fallback={<LoaderComponent />}>
        <ErrorBoundary
          key={key}
          classes="place-self-center py-32 h-full bg-blue-l4 dark:bg-transparent w-full"
        >
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
