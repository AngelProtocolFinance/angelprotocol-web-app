import crypto from "node:crypto";
import {
  PutCommand,
  QueryCommand,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { Txs } from "@better-giving/db";
import type { IDonationFinal } from "@better-giving/donation";
import type { Commission } from "@better-giving/referrals";
import * as ref_db from "@better-giving/referrals/db";
import { tables } from "@better-giving/types/list";
import { resp } from "helpers/https";
import type { ActionFunction } from "react-router";
import { get_referrer } from "./helpers";
import { send_commission } from "./send-commission.js";
import { ap } from ".server/aws/db";
import { env } from ".server/env";
import { aws_monitor } from ".server/sdks";
import { is_resp, qstash_body } from ".server/utils.js";

const lambda = `commissions-processor:${env}`;
// monthly

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  const b = await qstash_body(request);
  if (is_resp(b)) return b;

  try {
    let prev: Record<string, any> | undefined;
    const items: ref_db.Commission[] = [];
    do {
      const cmd = new QueryCommand({
        TableName: ref_db.name,
        IndexName: "gsi1",
        KeyConditionExpression: "#pk = :pk AND #sk = :sk",
        ExpressionAttributeNames: {
          "#pk": "gsi1PK",
          "#sk": "gsi1SK",
        },
        ExpressionAttributeValues: {
          ":pk": `Cms#${env}`,
          ":sk": "pending" satisfies ref_db.Commission["status"],
        },
        ExclusiveStartKey: prev,
      });
      const res = await ap.send(cmd);
      const records = (res.Items || []) as ref_db.Commission[];
      items.push(...records);
      prev = res.LastEvaluatedKey;
    } while (prev);

    if (items.length === 0) {
      await aws_monitor.sendAlert({
        type: "NOTICE",
        from: lambda,
        title: "No commissions to process",
        body: `No commissions to process for ${env}`,
      });
      return resp.status(200, "No commissions to process");
    }

    // Grouping payouts based on endowment ID
    const grouped = items.reduce(
      (acc, curr) => {
        acc[curr.referrer] ||= [];
        acc[curr.referrer].push(curr);
        return acc;
      },
      {} as { [index: string]: ref_db.Commission[] }
    );

    for (const [referrer, sources] of Object.entries(grouped)) {
      await process_item(referrer, sources);
    }

    return resp.status(200, "Done processing commissions");
  } catch (err) {
    console.error(err);
    await aws_monitor.sendAlert({
      type: "ERROR",
      from: lambda,
      title: "Unexpected error processing commissions",
      body: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    });
    return resp.status(500, "Something went wrong");
  }
};

async function process_item(ref_id: string, items: ref_db.Commission[]) {
  const payout_date = new Date().toISOString();
  const payout_id = crypto.randomUUID();
  const total = items.reduce((a, b) => a + b.amount, 0);

  const payout: ref_db.Payout = {
    PK: `Po#${ref_id}`,
    SK: payout_date,
    amount: total,
    date: payout_date,
    id: payout_id,
    referrer: ref_id,
  };

  try {
    const ref = await get_referrer(ref_id);
    if (!ref) throw `referrer:${ref_id} not found`;

    if (!ref.pay_id) {
      return console.log(`referrer:${ref_id} has no payout method`);
    }
    if (total < ref.pay_min) {
      return console.log(
        `referrer:${ref_id} payout ${total} is less than minimum ${ref.pay_min}`
      );
    }

    const res = await send_commission(ref.pay_id, total, payout_id);
    const txs = new Txs();
    // mark sources paid
    const status: Commission["status"] = "paid";
    for (const item of items) {
      txs.update({
        TableName: ref_db.name,
        Key: { PK: item.PK, SK: item.date },
        UpdateExpression: "SET #status = :status, gsi1SK = :gsi1SK",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": status,
          ":gsi1SK": status,
        },
      });

      // mark donation records paid
      txs.update({
        TableName: tables.donations,
        Key: {
          transactionId: item.donation_id,
        } satisfies Pick<IDonationFinal, "transactionId">,
        UpdateExpression: "SET referrer_commission.#b = :v",
        ExpressionAttributeNames: { "#b": "transfer_id" },
        ExpressionAttributeValues: {
          ":v": res,
        },
      });
    }

    const key: ref_db.PayoutLtd["PK"] = `PoLtd#${ref.id}`;
    txs.update({
      TableName: ref_db.name,
      Key: { PK: key, SK: key },
      UpdateExpression: "SET #amount = if_not_exists(#amount, :zero) + :amount",
      ExpressionAttributeNames: {
        "#amount": "amount",
      },
      ExpressionAttributeValues: {
        ":zero": 0,
        ":amount": total,
      },
    });
    payout.transfer_id = res;
    txs.put({ TableName: ref_db.name, Item: payout });

    const cmd = new TransactWriteCommand({ TransactItems: txs.all });
    await ap.send(cmd);

    await aws_monitor.sendAlert({
      type: "NOTICE",
      from: lambda,
      title: `Commission paid for ${ref_id}`,
      fields: [
        { name: "amount", value: payout.amount.toString() },
        { name: "name", value: ref.name },
        { name: "email", value: ref.email },
      ],
    });
  } catch (err) {
    console.error(err);

    //record failed payout
    payout.error = "Failed to process commission";
    const cmd = new PutCommand({
      TableName: ref_db.name,
      Item: payout,
    });
    await ap.send(cmd);
    await aws_monitor.sendAlert({
      type: "ERROR",
      from: lambda,
      title: `Failed to process commission: ${ref_id}`,
      body: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    });
  }
}
