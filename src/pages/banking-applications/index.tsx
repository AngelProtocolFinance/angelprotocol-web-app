import { metas } from "helpers/seo";
import { use_paginator } from "hooks/use-paginator";
import { useSearchParams } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import Filter from "./filter";
import { Table } from "./table";

export { ErrorBoundary } from "components/error";
export { loader } from "./api";
export const clientLaoder = createClientLoaderCache<Route.ClientLoaderArgs>();
export const meta = () => metas({ title: "Banking Applications" });

export default CacheRoute(Page);
function Page({ loaderData: page1 }: Route.ComponentProps) {
  const [params, setParams] = useSearchParams();

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
