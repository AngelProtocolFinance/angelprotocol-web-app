import { LCDClient, MnemonicKey } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import bip39 from "bip39";
import { terra_lcds } from "constants/urls";
import { chainIDs } from "contracts/types";
import { useCallback } from "react";

export default function useGetTerraWallet() {
  const wallet = useConnectedWallet();

  const getTerraWallet = useCallback(
    (torusPrivateKey: string) => {
      const terra = new LCDClient({
        URL: wallet?.network?.lcd || terra_lcds[chainIDs.mainnet],
        chainID: wallet?.network?.chainID || chainIDs.mainnet,
      });

      const mnemonic = bip39.entropyToMnemonic(torusPrivateKey);

      const mnemonicKey = new MnemonicKey({ mnemonic });

      console.log(
        "account 0, index 0 key",
        mnemonicKey.privateKey.toString("hex")
      );

      const newWallet = terra.wallet(mnemonicKey);

      return newWallet;
    },
    [wallet]
  );

  return getTerraWallet;
}
