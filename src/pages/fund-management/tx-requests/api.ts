import { balance_txs_options } from "@better-giving/balance-txs";
import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import * as v from "valibot";
import { cognito } from ".server/auth";
import { btxdb } from ".server/aws/db";

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const s = Object.fromEntries(searchParams.entries());
  const opts = v.parse(balance_txs_options, s);

  const { user } = await cognito.retrieve(request);
  if (!user) return resp.status(401);
  if (!user.groups.includes("ap-admin")) {
    return resp.status(403);
  }

  const page = await btxdb.txs({ ...opts, limit: 10 });

  return resp.json(page);
};
