import { type Donation, donation_item, pct } from "types/donations";
import { fallback, parse, safeParse } from "valibot";
import type { DBRecord } from "./types";

export const to_sorted = <T extends Record<string, any>>(
  list: T[],
  order: "asc" | "desc",
  attrName: keyof T
) => {
  return list.toSorted((a, b) => {
    if (order.toLowerCase() === "asc") {
      return a[attrName].localeCompare(b[attrName]);
    } else {
      return b[attrName].localeCompare(a[attrName]);
    }
  });
};

export function askerIsDonor(asker: string | number): asker is string {
  return typeof asker === "string";
}

export function to_items(records: DBRecord[], asker: string | number) {
  let items: Donation.Item[] = [];
  for (const r of records) {
    const splitLiq = parse(fallback(pct, 50), r.splitLiq);
    const amountForAsker = askerIsDonor(asker) ? r.usdValue : 0;
    const directDonateAmt = amountForAsker * (splitLiq / 100);
    const sfDonateAmt = amountForAsker - directDonateAmt;

    const donorAddress: Donation.Donor.Address = {
      line1: r.streetAddress ?? "",
      line2: r.addressComplement?.replace(/\s/g, ""),
      city: r.city,
      state: r.state,
      zip_code: r.zipCode,
      country: r.country ?? "",
    };

    const donor: Donation.Donor = {
      full_name: r.fullName || r.name || "",
      kyc_email: r.kycEmail || r.email || "",
      address: donorAddress,
      company: r.company_name || "",
    };

    const raw: Donation.ItemInput = {
      id: askerIsDonor(asker)
        ? r.transactionId
        : r.donationFinalTxHash || r.transactionId,
      donor_id: r.email || r.kycEmail || "",
      donor_details: donor,
      recipient_id: r.endowmentId,
      recipient_name: r.charityName,
      program_id: r.programId,
      program_name: r.programName,
      date: askerIsDonor(asker) ? r.transactionDate : r.donationFinalTxDate,
      payment_method: r.paymentMethod,
      symbol: r.denomination,
      init_amount: r.amount,
      init_amount_usd: r.usdValue,
      final_amount_usd: r.donationFinalAmount,
      direct_donate_amount: directDonateAmt !== 0 ? directDonateAmt : undefined,
      sf_donate_amount: sfDonateAmt !== 0 ? sfDonateAmt : undefined,
      split_liq_pct: splitLiq,
      is_recurring: r.isRecurring,
      app_used: r.appUsed as any,
      bank_verification_url:
        r.chainId === "fiat" ? r.stripeDepositVerifyUrl : undefined,
      via_id: r.chainId,
      via_name: r.chainId === "fiat" ? r.fiatRamp : r.chainName,
      payment_id: r.chainId !== "fiat" ? r.payment_id : undefined,
      allocation: r.allocation,
    };

    const item = safeParse(donation_item, raw);
    if (item.issues) continue;
    items.push(item.output);
  }
  return items;
}
