import crypto from "node:crypto";
import { getMinFeeAllowance } from "@better-giving/donation/get-min-fee-allowance";
import type { DonationIntent } from "@better-giving/donation/intent";
import { getUsdRate } from "@better-giving/helpers-db";
import { getRecipient } from "@better-giving/helpers-donation";
import { PROCESSING_RATES } from "constants/common";
import { GetCommand, ap, apes } from ".server/aws/db";
import { env } from ".server/env";
import { createPaymentIntent, createSetupIntent } from ".server/stripe/action";
import { getCustomerId } from ".server/stripe/get";
import { buildMetadata } from ".server/stripe/helpers";

export async function createStripeIntent(
  intent: DonationIntent
): Promise<{ clientSecret: string } | [number, string]> {
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

  // Build metadata
  const intentTxId = crypto.randomUUID();
  const metadata = buildMetadata(intentTxId, intent, recipient, usdRate);

  // Get Customer ID
  const customerId = await getCustomerId(
    intent.amount.currency,
    intent.donor.email
  );

  const clientSecret =
    intent.frequency === "one-time"
      ? await createPaymentIntent(intent.amount, metadata, customerId)
      : await createSetupIntent(intent.amount, metadata, customerId, usdRate);

  return { clientSecret };
}
