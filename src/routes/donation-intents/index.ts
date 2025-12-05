import { is_custom, tokens_map } from "@better-giving/crypto";
import type { IDonationOnHoldAttr } from "@better-giving/donation";
import type { PurchaseUnitsRequest } from "@better-giving/paypal";
import { paypal_currencies } from "constants/paypal";
import { addDays, getUnixTime } from "date-fns";
import { rd, rd2num } from "helpers/decimal";
import { resp } from "helpers/https";
import { nanoid } from "nanoid";
import type { ActionFunction } from "react-router";
import type { Payment } from "types/crypto";
import {
  type IStripeIntentReturn,
  intent as schema,
} from "types/donation-intent";
import { getDotPath, parse, safeParse } from "valibot";
import { type Order, crypto_payment } from "./crypto-payment";
import { onhold_base } from "./helpers";
import { create_order } from "./paypal/create-order";
import { create_subs } from "./paypal/creater-subs";
import { customer_with_currency } from "./stripe/customer-with-currency";
import { payment_intent } from "./stripe/payment-intent";
import { setup_intent } from "./stripe/setup-intent";
import { donation_type } from "./types";
import { onholddb } from ".server/aws/db";
import { type IDonationsCookie, donations_cookie } from ".server/cookie";
import { get_recipient } from ".server/donation-recipient";
import { deposit_addrs_envs, env } from ".server/env";
import { aws_monitor, chariot, np, paypal } from ".server/sdks";
import { unit_per_usd } from ".server/unit-per-usd";

const json_with_cookie_fn =
  (existing: null | IDonationsCookie, key: string) =>
  async (data: Record<string, any>) => {
    const now = Date.now();
    const obj = existing || {};

    // Remove expired keys
    for (const k of Object.keys(obj)) {
      if (obj[k] < now) {
        delete obj[k];
      }
    }

    obj[key] = now + 15 * 60 * 1000; // 15 minutes

    // keep only top 5 most recent keys
    const sorted_entries = Object.entries(obj)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const expiry_per_id = Object.fromEntries(sorted_entries);

    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json",
        "set-cookie": await donations_cookie.serialize(expiry_per_id),
      },
    });
  };

