import { Outlet, useSearchParams } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import { use_paginator } from "hooks/use-paginator";
import { use_admin_data } from "../use-admin-data";
import { Allocation } from "./allocation";
import type { LoaderData } from "./api";
import DonationsTable from "./donations-table";
export { ErrorBoundary } from "components/error";
export { loader, action } from "./api";
export { clientLoader } from "api/cache";
export default function Donations() {
  const [search] = useSearchParams();
  const page1 = useCachedLoaderData() as LoaderData;
  const { node } = use_paginator({
    Table: DonationsTable,
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
