import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Account from "contracts/Account";

export default function useWithdraw() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locked, setLocked] = useState<number>();
  const [liquid, setLiquid] = useState<number>();
  const [overall, setOverall] = useState<number>();
  const wallet = useConnectedWallet();

  useEffect(() => {
    (async () => {
      try {
        const chainID = wallet?.network.chainID;
        const url = wallet?.network.lcd;
        // const walletAddress = wallet?.walletAddress;
        const walletAddress = "terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh"; //Hard coded for now
        setError("");
        setLoading(true);

        // Fetches balance of one charity depending on their walletAddress
        const result = await Account.getBalance(walletAddress, chainID, url);
        setLocked(result.total_locked);
        setLiquid(result.total_liq);
        setOverall(result.overall);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to get balance.");
        setLoading(false);
      }
    })();
  }, [wallet]);

  return {
    isReady: !isLoading && !error,
    isLoading,
    error: !isLoading && error,
    locked,
    liquid,
    overall,
  };
}
