import type { IBalanceTx } from "@better-giving/balance-txs";
import { Txs } from "@better-giving/db";
import { interest_log } from "@better-giving/liquid/schemas";
import { nanoid } from "nanoid";
import { MIN_INTR_TO_CREDIT } from "pages/fund-management/constants";
import { redirect } from "react-router";
import { parse } from "valibot";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { TransactWriteCommand, baldb, btxdb, liqdb } from ".server/aws/db";
import { npo_interest_shares } from ".server/npos-interest-share";

export const action = async ({ request }: Route.ActionArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  if (!user.groups.includes("ap-admin")) return { status: 403 };

  /** exclude: use server side time */
  const { date_created, ...fv } = parse(interest_log, await request.json());

  const shares = await npo_interest_shares({
    start: fv.date_start,
    end: fv.date_end,
  });

  const txs = new Txs();
  const intr_id = nanoid();
  const intr_date = new Date().toISOString();

  const credits: Record<string, number> = {};
  for (const npo in shares) {
    const share = shares[npo];
    const to_credit = share * +fv.total;
    if (to_credit < MIN_INTR_TO_CREDIT) continue; // skip less than 1 cent
    credits[npo] = to_credit;
  }
  const npos = Object.keys(credits);
  const bals = await baldb.balances_get(npos.map(Number), ["liq", "id"]);
  const bals_map = bals.reduce(
    (acc, bal) => {
      acc[bal.id] = bal.liq || 0;
      return acc;
    },
    {} as Record<string, number>
  );

  for (const npo of npos) {
    const to_credit = credits[npo];
    const bal_upd8 = baldb.balance_update_txi(+npo, {
      liq: ["inc", to_credit],
    });
    txs.update(bal_upd8);
    const bal = bals_map[npo] || 0;

    const tx: IBalanceTx = {
      id: nanoid(),
      date_created: intr_date,
      date_updated: intr_date,
      owner: npo,
      account: "liq",
      amount: to_credit,
      amount_units: to_credit,
      bal_begin: bal,
      bal_end: bal + to_credit,
      status: "final",

      account_other: "interest",
      account_other_id: intr_id,
      account_other_bal_begin: to_credit,
      account_other_bal_end: 0,
    };
    txs.put(btxdb.tx_put_txi(tx));
  }

  const intr_log = liqdb.intr_log_put_txi({
    ...fv,
    date_created: intr_date,
    alloc: shares,
    id: intr_id,
  });

  txs.put(intr_log);

  const cmd = new TransactWriteCommand({
    TransactItems: txs.all,
  });

  const res = await liqdb.client.send(cmd);
  console.info("credited and logged interest", res);

  return redirect("..");
};
