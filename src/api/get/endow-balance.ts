import { plusInt } from "api/schema/endow-id";
import type { EndowmentBalances } from "types/aws";
import { parse } from "valibot";
import { apes, ver } from "../api";

export async function getEndowBalance(idParam: string | undefined) {
  const id = parse(plusInt, idParam);
  const res = await apes.get<EndowmentBalances>(`${ver(1)}/balances/${id}`, {
    throwHttpErrors: false,
  });
  if (!res.ok) {
    return {
      contributionsCount: 0,
      donationsBal: 0,
      payoutsMade: 0,
      payoutsPending: 0,
      sustainabilityFundBal: 0,
      totalContributions: 0,
      totalEarnings: 0,
    };
  }

  return res.json();
}
