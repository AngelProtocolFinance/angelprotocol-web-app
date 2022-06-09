import { chainIDs } from "constants/chainIDs";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import { VaultFieldIds, VaultMap } from "./types";

export const SEPARATOR = ":";

//NOTE: remove this hard-coded vaultMap once vault info is inluded in approved_vault_rate_list
export const vaultMap: VaultMap = {
  //mainnet vaults
  [contracts[chainIDs.terra_classic][sc.anchor_vault1]]: {
    name: "Anchor Vault",
    fieldId: VaultFieldIds.anchor1_amount,
  },
};
