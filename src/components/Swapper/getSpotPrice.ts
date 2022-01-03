import { Dec } from "@terra-money/terra.js";
import { Simulation } from "services/terra/types";
export function getSpotPrice(simul: Simulation, offer = 1_000_000) {
  if (simul.is_placeholder) {
    return new Dec(0);
  }
  const return_amount = new Dec(simul.return_amount);
  const offer_amount = new Dec(offer);

  return offer_amount.div(return_amount);
}
