import { useConnectedWallet } from "@terra-money/wallet-provider";
import Registrar from "contracts/Registrar";
import { useEffect, useState } from "react";

export default function useWithdraw() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [liquid, setLiquid] = useState();
  const [locked, setLocked] = useState();
  const wallet = useConnectedWallet();

  useEffect(() => {
    (async () => {
      try {
        const chainID = wallet?.network.chainID;
        const url = wallet?.network.lcd;
        setError("");
        setLoading(true);
        const endowments = await Registrar.getEndowmentList(chainID, url);
        console.log(endowments);
      } catch (err) {
        console.log(err);
        setError("Failed to get balance");
        setLoading(false);
      }
    })();
  }, [wallet]);

  return {
    isReady: !isLoading && !error,
    isLoading,
    error: !isLoading && error,
    liquid,
    locked,
  };
}
