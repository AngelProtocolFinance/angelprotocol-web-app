import { EndowmentDetails } from "types/contracts";

export default function isNeedApPermission(
  {
    maturity_height = 0,
    withdraw_before_maturity,
    endow_type,
  }: EndowmentDetails,
  height: number
) {
  if (endow_type === "Charity") {
    return true;
  }
  /**
   * TODO: factor in maturity_time, once AIF is integrated with which maturity_time can be set
   *.NOTE: for endow_type(Charity), withdraw_before_maturity is currently defaulted to False
   */
  return maturity_height < height && !withdraw_before_maturity;
}
