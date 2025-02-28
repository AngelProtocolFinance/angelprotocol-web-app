import crypto from "node:crypto";
import { isCustom } from "@better-giving/assets/tokens";
import tokenMap from "@better-giving/assets/tokens/map";
import type { OnHoldDonation } from "@better-giving/donation";
import type { DonationIntent } from "@better-giving/donation/intent";
import { getRecipient } from "@better-giving/helpers-donation";
import { tables } from "@better-giving/types/list";
import type { Payment } from "types/crypto";
import { GetCommand, PutCommand, ap, apes } from "../aws/db";
import { env, npEnvs } from "../env";
import { np } from ".server/sdks";

export const getPendingIntent = async (
  paymentId: string | number
): Promise<Payment | number> => {
  if (typeof paymentId === "number") {
    const p = await np.get_payment_invoice(paymentId);
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
    Key: { transactionId: paymentId } satisfies OnHoldDonation.PrimaryKey,
  });
  const res = await apes.send(cmd);
  if (!res.Item) return 404;

  const item = res.Item as OnHoldDonation.DBRecord;
  if (item.status !== "intent") return 410;

  const token = tokenMap[item.denomination];
  const deposit_addr =
    process.env[`DEPOSIT_ADDR_${token.network.toUpperCase()}`];

  if (!deposit_addr) return 500;
  const recipient = item.fund_id ? item.fund_name : item.charityName;
  return {
    id: item.transactionId,
    address: deposit_addr,
    amount: item.amount,
    currency: item.denomination,
    description: `Donation to ${recipient}`,
    rate: item.usdValue / item.amount,
  };
};

export async function createPayment(
  intent: DonationIntent
): Promise<Payment | [number, string]> {
  const recipient = await getRecipient(intent.recipient, env, ap);
  if (!recipient) {
    return [404, "Recipient not found"];
  }

  //custom bg token, return
  const token = tokenMap[intent.amount.currency];

  const totalAmount =
    intent.amount.amount + intent.amount.tip + intent.amount.feeAllowance;

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

  if (totalAmount < min) {
    return [400, `Min amount is:${min}`];
  }

  const usdValue = totalAmount * rate;
  const dateNow = new Date();

  const orderId = crypto.randomUUID();

  const order: OnHoldDonation.CryptoDBRecord = {
    transactionId: orderId,
    transactionDate: dateNow.toISOString(),
    amount: totalAmount,
    tipAmount: intent.amount.tip,
    feeAllowance: intent.amount.feeAllowance,
    usdValue,
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
    ...(isCustom(token.id) && { payment_id: orderId }),
    third_party: true,
  };

  const command = new PutCommand({
    TableName: tables.on_hold_donations,
    Item: order,
  });

  //create order
  await apes.send(command);

  const order_description = `Donation to ${order.charityName}`;

  if (isCustom(token.id)) {
    const deposit_addr =
      process.env[`DEPOSIT_ADDR_${token.network.toUpperCase()}`];
    if (!deposit_addr) {
      return [500, "Deposit address not defined"];
    }
    return {
      id: order.transactionId,
      address: deposit_addr,
      amount: order.amount,
      currency: token.code,
      description: order_description,
      rate,
    } satisfies Payment;
  }

  const invoice = await np.invoice({
    price_amount: usdValue,
    price_currency: "usd",
    pay_currency: order.denomination,
    ipn_callback_url: npEnvs.webhookUrl,
    order_id: order.transactionId,
    order_description,
  });

  const p = await np.payment_invoice({
    iid: invoice.id,
    pay_currency: order.denomination,
    order_description,
    // nowpayments only simulates in test
    case: env === "production" ? undefined : "success",
  });

  return {
    id: p.payment_id,
    address: p.pay_address,
    extra_address: p.payin_extra_id ?? undefined,
    amount: p.pay_amount,
    currency: p.pay_currency,
    description: order_description,
    rate,
  };
}
