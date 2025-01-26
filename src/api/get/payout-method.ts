import type { BankingApplication, V2RecipientAccount } from "types/aws";
import { ap, toSearch, ver } from "../api";

export interface BankDetails extends V2RecipientAccount, BankingApplication {}

export async function getPayoutMethod(
  id: number,
  requestor: "bg-admin" | number,
  idToken: string
): Promise<BankDetails> {
  const search = toSearch({
    requestor: typeof requestor === "number" ? "endowment" : requestor,
    endowmentID: typeof requestor === "number" ? requestor : undefined,
  });
  const bank = await ap.get<BankingApplication>(
    `${ver(1)}/banking-applications/${id}`,
    { searchParams: search, headers: { authorization: idToken } }
  );

  const wise = await ap.get<V2RecipientAccount>(
    `${ver(1)}/wise-proxy/v2/accounts/${id}`,
    { headers: { authorization: idToken } }
  );

  return Promise.all([bank.json(), wise.json()]).then<BankDetails>(
    ([a, b]) => ({ ...a, ...b })
  );
}
