import type { ILog, IPage } from "@better-giving/nav-history";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { use_paginator } from "hooks/use-paginator";
import { ChevronLeftIcon } from "lucide-react";
import { HistoryTable } from "../history-table";
export { loader } from "./api";

export default function Page() {
  const [search] = useSearchParams();
  const page1 = useLoaderData() as IPage<ILog>;
  const { node } = use_paginator({
    Table: HistoryTable,
    page1,
    classes: "mt-4",
    gen_loader: (load, next) => () => {
      const p = new URLSearchParams(search);
      if (next) p.set("next", next);
      load(`?${p.toString()}`);
    },
  });

  return (
    <div>
      <Link
        to={".."}
        className="flex items-center gap-1 mb-4 text-blue hover:text-blue-l1 text-sm"
      >
        <ChevronLeftIcon size={18} />
        <span>Back</span>
      </Link>
      {node}
    </div>
  );
}
