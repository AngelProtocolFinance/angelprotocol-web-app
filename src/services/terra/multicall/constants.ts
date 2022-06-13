import { chainIDs } from "constants/chainIDs";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import { VaultFieldIds, VaultMap } from "./types";

//NOTE: remove this hard-coded vaultMap once vault info is inluded in approved_vault_rate_list
export const vaultMap: VaultMap = {
  //mainnet vaults
<<<<<<< HEAD:src/services/terra/multicall/constants.ts
  [contracts[chainIDs.terra_main][sc.anchor_vault1]]: {
    name: "Anchor Vault",
    fieldId: VaultFieldIds.anchor1_amount,
  },

  //testnet vaults
  [contracts[chainIDs.terra_test][sc.anchor_vault1]]: {
    name: "Anchor Vault",
    fieldId: VaultFieldIds.anchor1_amount,
  },
  [contracts[chainIDs.terra_test][sc.anchor_vault2]]: {
    name: "Anchor Vault",
    fieldId: VaultFieldIds.anchor2_amount,
  },
=======
  [contracts[chainIDs.terra_classic][sc.anchor_vault1]]: {
    name: "Anchor Vault",
    fieldId: VaultFieldIds.anchor1_amount,
  },
>>>>>>> master:src/components/Transactors/Withdrawer/constants.ts
};
