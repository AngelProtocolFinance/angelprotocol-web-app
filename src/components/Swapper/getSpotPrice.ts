import { Dec } from "@terra-money/terra.js";
import { PoolBalance, Simulation } from "services/terra/types";
export function getSpotPrice(simul: Simulation, pool_balance: PoolBalance) {
  if (simul.is_placeholder || pool_balance.is_placeholder) {
    return 0;
  }

  const native_weight = new Dec(simul.offer_weight);
  const token_weight = new Dec(simul.ask_weight);

  const native_balance = new Dec(pool_balance.native_token);
  const token_balance = new Dec(pool_balance.token);

  /**
   * let BO(offer_balance), WO(offer_weight) -> offer is native(UST)
   * let BR(return_balance), WR(return_weight) -> return/ask is token(HALO)
   *
   * https://dev.balancer.fi/resources/pool-math/weighted-math
   * spot price = (BO/WO)/(BR/WR)
   */
  const native_ratio = native_balance.div(native_weight);
  const token_ratio = token_balance.div(token_weight);
  //if offer is ust, ust/halo
  return native_ratio.div(token_ratio).toNumber();
}
