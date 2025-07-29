import { BalanceTxsDb, balance_txs_options } from "@better-giving/balance-txs";
import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import * as v from "valibot";
import { cognito } from ".server/auth";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const s = Object.fromEntries(searchParams.entries());
  const search = v.parse(balance_txs_options, s);

  const { user } = await cognito.retrieve(request);
  if (!user) return resp.status(401);
  if (!user.groups.includes("ap-admin")) {
    return resp.status(403);
  }

  const db = new BalanceTxsDb(apes, env);
  const page = await db.txs(search);

  return resp.json(page);
};
