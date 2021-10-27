import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useLookupQuery } from "api/endowmentsAPI/endowmentAPI";
import Account from "contracts/Account";
import { chains } from "contracts/types";

export default function useWithdraw(address: string) {
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEndowmentOwner, setEndowmentOwner] = useState(false);
  const [error, setError] = useState("");
  const [locked, setLocked] = useState<number>();
  const [liquid, setLiquid] = useState<number>();
  const [overall, setOverall] = useState<number>();
  const wallet = useConnectedWallet();
  const isTestNet = wallet?.network.chainID === chains.testnet;
  //on testnet --> url resolves to endpoint/endowments/testnet
  const { data } = useLookupQuery(isTestNet);

  const getEndowmentBalance = async () => {
    const account = new Account(address, wallet);
    const result = await account.getBalance();
    setLocked(result.total_locked);
    setLiquid(result.total_liq);
    setOverall(result.overall);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        setError("");
        setLoading(true);
        if (!wallet) {
          // If no wallet is connected
          setError("Please connect a wallet to view this page.");
          setLoading(false);
        } else if (!data?.[wallet?.walletAddress]) {
          // If wallet connected is not the endowment owner's wallet address
          setEndowmentOwner(false);
          getEndowmentBalance();
        } else if (data?.[wallet?.walletAddress] !== address) {
          // If endowment address is invalid
          setRedirect(true);
          console.log("HUY!");
        } else {
          setEndowmentOwner(true);
          getEndowmentBalance();
        }
      } catch (err) {
        console.error(err);
        setError("Failed to get balance.");
        setLoading(false);
      }
    })();
    //eslint-disable-next-line
  }, [wallet]);

  return {
    redirect,
    isReady: !isLoading && !error,
    isLoading,
    isEndowmentOwner,
    error: !isLoading && error,
    locked,
    liquid,
    overall,
  };
}
