import { Info } from "components/status";
import { search } from "helpers/https";
import { use_paginator } from "hooks/use-paginator";
import { ChevronLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types/payouts";
import { PayoutsTable } from "./common/payouts-table";
import { podb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export const loader = async (x: Route.LoaderArgs) => {
  const { next } = search(x.request);

  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  return podb.npo_payouts(adm.id.toString(), {
    next,
    limit: 5,
  });
};
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export default CacheRoute(Page);
function Page({ loaderData: page1 }: Route.ComponentProps) {
  const [search] = useSearchParams();
  const { node } = use_paginator({
    page1,
    table: (x) => <PayoutsTable {...x} />,
    empty: () => <Info>No payouts found</Info>,
    gen_loader: (load, next) => () => {
      const p = new URLSearchParams(search);
      if (next) p.set("next", next);
      load(`?${p.toString()}`);
    },
  });

  return (
    <div className="grid content-start px-6 py-4 md:px-10 md:py-8">
      <Link
        to=".."
        className="flex items-center gap-1 text-blue-d1 hover:text-blue text-sm -ml-1 mb-3"
      >
        <ChevronLeft size={18} />
        <span>Back</span>
      </Link>
      {node}
    </div>
  );
}
