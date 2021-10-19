import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Registrar from "contracts/Registrar";

export interface SplitLiq {
  max?: number;
  min?: number;
}

export default function useFund() {
  const [isDonating, setDonating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [split, setSplit] = useState<SplitLiq>();
  const wallet = useConnectedWallet();

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const registrar = new Registrar(wallet);
        const splitConfig = await registrar.getConfig();
        const _split: SplitLiq = {};
        _split.max = Number(splitConfig.max) * 100;
        _split.min = Number(splitConfig.min) * 100;
        setSplit(_split);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to get form resources");
        setLoading(false);
      }
    })();
  }, [wallet]);

  function toggleDonate() {
    setDonating((prev) => !prev);
  }

  return { isDonating, toggleDonate, split, error, loading };
}
