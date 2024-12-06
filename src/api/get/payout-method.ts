import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { version as ver } from "services/helpers";
import type { BankingApplication, V2RecipientAccount } from "types/aws";

export interface BankDetails extends V2RecipientAccount, BankingApplication {}

export async function getPayoutMethod(
  id: number,
  requestor: "bg-admin" | number,
  idToken: string
): Promise<BankDetails> {
  const bank = new URL(APIs.aws);
  bank.pathname = `${ver(1)}/banking-applications/${id}`;
  bank.searchParams.set(
    "requestor",
    typeof requestor === "number" ? "endowment" : requestor
  );
  if (typeof requestor === "number") {
    bank.searchParams.set("endowmentID", requestor.toString());
  }
  const bankReq = new Request(bank);
  bankReq.headers.set("authorization", idToken);

  const wise = new URL(APIs.aws);
  wise.pathname = `${ver(1)}/wise-proxy/v2/accounts/${id}`;
  const wiseReq = new Request(wise);
  wiseReq.headers.set("authorization", idToken);

  return Promise.all([
    cacheGet(bankReq).then((res) => res.json()),
    cacheGet(wiseReq).then((res) => res.json()),
  ]).then<BankDetails>(([a, b]) => ({ ...a, ...b }));
}
