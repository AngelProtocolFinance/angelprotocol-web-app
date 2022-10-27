import { KYCData } from "types/aws";
import { TokenWithAmount } from "slices/donation";

export interface DonateValues {
  amount: string;
  split_liq: string;
  //metadata;
  token: TokenWithAmount;
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
