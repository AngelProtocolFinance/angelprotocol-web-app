import { Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import hero from "assets/images/hero.png?url";
import { metas } from "helpers/seo";
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

  return ap
    .get(`${ver(1)}/cloudsearch-nonprofits`, {
      searchParams: s,
    })
    .json();
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
