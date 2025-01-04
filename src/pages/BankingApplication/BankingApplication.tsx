import { type LoaderFunction, Outlet, useLoaderData } from "@remix-run/react";
import { type BankDetails, getPayoutMethod } from "api/get/payout-method";
import { plusInt } from "api/schema/endow-id";
import { loadAuth, redirectToAuth } from "auth";
import Seo from "components/Seo";
import { parse } from "valibot";
import { Loaded } from "./Loaded";

export const clientLoader: LoaderFunction = async ({ params, request }) => {
  const bankId = parse(plusInt, params.id);
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  return getPayoutMethod(bankId, "bg-admin", auth.idToken);
};
export default function BankingApplication() {
  const bank = useLoaderData() as BankDetails;

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container py-20">
      <Seo title="Banking application review" />
      <Loaded {...bank} />
      {/** prompts: approve, reject, success */}
      <Outlet />
    </div>
  );
}
