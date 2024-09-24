import type { TDonateMethod } from "types/components";

export type FV = {
  receiptMsg: string;
  hide_bg_tip: boolean;
  programDonateDisabled: boolean;
  donateMethods: TDonateMethod[];
};
