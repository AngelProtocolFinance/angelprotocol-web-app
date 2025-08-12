import { type INpoPayoutsPage, PayoutsDB } from "@better-giving/payouts";
import { Link, useSearchParams } from "@remix-run/react";
import type { LoaderFunction } from "@vercel/remix";
import { useCachedLoaderData } from "api/cache";
import { Info } from "components/status";
import { use_paginator } from "hooks/use-paginator";
import { ChevronLeft } from "lucide-react";
import { PayoutsTable } from "./common/payouts-table";
import { apes } from ".server/aws/db";
import { env } from ".server/env";
import { admin_checks, is_resp } from ".server/utils";

interface LoaderData extends INpoPayoutsPage {}

export { clientLoader } from "api/cache";
export const loader: LoaderFunction = async (x) => {
  const s = new URL(x.request.url).searchParams;
  const next = s.get("next");

  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const payouts_db = new PayoutsDB(apes, env);
  return payouts_db.npo_payouts(adm.id.toString(), {
    next: next || undefined,
    limit: 5,
  });
};

export default function Page() {
  const page1 = useCachedLoaderData() as LoaderData;
  const [search] = useSearchParams();
  const { node } = use_paginator({
    page1,
    table: (x) => <PayoutsTable {...x} />,
    empty: () => <Info>No payouts found</Info>,
    gen_loader: (load, next) => () => {
      const p = new URLSearchParams(search);
      if (next) p.set("next", next);
      load(`?${p.toString()}`);
    },
  });

  return (
    <div className="grid content-start">
      <Link
        to=".."
        className="flex items-center gap-1 text-blue-d1 hover:text-blue text-sm -ml-1 mb-3"
      >
        <ChevronLeft size={18} />
        <span>Back</span>
      </Link>
      {node}
    </div>
  );
}
