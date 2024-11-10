import { getPayoutMethod } from "api/get/payout-method";
import { endowId } from "api/schema/endow-id";
import { loadAuth } from "auth";
import type { LoaderFunction } from "react-router-dom";
import { parse } from "valibot";
export { BankingApplication as Component } from "./BankingApplication";

export const loader: LoaderFunction = async ({ params }) => {
  const bankId = parse(endowId, params.id);
  const auth = await loadAuth();
  if (!auth) throw "auth is required up higher";

  return getPayoutMethod(bankId, "bg-admin", auth.idToken);
};
