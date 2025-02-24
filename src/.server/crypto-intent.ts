import crypto from "node:crypto";
import type { OnHoldDonation } from "@better-giving/donation";
import type { DonationIntent } from "@better-giving/donation/intent";
import { getRecipient } from "@better-giving/helpers-donation";
import { Nowpayments } from "@better-giving/nowpayments";
import type { NP } from "@better-giving/nowpayments/types";
import { tables } from "@better-giving/types/list";
import { PutCommand, ap, apes } from "./aws/db";
import { env, nowPayments as npEnvs } from "./env";

export async function createPayment(
  intent: DonationIntent
): Promise<NP.NewPayment | [number, string]> {
  const np = new Nowpayments(npEnvs);

  const recipient = await getRecipient(intent.recipient, env, ap);
  if (!recipient) {
    return [404, "Recipient not found"];
  }

  //custom bg token, return
  if (!intent.amount.currency.startsWith("__BG")) {
  }

  const totalAmount =
    intent.amount.amount + intent.amount.tip + intent.amount.feeAllowance;
  const estimate = await np.estimate(intent.amount.currency);

  if (totalAmount < estimate.min) {
    return [400, `Min amount is:${estimate.min}`];
  }

  const amount_to_pay_usd = totalAmount * estimate.rate;
  const dateNow = new Date();

  const order: OnHoldDonation.CryptoDBRecord = {
    transactionId: crypto.randomUUID(),
    transactionDate: dateNow.toISOString(),
    amount: totalAmount,
    tipAmount: intent.amount.tip,
    feeAllowance: intent.amount.feeAllowance,
    usdValue: amount_to_pay_usd,
    appUsed: intent.source,
    chainId: intent.viaId as any,
    destinationChainId: env === "production" ? "137" : "80002",
    walletAddress: "",
    chainName: intent.viaName,
    charityName: recipient.name,
    nonProfitMsg: recipient.receiptMsg,
    denomination: intent.amount.currency,
    donationFinalized: false,
    endowmentId: recipient.npo.id,

    fund_id: recipient.fund.id,
    fund_name: recipient.name,
    fund_members: recipient.fund.members,

    programId: intent.program?.id,
    programName: intent.program?.name,
    inHonorOf: intent.tribute?.fullName,
    tributeNotif: intent.tribute?.notif,
    email: intent.donor.email,
    claimed: recipient.claimed,
    fiscalSponsored: recipient.fiscal_sponsored,
    hideBgTip: recipient.hide_bg_tip,

    network: env,
    splitLiq: "100",
    status: "intent",

    //KYC ATTRIBUTES
    kycEmail: intent.donor.email,
    fullName: `${intent.donor.firstName} ${intent.donor.lastName}`,
    title: intent.donor?.title || undefined,
    ...intent.donor.address,
    ukGiftAid: intent.donor.address?.ukGiftAid ?? false,
    // `expire` event would delete this record in production
    ...(env === "staging" && {
      expireAt: Math.floor(dateNow.getTime() / 1_000 + 86_400),
    }),
    third_party: true,
  };

  const command = new PutCommand({
    TableName: tables.on_hold_donations,
    Item: order,
  });

  //create order
  await apes.send(command);

  const order_description = `Donation to ${order.charityName}`;

  const invoice = await np.invoice({
    price_amount: amount_to_pay_usd,
    price_currency: "usd",
    pay_currency: order.denomination,
    ipn_callback_url: npEnvs.webhookUrl,
    order_id: order.transactionId,
    order_description,
  });

  const payment = np.payment_invoice({
    iid: invoice.id,
    pay_currency: order.denomination,
    order_description,
    // nowpayments only simulates in test
    case: env === "production" ? undefined : randomCase(),
  });

  return payment;
}

function randomCase() {
  const statuses: NP.Payment.TestCase[] = [
    "success",
    "common",
    "failed",
    "partially_paid",
  ];
  const randomIdx = Math.floor(Math.random() * statuses.length);
  return statuses[randomIdx];
}
