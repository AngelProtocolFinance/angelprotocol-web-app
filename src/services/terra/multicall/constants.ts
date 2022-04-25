import { VaultMap } from "@types-shared/withdraw";
import { chainIDs } from "constants/chainIDs";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";

//NOTE: remove this hard-coded vaultMap once vault info is inluded in approved_vault_rate_list
export const vaultMap: VaultMap = {
  //mainnet vaults
  [contracts[chainIDs.mainnet][sc.anchor_vault1]]: {
    name: "Anchor Vault",
    fieldId: "anchor1_amount",
  },

  //testnet vaults
  [contracts[chainIDs.testnet][sc.anchor_vault1]]: {
    name: "Anchor Vault",
    fieldId: "anchor1_amount",
  },
  [contracts[chainIDs.testnet][sc.anchor_vault2]]: {
    name: "Anchor Vault",
    fieldId: "anchor2_amount",
  },
};
