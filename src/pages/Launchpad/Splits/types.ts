import { TSplits } from "slices/launchpad/types";

/**
 * from UI:
 * min and max are based on locked
 * default is based on liquid
 */
export type FV = TSplits & { defaultMin: string };
