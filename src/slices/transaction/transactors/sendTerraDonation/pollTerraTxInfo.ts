import { TxInfo } from "@terra-money/terra.js";
import { TxResultFail } from "errors/errors";
import { terraChainId } from "constants/chainIDs";
import { terraLcdUrl } from "constants/urls";

export async function pollTerraTxInfo(
  txhash: string,
  retries: number,
  interval: number
): Promise<TxInfo> {
  const req = new Request(`${terraLcdUrl}/txs/${txhash}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  await new Promise((r) => {
    setTimeout(r, interval);
  });
  return fetch(req).then((res) => {
    if (res.status === 200) {
      return res.json() as unknown as TxInfo;
    }
    if (retries > 0 || res.status === 400) {
      return pollTerraTxInfo(txhash, retries - 1, interval);
    }
    throw new TxResultFail(terraChainId, txhash);
  });
}
