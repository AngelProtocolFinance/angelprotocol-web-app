import { useConnectedWallet } from "@terra-money/wallet-provider";
import Indexfund from "contracts/IndexFund";
import { useEffect, useState } from "react";
import { donors as tcaDonors } from "./donors";
import { Names, Sums } from "./types";
// import { donations as testDonations, donors as testDonors } from "./testdata";

export default function useBoard() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sums, setSums] = useState<Array<[Names, number]>>([]);
  const wallet = useConnectedWallet();

  useEffect(() => {
    (async () => {
      const chainID = wallet?.network.chainID;
      const url = wallet?.network.lcd;
      try {
        setError("");
        setLoading(true);
        const res = await Indexfund.getFundDonations(chainID, url);
        const _sums: Sums = {};
        res.donors.forEach((donor) => {
          const donorName = tcaDonors[donor.address] || Names.community;
          //init to MIN_VALUE if no value yet
          _sums[donorName] ||= Number.MIN_VALUE;
          //increment if existing
          _sums[donorName] &&= _sums[donorName]! + +donor.total_ust / 1e6;
        });
        //cast to desired types
        const entries = Object.entries(_sums) as Array<[Names, number]>;
        //in-place sort based on donation amount
        entries.sort((prev, next) => next[1] - prev[1]);

        setLoading(false);
        setSums(entries);
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
