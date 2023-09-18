import { IS_TEST } from "constant/env";

/**
 *
 * @param v version number
 * @returns v{v} if not staging
 */
export const version = (v: number) => (IS_TEST ? "staging" : `v${v}`);
//NOTE: staging usually runs on testnet
