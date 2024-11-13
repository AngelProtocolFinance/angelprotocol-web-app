import { APIs } from "constants/urls";
import { version as v } from "services/helpers";
import type { BankingApplicationUpdate } from "types/aws";

export async function bankUpdate(
  bankId: number,
  update: BankingApplicationUpdate,
  idToken: string
) {
  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/banking-applications/${bankId}`;
  url.searchParams.set("type", "prioritize");
  const bankReq = new Request(url, {
    method: "PUT",
    body: JSON.stringify(update),
  });
  bankReq.headers.set("authorization", idToken);
  return fetch(bankReq);
}
