import { KYCData, Token } from "types/aws";

export interface DonateValues {
  amount: string;
  //metadata;
  charityId: number;
  charityName: string;
  profileUrl: string | undefined;
  isAgreedToTerms: boolean;
  kycData?: KYCData;
  max_liq: number;
  min_liq: number;
  split_liq: string;
  token: Token;
}

export type DonaterProps = Pick<
  DonateValues,
  "charityId" | "charityName" | "profileUrl"
> & {
  //NOTE: fill this if there's limit on donation splits to be enforce
  max_liq?: number;
  min_liq?: number;

  //if provider, user will receive receipt right after donation
  kycData?: KYCData;
};
