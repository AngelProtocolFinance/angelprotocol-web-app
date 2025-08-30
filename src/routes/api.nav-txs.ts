import { balance_txs_options } from "@better-giving/balance-txs";
import type { LoaderFunction } from "@vercel/remix";
import { resp, search } from "helpers/https";
import * as v from "valibot";
import { cognito } from ".server/auth";
import { btxdb } from ".server/aws/db";

export const loader: LoaderFunction = async ({ request }) => {
  const opts = v.parse(balance_txs_options, search(request));

  const { user } = await cognito.retrieve(request);
  if (!user) return resp.status(401);
  if (!user.groups.includes("ap-admin")) {
    return resp.status(403);
  }

  const page = await btxdb.txs(opts);

  return resp.json(page);
};
