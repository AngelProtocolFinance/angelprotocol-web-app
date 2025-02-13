import { type Donation, donationItem, pct } from "types/donations";
import { fallback, parse, safeParse } from "valibot";
import type { DBRecord } from "./types";

export const toSorted = <T extends Record<string, any>>(
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

export function toItems(records: DBRecord[], asker: string | number) {
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
      zipCode: r.zipCode,
      country: r.country ?? "",
    };

    const donor: Donation.Donor = {
      fullName: r.fullName || r.name || "",
      kycEmail: r.kycEmail || r.email || "",
      address: donorAddress,
    };

    const raw: Donation.ItemInput = {
      id: r.transactionId,
      donorId: r.email || r.kycEmail || "",
      donorDetails: donor,
      recipientId: r.endowmentId,
      recipientName: r.charityName,
      programId: r.programId,
      programName: r.programName,
      date: r.transactionDate,
      paymentMethod: r.paymentMethod,
      symbol: r.denomination,
      initAmount: r.amount,
      initAmountUsd: r.usdValue,
      finalAmountUsd: r.donationFinalAmount,
      directDonateAmount: directDonateAmt !== 0 ? directDonateAmt : undefined,
      sfDonateAmount: sfDonateAmt !== 0 ? sfDonateAmt : undefined,
      splitLiqPct: splitLiq,
      isRecurring: r.isRecurring,
      appUsed: r.appUsed as any,
      bankVerificationUrl:
        r.chainId === "fiat" ? r.stripeDepositVerifyUrl : undefined,
      viaId: r.chainId,
      viaName: r.chainId === "fiat" ? r.fiatRamp : r.chainName,
      payment_id: r.chainId !== "fiat" ? r.payment_id : undefined,
    };

    const item = safeParse(donationItem, raw);
    if (item.issues) continue;
    items.push(item.output);
  }
  return items;
}
