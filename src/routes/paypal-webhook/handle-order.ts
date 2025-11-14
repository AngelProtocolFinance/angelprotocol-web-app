import type { IDonationOnHoldAttr } from "@better-giving/donation";
import type { Order } from "@paypal/paypal-server-sdk";
import { resp } from "helpers/https";
import { to_ids } from "types/paypal";
import { UUID_REGEX } from "valibot";
import { type Settled, to_final } from "../helpers/donation";
import { onholddb } from ".server/aws/db";
import { get_recipient } from ".server/donation-recipient";
import { qstash } from ".server/sdks";

export async function handler_order(
  order: Order,
  base_url: string
): Promise<Response> {
  if (!order.id) return resp.status(201, "no order id");
  if (!order.createTime) return resp.status(201, "no create time");

  const p = order.purchaseUnits?.[0];

  if (!p) return resp.status(201, "no purchase units");
  if (!p.items) return resp.status(201, "no items");
  if (!p.customId) return resp.status(201, "no custom id");

  const c = p.payments?.captures?.[0];
  if (!c) return resp.status(201, "no order capture");
  if (!c.id) return resp.status(201, "no capture id");
  if (!c.amount) return resp.status(201, "no capture amount");
  const amnt = c.amount.value;

  /** usd per unit */
  const breakdown = c.sellerReceivableBreakdown;
  if (!breakdown) return resp.status(201, "no breakdown");

  const fee = breakdown.paypalFee?.value ?? "0";

  const net_usd = breakdown.receivableAmount?.value ?? "0";
  if (!net_usd) return resp.status(201, "no net value");

  const rate = breakdown?.exchangeRate?.value;
  if (!rate) return resp.status(201, "no exchange rate");

  const amnt_usd = +rate * +amnt;
  const fee_usd = +rate * +fee;

  const { env, ...ids } = to_ids(p.customId);

  let tip = 0;
  let fee_allowance = 0;

  for (const item of p.items) {
    if (item.sku?.startsWith("to-")) {
      if (item.sku === "tip") {
        tip = Number.parseFloat(item.unitAmount.value);
      }
      if (item.sku === "fee-allowance") {
        fee_allowance = Number.parseFloat(item.unitAmount.value);
      }
    }
  }
  const recipient = await get_recipient(
    UUID_REGEX.test(ids.recipient) ? ids.recipient : +ids.recipient
  );
  if (!recipient) return resp.status(201, "invalid recipient");

  // only one source expected
  const source = order.paymentSource?.paypal || order.paymentSource?.venmo;
  const email = source?.emailAddress;
  if (!email) return resp.status(201, "no payer email");

  const {
    addressLine1: l1 = "",
    addressLine2: l2 = "",
    adminArea1: state = "",
    adminArea2: city = "",
    postalCode: zip = "",
    countryCode: country = "",
  } = source?.address ?? {};
  const { givenName: fn, surname: ln } = source.name ?? {};

  const addr_street = [l1, l2].filter(Boolean).join(", ");

  const x: IDonationOnHoldAttr = {
    // Transaction details
    transactionDate: order.createTime,
    transactionId: order.id,
    status: "pending",
    network: env,

    // Amount details
    amount: +amnt,
    ...(fee_allowance && { feeAllowance: fee_allowance }),
    tipAmount: tip,
    usdValue: amnt_usd,
    // allocation, retrieved in final recorder: TODO: update types
    denomination: c.amount.currencyCode,
    isRecurring: false,

    // FROM - Donor details
    fullName: [fn, ln].filter(Boolean).join(" "),
    donor_public: true,
    kycEmail: email,
    // kycEmail: m.email,
    // msg_to_npo
    // ukGiftAid
    ...(addr_street && { streetAddress: addr_street }),
    ...(city && { city }),
    ...(state && { state: state }),
    ...(country && { country: country }),
    ...(zip && { zipCode: zip }),

    // TO - Recipient details
    endowmentId: recipient.npo.id,
    charityName: recipient.name,
    claimed: true, // 11/14/2025 donating to unclaimed is not allowed
    fiscalSponsored: recipient.fiscal_sponsored,
    ...(recipient.fund.id && { fund_id: recipient.fund.id }),
    ...(recipient.fund.id && {
      fund_members: recipient.fund.members,
    }),
    ...(recipient.fund.id && { fund_name: recipient.name }),
    hideBgTip: recipient.hide_bg_tip,
    // ...(m.programId && { programId: m.programId }),
    // ...(m.programName && { programName: m.programName }),

    // VIA - Payment details
    appUsed: ids.source,
    chainId: "fiat",
    chainName: "Fiat",
    fiatRamp: "PAYPAL",

    // paymentMethod
    // stripeDepositVerifyUrl

    // TRIBUTE
    // inHonorOf
    // tributeNotif
  };
  await onholddb.put(x);

  const settled: Settled = {
    fee: +fee_usd,
    net: +net_usd,
    in: { currency: c.amount.currencyCode, hash: c.id, id: "paypal" },
  };

  const final = to_final(x, settled);
  const res = await qstash.publishJSON({
    body: final,
    url: `${base_url}/q/final-recorder`,
    retries: 0,
    deduplicationId: x.transactionId,
  });

  console.info(`Final donation record sent:${res.messageId}`);
  return resp.status(200, "processed");
}
