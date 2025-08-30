import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { Info } from "components/status";
import { use_paginator } from "hooks/use-paginator";
import { ChevronLeft } from "lucide-react";
import type { LoaderData } from "./api";
import { EarningsHistory } from "./table";
export { loader } from "./api";

export default function Page() {
  const [params] = useSearchParams();
  const page1 = useLoaderData<LoaderData>();
  const { node } = use_paginator({
    classes: "mt-2",
    table: (x) => <EarningsHistory {...x} />,
    empty: (x) => <Info {...x}>No items found</Info>,
    page1,
    gen_loader: (load, next) => () => {
      const n = new URLSearchParams(params);
      if (next) n.set("nextKey", next.toString());
      load(`?${n.toString()}`);
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
