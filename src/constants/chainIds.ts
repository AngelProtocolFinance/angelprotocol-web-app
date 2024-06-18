import type { ChainID } from "types/chain";
import type { Chains } from "types/lists";
import { IS_TEST } from "./env";

export const chainIds: { [key in Chains]: ChainID } = IS_TEST
  ? {
      arbitrum: "421614",
      optimism: "11155420",
      base: "84532",
      binance: "97",
      ethereum: "11155111",
      juno: "uni-6",
      polygon: "80002",
      terra: "pisco-1",
    }
  : {
      arbitrum: "42161",
      optimism: "10",
      base: "8453",
      binance: "56",
      ethereum: "1",
      juno: "juno-1",
      stargaze: "stargaze-1",
      kujira: "kaiyo-1",
      polygon: "137",
      terra: "phoenix-1",
    };
