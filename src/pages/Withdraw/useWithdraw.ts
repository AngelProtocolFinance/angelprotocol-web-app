import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Account from "contracts/Account";

export default function useWithdraw(address: string) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locked, setLocked] = useState<number>();
  const [liquid, setLiquid] = useState<number>();
  const [overall, setOverall] = useState<number>();
  const wallet = useConnectedWallet();

  useEffect(() => {
    (async () => {
      try {
        setError("");
        setLoading(true);
        const account = new Account(address, wallet);
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
