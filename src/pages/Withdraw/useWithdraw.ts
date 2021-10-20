import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Account from "contracts/Account";
import { chains } from "contracts/types";
import { urls } from "App/chains";

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
        const chainID = wallet?.network.chainID || chains.mainnet;
        const url = wallet?.network.lcd || urls[chains.mainnet];
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
