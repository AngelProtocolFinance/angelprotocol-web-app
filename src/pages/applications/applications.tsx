import type {
  ApplicationItem,
  Page,
} from "@better-giving/registration/approval";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { use_paginator } from "hooks/use-paginator";
import { Search } from "lucide-react";
import { useState } from "react";
import { Filter } from "./filter";
import { Table } from "./table";

export default function Applications() {
  const [params] = useSearchParams();
  const page1 = useLoaderData() as Page;
  const [query, setQuery] = useState("");
  const { node, loading } = use_paginator<ApplicationItem>({
    table: ({ items, ...props }) => (
      <Table
        items={items.filter(
          (item) =>
            item.org_name.toLowerCase().includes(query.toLowerCase()) ||
            item.id.toLowerCase().includes(query.toLowerCase())
        )}
        {...props}
        loading={loading}
      />
    ),
    page1: { items: page1.items, next: page1.nextPageKey },
    gen_loader: (load, next) => () => {
      const copy = new URLSearchParams(params);
      if (next) copy.set("nextPageKey", next);
      load(`?${copy.toString()}`);
    },
  });

  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative xl:container xl:mx-auto px-5 py-20">
      <h1 className="text-center text-3xl col-span-full max-lg:mb-4">
        Applications Review - Dashboard
      </h1>
      <div className="relative flex gap-x-3 items-center border border-gray-l3 w-full bg-white dark:bg-blue-d6 rounded-sm">
        <Search
          size={22}
          className="text-gray-d4 dark:text-gray absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          disabled={loading}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 pl-10 placeholder:text-gray dark:placeholder:text-gray bg-transparent w-full outline-hidden disabled:bg-gray-l3 dark:disabled:bg-gray-d3"
          type="text"
          placeholder="Search applications"
        />
      </div>
      <Filter
        isDisabled={loading}
        classes="max-lg:col-span-full max-lg:w-full"
      />

      <div className="grid col-span-full overflow-x-auto">{node}</div>
    </div>
  );
}
