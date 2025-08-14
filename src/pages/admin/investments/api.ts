import type { IBalanceTxsPage } from "@better-giving/balance-txs";
import type { LoaderFunction } from "@vercel/remix";
import * as v from "valibot";
import { baldb, btxdb, navdb } from ".server/aws/db";

import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData extends IBalanceTxsPage {
  id: number;
  bal_lock: number;
}

export const loader: LoaderFunction = async (x) => {
  const { searchParams: s } = new URL(x.request.url);
  const key = v.parse(
    v.nullable(v.pipe(v.string(), v.base64())),
    s.get("next")
  );

  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const [{ lock_units }, ltd, btxs_page1] = await Promise.all([
    baldb.npo_balance(adm.id),
    navdb.ltd(),
    btxdb.owner_txs(adm.id.toString(), "lock", {
      next: key ?? undefined,
      limit: 10,
    }),
  ]);
  return {
    id: adm.id,
    bal_lock: lock_units * ltd.price,
    ...btxs_page1,
  } satisfies LoaderData;
};
