import { Dec } from "@terra-money/terra.js";

declare module "@types-shared/widthdraw" {
  enum VaultFieldIds {
    anchor1_amount = "anchor1_amount",
    anchor2_amount = "anchor2_amount",
  } // others
  type VaultInfo = {
    name: string;
    fieldId: VaultFieldIds;
    //other needed info
  };
  type VaultField = VaultInfo & { ustBalance: number };
  type VaultFieldLimits = {
    [key in VaultFieldIds]: { addr: string; limit: number; rate: number };
  };

  type VaultMap = { [index: string]: VaultInfo };
  type AmountInfo = { fieldId: VaultFieldIds; amount: Dec };
}
