import { Txs } from "@better-giving/db";
import { interest_log } from "@better-giving/liquid/schemas";
import { MIN_INTR_TO_CREDIT } from "pages/fund-management/constants";
import { redirect } from "react-router";
import { parse } from "valibot";
import type { Route } from "./+types";
import { cognito, toAuth } from ".server/auth";
import { TransactWriteCommand, baldb, liqdb } from ".server/aws/db";
import { npo_interest_shares } from ".server/npos-interest-share";

export const action = async ({ request }: Route.ActionArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const fv = parse(interest_log, await request.json());

  const shares = await npo_interest_shares({
    start: fv.date_start,
    end: fv.date_end,
  });

  const txs = new Txs();
  for (const npo in shares) {
    const share = shares[npo];
    const to_credit = share * +fv.total;
    if (to_credit < MIN_INTR_TO_CREDIT) continue; // skip less than 1 cent
    const upd8 = baldb.balance_update_txi(+npo, {
      liq: ["inc", to_credit],
    });
    txs.update(upd8);
  }

  const intr_log = liqdb.intr_log_put_txi({
    ...fv,
    alloc: shares,
  });

  txs.put(intr_log);

  const cmd = new TransactWriteCommand({
    TransactItems: txs.all,
  });

  const res = await liqdb.client.send(cmd);
  console.info("credited and logged interest", res);

  return redirect("..");
};
