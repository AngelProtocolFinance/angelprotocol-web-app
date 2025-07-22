import { BalanceTxsDb } from "@better-giving/balance-txs";
import { endowIdParam } from "@better-giving/endowment/schema";
import type { LoaderFunction } from "@vercel/remix";
import * as v from "valibot";
import { resp } from "./helpers/resp";
import { cognito } from ".server/auth";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export const loader: LoaderFunction = async ({ params, request }) => {
  const { searchParams: s } = new URL(request.url);
  const id = v.parse(endowIdParam, params.id);
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
  const page = await db.owner_txs(id.toString(), "savings", {
    next: key ?? undefined,
    limit: 10,
  });

  return resp.json(page);
};
