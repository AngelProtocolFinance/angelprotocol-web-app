import { Coin, LCDClient } from "@terra-money/terra.js";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { WalletDisconnectError, WrongNetworkError } from "errors/errors";
import { terraChainId } from "constants/chainIDs";
import { denoms } from "constants/currency";

const GAS_ADJUSTMENT = 1.6; //use gas units 60% greater than estimate

// https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
const GAS_PRICES = [
  new Coin(denoms.uusd, 0.15),
  //for classic, pisco is 0.15
  new Coin(denoms.uluna, 5.665),
];

export default function getTerraClient(wallet: WalletState | undefined) {
  if (!wallet) {
    throw new WalletDisconnectError();
  }
  if (wallet.chain.chain_id !== terraChainId) {
    throw new WrongNetworkError("Terra", terraChainId);
  }

  return new LCDClient({
    chainID: wallet.chain.chain_id,
    URL: wallet.chain.lcd_url,
    gasAdjustment: GAS_ADJUSTMENT, //use gas units 20% greater than estimate
    gasPrices: GAS_PRICES,
  });
}
