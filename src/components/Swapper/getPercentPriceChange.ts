import { Dec } from "@terra-money/terra.js";
import { Simulation } from "services/terra/types";
export default function getPercentPriceChange(
  simul_offer: number,
  simul: Simulation,
  price: number,
  is_buy: boolean
) {
  const lag_price = new Dec(price);
  const simul_price = new Dec(simul_offer).mul(1e6).div(simul.return_amount);
  //if buying halo, new_price is ust/halo otherwise, halo/ust
  const ust_price = is_buy ? simul_price : new Dec(1).div(simul_price);

  return lag_price.lte(0)
    ? 0
    : ust_price.sub(lag_price).div(lag_price).mul(100).toNumber();
}
