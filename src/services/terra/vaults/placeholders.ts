import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import { chainIDs } from "constants/chainIDs";
import { ExchangeMap } from "./types";

export const exchange_map: ExchangeMap = {
  [contracts[chainIDs.testnet][sc.anchor_vault1]]: "0",
  [contracts[chainIDs.testnet][sc.anchor_vault2]]: "0",
  [contracts[chainIDs.mainnet][sc.anchor_vault1]]: "0",
  [contracts[chainIDs.mainnet][sc.anchor_vault2]]: "0",
};
