import type { IFundsPage } from "@better-giving/fundraiser";
import { funds_search } from "@better-giving/fundraiser/schema";
import { NavLink, useSearchParams } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@vercel/remix";
import { useCachedLoaderData } from "api/cache";
import { appRoutes } from "constants/routes";
import { search } from "helpers/https";
import { metas } from "helpers/seo";
import { use_paginator } from "hooks/use-paginator";
import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import type { ChangeEventHandler } from "react";
import { safeParse } from "valibot";
import { Cards } from "./cards";
import Hero from "./hero";
import hero from "./hero.webp?url";
import { get_funds } from ".server/funds";

export { clientLoader } from "api/cache";
export const loader: LoaderFunction = async ({ request }) => {
  const params = safeParse(funds_search, search(request));
  if (params.issues) {
    return { status: 400, body: params.issues[0].message };
  }
  const page = await get_funds(params.output);
  return page;
};

export const meta: MetaFunction = () =>
  metas({
    image: hero,
    title: "Fundraisers",
    description:
      "Fundraisers that Support One or Several Nonprofits. Every Donation goes where you want it to.",
  });

export { ErrorBoundary } from "components/error";
export default function Funds() {
  const page1 = useCachedLoaderData<IFundsPage>();
  const [params] = useSearchParams();
  const { node, load } = use_paginator({
    id: "funds",
    page1,
    table: (x) => <Cards {...x} />,
    classes: "mt-4",
    gen_loader: (l, next) => () => {
      const p = new URLSearchParams(params);
      if (next) p.set("page", next.toString());
      l(`?${p.toString()}`);
    },
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const n = new URLSearchParams(params);
    n.set("query", e.target.value);
    load(`?${n.toString()}`);
  };

  return (
    <div>
      <div className="py-6 bg-gradient-to-tr from-blue to-blue-d1">
        <Hero classes="grid isolate xl:container xl:mx-auto px-5" />
      </div>
      <div className="xl:container xl:mx-auto px-5 mt-8 pb-8">
        <div className="grid grid-cols-[1fr_auto] gap-x-2">
          <div className="relative">
            <Search
              size={20}
              className="ml-2 absolute top-1/2 -translate-y-1/2 left-2"
            />
            <input
              type="search"
              name="query"
              onChange={debounce(onChange, 500)}
              className="field-input text-base rounded-lg h-full pl-12"
              placeholder="Search fundraiser"
            />
          </div>
          <NavLink
            to={`${appRoutes.funds}/new`}
            className="btn btn-blue text-sm rounded-lg px-6 normal-case"
          >
            Create Fundraiser
          </NavLink>
        </div>

        {node}
      </div>
    </div>
  );
}
