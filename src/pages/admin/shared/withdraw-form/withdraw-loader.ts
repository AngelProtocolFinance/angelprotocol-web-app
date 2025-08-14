import type { LoaderFunction } from "@vercel/remix";
import { baldb, navdb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  id: number;
  bal_lock: number;
  bal_liq: number;
}

export const withdraw_loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const [ltd, bal] = await Promise.all([
    navdb.ltd(),
    baldb.npo_balance(adm.id),
  ]);

  return {
    id: adm.id,
    bal_lock: bal.lock_units * ltd.price,
    bal_liq: bal.liq,
  } satisfies LoaderData;
};
