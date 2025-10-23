import { npos_search } from "@better-giving/endowment/schema";
import { Info } from "components/status";
import { search } from "helpers/https";
import { metas } from "helpers/seo";
import { use_paginator } from "hooks/use-paginator";
import { Outlet, useSearchParams } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { parse } from "valibot";
import type { Route } from "./+types";
import ActiveFilters from "./active-filters";
import { Cards } from "./cards";
import Hero from "./hero";
import hero from "./hero.webp?url";
import Toolbar from "./toolbar";
import { get_npos } from ".server/npos";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { published, claimed, ...p } = parse(npos_search, search(request));
  const page = await get_npos({ ...p, claimed: [true], published: [true] });
  return page;
};

export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export const meta: Route.MetaFunction = () =>
  metas({
    title: "Marketplace",
    description:
      "Find and support charities, nonprofits, universities, and faith-based organizations—all in one place.",
    image: hero,
  });

export { ErrorBoundary } from "components/error";
export default CacheRoute(Page);
function Page({ loaderData: page1 }: Route.ComponentProps) {
  const [params] = useSearchParams();
  const { node } = use_paginator({
    id: "marketplace",
    page1,
    table: (props) => <Cards {...props} />,
    empty: (x) => <Info {...x}>No organisations found</Info>,
    gen_loader: (load, next) => () => {
      const p = new URLSearchParams(params);
      if (next) p.set("page", next.toString());
      load(`?${p.toString()}`);
    },
  });
  return (
    <div className="w-full grid content-start pb-16">
      <Hero classes="grid isolate mt-8 xl:container xl:mx-auto px-5" />
      <div className="grid gap-y-4 content-start xl:container xl:mx-auto px-5 min-h-screen">
        <Toolbar classes="mt-10" />
        <ActiveFilters />
        {node}
      </div>
      <Outlet />
    </div>
  );
}
