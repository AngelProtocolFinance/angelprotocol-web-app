import type { Donation } from "@better-giving/donation";
import type { Allocation } from "@better-giving/donation/schema";

export type Base = Pick<
  Donation.V2DBRecord,
  | "transactionDate"
  | "email"
  | "inHonorOf"
  | "tributeNotif"
  | "appUsed"
  | "denomination"
  | "splitLiq"
  | "chainId"
  | "chainName"
  // not speficied for fund donations
  | "programId"
  | "fiatRamp"
  // not speficied for fund donations
  | "programName"
  | "client"
  | "network"
  | "paymentMethod"
  | "isRecurring"
  | "destinationChainId"
  | "donationFinalChainId"
  | "donationFinalTxDate"
  | "donationFinalTxHash"
  | "donationFinalDenom"
  | "company_name"
> &
  (Donation.WithKYC | Donation.WithoutKYC);

export type Uniques = Omit<Donation.V2DBRecord, keyof Base>;

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
    commission: Donation.ReferrerCommission;
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
  allocation: Allocation;
}
