import { Dec } from "@terra-money/terra.js";

export enum VaultFieldIds {
  anchor1_amount = "anchor1_amount",
  anchor2_amount = "anchor2_amount",
} // others
type VaultInfo = {
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
