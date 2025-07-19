import type { LoaderFunction } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import { CronExpressionParser } from "cron-parser";
import type { EndowmentBalances } from "types/npo-balance";
import * as v from "valibot";
import { endowUpdate } from "../endow-update-action";
import { cognito, toAuth } from ".server/auth";
import { npoBalances } from ".server/npo-balances";

export interface DashboardData {
  id: number;
  bal: EndowmentBalances;
  /** compute in server save client bundle */
  next_payout: string;
}

export const endowUpdateAction = endowUpdate({ redirect: "." });
export const loader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = v.parse(plusInt, params.id);
  const interval = CronExpressionParser.parse("0 0 */3 * *"); //every 3 days
  // console.log("next payout", interval.next().toString());

  return {
    id,
    bal: await npoBalances(id),
    next_payout: interval.next().toString(),
  } satisfies DashboardData;
};
