import { TxInfo } from "@terra-money/terra.js";
import { Timeout } from "@terra-money/wallet-provider";
import { WalletState } from "contexts/WalletContext/WalletContext";

export async function pollTerraTxInfo(
  wallet: WalletState,
  txhash: string,
  retries: number,
  interval: number
): Promise<TxInfo> {
  const req = new Request(`${wallet.chain.lcd_url}/txs/${txhash}`, {
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
      return pollTerraTxInfo(wallet, txhash, retries - 1, interval);
    }
    throw new Timeout("Transaction timeout");
  });
}
