import { type INpoPayoutsPage, PayoutsDB } from "@better-giving/payouts";
import { Link } from "@remix-run/react";
import type { LoaderFunction } from "@vercel/remix";
import { useCachedLoaderData } from "api/cache";
import { Info } from "components/status";
import { ChevronLeft } from "lucide-react";
import { admin_checks, is_resp } from "pages/admin/utils";
import { PayoutsTable } from "../common/payouts-table";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

interface LoaderData extends INpoPayoutsPage {}

export { clientLoader } from "api/cache";
export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const payouts_db = new PayoutsDB(apes, env);
  return payouts_db.npo_payouts(adm.id.toString(), {});
};

export default function Payouts() {
  const { items } = useCachedLoaderData() as LoaderData;

  return (
    <div className="grid content-start">
      <Link
        to=".."
        className="flex items-center gap-1 text-blue-d1 hover:text-blue text-sm -ml-1 mb-3"
      >
        <ChevronLeft size={18} />
        <span>Back</span>
      </Link>
      {items.length === 0 ? (
        <Info>No payouts found</Info>
      ) : (
        <PayoutsTable records={items} disabled={false} isLoading={false} />
      )}
    </div>
  );
}
