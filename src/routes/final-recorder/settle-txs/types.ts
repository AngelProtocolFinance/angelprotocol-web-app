import type { IDonationFinalAttr } from "@better-giving/donation";
import type { IAllocation } from "@better-giving/endowment";

export type Base = Pick<
  IDonationFinalAttr,
  | "transactionDate"
  | "network"
  | "isRecurring"
  | "denomination"
  //via
  | "appUsed"
  | "chainId"
  | "chainName"
  | "fiatRamp"
  | "paymentMethod"
  //to
  | "programId"
  | "programName"

  //from
  | "donor_public"
  | "donor_message"
  | "email"
  | "title"
  | "fullName"
  | "streetAddress"
  | "state"
  | "city"
  | "country"
  | "zipCode"
  | "company_name"

  //tribute
  | "inHonorOf"
  | "tributeNotif"

  // settlement
  | "destinationChainId"
  | "donationFinalChainId"
  | "donationFinalDenom"
  | "donationFinalTxDate"
  | "donationFinalTxHash"
>;

export type Uniques = Omit<IDonationFinalAttr, keyof Base>;

export interface Overrides {
  input: number;
  inputUsd: number;
  /** usd, net of processing fee */
  settled: number;
  /** usd, net of bg fees fsa, base */
  net: number;
  /** usd */
  feeAllowance: number;
  /** usd */
  excessFeeAllowance: number;
  referrer?: {
    id: string;
    commission: IDonationFinalAttr["referrer_commission"];
  };
  /** usd */
  fees: {
    base: number;
    processing: number;
    fsa: number;
  };
  txId: string;
  /** exclusive for tips */
  parentTx?: string;

  /** exclusive for donations originating from fundraiser */
  fundTx?: string;
  fundId?: string;
  fundName?: string;

  endowId: number;
  endowName: string;
  claimed: boolean;
  fiscal_sponsored: boolean;
  msg_to_npo?: string;
  allocation: IAllocation;
}
