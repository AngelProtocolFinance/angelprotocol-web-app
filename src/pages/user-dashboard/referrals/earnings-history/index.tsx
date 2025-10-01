import { Info } from "components/status";
import { use_paginator } from "hooks/use-paginator";
import { ChevronLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { EarningsHistory } from "./table";

export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export default CacheRoute(Page);
function Page({ loaderData: page1 }: Route.ComponentProps) {
  const [params] = useSearchParams();
  const { node } = use_paginator({
    page1,
    table: (props) => <EarningsHistory {...props} />,
    empty: (x) => <Info {...x}>No earnings found</Info>,
    classes: "mt-2",
    gen_loader: (load, next) => () => {
      const p = new URLSearchParams(params);
      if (next) p.set("next", next);
      load(`?${p.toString()}`);
    },
  });

  return (
    <div>
      <Link
        to="../referrals"
        className="flex items-center gap-1s text-blue-d1 hover:text-blue text-sm -ml-2 mb-2"
      >
        <ChevronLeft size={18} />
        <span>Back</span>
      </Link>
      {node}
    </div>
  );
}
