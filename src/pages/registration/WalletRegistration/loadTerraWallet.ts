import { LCDClient, MnemonicKey } from "@terra-money/terra.js";
import { NetworkInfo } from "@terra-money/wallet-provider";
import { entropyToMnemonic } from "bip39";

export default function loadTerraWallet(
  torusPrivateKey: string,
  network: NetworkInfo
) {
  const terra = new LCDClient({
    URL: network.lcd,
    chainID: network.chainID,
  });

  const mnemonic = entropyToMnemonic(torusPrivateKey);
  const mnemonicKey = new MnemonicKey({ mnemonic });
  const newWallet = terra.wallet(mnemonicKey);

  return newWallet;
}
