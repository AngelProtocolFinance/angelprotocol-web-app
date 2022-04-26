import { VaultMap } from "@types-shared/withdraw";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";

//NOTE: remove this hard-coded vaultMap once vault info is inluded in approved_vault_rate_list
export const vaultMap: VaultMap = {
  //mainnet vaults
  [contracts["columbus-5"][sc.anchor_vault1]]: {
    name: "Anchor Vault",
    fieldId: "anchor1_amount",
  },

  //testnet vaults
  [contracts["bombay-12"][sc.anchor_vault1]]: {
    name: "Anchor Vault",
    fieldId: "anchor1_amount",
  },
  [contracts["bombay-12"][sc.anchor_vault2]]: {
    name: "Anchor Vault",
    fieldId: "anchor2_amount",
  },
};
