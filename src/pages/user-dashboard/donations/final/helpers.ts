import type { IDonationFinal } from "@better-giving/donation";

export interface IRow {
  id: string;
  date: string;
  currency: string;
  amount: number;
  usd_value: number;
  payment_method: string;
  frequency: string;
  recipient_id: number;
  recipient_name: string;
  program_id?: string;
  program_name?: string;
}

export const to_row = (x: IDonationFinal): IRow => {
  const pm = x.paymentMethod || (x.chainId !== "fiat" ? "Crypto" : x.fiatRamp);
  const row: IRow = {
    id: x.transactionId,
    date: x.transactionDate
      ? new Date(x.transactionDate).toLocaleDateString()
      : "",
    currency: x.denomination || "",
    amount: x.amount || 0,
    recipient_id: x.endowmentId || 0,
    recipient_name: x.charityName || "",
    usd_value: x.usdValue || 0,
    payment_method: pm || "",
    frequency: x.isRecurring ? "monthly" : "one-time",
    program_id: x.programId,
    program_name: x.programName,
  };
  return row;
};
