import { MnemonicKey } from "@terra-money/terra.js";
import { useLCDClient } from "@terra-money/wallet-provider";
import { entropyToMnemonic } from "bip39";
import { useCallback } from "react";

export default function useEntropyToTerraWallet() {
  const lcd = useLCDClient();

  const entropyToTerraWallet = useCallback(
    (entropy: string) => {
      const mnemonic = entropyToMnemonic(entropy);
      const mnemonicKey = new MnemonicKey({ mnemonic });
      const newWallet = lcd.wallet(mnemonicKey);

      return newWallet;
    },
    [lcd]
  );

  return entropyToTerraWallet;
}
