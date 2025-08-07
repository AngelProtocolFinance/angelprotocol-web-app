import type { IBalanceTxsPage, TStatus } from "@better-giving/balance-txs";
import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { Select } from "components/selector";
import { use_paginator } from "hooks/use-paginator";
import { Table } from "./table";
export { loader } from "./api";

export default function Page() {
  const page1 = useLoaderData<IBalanceTxsPage>();
  const [search, set_search] = useSearchParams();
  const status = (search.get("status") ?? "pending") as TStatus;
  const node = use_paginator({
    page1,
    Table,
    classes: "mt-4",
    gen_loader: (load, next) => () => {
      const p = new URLSearchParams(search);
      p.set("next", next);
      load(`?${p.toString()}`);
    },
  });
  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <div className="flex items-center gap-x-4 mb-4">
        <h3 className="font-bold text-2xl">Tx Requests</h3>
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
