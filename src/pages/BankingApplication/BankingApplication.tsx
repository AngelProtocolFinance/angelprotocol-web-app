import { Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@vercel/remix";
import { type BankDetails, getPayoutMethod } from "api/get/payout-method";
import { plusInt } from "api/schema/endow-id";
import { metas } from "helpers/seo";
import { parse } from "valibot";
import { Loaded } from "./Loaded";
import { cognito, redirectToAuth } from ".server/auth";

export const loader: LoaderFunction = async ({ params, request }) => {
  const bankId = parse(plusInt, params.id);
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  return getPayoutMethod(bankId, "bg-admin", user.idToken);
};
export const meta = () => metas({ title: "Banking application review" });
export { ErrorBoundary } from "components/error";
export default function BankingApplication() {
  const bank = useLoaderData() as BankDetails;

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container py-20">
      <Loaded {...bank} />
      {/** prompts: approve, reject, success */}
      <Outlet />
    </div>
  );
}
