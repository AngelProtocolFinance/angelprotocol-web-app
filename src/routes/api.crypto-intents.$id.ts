import tokenMap from "@better-giving/assets/tokens/map";
import type { OnHoldDonation } from "@better-giving/donation";
import { tables } from "@better-giving/types/list";
import type { LoaderFunction } from "@vercel/remix";
import type { Payment } from "types/crypto";
import {
  integer,
  minValue,
  parse,
  pipe,
  string,
  transform,
  union,
  uuid,
} from "valibot";
import { GetCommand, apes } from ".server/aws/db";
import { _var } from ".server/env";
import { np } from ".server/sdks";

const int = pipe(
  string(),
  transform((x) => +x),
  integer(),
  minValue(0)
);
export const loader: LoaderFunction = async ({ params }) => {
  const id = parse(union([pipe(string(), uuid()), int]), params.id);

  if (typeof id === "number") {
    const p = await np.get_payment_invoice(id);
    if (p.payment_status !== "waiting") return 410;

    const estimated = await np.estimate(p.pay_currency);

    return {
      id: p.payment_id,
      address: p.pay_address,
      amount: p.pay_amount,
      currency: p.pay_currency,
      rate: estimated.rate,
      description: p.order_description,
    };
  }
  //non nowpayments intents are saved in db
  const cmd = new GetCommand({
    TableName: tables.on_hold_donations,
    Key: { transactionId: id } satisfies OnHoldDonation.PrimaryKey,
  });
  const res = await apes.send(cmd);
  if (!res.Item) {
    return new Response(null, { status: 404 });
  }

  const item = res.Item as OnHoldDonation.DBRecord;
  if (item.status !== "intent") {
    return new Response(null, { status: 410 });
  }

  const token = tokenMap[item.denomination];
  const deposit_addr = _var(`DEPOSIT_ADDR_${token.network.toUpperCase()}`);

  if (!deposit_addr) return 500;
  const recipient = item.fund_id ? item.fund_name : item.charityName;
  const data: Payment = {
    id: item.transactionId,
    address: deposit_addr,
    amount: item.amount,
    currency: item.denomination,
    description: `Donation to ${recipient}`,
    rate: item.usdValue / item.amount,
  };
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
};
