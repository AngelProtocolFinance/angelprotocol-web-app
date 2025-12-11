import type { IBalanceTxsPage } from "lib/balance-txs";
import type { LoaderFunctionArgs } from "react-router";
import * as v from "valibot";
import { baldb, btxdb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData extends IBalanceTxsPage {
  bal_liq: number;
}

export const loader = async (x: LoaderFunctionArgs) => {
  const { searchParams: s } = new URL(x.request.url);
  const key = v.parse(
    v.nullable(v.pipe(v.string(), v.base64())),
    s.get("next")
  );

  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const [{ liq }, btx_page] = await Promise.all([
    baldb.npo_balance(adm.id),
    btxdb.owner_txs(adm.id.toString(), "liq", {
      next: key ?? undefined,
      limit: 10,
    }),
  ]);

  return {
    bal_liq: liq,
    ...btx_page,
  } satisfies LoaderData;
};
