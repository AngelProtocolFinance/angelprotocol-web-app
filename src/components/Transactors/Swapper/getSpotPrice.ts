import Decimal from "decimal.js";
import { Simulation } from "types/contracts";
import { scale } from "helpers";

export function getSpotPrice(simul: Simulation, offer = 1) {
  if (simul.is_placeholder) {
    return new Decimal(0);
  }
  const return_amount = new Decimal(simul.return_amount);
  return scale(offer).div(return_amount);
}
