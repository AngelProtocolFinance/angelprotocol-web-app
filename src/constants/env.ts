import isMobile from "is-mobile";
import { NetworkType } from "types/aws";

export const IS_MOBILE = isMobile();
export const IS_TEST = process.env.REACT_APP_NETWORK === "TESTNET";

export const EXPECTED_NETWORK_TYPE: NetworkType = IS_TEST
  ? "testnet"
  : "mainnet";
