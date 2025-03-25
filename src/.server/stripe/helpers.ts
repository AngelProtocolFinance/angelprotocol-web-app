import type { StripeDonation } from "@better-giving/donation";
import type { DonationIntent } from "@better-giving/donation/intent";
import { roundNumber } from "@better-giving/helpers";
import type { Recipient } from "@better-giving/helpers-donation";
import { env } from ".server/env";

export const buildMetadata = (
  transactionId: string,
  intent: DonationIntent,
  recipient: Recipient,
  usdRate: number
): StripeDonation.Metadata => {
  const totalAmount =
    intent.amount.amount + intent.amount.tip + intent.amount.feeAllowance;

  return {
    transactionId,
    amount: String(totalAmount),
    tipAmount: String(intent.amount.tip),
    feeAllowance: String(intent.amount.feeAllowance),
    usdValue: String(totalAmount / usdRate),
    appUsed: intent.source,
    chainId: "fiat",
    chainName: "Fiat",
    charityName: recipient.name,
    nonProfitMsg: recipient.receiptMsg,
    denomination: intent.amount.currency.toUpperCase(),
    destinationChainId: "fiat",
    donationFinalized: "false",
    email: intent.donor.email,
    endowmentId: recipient.npo.id.toString(),

    fund_id: recipient.fund.id,
    fund_name: recipient.name,
    fund_members: recipient.fund.members.join(","),

    programId: intent.program?.id,
    programName: intent.program?.name,
    inHonorOf: intent.tribute?.fullName,
    tributeNotif: JSON.stringify(intent.tribute?.notif),
    fiatRamp: "STRIPE",
    claimed: String(recipient.claimed),
    fiscalSponsored: String(recipient.fiscal_sponsored),
    hideBgTip: String(recipient.hide_bg_tip),
    network: env,
    splitLiq: "100",
    status: "intent",
    transactionDate: new Date().toISOString(),
    // KYC fields
    kycEmail: intent.donor.email,
    title: intent.donor?.title || undefined,
    fullName: `${intent.donor.firstName} ${intent.donor.lastName}`,
    ...intent.donor.address,
    ukGiftAid: String(intent.donor.address?.ukGiftAid ?? false),
  };
};

/** @see {@link https://stripe.com/docs/currencies#zero-decimal} */
export const convertToAtomicFormat = (
  amount: number,
  currency: string
): number => {
  const zeroDecimals = [
    "BIF",
    "CLP",
    "DJF",
    "GNF",
    "JPY",
    "KMF",
    "KRW",
    "MGA",
    "PYG",
    "RWF",
    "UGX",
    "VND",
    "VUV",
    "XAF",
    "XOF",
    "XPF",
  ];
  const threeDecimals = ["BHD", "JOD", "KWD", "OMR", "TND"];

  const _currency = currency.toUpperCase();

  // Uses `roundNumber()` to ensure that we don't have decimal overflow
  if (zeroDecimals.includes(_currency)) return roundNumber(amount, 0);
  if (threeDecimals.includes(_currency))
    return Math.trunc(roundNumber(amount, 3) * 1000);
  return Math.trunc(roundNumber(amount, 2) * 100); // two decimals
};
