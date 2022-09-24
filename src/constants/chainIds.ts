import { Chains } from "types/lists";
import { IS_TEST } from "./env";

export const chainIds: { [key in Chains]: string } = IS_TEST
  ? {
      binance: "97",
      ethereum: "42",
      juno: "uni-5",
      terra: "pisco-1",
    }
  : { binance: "56", ethereum: "1", juno: "juno-1", terra: "phoenix-1" };
