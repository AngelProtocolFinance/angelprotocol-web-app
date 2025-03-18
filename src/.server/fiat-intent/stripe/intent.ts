import crypto from "node:crypto";
import { getMinFeeAllowance } from "@better-giving/donation/get-min-fee-allowance";
import type { DonationIntent } from "@better-giving/donation/intent";
import { getUsdRate } from "@better-giving/helpers-db";
import { getRecipient } from "@better-giving/helpers-donation";
import { PROCESSING_RATES } from "constants/common";
import { GetCommand, ap, apes } from "../../aws/db";
import { env } from "../../env";
import { getCustomerId } from ".server/stripe/get";

export default async function createIntent(intent: DonationIntent) {
  const recipient = await getRecipient(intent.recipient, env, ap);
  if (!recipient) return [404, `Recipient:${intent.recipient} not found`];

  const usdRate = await getUsdRate(apes, GetCommand, intent.amount.currency);

  /** check if fee allowance is sufficient */
  const donationAmount = intent.amount.amount + intent.amount.tip;
  if (intent.amount.feeAllowance) {
    const min = getMinFeeAllowance(
      donationAmount,
      PROCESSING_RATES.stripe,
      PROCESSING_RATES.stripe_flat * usdRate
    );
    if (intent.amount.feeAllowance < min) {
      return [400, `Fee allowance should be at least ${min}`];
    }
  }

  const amountToPay =
    intent.frequency === "one-time"
      ? donationAmount + intent.amount.feeAllowance
      : donationAmount;
  const currency = intent.amount.currency.toLowerCase();
  const intentTxId = crypto.randomUUID();

  // Get Customer ID
  const customerId = await getCustomerId(intent);

  // TODO: create payment intent or setup intent
  // TODO: return client secret
}