export const action: ActionFunction = async ({ request, params }) => {
  const cookie: IDonationsCookie | null = await donations_cookie.parse(
    request.headers.get("cookie")
  );

  const parsed = safeParse(schema, await request.json());
  if (parsed.issues) {
    const i = parsed.issues[0];
    return resp.status(400, `${getDotPath(i)}: ${i.message}`);
  }
  const intent = parsed.output;

  const d_type = parse(donation_type, params.type);

  const recipient = await get_recipient(intent.recipient);
  if (!recipient) {
    return resp.txt(`Recipient:${intent.recipient} not found`, 404);
  }

  const now = new Date();
  const intent_id = nanoid();
  const json_with_cookie = json_with_cookie_fn(cookie, intent_id);
  const base = onhold_base(recipient, intent);

  if (d_type === "crypto") {
    //custom bg token, return
    const token = tokens_map[intent.amount.currency];

    const [min, rate] = await (async (t) => {
      if (is_custom(t.id)) {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${t.cg_id}&vs_currencies=usd`
        );
        if (!res.ok) throw res;
        const {
          [t.cg_id]: { usd: rate },
        } = await res.json();
        return [1 / rate, rate];
      }

      const estimate = await np.estimate(intent.amount.currency);
      return [estimate.min, estimate.rate];
    })(token);

    const to_pay =
      intent.amount.amount + intent.amount.tip + intent.amount.fee_allowance;

    if (to_pay < min) {
      return resp.txt(`Min amount for ${token.code} is: ${min}`, 400);
    }

    const onhold: IDonationOnHoldAttr = {
      ...base,
      transactionId: intent_id,
      transactionDate: now.toISOString(),
      chainId: intent.via_id,
      amount: to_pay,
      usdValue: to_pay * rate,
      expireAt: getUnixTime(addDays(now, 3)),
      ...(is_custom(token.id) && { payment_id: intent_id }),
    };

    await onholddb.put(onhold);

    if (is_custom(token.id)) {
      const p: Payment = {
        id: intent_id,
        order_id: intent_id,
        address: deposit_addrs_envs(token.network),
        amount: to_pay,
        currency: token.code,
        description: recipient.name,
        rate,
      };

      if (token.id.startsWith("man_")) {
        const res = await aws_monitor
          .sendAlert({
            from: "donation-intents-creator",
            type: "NOTICE",
            title: "Donation intent - manual notification",
            fields: [
              { name: "Intent ID", value: intent_id },
              {
                name: "Amount",
                value: `${to_pay} ${token.code}`,
                inline: true,
              },
              { name: "Approx", value: `$${to_pay * rate}`, inline: true },
              { name: "Recipient", value: recipient.name, inline: true },
              {
                name: "Sender",
                value: `${intent.donor.first_name} ${intent.donor.last_name} <${intent.donor.email}>`,
              },
            ],
          })
          .catch((x) => {
            console.error(x);
            return null;
          });
        console.info(
          "manual intent notification",
          res?.status,
          res?.statusText
        );
      }

      return await json_with_cookie(p);
    }

    const np_order: Order = {
      id: intent_id,
      description: recipient.name,
      amount: to_pay,
      rate,
      currency: intent.amount.currency,
    };

    const url = new URL(request.url);
    const payment = await crypto_payment(
      np_order,
      `${url.origin}/api/nowpayments-webhook/${env}`
    );

    return await json_with_cookie(payment);
  }

  if (d_type === "chariot") {
    const to_pay =
      intent.amount.amount + intent.amount.tip + intent.amount.fee_allowance;
    const grant = await chariot.create_grant(
      intent.via_id,
      rd2num(to_pay * 100, 0)
    );

    const onhold: IDonationOnHoldAttr = {
      ...base,
      transactionId: grant.id,
      transactionDate: now.toISOString(),
      amount: to_pay,
      usdValue: to_pay, // chariot returns USD value
      fiatRamp: "CHARIOT",
      chainId: "fiat",
      paymentMethod: "Daf",
      email: intent.donor.email,
    };
    await onholddb.put(onhold);
    // return resp.json({ grantId: grant.id });
    return await json_with_cookie({ id: onhold.transactionId });
  }

  if (d_type === "stripe") {
    const upusd = await unit_per_usd(intent.amount.currency);

    const customer_id = await customer_with_currency(
      intent.amount.currency.toUpperCase(),
      intent.donor.email.toLowerCase()
    );

    const units =
      intent.amount.amount + intent.amount.tip + intent.amount.fee_allowance;

    const onhold: IDonationOnHoldAttr = {
      ...base,
      transactionId: intent_id,
      transactionDate: now.toISOString(),
      amount: units,
      usdValue: units / upusd,
      fiatRamp: "STRIPE",
      chainId: "fiat",
      email: intent.donor.email,
    };

    await onholddb.put(onhold);

    const client_secret =
      intent.frequency === "one-time"
        ? await payment_intent(onhold, customer_id)
        : await setup_intent(onhold, customer_id);

    return await json_with_cookie({
      client_secret,
      order_id: onhold.transactionId,
    } satisfies IStripeIntentReturn);
  }

  if (d_type === "paypal") {
    const usd_rate = await unit_per_usd(intent.amount.currency);
    const to_pay =
      intent.amount.amount + intent.amount.tip + intent.amount.fee_allowance;

    const onhold: IDonationOnHoldAttr = {
      ...base,
      transactionId: intent_id,
      transactionDate: now.toISOString(),
      amount: to_pay,
      usdValue: to_pay / usd_rate,
      fiatRamp: "PAYPAL",
      chainId: "fiat",
      paymentMethod: "Paypal",
      email: intent.donor.email,
    };
    await onholddb.put(onhold);

    const tx_id =
      intent.frequency === "recurring"
        ? await create_subs(to_pay, onhold.denomination, onhold.transactionId)
        : await create_order(onhold);

    return await json_with_cookie({
      tx_id,
    });
  }
};
