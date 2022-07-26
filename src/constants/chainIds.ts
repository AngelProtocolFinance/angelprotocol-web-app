import { UnsupportedNetworkError } from "errors/errors";
import { IS_TEST_ENV } from "./env";

const chainIdValues = [
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
];

const chainIdsConst = [...chainIdValues] as const;
export type ChainId = typeof chainIdsConst[number];

type ChainIdsType = {
  bnb: ChainId;
  eth: ChainId;
  juno: ChainId;
  terra: ChainId;
  unsupported: ChainId;
  none: ChainId;
};
export const chainIds: ChainIdsType = {
  bnb: IS_TEST_ENV ? "97" : "56",
  eth: IS_TEST_ENV ? "42" : "1",
  juno: IS_TEST_ENV ? "uni-3" : "juno-1",
  terra: IS_TEST_ENV ? "pisco-1" : "phoenix-1",
  unsupported: "-1",
  none: "",
};

export function parseChainId(chainId: string | number): ChainId {
  const chainIdString =
    typeof chainId === "string" ? chainId : chainId.toString();

  if (chainIdValues.includes(chainIdString)) {
    return chainIdString as ChainId;
  }

  throw new UnsupportedNetworkError(chainIdString);
}

export function isExpectedChain(chainId: ChainId): boolean {
  return Object.values(chainIds).some(
    (expectedChainId) => expectedChainId === chainId
  );
}
