import { IS_TEST } from "./env";

export const allChainIds = [
  "56",
  "97",
  "42",
  "1",
  "juno-1",
  "uni-3",
  "phoenix-1",
  "pisco-1",
  "-1",
  "",
] as const;

export type ChainId = typeof allChainIds[number];

type ChainIdsType = {
  binance: ChainId;
  ethereum: ChainId;
  juno: ChainId;
  terra: ChainId;
  unsupported: ChainId;
  none: ChainId;
};
export const chainIds: ChainIdsType = {
  binance: IS_TEST ? "97" : "56",
  ethereum: IS_TEST ? "42" : "1",
  juno: IS_TEST ? "uni-3" : "juno-1",
  terra: IS_TEST ? "pisco-1" : "phoenix-1",
  unsupported: "-1",
  none: "",
};
