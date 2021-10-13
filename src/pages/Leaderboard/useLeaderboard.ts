import { useConnectedWallet } from "@terra-money/wallet-provider";
import Indexfund from "contracts/IndexFund";
import { useEffect, useState } from "react";
import { donors as tcaDonors, Names, Sums } from "./tcaMembers";

export default function useLeaderboard() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sums, setSums] = useState<Sums>({});
  const wallet = useConnectedWallet();
  useEffect(() => {
    (async () => {
      if (!wallet) {
        return;
      }
      try {
        setError("");
        setLoading(true);
        const indexfund = new Indexfund(wallet);
        const res = await indexfund.getFundDonations();
        console.log(res);
        const _sums: Sums = {};
        res.donors.forEach((donor) => {
          const donorName = tcaDonors[donor.address] || Names.others;
          //init to MIN_VALUE if no value yet
          _sums[donorName] ||= Number.MIN_VALUE;
          //increment if existing
          _sums[donorName] &&= _sums[donorName]! + +donor.total_ust / 1e6;
        });
        setLoading(false);
        setSums(_sums);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError("Failed to get donation data. Please try again later");
      }
    })();
  }, [wallet]);
  return {
    error: !isLoading && error,
    isReady: !isLoading && !error,
    isLoading,
    sums,
  };
}
