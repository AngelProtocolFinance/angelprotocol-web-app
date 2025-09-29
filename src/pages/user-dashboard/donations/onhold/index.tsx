import type { TOnHoldStatus } from "@better-giving/donation";
import { use_paginator } from "hooks/use-paginator";
import { useState } from "react";
import { Outlet, useSearchParams } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { NoDonations } from "../no-donations";
import type { Route } from "./+types";
import { Table } from "./table";

export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export { ErrorBoundary } from "components/error";

export default CacheRoute(Donations);
function Donations({ loaderData }: Route.ComponentProps) {
  const [params] = useSearchParams();
  const status = (params.get("status") ?? "final") as TOnHoldStatus;
  const { user, ...page1 } = loaderData;
  const { node } = use_paginator({
    table: (props) => <Table {...props} />,
    classes: "mt-2",
    empty: ({ classes }) => (
      <NoDonations
        classes={`${classes} place-self-center col-span-full`}
        status={status}
      />
    ),
    page1,
    gen_loader: (load, next) => () => {
      const copy = new URLSearchParams(params);
      if (next) copy.set("page", next.toString());
      load(`?${copy.toString()}`);
    },
  });

  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 @5xl:gap-y-8 @5xl:gap-x-3 relative">
      <h1 className="text-3xl text-center @5xl:text-left col-span-full @5xl:col-span-1 mb-4 @5xl:mb-0">
        My Donations
      </h1>
      {node}
    </div>
  );
}
