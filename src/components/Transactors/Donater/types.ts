import { WithBalance } from "services/types";

export interface DonateValues {
  amount: string;
  split_liq: string;
  //metadata;
  token: WithBalance;
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

interface ToFund {
  to: "fund";
  receiver?: number;
  max_liq?: number;
  min_liq?: number;
}

interface ToCharity {
  to: "charity";
  receiver: string;
  //doesn't know yet limits on charity donations
  max_liq?: number;
  min_liq?: number;
}

type FundFlow = ToFund | ToCharity | FromTCA;
export type DonaterProps = FundFlow & { isKycDonorOnly?: boolean };
