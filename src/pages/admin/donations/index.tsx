import { use_paginator } from "hooks/use-paginator";
import { Outlet, useSearchParams } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { use_admin_data } from "../use-admin-data";
import type { Route } from "./+types";
import { Allocation } from "./allocation";
import DonationsTable from "./donations-table";
export { ErrorBoundary } from "components/error";
export { loader, action } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export default CacheRoute(Page);
function Page({ loaderData: page1 }: Route.ComponentProps) {
  const [search] = useSearchParams();
  const { node } = use_paginator({
    table: (props) => <DonationsTable {...props} />,
    page1,
    gen_loader: (load, next) => () => {
      const p = new URLSearchParams(search);
      if (next) p.set("page", next);
      load(`?${p.toString()}`);
    },
  });
  const data = use_admin_data();
  return (
    <div>
      <h2 className="text-[2rem] font-bold mb-4">Donations</h2>
      <Allocation
        classes="mb-4"
        allocation={
          data?.endow.allocation || {
            liq: 100,
            cash: 0,
            lock: 0,
          }
        }
      />
      {node}
      {/** edit allocation */}
      <Outlet />
    </div>
  );
}
