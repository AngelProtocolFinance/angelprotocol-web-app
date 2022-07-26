import { Coin, LCDClient } from "@terra-money/terra.js";
import { ChainId } from "constants/chainIds";
import { denoms } from "constants/currency";

const GAS_ADJUSTMENT = 1.6; //use gas units 60% greater than estimate

// https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
const GAS_PRICES = [
  new Coin(denoms.uusd, 0.15),
  //for classic, pisco is 0.15
  new Coin(denoms.uluna, 5.665),
];

export default function getTerraClient(chain_id: ChainId, lcd_url: string) {
  return new LCDClient({
    chainID: chain_id,
    URL: lcd_url,
    gasAdjustment: GAS_ADJUSTMENT, //use gas units 20% greater than estimate
    gasPrices: GAS_PRICES,
  });
}
