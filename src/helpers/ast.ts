import { Splits } from "types/ast";
import { AccountsSplitDetails } from "types/contracts";

//// converter ////
export const toFormSplit = (
  split: AccountsSplitDetails,
  isCustom: boolean
): Splits => ({
  isCustom,
  default: split.defaultSplit.toString(),
  //liquid to locked
  min: `${100 - split.max}`,
  max: `${100 - split.min}`,
});

export const toContractSplit = (split: Splits): AccountsSplitDetails => ({
  //locked to liquid
  max: 100 - +split.min,
  min: 100 - +split.max,
  //already in liquid format
  defaultSplit: +split.default,
});
