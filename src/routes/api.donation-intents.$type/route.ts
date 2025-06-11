import { isCustom } from "@better-giving/assets/tokens";
import tokenMap from "@better-giving/assets/tokens/map";
import type { OnHoldDonation } from "@better-giving/donation";
import { intent as schema } from "@better-giving/donation/intent";
import { tables } from "@better-giving/types/list";
import type { ActionFunction } from "@vercel/remix";
import { round_number } from "helpers/round-number";
import { nanoid } from "nanoid";
import { create_payment_intent } from "routes/api.donation-intents.$type/stripe/create-payment-intent";
import { setup_intent } from "routes/api.donation-intents.$type/stripe/setup-intent";
import { parse } from "valibot";
import { resp } from "../helpers/resp";
import { type Order, crypto_payment } from "./crypto-payment";
import { onhold_base } from "./helpers";
import { get_customer_id } from "./stripe/customer-id";
import { donation_type } from "./types";
import { cognito } from ".server/auth";
import { PutCommand, apes } from ".server/aws/db";
import { get_recipient } from ".server/donation-recipient";
import { env } from ".server/env";
import { chariot, np } from ".server/sdks";
import { get_usd_rate } from ".server/usd-rate";

export const action: ActionFunction = async ({ request, params }) => {
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
    const token = tokenMap[intent.amount.currency];

    const [min, rate] = await (async (t) => {
      if (isCustom(t.id)) {
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
    const onhold: OnHoldDonation.CryptoDBRecord = {
      ...base,
      transactionId: intent_id,
      transactionDate: now.toISOString(),
      amount: to_pay,
      usdValue: to_pay * rate,

      chainId: intent.viaId as any,
      destinationChainId: env === "production" ? "137" : "80002",
      walletAddress: "",
      // `expire` event would delete this record in production
      ...(env === "staging" && {
        expireAt: Math.floor(now.getTime() / 1_000 + 86_400),
      }),
      ...(isCustom(token.id) && { payment_id: intent_id }),
      third_party: true,
    };

    const cmd = new PutCommand({
      TableName: tables.on_hold_donations,
      Item: onhold,
    });

    await apes.send(cmd);
    const np_order: Order = {
      id: intent_id,
      description: recipient.name,
      amount: to_pay,
      rate,
      currency: intent.amount.currency,
    };

    const url = new URL(request.url);
    const payment = await crypto_payment(
      token,
      np_order,
      `${url.origin}/api/nowpayments-webhook/${env}`
    );
    return resp.json(payment);
  }

  if (d_type === "chariot") {
    const to_pay =
      intent.amount.amount + intent.amount.tip + intent.amount.fee_allowance;
    const grant = await chariot.create_grant(
      intent.viaId,
      round_number(to_pay * 100, 0)
    );

    const onhold: OnHoldDonation.FiatDBRecord = {
      ...base,
      transactionId: grant.id,
      transactionDate: now.toISOString(),
      amount: to_pay,
      usdValue: to_pay, // chariot returns USD value
      fiatRamp: "CHARIOT",
      chainId: "fiat",
      destinationChainId: "fiat",
      email: intent.donor.email,
    };
    const cmd = new PutCommand({
      TableName: tables.on_hold_donations,
      Item: onhold,
    });
    await apes.send(cmd);
    return resp.json({ grantId: grant.id });
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
        .updateUserAttributes(
          [{ Name: "custom:stripe_customer_id", Value: customer_id }],
          user.accessToken
        )
        .catch(console.error);
    }

    const to_pay =
      intent.amount.amount +
      intent.amount.tip +
      // don't add fee allowance fo subs
      (intent.frequency === "one-time" ? intent.amount.fee_allowance : 0);

    const onhold: OnHoldDonation.FiatDBRecord = {
      ...base,
      transactionId: intent_id,
      transactionDate: now.toISOString(),
      amount: to_pay,
      usdValue: to_pay / usd_rate,
      fiatRamp: "STRIPE",
      chainId: "fiat",
      destinationChainId: "fiat",
      email: intent.donor.email,
    };

    const clientSecret =
      intent.frequency === "one-time"
        ? await create_payment_intent(onhold, customer_id)
        : await setup_intent(onhold, customer_id);

    return resp.json({ clientSecret });
  }
};
