import { VaultMap } from "types/shared/withdraw";
import { contracts } from "constants/contracts";

//NOTE: remove this hard-coded vaultMap once vault info is inluded in approved_vault_rate_list
export const vaultMap: VaultMap = {
  //mainnet vaults
  [contracts.anchor_vault1]: {
    name: "Anchor Vault",
    fieldId: "anchor1_amount",
  },
  [contracts.anchor_vault2]: {
    name: "Anchor Vault",
    fieldId: "anchor2_amount",
  },
};
