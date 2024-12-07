import type { BankingApplicationUpdate } from "types/aws";
import { ap, ver } from "../api";

export async function bankUpdate(
  bankId: number,
  update: BankingApplicationUpdate,
  idToken: string
) {
  return ap.put(`${ver(1)}/banking-applications/${bankId}`, {
    json: update,
    headers: { authorization: idToken },
    searchParams: { type: "prioritize" },
  });
}
