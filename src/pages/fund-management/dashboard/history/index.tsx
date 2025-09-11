import { use_paginator } from "hooks/use-paginator";
import { ChevronLeftIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { HistoryTable } from "../history-table";
import type { Route } from "./+types";

export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export default CacheRoute(Page);
function Page({ loaderData: page1 }: Route.ComponentProps) {
  const [search] = useSearchParams();
  const { node } = use_paginator({
    table: (x) => <HistoryTable {...x} />,
    page1,
    classes: "mt-4",
    gen_loader: (load, next) => () => {
      const p = new URLSearchParams(search);
      if (next) p.set("next", next);
      load(`?${p.toString()}`);
    },
  });

  return (
    <div>
      <Link
        to={".."}
        className="flex items-center gap-1 mb-4 text-blue hover:text-blue-l1 text-sm"
      >
        <ChevronLeftIcon size={18} />
        <span>Back</span>
      </Link>
      {node}
    </div>
  );
}
