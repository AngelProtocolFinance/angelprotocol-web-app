import { LCDClient, MnemonicKey } from "@terra-money/terra.js";
import { useWallet } from "@terra-money/wallet-provider";
import { entropyToMnemonic } from "bip39";
import { terra_lcds } from "constants/urls";
import { chainIDs } from "contracts/types";
import { useCallback } from "react";

export default function useGetTerraWallet() {
  const wallet = useWallet();

  const getTerraWallet = useCallback((torusPrivateKey: string) => {
    const terra = new LCDClient({
      // URL: wallet?.network?.lcd || terra_lcds[chainIDs.mainnet],
      // chainID: wallet?.network?.chainID || chainIDs.mainnet,
      URL: terra_lcds[chainIDs.testnet],
      chainID: chainIDs.testnet,
    });

    const mnemonic = entropyToMnemonic(torusPrivateKey);
    const mnemonicKey = new MnemonicKey({ mnemonic });

    console.log(
      "account 0, index 0 key",
      mnemonicKey.privateKey.toString("hex")
    );

    const newWallet = terra.wallet(mnemonicKey);

    return newWallet;
  }, []);

  return getTerraWallet;
}
