import { endowId } from "api/schema/endow-id";
import { loadAuth } from "auth/load-auth";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import type { LoaderFunction } from "react-router-dom";
import { version as ver } from "services/helpers";
import type { BankingApplication, V2RecipientAccount } from "types/aws";
import * as v from "valibot";

export { default } from "./Loaded";

export interface BankDetails extends V2RecipientAccount, BankingApplication {}

export const payoutMethodLoader: LoaderFunction = async ({ params }) => {
  const id = v.parse(endowId, params.id);
  const bankId = v.parse(endowId, params.bankId);
  const auth = await loadAuth();
  if (!auth) throw "auth is required up higher";

  const bank = new URL(APIs.aws);
  bank.pathname = `${ver(1)}/banking-applications/${bankId}`;
  bank.searchParams.set("requestor", "endowment");
  bank.searchParams.set("endowmentID", id.toString());
  const bankReq = new Request(bank);
  bankReq.headers.set("authorization", auth.idToken);

  const wise = new URL(APIs.aws);
  wise.pathname = `${ver(1)}/wise-proxy/v2/accounts/${bankId}`;
  const wiseReq = new Request(wise);
  wiseReq.headers.set("authorization", auth.idToken);

  return Promise.all([
    cacheGet(bankReq).then((res) => res.json()),
    cacheGet(wiseReq).then((res) => res.json()),
  ]).then<BankDetails>(([a, b]) => ({ ...a, ...b }));
};
