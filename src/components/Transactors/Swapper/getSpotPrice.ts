import { Dec } from "@terra-money/terra.js";
import { Simulation } from "types/services/terra/lp";

export function getSpotPrice(simul: Simulation, offer = 1) {
  if (simul.is_placeholder) {
    return new Dec(0);
  }
  const return_amount = new Dec(simul.return_amount);
  const offer_amount = new Dec(offer).mul(1e6);

  return offer_amount.div(return_amount);
}
