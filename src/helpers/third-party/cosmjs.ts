import { Dwindow } from "types/ethereum";
import { SigningCosmWasmClient, StdFee } from "types/third-party/cosmjs";
import { WalletDisconnectError } from "errors/errors";
import { junoChainId } from "constants/chainIDs";
import { junoDenom } from "constants/currency";
import { junoRpcUrl } from "constants/urls";

export { parseRawLog } from "@cosmjs/stargate/build/logs";

const GAS_PRICE = "0.0625"; //TODO: uni-3 and juno-1 have diff gas price
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
