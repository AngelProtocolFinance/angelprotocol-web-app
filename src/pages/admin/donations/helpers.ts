import type { IDonationFinal } from "@better-giving/donation";
import type { IAllocation } from "@better-giving/endowment";

export interface IFees {
  base: number;
  fsa: number;
  processing: number;
  processing_allowance: number;
}

export interface IRow {
  id: string;
  date: string;
  currency: string;
  amount: number;
  amount_usd: number;
  net_usd: number;
  fees: IFees;
  fee_base: number;
  fee_fsa: number;
  fee_processing: number;
  fee_covered_by_donor: boolean;
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
  program_id: string;
  recipient_id: number;
  allocation?: IAllocation;
}

export const to_csv_row = (x: IDonationFinal): IRow => {
  const fees: IFees = {
    base: x.baseFee || 0,
    fsa: x.fiscalSponsorFee || 0,
    processing: Math.max(0, (x.usdValue || 0) - (x.settledUsdAmount || 0)),
    processing_allowance: x.feeAllowance || 0,
  };

  const pm = x.paymentMethod || (x.chainId !== "fiat" ? "Crypto" : x.fiatRamp);
  const row: IRow = {
    id: x.donationFinalTxHash || "",
    date: x.donationFinalTxDate || "",
    currency: x.denomination || "",
    amount: x.amount || 0,
    amount_usd: x.usdValue || 0,
    net_usd: x.donationFinalAmount || 0,
    fees,
    fee_base: fees.base,
    fee_fsa: fees.fsa,
    fee_processing: fees.processing,
    fee_covered_by_donor: fees.processing_allowance > 0,
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
    program_id: x.programId || "",
    recipient_id: x.endowmentId || 0,
    allocation: x.allocation,
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
