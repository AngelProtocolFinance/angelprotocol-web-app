import { endowsQueryParams } from "@better-giving/endowment/cloudsearch";
import { Outlet, useSearchParams } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@vercel/remix";
import { useCachedLoaderData } from "api/cache";
import { Info } from "components/status";
import { metas } from "helpers/seo";
import { use_paginator } from "hooks/use-paginator";
import type { EndowCardsPage } from "types/npo";
import { safeParse } from "valibot";
import ActiveFilters from "./active-filters";
import { Cards } from "./cards";
import Hero from "./hero";
import hero from "./hero.webp?url";
import Toolbar from "./toolbar";
import { getNpos } from ".server/npos";

export { clientLoader } from "api/cache";
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const params = safeParse(
    endowsQueryParams,
    Object.fromEntries(url.searchParams)
  );

  if (params.issues) {
    return { status: 400, body: params.issues[0].message };
  }

  const page = await getNpos(params.output);
  return page;
};

export const meta: MetaFunction = () =>
  metas({
    title: "Marketplace",
    description:
      "Find and support charities, nonprofits, universities, and faith-based organizations—all in one place.",
    image: hero,
  });

export { ErrorBoundary } from "components/error";
export default function Marketplace() {
  const [params] = useSearchParams();
  const { items, numPages, page } = useCachedLoaderData() as EndowCardsPage;
  const { node } = use_paginator({
    id: "marketplace",
    page1: { items, page, num_pages: numPages },
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
