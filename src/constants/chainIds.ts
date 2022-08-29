import { Chains } from "types/lists";
import { IS_TEST } from "./env";

export const chainIds: { [key in Chains]: string } = IS_TEST
  ? {
      binance: "97",
      ethereum: "42",
      juno: "uni-3",
      terra: "pisco-1",
    }
  : { binance: "56", ethereum: "1", juno: "juno-1", terra: "phoenix-1" };

export const chainNames: { [key in Chains]: string } = IS_TEST
  ? {
      binance: "Binance Testnet",
      ethereum: "Ethereum Kovan Testnet",
      juno: "Juno Testnet",
      terra: "Terra Testnet",
    }
  : {
      binance: "Binance Smart Chain",
      ethereum: "Ethereum Mainnet",
      juno: "Juno Mainnet",
      terra: "Terra Mainnet",
    };
