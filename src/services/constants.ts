import { NetworkType } from "types/lists";
import { IS_TEST } from "constants/env";

export const network: NetworkType = IS_TEST ? "testnet" : "mainnet";
