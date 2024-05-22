import type { TDonateMethod } from "types/components";

export type FV = {
  receiptMsg: string;
  hide_bg_tip: boolean;
  sfCompounded: boolean;
  programDonateDisabled: boolean;
  splitLockPct: number;
  splitFixed: boolean;
  /** in USD */
  payout_minimum: string;
  donateMethods: TDonateMethod[];
};
