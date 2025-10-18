import { is_custom, tokens_map } from "@better-giving/assets/tokens";
import type { IDonationOnHoldAttr } from "@better-giving/donation";
import { addDays, getUnixTime } from "date-fns";
import { resp } from "helpers/https";
import { round_number } from "helpers/round-number";
import { nanoid } from "nanoid";
import type { ActionFunction } from "react-router";
import type { Payment } from "types/crypto";
import { intent as schema } from "types/donation-intent";
import { parse } from "valibot";
import { type Order, crypto_payment } from "./crypto-payment";
import { onhold_base } from "./helpers";
import { create_payment_intent } from "./stripe/create-payment-intent";
import { get_customer_id } from "./stripe/customer-id";
import { setup_intent } from "./stripe/setup-intent";
import { donation_type } from "./types";
import { cognito } from ".server/auth";
import { onholddb } from ".server/aws/db";
import { type IDonationsCookie, donations_cookie } from ".server/cookie";
import { get_recipient } from ".server/donation-recipient";
import { deposit_addrs_envs, env } from ".server/env";
import { aws_monitor, chariot, np } from ".server/sdks";
import { get_usd_rate } from ".server/usd-rate";

const json_with_cookie_fn =
  (existing: null | IDonationsCookie) =>
  async <T>(data: T, attr: keyof T) => {
    const now = Date.now();
    const obj = existing || {};
    const key_id = data[attr] as string;

    // Remove expired keys
    for (const k of Object.keys(obj)) {
      if (obj[k] < now) {
        delete obj[k];
      }
    }

    // Add new key
    obj[key_id] = now + 15 * 60 * 1000; // 15 minutes

    // Keep only top 5 most recent keys
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
  const json_with_cookie = json_with_cookie_fn(cookie);
  const { user } = await cognito.retrieve(request);
  const intent = parse(schema, await request.json());
  const d_type = parse(donation_type, params.type);

  const recipient = await get_recipient(intent.recipient);
  if (!recipient) {
    return resp.txt(`Recipient:${intent.recipient} not found`, 404);
  }

  const now = new Date();
  const intent_id = nanoid();
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

      return await json_with_cookie(p, "id");
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

    return await json_with_cookie(payment, "id");
  }

  if (d_type === "chariot") {
    const to_pay =
      intent.amount.amount + intent.amount.tip + intent.amount.fee_allowance;
    const grant = await chariot.create_grant(
      intent.via_id,
      round_number(to_pay * 100, 0)
    );

    const onhold: IDonationOnHoldAttr = {
      ...base,
      transactionId: grant.id,
      transactionDate: now.toISOString(),
      amount: to_pay,
      usdValue: to_pay, // chariot returns USD value
      fiatRamp: "CHARIOT",
      chainId: "fiat",
      email: intent.donor.email,
    };
    await onholddb.put(onhold);
    // return resp.json({ grantId: grant.id });
    return await json_with_cookie({ grantId: grant.id }, "grantId");
  }

  if (d_type === "stripe") {
    const usd_rate = await get_usd_rate(intent.amount.currency);

    const customer_id = await get_customer_id(
      intent.amount.currency.toUpperCase(),
      intent.donor.email.toLowerCase()
    );

    // save stripe customer id to user
    if (user && user.email === intent.donor.email && !user.stripe_customer_id) {
      await cognito
        .update_user_attributes(
          [{ Name: "custom:stripe_customer_id", Value: customer_id }],
          user.token_access
        )
        .catch(console.error);
    }

    const to_pay =
      intent.amount.amount +
      intent.amount.tip +
      // don't add fee allowance fo subs
      (intent.frequency === "one-time" ? intent.amount.fee_allowance : 0);

    const onhold: IDonationOnHoldAttr = {
      ...base,
      transactionId: intent_id,
      transactionDate: now.toISOString(),
      amount: to_pay,
      usdValue: to_pay / usd_rate,
      fiatRamp: "STRIPE",
      chainId: "fiat",
      email: intent.donor.email,
    };

    const clientSecret =
      intent.frequency === "one-time"
        ? await create_payment_intent(onhold, customer_id)
        : await setup_intent(onhold, customer_id);

    return await json_with_cookie({ clientSecret }, "clientSecret");
  }
};
