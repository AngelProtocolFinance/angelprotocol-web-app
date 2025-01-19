import { endowsQueryParams } from "@better-giving/endowment/cloudsearch";
import { Outlet, useLoaderData } from "@remix-run/react";
import { type LoaderFunction, type MetaFunction, data } from "@vercel/remix";
import hero from "assets/images/hero.webp?url";
import { metas } from "helpers/seo";
import type { EndowCardsPage } from "types/aws";
import { safeParse } from "valibot";
import ActiveFilters from "./ActiveFilters";
import Cards from "./Cards";
import Hero from "./Hero";
import Toolbar from "./Toolbar";
import { cacheControl, getNpos } from ".server/get-npos";

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
  return data(page, {
    headers: { "Cache-Control": cacheControl },
  });
};

export const meta: MetaFunction = () =>
  metas({
    title: "Marketplace",
    description: "Better Giving redefines global nonprofit financing.",
    image: hero,
  });

export default function Marketplace() {
  const page1 = useLoaderData<EndowCardsPage>();
  return (
    <div className="w-full grid content-start pb-16">
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
