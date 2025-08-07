import { BalanceTxsDb } from "@better-giving/balance-txs";
import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import * as v from "valibot";
import { apes } from ".server/aws/db";
import { env } from ".server/env";
import { admin_checks, is_resp } from ".server/utils";

export const loader: LoaderFunction = async (x) => {
  const { searchParams: s } = new URL(x.request.url);
  const account = v.parse(
    v.pipe(v.string(), v.picklist(["liq", "lock"])),
    x.params.account
  );
  const key = v.parse(
    v.nullable(v.pipe(v.string(), v.base64())),
    s.get("next")
  );

  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const db = new BalanceTxsDb(apes, env);
  const page = await db.owner_txs(adm.id.toString(), account, {
    next: key ?? undefined,
    limit: 10,
  });

  return resp.json(page);
};
