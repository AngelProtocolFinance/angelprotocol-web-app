import type { IPage } from "@better-giving/banking-applications";
import { Info } from "components/status";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useSearchParams } from "react-router";
import Filter from "./filter";
import Table from "./table";

export default function BankingApplications() {
  const [params, setParams] = useSearchParams();
  const page1 = useLoaderData() as IPage;
  const { load, data, state } = useFetcher<IPage>({
    key: params.toString(),
  });
  const [items, setItems] = useState(page1.items);

  useEffect(() => {
    setItems(page1.items);
  }, [page1.items]);

  useEffect(() => {
    if (state === "loading" || !data) return;
    setItems((prev) => [...prev, ...data.items]);
  }, [data, state]);

  const nextPage = data ? data.next_key : page1.next_key;

  function loadNextPage(key: string) {
    const copy = new URLSearchParams(params);
    copy.set("nextPageKey", key);
    load(`?${copy.toString()}`);
  }

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative xl:container xl:mx-auto px-5 py-20 lg:pt-10">
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
          <Info classes="pt-4 border-t border-gray-l3">
            No applications found
          </Info>
        )}
      </div>
    </div>
  );
}
