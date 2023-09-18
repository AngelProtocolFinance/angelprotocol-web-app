import { IS_AST, IS_TEST } from "constant/env";
import { DonateClient, NetworkType } from "types/lists";

export const network: NetworkType = IS_TEST ? "testnet" : "mainnet";
export const client: DonateClient = IS_AST ? "normal" : "apes";
