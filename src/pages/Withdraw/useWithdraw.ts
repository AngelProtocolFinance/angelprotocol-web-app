import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Account from "contracts/Account";
import { chains } from "contracts/types";

export default function useWithdraw() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locked, setLocked] = useState<number>();
  const [liquid, setLiquid] = useState<number>();
  const [overall, setOverall] = useState<number>();
  const wallet = useConnectedWallet();
  const accountAddr =
    wallet?.network.chainID === chains.testnet
      ? "terra1grjzys0n9n9h9ytkwjsjv5mdhz7dzurdsmrj4v"
      : "terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh";

  useEffect(() => {
    (async () => {
      try {
        setError("");
        setLoading(true);
        const account = new Account(accountAddr, wallet);
        const result = await account.getBalance();
        setLocked(result.total_locked);
        setLiquid(result.total_liq);
        setOverall(result.overall);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to get balance.");
        setLoading(false);
      }
    })();
    //eslint-disable-next-line
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
