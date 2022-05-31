import { Token } from "types/server/aws";
import { VaultMap } from "types/shared/withdraw";
import lunaIcon from "assets/icons/currencies/luna.png";
import { chainIDs } from "constants/chainIDs";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";

/**
 * 
 * min_denom: string;
  symbol: string;
  cw20_contract?: {
    mainnet: string;
    testnet?: string;
  };
  logo: string;
  decimals: number;
 */

export const tokens: Token[] = [
  {
    min_denom: "uluna",
    symbol: "LUNA",
    logo: lunaIcon,
    decimals: 6,
  },
];

//NOTE: remove this hard-coded vaultMap once vault info is inluded in approved_vault_rate_list
export const vaultMap: VaultMap = {
  //mainnet vaults
  [contracts[chainIDs.terra_main][sc.anchor_vault1]]: {
    name: "Anchor Vault",
    fieldId: "anchor1_amount",
  },

  //testnet vaults
  [contracts[chainIDs.terra_test][sc.anchor_vault1]]: {
    name: "Anchor Vault",
    fieldId: "anchor1_amount",
  },
  [contracts[chainIDs.terra_test][sc.anchor_vault2]]: {
    name: "Anchor Vault",
    fieldId: "anchor2_amount",
  },
};
