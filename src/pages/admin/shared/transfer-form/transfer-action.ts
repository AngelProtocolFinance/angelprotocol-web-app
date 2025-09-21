import type { IBalanceTx } from "@better-giving/balance-txs";
import { Txs } from "@better-giving/db";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { type ActionFunction, redirect } from "react-router";
import { parse } from "valibot";
import { type Schema, type Source, schema } from "./types";
import { TransactWriteCommand, baldb, btxdb, navdb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

type TRedirects = { [S in Source]: string };

export const transfer_action =
  (redirects: TRedirects): ActionFunction =>
  async (x) => {
    const adm = await admin_checks(x);
    if (is_resp(adm)) return adm;

    const [bal, ltd] = await Promise.all([
      baldb.npo_balance(adm.id),
      navdb.ltd(),
    ]);
    const json = await adm.req.json();
    const fv = parse(schema, {
      ...json,
      bals: {
        liq: bal.liq,
        lock: bal.lock_units * ltd.price,
      },
    } satisfies Schema);

    const txs = new Txs();
    const timestamp = new Date().toISOString();
    const to_id = nanoid();
    const from_id = nanoid();

    interface Common
      extends Pick<IBalanceTx, "date_created" | "date_updated" | "owner"> {}
    const common: Common = {
      date_created: timestamp,
      date_updated: timestamp,
      owner: adm.id.toString(),
    };

    const units = +fv.amount / ltd.price;
    if (fv.source === "lock") {
      const tx: IBalanceTx = {
        ...common,
        id: from_id,
        status: "pending",
        account: "lock",
        bal_begin: bal.lock_units,
        bal_end: bal.lock_units - units,
        amount: +fv.amount,
        amount_units: units,
        account_other_id: to_id,
        account_other: "liq",
        account_other_bal_begin: bal.liq,
        account_other_bal_end: bal.liq + +fv.amount,
      };
      txs.put(btxdb.tx_put_txi(tx));
      const bal_update = baldb.balance_update_txi(adm.id, {
        lock_units: ["dec", units],
      });
      txs.update(bal_update);
    }

    if (fv.source === "liq") {
      const tx: IBalanceTx = {
        ...common,
        id: from_id,
        status: "final",
        account: "liq",
        bal_begin: bal.liq,
        bal_end: bal.liq - +fv.amount,
        amount: +fv.amount,
        amount_units: +fv.amount,
        account_other_id: to_id,
        account_other: "lock",
        account_other_bal_begin: bal.lock_units,
        account_other_bal_end: bal.lock_units + units,
      };
      const lock_tx: IBalanceTx = {
        ...common,
        id: to_id,
        status: "final",
        account: "lock",
        bal_begin: bal.lock_units,
        bal_end: bal.lock_units + units,
        amount: +fv.amount,
        amount_units: units,
        account_other_id: from_id,
        account_other: "liq",
        account_other_bal_begin: bal.liq,
        account_other_bal_end: bal.liq - +fv.amount,
      };
      txs.put(btxdb.tx_put_txi(tx));
      txs.put(btxdb.tx_put_txi(lock_tx));

      const bal_update = baldb.balance_update_txi(adm.id, {
        liq: ["dec", +fv.amount],
        lock_units: ["inc", units],
      });

      const nav_log = produce(ltd, (x) => {
        x.reason = `npo:${adm.id} transfer allocation from liq to lock`;
        x.date = timestamp;
        x.units += units;
        // new investments are allocated to cash portion and rebalanced later
        x.composition.CASH.qty += +fv.amount;
        x.composition.CASH.value += +fv.amount;

        x.value += +fv.amount;
        x.holders[adm.id] ||= 0;
        x.holders[adm.id] += units;
      });

      txs.put(navdb.log_put_txi(nav_log));
      txs.update(bal_update);
    }

    const cmd = new TransactWriteCommand({
      TransactItems: txs.all,
    });
    await baldb.client.send(cmd);
    return redirect(redirects[fv.source]);
  };
