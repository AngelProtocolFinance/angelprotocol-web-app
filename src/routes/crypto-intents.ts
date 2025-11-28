import { tokens_map } from "@better-giving/crypto/tokens";
import { resp } from "helpers/https";
import type { LoaderFunction } from "react-router";
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
import { onholddb } from ".server/aws/db";
import { _var, deposit_addrs_envs } from ".server/env";
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
      order_id: p.order_id,
    } satisfies Payment;
  }

  const don = await onholddb.item(id);
  if (!don) return resp.status(404);
  if (don.status !== "intent") return resp.status(410);

  const token = tokens_map[don.denomination];
  const deposit_addr = deposit_addrs_envs(token.network);

  if (!deposit_addr) return 500;
  const recipient = don.fund_id ? don.fund_name : don.charityName;
  const data: Payment = {
    order_id: don.transactionId,
    id: don.transactionId,
    address: deposit_addr,
    amount: don.amount,
    currency: don.denomination,
    description: `Donation to ${recipient}`,
    rate: don.usdValue / don.amount,
  };
  return resp.json(data);
};
