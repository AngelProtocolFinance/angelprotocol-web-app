import Seo from "components/Seo";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { type LoaderFunction, Outlet, useLoaderData } from "react-router-dom";
import { version as v } from "services/helpers";
import type { EndowCardsPage } from "types/aws";
import ActiveFilters from "./ActiveFilters";
import Cards from "./Cards";
import Hero from "./Hero";
import Toolbar from "./Toolbar";

export const loader: LoaderFunction = async ({ request }) => {
  const source = new URL(request.url);
  const page = +(source.searchParams.get("page") ?? "1");
  const q = source.searchParams.get("query") ?? "";
  const s = new URLSearchParams(source.searchParams);
  s.set("page", page.toString());
  s.set("query", q);
  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/cloudsearch-nonprofits`;
  url.search = s.toString();

  return cacheGet(url).then((res) => res.json());
};

export function Component() {
  const page1 = useLoaderData() as EndowCardsPage;
  return (
    <div className="w-full grid content-start pb-16">
      <Seo title="Marketplace" />
      <div className="relative overlay bg-cover bg-left-top">
        <Hero classes="grid isolate mt-28 mb-16" />
      </div>

      <div className="grid gap-y-4 content-start padded-container min-h-screen">
        <Toolbar classes="mt-10" />
        <ActiveFilters />
        <Cards firstPage={page1} />
      </div>
      <Outlet />
    </div>
  );
}
