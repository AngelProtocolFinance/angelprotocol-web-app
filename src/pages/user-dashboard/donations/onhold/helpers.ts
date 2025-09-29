import type { IDonationOnHold, TOnHoldStatus } from "@better-giving/donation";

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
  status: TOnHoldStatus;
  payment_id?: string;
  stripe_continue_url?: string;
}

export const to_row = (x: IDonationOnHold): IRow => {
  const pm = x.paymentMethod || (x.chainId !== "fiat" ? "Crypto" : x.fiatRamp);
  const row: IRow = {
    id: x.transactionId,
    date: new Date(x.transactionDate).toLocaleDateString(),
    currency: x.denomination,
    amount: x.amount,
    recipient_id: x.endowmentId,
    recipient_name: x.charityName,
    usd_value: x.usdValue,
    payment_method: pm || "",
    frequency: x.isRecurring ? "monthly" : "one-time",
    program_id: x.programId,
    program_name: x.programName,
    stripe_continue_url: x.stripeDepositVerifyUrl,
    status: x.status,
  };
  return row;
};
