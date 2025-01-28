import type { Page } from "@better-giving/registration/approval";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Filter from "./filter";
import Table from "./table";

export default function Applications() {
  const [params] = useSearchParams();
  const page1 = useLoaderData<Page>();
  const { load, data, state } = useFetcher<Page>({
    key: "applications",
  });
  const [items, setItems] = useState(page1.items);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setItems(page1.items);
  }, [page1.items]);

  useEffect(() => {
    if (state === "loading" || !data) return;
    setItems((prev) => [...prev, ...data.items]);
  }, [data, state]);

  const nextPage = data ? data.nextPageKey : page1.nextPageKey;

  function loadNextPage(key: string) {
    const copy = new URLSearchParams(params);
    copy.set("nextPageKey", key);
    load(`?${copy.toString()}`);
  }

  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative xl:container xl:mx-auto px-5 py-20">
      <h1 className="text-center text-3xl col-span-full max-lg:mb-4">
        Applications Review - Dashboard
      </h1>
      <div className="relative flex gap-x-3 items-center border border-gray-l4 w-full bg-white dark:bg-blue-d6 rounded-sm">
        <Search
          size={22}
          className="text-navy-d4 dark:text-navy-l2 absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          disabled={state === "loading"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 pl-10 placeholder:text-navy-l1 dark:placeholder:text-navy-l2 bg-transparent w-full outline-hidden disabled:bg-gray-l3 dark:disabled:bg-navy-d3"
          type="text"
          placeholder="Search applications"
        />
      </div>
      <Filter
        isDisabled={state === "loading"}
        classes="max-lg:col-span-full max-lg:w-full"
      />

      <div className="grid col-span-full overflow-x-auto">
        <Table
          applications={
            items.filter(({ org_name, id }) =>
              (org_name + id).toLowerCase().includes(query.toLowerCase())
            ) as any
          }
          nextPageKey={nextPage}
          loadMore={loadNextPage}
          disabled={state === "loading"}
          isLoading={state === "loading"}
        />
      </div>
    </div>
  );
}
