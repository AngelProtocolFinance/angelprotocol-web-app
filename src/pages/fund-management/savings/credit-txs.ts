import { Txs } from "@better-giving/db";
import type { IBalanceTx } from "lib/balance-txs";
import { nanoid } from "nanoid";
import { baldb, btxdb, liqdb } from ".server/aws/db";

interface IArgs {
  intr_id: string;
  to_credit: number;
  npo: string;
  npo_bal: number;
  intr_date: string;
}
export const credit_txs = (x: IArgs): Txs => {
  const txs = new Txs();
  const bal_upd8 = baldb.balance_update_txi(+x.npo, {
    liq: ["inc", x.to_credit],
  });
  txs.update(bal_upd8);

  const tx: IBalanceTx = {
    id: nanoid(),
    date_created: x.intr_date,
    date_updated: x.intr_date,
    owner: x.npo,
    account: "liq",
    amount: x.to_credit,
    amount_units: x.to_credit,
    bal_begin: x.npo_bal,
    bal_end: x.npo_bal + x.to_credit,
    status: "final",

    account_other: "interest",
    account_other_id: x.intr_id,
    account_other_bal_begin: x.to_credit,
    account_other_bal_end: 0,
  };
  txs.put(btxdb.tx_put_txi(tx));
  txs.update(liqdb.intr_log_mark_npo_completed_txi(x.intr_id, x.npo));
  return txs;
};
