import type { IBappsPage } from "@better-giving/banking-applications";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { use_paginator } from "hooks/use-paginator";
import Filter from "./filter";
import { Table } from "./table";

export default function BankingApplications() {
  const [params, setParams] = useSearchParams();
  const page1 = useLoaderData() as IBappsPage;

  const { node, loading } = use_paginator({
    table: (x) => <Table {...x} />,
    page1,
    gen_loader: (load, next) => () => {
      const copy = new URLSearchParams(params);
      if (next) copy.set("nextPageKey", next);
      load(`?${copy.toString()}`);
    },
  });

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative xl:container xl:mx-auto px-5 py-20 lg:pt-10">
      <h1 className="text-center text-3xl col-span-full max-lg:mb-4">
        Banking Applications
      </h1>

      <Filter
        params={params}
        isDisabled={loading}
        setParams={(p) => {
          const copy = new URLSearchParams();
          for (const [key, value] of Object.entries(p)) {
            copy.set(key, value.toString());
          }
          setParams(copy);
        }}
        classes="justify-self-end"
      />

      <div className="grid col-span-full overflow-x-auto">{node}</div>
    </div>
  );
}
