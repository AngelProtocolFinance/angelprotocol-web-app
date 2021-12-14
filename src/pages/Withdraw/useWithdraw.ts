import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useLookupQuery } from "services/aws/endowments/endowments";
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
    const result = await account.getBalance(); // Returned value is the sum of all liquidCW20 holdings in UST
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
          // Check for the endowment address in the url and compare it to the returned value of the useLookupQuery
          const addressFilter = Object.values(data!).filter(
            (dataAddress) => dataAddress === address
          );

          if (addressFilter.length < 1) {
            // If addressFilter returns an empty array, it means that an invalid endowment address is used
            setRedirect(true);
          } else {
            setEndowmentOwner(false);
            getEndowmentBalance();
          }
        } else {
          if (data?.[wallet?.walletAddress] !== address) {
            // Redirects if endowment address is invalid
            setRedirect(true);
          } else {
            setEndowmentOwner(true);
            getEndowmentBalance();
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to get balance.");
        setLoading(false);
      }
    })();
    //eslint-disable-next-line
  }, [data, wallet]);

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
