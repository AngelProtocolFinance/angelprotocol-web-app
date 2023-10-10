import { NetworkType } from "types/lists";
import { IS_TEST } from "constant/env";

export const network: NetworkType = IS_TEST ? "testnet" : "mainnet";
