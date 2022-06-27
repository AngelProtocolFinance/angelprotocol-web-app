import { Dwindow } from "types/ethereum";
import { SigningCosmWasmClient, StdFee } from "types/third-party/cosmjs";
import { WalletDisconnectError } from "errors/errors";
import { junoChainId } from "constants/chainIDs";
import { junoDenom } from "constants/currency";
import { junoRpcUrl } from "constants/urls";

export { parseRawLog } from "@cosmjs/stargate/build/logs";
export { toUtf8, fromUtf8 } from "@cosmjs/encoding";

const GAS_PRICE =
  "0.0625"; /**TODO: uni-3 and juno-1 have diff gas prices for fee display only, 
  actual rate during submission is set by wallet - can be overridden with custom but keplr is buggy when customizing  */
const GAS_ADJUSTMENT = 1.5;
export async function getCosmosClient(): Promise<SigningCosmWasmClient> {
  const dwindow = window as Dwindow;
  if (!dwindow.keplr) {
    throw new WalletDisconnectError();
  }
  const offlineSigner = dwindow.keplr.getOfflineSigner(junoChainId);
  return await SigningCosmWasmClient.connectWithSigner(
    junoRpcUrl,
    offlineSigner
  );
}

export function getFee(gasLimit: number) {
  return {
    amount: [{ denom: junoDenom, amount: GAS_PRICE }],
    gas: `${Math.round(gasLimit * GAS_ADJUSTMENT)}`,
  };
}

export function getFeeNum(fee: StdFee) {
  return parseInt(fee.amount[0].amount) * 1e6;
}
