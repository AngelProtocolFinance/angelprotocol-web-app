import { EndowmentDetails } from "types/contracts";

export function isNeedApPermission(
  { maturity_height = 0, withdraw_before_maturity }: EndowmentDetails,
  height: number
) {
  /**
   * TODO: factor in maturity_time, once AIF is integrated with which maturity_time can be set
   *.NOTE: for endow_type(Charity), withdraw_before_maturity is currently defaulted to False
   */
  return maturity_height < height && !withdraw_before_maturity;
}
