import { useEffect, useState } from "react";
import Registrar from "contracts/Registrar";
import { useConnectedWallet } from "@terra-money/wallet-provider";

export default function useFund() {
  const [isDonating, setDonating] = useState(false);
  const wallet = useConnectedWallet();

  useEffect(() => {
    if (!wallet) {
      return;
    }
    const registrar = new Registrar(wallet);
    registrar.getConfig();
  }, [wallet]);

  function toggleDonate() {
    setDonating((prev) => !prev);
  }

  return { isDonating, toggleDonate };
}
