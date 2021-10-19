import { useConnectedWallet } from "@terra-money/wallet-provider";
import { urls } from "App/chains";
import Indexfund from "contracts/IndexFund";
import { chains } from "contracts/types";
import { useEffect, useState } from "react";
import { donors as tcaDonors } from "./donors";
import { Names, Sums } from "./types";
// import { donations as testDonations, donors as testDonors } from "./testdata";

export default function useBoard() {
  const [isLoading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date());
  const [flag, setFlag] = useState(0);
  const [error, setError] = useState("");
  const [sums, setSums] = useState<Array<[Names, number]>>([]);
  const wallet = useConnectedWallet();
  const chainID = wallet?.network.chainID || chains.mainnet;
  const url = wallet?.network.lcd || urls[chains.mainnet];
  const storage_key = `tca_boards_${chainID}`;

  useEffect(() => {
    (async () => {
      const string_data = localStorage.getItem(storage_key);
      if (string_data) {
        const saved_sums: {
          time: string;
          entries: Array<[Names, number]>;
        } = JSON.parse(string_data);

        setSums(saved_sums.entries);
        setLastUpdate(saved_sums.time);
        return;
      }
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

        //save to localStorage
        const stamp = Date();
        localStorage.setItem(
          storage_key,
          JSON.stringify({
            time: stamp,
            entries,
          })
        );

        setLoading(false);
        setSums(entries);
        setLastUpdate(stamp);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError("Failed to get donation data. Please try again later");
      }
    })();
  }, [wallet, flag]);

  function refresh() {
    localStorage.removeItem(storage_key);
    setFlag((prev) => prev + 1);
  }

  return {
    error: !isLoading && error,
    isReady: !isLoading && !error,
    isLoading,
    sums,
    refresh,
    lastUpdate,
  };
}
