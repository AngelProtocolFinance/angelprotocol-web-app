import type { IDonationFinal } from "@better-giving/donation";
import type { IAllocation } from "@better-giving/endowment";

export interface ICsvRow {
  id: string;
  date: string;
  currency: string;
  amount: string;
  usd_value: string;
  payment_method: string;
  frequency: string;
  program_name: string;
  donation_origin: string;
  donor_name: string;
  donor_email: string;
  donor_company: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface IRow extends ICsvRow {
  program_id: string;
  recipient_id: number;
  allocation?: IAllocation;
}

export const to_csv_row = (x: IDonationFinal): ICsvRow => {
  const pm = x.paymentMethod || (x.chainId !== "fiat" ? "Crypto" : x.fiatRamp);
  const row: ICsvRow = {
    id: x.donationFinalTxHash || "",
    date: x.donationFinalTxDate
      ? new Date(x.donationFinalTxDate).toLocaleDateString()
      : "",
    currency: x.denomination || "",
    amount: x.amount?.toString() || "0",
    usd_value: x.usdValue?.toString() || "0",
    payment_method: pm || "",
    frequency: x.isRecurring ? "monthly" : "one-time",
    program_name: x.programName || "",
    donation_origin: x.appUsed || "",
    donor_name: x.fullName || "",
    donor_email: x.email || x.kycEmail || "",
    donor_company: x.company_name || "",
    street: x.streetAddress || x.stateAddress || "",
    city: x.city || "",
    state: x.state || "",
    zip_code: x.zipCode || "",
    country: x.country || "",
  };
  return row;
};

export const to_row = (x: IDonationFinal): IRow => {
  const base = to_csv_row(x);
  return {
    ...base,
    program_id: x.programId || "",
    recipient_id: x.endowmentId || 0,
    allocation: x.allocation,
  };
};
