import { chainIDs } from "./chainIDs";

export const IS_DEV = process.env.NODE_ENV === "development";
export const terraChainId = IS_DEV ? chainIDs.terra_test : chainIDs.terra_main;
