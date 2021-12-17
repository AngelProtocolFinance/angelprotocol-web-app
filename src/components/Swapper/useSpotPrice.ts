import { Dec } from "@terra-money/terra.js";
import { useEffect, useState } from "react";
import { PoolBalance, Simulation } from "services/terra/types";
export default function useSpotPrice(
  simul: Simulation,
  pool_balance: PoolBalance
) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (simul.is_placeholder || pool_balance.is_placeholder) {
      return;
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
    const spot_price = native_ratio.div(token_ratio).toNumber();
    setPrice(spot_price);
  }, [simul, pool_balance]);

  return price;
}
