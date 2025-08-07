import { BalanceTxsDb } from "@better-giving/balance-txs";
import { $int_gte1 } from "@better-giving/endowment/schema";
import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import * as v from "valibot";
import { cognito } from ".server/auth";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export const loader: LoaderFunction = async ({ params, request }) => {
  const { searchParams: s } = new URL(request.url);
  const id = v.parse($int_gte1, params.id);
  const account = v.parse(
    v.pipe(v.string(), v.picklist(["liq", "lock"])),
    params.account
  );
  const key = v.parse(
    v.nullable(v.pipe(v.string(), v.base64())),
    s.get("next")
  );

  const { user } = await cognito.retrieve(request);
  if (!user) return resp.status(401);
  if (!user.endowments.includes(id) && !user.groups.includes("ap-admin")) {
    return resp.status(403);
  }

  const db = new BalanceTxsDb(apes, env);
  const page = await db.owner_txs(id.toString(), account, {
    next: key ?? undefined,
    limit: 10,
  });

  return resp.json(page);
};
