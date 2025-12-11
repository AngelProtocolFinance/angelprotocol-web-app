import { Select } from "components/selector";
import { use_paginator } from "hooks/use-paginator";
import type { TStatus } from "lib/balance-txs";
import { Outlet, useSearchParams } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { Table } from "./table";

export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export default CacheRoute(Page);
function Page({ loaderData: page1 }: Route.ComponentProps) {
  const [search, set_search] = useSearchParams();
  const status = (search.get("status") ?? "pending") as TStatus;
  const { node } = use_paginator({
    page1,
    table: (props) => <Table {...props} />,
    classes: "mt-4",
    gen_loader: (load, next) => () => {
      const p = new URLSearchParams(search);
      p.set("next", next);
      load(`?${p.toString()}`);
    },
  });
  return (
    <div className="px-6 py-4 md:px-10 md:py-8 w-full max-w-4xl grid content-start">
      <div className="flex items-center gap-x-4 mb-4">
        <h3 className="font-bold text-2xl">Redemption Requests</h3>
        <Select
          options={["pending", "final", "cancelled"]}
          onChange={(x) =>
            set_search((p) => {
              p.set("status", x);
              return p;
            })
          }
          value={status}
          option_disp={(x) => x}
          classes={{ button: "px-4 py-0", option: "text-sm" }}
        />
      </div>
      {node}
      <Outlet />
    </div>
  );
}
