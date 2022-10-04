import { KYCData, Token } from "types/aws";

export interface DonateValues {
  amount: string;
  split_liq: string;
  //metadata;
  token: Token;
  min_liq: number;
  max_liq: number;
  charityId: number;
  isAgreedToTerms: boolean;
  kycData?: KYCData;
}

export type DonaterProps = Pick<DonateValues, "charityId"> & {
  //NOTE: fill this if there's limit on donation splits to be enforce
  max_liq?: number;
  min_liq?: number;

  //if provider, user will receive receipt right after donation
  kycData?: KYCData;
};
