import { chainIDs } from "types/chainIDs";
import { sc } from "types/sc";
import { VaultFieldIds, VaultMap } from "types/shared/widthdraw";
import { contracts } from "constants/contracts";

//NOTE: remove this hard-coded vaultMap once vault info is inluded in approved_vault_rate_list
export const vaultMap: VaultMap = {
  //mainnet vaults
  [contracts[chainIDs.mainnet][sc.anchor_vault1]]: {
    name: "Anchor Vault",
    fieldId: VaultFieldIds.anchor1_amount,
  },

  //testnet vaults
  [contracts[chainIDs.testnet][sc.anchor_vault1]]: {
    name: "Anchor Vault",
    fieldId: VaultFieldIds.anchor1_amount,
  },
  [contracts[chainIDs.testnet][sc.anchor_vault2]]: {
    name: "Anchor Vault",
    fieldId: VaultFieldIds.anchor2_amount,
  },
};
