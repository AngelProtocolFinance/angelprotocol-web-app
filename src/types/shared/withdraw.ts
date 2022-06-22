import { Dec } from "@terra-money/terra.js";

export type VaultFieldIds = "anchor1_amount" | "anchor2_amount";
// others
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
