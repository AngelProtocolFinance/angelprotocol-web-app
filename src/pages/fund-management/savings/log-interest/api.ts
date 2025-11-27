import type { TAllocStatus } from "lib/liquid";
import { interest_log } from "lib/liquid/schemas";
import { nanoid } from "nanoid";
import { MIN_INTR_TO_CREDIT } from "pages/fund-management/constants";
import { redirect } from "react-router";
import { parse } from "valibot";
import { credit_txs } from "../credit-txs";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { TransactWriteCommand, baldb, liqdb } from ".server/aws/db";
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

  const intr_id = nanoid();
  const intr_date = new Date().toISOString();

  const credits: Record<string, number> = {};
  const alloc_status: Record<string, TAllocStatus> = {};
  for (const npo in shares) {
    const share = shares[npo];
    const to_credit = share * +fv.total;
    if (to_credit < MIN_INTR_TO_CREDIT) continue; // skip less than 1 cent
    credits[npo] = to_credit;
    alloc_status[npo] = "pending";
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

  // log intr, with pending alloc status
  await liqdb.intr_log_put({
    ...fv,
    date_created: intr_date,
    alloc: shares,
    alloc_status,
    id: intr_id,
  });

  for (const npo of npos) {
    const txs = credit_txs({
      npo,
      npo_bal: bals_map[npo] || 0,
      intr_id,
      intr_date,
      to_credit: credits[npo],
    });

    const cmd = new TransactWriteCommand({
      TransactItems: txs.all,
    });
    await liqdb.client.send(cmd).catch((err) => {
      console.error(err);
      console.error("failed to credit", npo, credits[npo]);
    });
    console.info("credited", npo, credits[npo]);
  }

  return redirect("..");
};
