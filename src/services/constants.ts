import { DonateClient, NetworkType } from "types/lists";
import { IS_AST, IS_TEST } from "constants/env";

export const network: NetworkType = IS_TEST ? "testnet" : "mainnet";
export const client: DonateClient = IS_AST ? "normal" : "apes";
export const GRAPHQL_ENDPOINT =
  "https://api.studio.thegraph.com/query/49156/angel-giving/v0.0.32";
