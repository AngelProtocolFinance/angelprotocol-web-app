import { Token } from "types/aws";

export interface DonateValues {
  amount: string;
  split_liq: string;
  //metadata;
  token: Token;
  min_liq: number;
  max_liq: number;
  to: "tca" | "fund" | "charity";
  receiver?: number | string;
  isAgreedToTerms: boolean;
  isKycDonorOnly?: boolean;
}

interface FromTCA {
  to: "tca";
  receiver?: never;
  max_liq?: never;
  min_liq?: never;
}

interface ToFundOrCharity {
  to: "fund" | "charity";
  receiver: number;
  //doesn't know yet limits on charity donations
  max_liq?: number;
  min_liq?: number;
}

type FundFlow = ToFundOrCharity | FromTCA;
export type DonaterProps = FundFlow & { isKycDonorOnly?: boolean };
