import { endowsQueryParams } from "@better-giving/endowment/cloudsearch";
import { Outlet } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@vercel/remix";
import { useCachedLoaderData } from "api/cache";
import hero from "assets/images/hero.webp?url";
import { metas } from "helpers/seo";
import type { EndowCardsPage } from "types/aws";
import { safeParse } from "valibot";
import ActiveFilters from "./active-filters";
import Cards from "./cards";
import Hero from "./hero";
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
    description: "Better Giving redefines global nonprofit financing.",
    image: hero,
  });

export { ErrorBoundary } from "components/error";
export default function Marketplace() {
  const page1 = useCachedLoaderData<EndowCardsPage>();
  return (
    <div className="w-full grid content-start pb-16">
      <div className="relative overlay bg-cover bg-left-top">
        <Hero classes="grid isolate mt-28 mb-16" />
      </div>

      <div className="grid gap-y-4 content-start xl:container xl:mx-auto px-5 min-h-screen">
        <Toolbar classes="mt-10" />
        <ActiveFilters />
        <Cards page1={page1} />
      </div>
      <Outlet />
    </div>
  );
}
