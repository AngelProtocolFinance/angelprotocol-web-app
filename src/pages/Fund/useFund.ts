import { useEffect, useState } from "react";
import Registrar from "contracts/Registrar";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chains } from "contracts/types";
import { urls } from "App/chains";

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
  const url = wallet?.network.lcd || urls[chains.mainnet];
  const chainID = wallet?.network.chainID || chains.mainnet;

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const splitConfig = await Registrar.getConfig(chainID, url);
        const _split: SplitLiq = {};
        _split.max = Number(splitConfig.max) * 100;
        _split.min = Number(splitConfig.min) * 100;
        setSplit(_split);
        setLoading(false);
      } catch (err) {
        console.log(err);
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
