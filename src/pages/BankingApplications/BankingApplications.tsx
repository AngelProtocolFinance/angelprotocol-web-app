import Seo from "components/Seo";
import { Info } from "components/Status";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useSearchParams } from "react-router";
import type { BankingApplicationsPage } from "types/aws";
import Filter from "./Filter";
import Table from "./Table";

export function BankingApplications() {
  const [params, setParams] = useSearchParams();
  const firstPage = useLoaderData() as BankingApplicationsPage;
  const { load, data, state } = useFetcher<BankingApplicationsPage>({
    key: params.toString(),
  });
  const [items, setItems] = useState(firstPage.items);

  useEffect(() => {
    if (state === "loading" || !data) return;
    setItems((prev) => [...prev, ...data.items]);
  }, [data, state]);

  const nextPage = data ? data.nextPageKey : firstPage.nextPageKey;

  function loadNextPage(key: string) {
    const copy = new URLSearchParams(params);
    copy.set("nextPageKey", key);
    load(`?index&${copy.toString()}`);
  }

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container py-20 lg:pt-10">
      <Seo title="Banking applications" />
      <h1 className="text-center text-3xl col-span-full max-lg:mb-4">
        Banking Applications
      </h1>

      <Filter
        params={params}
        isDisabled={state === "loading"}
        setParams={(p) => {
          const copy = new URLSearchParams();
          for (const [key, value] of Object.entries(p)) {
            copy.set(key, value.toString());
          }
          setParams(copy);
        }}
        classes="justify-self-end"
      />

      <div className="grid col-span-full overflow-x-auto">
        {items.length > 0 ? (
          <Table
            applications={items}
            nextPageKey={nextPage}
            onLoadMore={loadNextPage}
            disabled={state === "loading"}
            isLoading={state === "loading"}
          />
        ) : (
          <Info classes="pt-4 border-t border-gray-l4">
            No applications found
          </Info>
        )}
      </div>
    </div>
  );
}
