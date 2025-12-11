import type { IBalanceTxsPage } from "lib/balance-txs";
import type { LoaderFunctionArgs } from "react-router";
import { baldb, btxdb, navdb } from ".server/aws/db";

import { search } from "helpers/https";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData extends IBalanceTxsPage {
  id: number;
  bal_lock: number;
}

export const loader = async (x: LoaderFunctionArgs) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const { next } = search(x.request);
  const [{ lock_units }, ltd, btxs_page1] = await Promise.all([
    baldb.npo_balance(adm.id),
    navdb.ltd(),
    btxdb.owner_txs(adm.id.toString(), "lock", {
      next,
      limit: 10,
    }),
  ]);
  return {
    id: adm.id,
    bal_lock: lock_units * ltd.price,
    ...btxs_page1,
  } satisfies LoaderData;
};
