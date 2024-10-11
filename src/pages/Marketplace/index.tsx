import Seo from "components/Seo";
import { Outlet } from "react-router-dom";
import ActiveFilters from "./ActiveFilters";
import Cards from "./Cards";
import Hero from "./Hero";
import Toolbar from "./Toolbar";

export function Component() {
  return (
    <div className="w-full grid content-start pb-16">
      <Seo title="Marketplace" />
      <div className="relative overlay bg-cover bg-left-top">
        <Hero classes="grid isolate mt-28 mb-16" />
      </div>

      <div className="grid gap-y-4 content-start padded-container min-h-screen">
        <Toolbar classes="mt-10" />
        <ActiveFilters />
        <Cards />
      </div>
      <Outlet />
    </div>
  );
}
