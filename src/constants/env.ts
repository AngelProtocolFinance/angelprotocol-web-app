import { chainIDs } from "./chainIDs";

export const IS_TEST = process.env.REACT_APP_NETWORK === "TESTNET";
export const terraChainId = IS_TEST ? chainIDs.terra_test : chainIDs.terra_main;
