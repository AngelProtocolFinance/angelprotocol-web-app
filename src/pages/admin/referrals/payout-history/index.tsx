import { Info } from "components/status";
import { use_paginator } from "hooks/use-paginator";
import { ChevronLeft } from "lucide-react";
import { Link, useLoaderData, useSearchParams } from "react-router";
import type { LoaderData } from "./api";
import { Table } from "./table";
export { loader } from "./api";

export default function Page() {
  const [params] = useSearchParams();
  const page1 = useLoaderData<LoaderData>();
  const { node } = use_paginator({
    table: (props) => <Table {...props} />,
    empty: (props) => <Info {...props}>No payouts found</Info>,
    page1,
    classes: "mt-2",
    gen_loader: (load, next) => () => {
      const p = new URLSearchParams(params);
      if (next) p.set("nextKey", next);
      load(`?${p.toString()}`);
    },
  });

  return (
    <div>
      <Link
        to="../referrals"
        className="flex items-center gap-1s text-blue-d1 hover:text-blue text-sm -ml-2 mb-2"
      >
        <ChevronLeft size={18} />
        <span>Back</span>
      </Link>
      {node}
    </div>
  );
}
