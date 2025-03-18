import type { StripeDonation } from "@better-giving/donation";
import type { DonationIntent } from "@better-giving/donation/intent";
import type { Recipient } from "@better-giving/helpers-donation";
import type { Environment } from "@better-giving/types/list";
import type Stripe from "stripe";

export type BuildMetaData = (
  transactionId: string,
  payload: DonationIntent,
  recipient: Recipient,
  env: Environment,
  /** The amount of `currency` per 1 USD */
  usdRate: number
) => StripeDonation.Metadata;

/** Fetches most appropriate Customer Profile to use, returns Customer ID */
export type GetCustomerId = (
  intent: DonationIntent
) => Promise<Stripe.Customer["id"]>;

/**
 * Sanitizes specific payload, creates Subscription object, and returns client secret
 * @throws if client secret is null
 */
export type Processor = (
  stripe: Stripe,
  payload: DonationIntent,
  recipient: Recipient,
  env: Environment,
  /** The amount of `currency` per 1 USD */
  usdRate: number
) => Promise<string>;
