import { resp, search } from "helpers/https";
import { balance_txs_options } from "lib/balance-txs";
import type { LoaderFunctionArgs } from "react-router";
import * as v from "valibot";
import { cognito } from ".server/auth";
import { btxdb } from ".server/aws/db";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const opts = v.parse(balance_txs_options, search(request));

  const { user } = await cognito.retrieve(request);
  if (!user) return resp.status(401);
  if (!user.groups.includes("ap-admin")) {
    return resp.status(403);
  }

  return btxdb.txs({ ...opts, source_acc: "lock", limit: 10 });
};
