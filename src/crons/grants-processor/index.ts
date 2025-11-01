import crypto from "node:crypto";
import { Txs } from "@better-giving/db";
import {
  type IPayout,
  type IPendingStatus,
  type ISettledStatus,
  type ISettlement,
  PayoutsDB,
} from "@better-giving/payouts";
import type { Environment } from "@better-giving/types/list";
import { resp } from "helpers/https";
import type { ActionFunction } from "react-router";
import { transfer_grant } from "./transfer-grant";
import {
  TransactWriteCommand,
  baldb,
  bappdb,
  npodb,
  podb,
} from ".server/aws/db";
import { env } from ".server/env";
import { aws_monitor } from ".server/sdks";
import { is_resp, qstash_body } from ".server/utils";

const fn = `grants-processor:${env}`;

export const action: ActionFunction = async ({ request }) => {
  const b = await qstash_body(request);
  if (is_resp(b)) return b;

  try {
    const grants = await podb.pending_payouts();

    if (grants.length === 0) {
      await aws_monitor.sendAlert({
        type: "NOTICE",
        from: fn,
        title: "No grants to process",
        body: `No grants to process for ${env}`,
      });
      return resp.status(200, "No grants to process");
    }

    const by_npo = Object.groupBy(grants, (g) => g.recipient_id);

    for (const [npo, items = []] of Object.entries(by_npo)) {
      await process_item(+npo, items, env, podb);
    }
    return resp.status(200, "Done processing grants");
  } catch (err) {
    console.error(err);
    await aws_monitor.sendAlert({
      type: "ERROR",
      from: fn,
      title: "Unexpected error processing commissions",
      body: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    });
    return resp.status(200, "Something went wrong");
  }
};

async function process_item(
  npo_id: number,
  items: IPayout<IPendingStatus>[],
  env: Environment,
  payoutsdb: PayoutsDB
) {
  const payout_date = new Date().toISOString();
  const total = items.reduce((a, b) => a + b.amount, 0);
  const ref_id = crypto.randomUUID();
  try {
    const npo = await npodb.npo(npo_id, ["payout_minimum", "id", "name"]);
    if (!npo) throw `npo:${npo_id} not found`;
    if ((npo.payout_minimum ?? 50) > total) {
      console.info(
        `npo:${npo_id} payout minimum not met, min: ${npo.payout_minimum}, total: ${total}`
      );
      return;
    }

    const wise_id = await bappdb.npo_default_bapp(npo.id).then((x) => x?.id);
    if (!wise_id) {
      console.info(`No wise recipient found for npo:${npo}`);
      return;
    }

    const transfer_id = await transfer_grant(+wise_id, total, ref_id);
    const txs = new Txs();
    // mark sources settled
    for (const item of items) {
      const upd8 = payoutsdb.payout_update_txi<ISettledStatus>(item.id, {
        type: "settled",
        settled_date: payout_date,
        settled_id: transfer_id.toString(),
      });
      txs.update(upd8);
    }
    //create settlement record
    const settlement: ISettlement = {
      id: transfer_id.toString(),
      other_id: ref_id,
      recipient_id: npo_id.toString(),
      date: payout_date,
      amount: total,
      sources: items.map((i) => i.source_id),
      //should be updated by wise webhook
      status: "",
    };

    txs.put({
      TableName: PayoutsDB.name,
      Item: payoutsdb.settlement_record(settlement),
    });

    //reset cash
    const bal_update_txi = baldb.balance_update_txi(npo_id, {
      cash: ["dec", total],
    });
    txs.update(bal_update_txi);

    const cmd = new TransactWriteCommand({
      TransactItems: txs.all,
    });
    const res = await payoutsdb.client.send(cmd);
    console.info(ref_id, res);

    await aws_monitor.sendAlert({
      type: "NOTICE",
      from: fn,
      title: `Grant paid for npo:${npo.id}: ${npo.name}`,
      fields: [
        { name: "amount", value: total.toString() },
        { name: "transfer_id", value: transfer_id.toString() },
        { name: "ref_id", value: ref_id },
      ],
    });
  } catch (err) {
    console.error(ref_id, err);
    await aws_monitor.sendAlert({
      type: "ERROR",
      from: fn,
      title: `Failed to process grant for npo:${npo_id}`,
      body: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    });
  }
}
