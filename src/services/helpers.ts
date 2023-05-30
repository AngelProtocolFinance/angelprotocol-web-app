import { IS_TEST } from "constants/env";

/**
 *
 * @param v version number
 * @returns v{v} if not staging
 */
export const version = (v: number) => (IS_TEST ? `v${v}` : "staging");
//NOTE: staging usually runs on testnet
