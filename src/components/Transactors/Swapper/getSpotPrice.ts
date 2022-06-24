import Decimal from "decimal.js";
import { Simulation } from "types/server/contracts";

export function getSpotPrice(simul: Simulation, offer = 1) {
  if (simul.is_placeholder) {
    return new Decimal(0);
  }
  const return_amount = new Decimal(simul.return_amount);
  const offer_amount = new Decimal(offer).mul(1e6);

  return offer_amount.div(return_amount);
}
