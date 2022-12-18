import { Coin, LCDClient } from "types/terra";

const GAS_ADJUSTMENT = 1.6; //use gas units 60% greater than estimate

// https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
const GAS_PRICES = [
  //for classic, pisco is 0.15
  new Coin("uluna", 5.665),
];

export default function getTerraClient(chainID: string, lcd_url: string) {
  return new LCDClient({
    chainID,
    URL: lcd_url,
    gasAdjustment: GAS_ADJUSTMENT, //use gas units 20% greater than estimate
    gasPrices: GAS_PRICES,
  });
}
