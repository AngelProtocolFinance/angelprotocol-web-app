import { priority_nums } from "@better-giving/banking-applications";
import { PayoutsDB } from "@better-giving/payouts";
import type { LoaderFunction } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import type { NpoBalances } from "types/npo-balance";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";
import { apes } from ".server/aws/db";
import { npo_banks } from ".server/banking-applications";
import { env } from ".server/env";
import { npoBalances } from ".server/npo-balances";

export interface LoaderData {
  id: number;
  bal: NpoBalances;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const payouts_db = new PayoutsDB(apes, env);
  const id = v.parse(plusInt, params.id);

  const [bal] = await Promise.all([
    npoBalances(id),
    payouts_db.npo_payouts(id.toString(), { status: "pending", limit: 3 }),
    npo_banks(id, 1).then(([x]) => {
      if (!x) return;
      // no default payout method
      if (x.thisPriorityNum < priority_nums.approved) return;
      return x;
    }),
  ]);

  return {
    id,
    bal,
  } satisfies LoaderData;
};
