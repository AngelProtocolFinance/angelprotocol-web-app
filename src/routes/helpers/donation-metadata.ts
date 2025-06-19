import type { OnHoldDonation, StripeDonation } from "@better-giving/donation";
import type Stripe from "stripe";

import type { Entries } from "type-fest";
export const to_metadata = (
  order: OnHoldDonation.FiatDBRecord
): StripeDonation.Metadata => {
  const obj: Stripe.Metadata = {};
  const entries = Object.entries(order) as Entries<OnHoldDonation.FiatDBRecord>;
  for (const [k, v] of entries) {
    const key = k.toString();
    if (v == null) continue;
    if (Array.isArray(v)) {
      obj[key] = v.join(",");
      continue;
    }
    if (typeof v === "object") {
      obj[key] = JSON.stringify(v);
      continue;
    }
    obj[key] = String(v);
  }
  return obj as StripeDonation.Metadata;
};

/**
 *
 * @param method only known at webhook handling
 */

interface Additional {
  payment_method?: string;
  verify_url?: string;
}

export const to_onhold = (
  m: StripeDonation.Metadata,
  additional?: Additional
) => {
  const x: OnHoldDonation.FiatDBRecord = {
    fiatRamp: "STRIPE",
    transactionDate: m.transactionDate,
    transactionId: m.transactionId,
    amount: +m.amount,
    usdValue: +m.usdValue,
    appUsed: m.appUsed as any,
    chainName: m.chainName,
    charityName: m.charityName,
    nonProfitMsg: m.nonProfitMsg,
    denomination: m.denomination,
    donationFinalized: false,
    endowmentId: +m.endowmentId,
    donor_message: m.donor_message,
    fund_id: m.fund_id,
    fund_name: m.fund_name,
    fund_members: m.fund_members?.split(",").map(Number),
    programId: m.programId,
    programName: m.programName,
    inHonorOf: m.inHonorOf,
    tributeNotif: m.tributeNotif && JSON.parse(m.tributeNotif),
    claimed: m.claimed === "true",
    fiscalSponsored: m.fiscalSponsored === "true",
    hideBgTip: m.hideBgTip === "true",
    network: m.network as any,
    splitLiq: m.splitLiq,
    email: m.email,
    fullName: m.fullName,
    company_name: m.company_name,
    kycEmail: m.kycEmail ?? m.email,
    title: m.title,
    ukGiftAid: m.ukGiftAid === "true",
    isRecurring: m.isRecurring === "true",
    ...("country" in m && {
      streetAddress: m.streetAddress!,
      city: m.city!,
      state: m.state!,
      zipCode: m.zipCode!,
      country: m.country!,
    }),
    chainId: "fiat",
    destinationChainId: "fiat",

    status: m.status as any,

    //additionals
    stripeDepositVerifyUrl: additional?.verify_url,
    paymentMethod: additional?.payment_method,
  };

  if (m.expireAt) {
    x.expireAt = +m.expireAt;
  }
  if (m.tipAmount) {
    x.tipAmount = +m.tipAmount;
  }
  if (m.feeAllowance) {
    x.feeAllowance = +m.feeAllowance;
  }
  if (m.donor_public) {
    x.donor_public = m.donor_public === "true";
  }

  if (m.msg_to_npo) {
    x.msg_to_npo = m.msg_to_npo;
  }

  return x;
};
