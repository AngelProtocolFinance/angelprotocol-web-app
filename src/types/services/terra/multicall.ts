import { Dec } from "@terra-money/terra.js";

//endowment balance transform
export type RateLookUp = { [index: string]: string };
export type EndowmentBalance = {
  liquid: number;
  locked: number;
  total: number;
};

export enum VaultFieldIds {
  anchor1_amount = "anchor1_amount",
  anchor2_amount = "anchor2_amount",
} // others
export type VaultInfo = {
  name: string;
  fieldId: VaultFieldIds;
  //other needed info
};
export type VaultField = VaultInfo & { ustBalance: number };
export type VaultFieldLimits = {
  [key in VaultFieldIds]: { addr: string; limit: number; rate: number };
};

export type VaultMap = { [index: string]: VaultInfo };
export type AmountInfo = { fieldId: VaultFieldIds; amount: Dec };

export type ClaimInquiry = {
  is_claimed: boolean;
};
export type Airdrop = {
  stage: number;
  haloTokens: string; // uhalo amount
  proof: string[];
};
export type Airdrops = Airdrop[];
