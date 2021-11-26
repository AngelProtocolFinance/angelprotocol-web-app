import IndexFund from "contracts/IndexFund";
import { chains } from "contracts/types";
import { useEffect, useState } from "react";
import { useDonorsQuery } from "services/aws/alliance/alliance";
import { Details, Sums } from "./types";
import defaultIcon from "assets/icons/tca/Angel-Alliance-logo.png";

const defaultName = "Community";
export default function useBoard() {
  const { data, isLoading: donorLoading, isFetching } = useDonorsQuery(null);

  const [isLoading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date());
  const [flag, setFlag] = useState(0);
  const [error, setError] = useState("");
  const [sums, setSums] = useState<Array<[string, Details]>>([]);
  const storage_key = `tca_boards_${chains.mainnet}`;

  useEffect(() => {
    (async () => {
      const string_data = localStorage.getItem(storage_key);
      if (string_data) {
        const saved_sums: {
          time: string;
          entries: Array<[string, Details]>;
        } = JSON.parse(string_data);

        setSums(saved_sums.entries);
        setLastUpdate(saved_sums.time);
        return;
      }
      try {
        setError("");
        setLoading(true);
        const indexFund = new IndexFund();
        const res = await indexFund.getFundDonations();
        res.donors.push({
          //add missing donation
          address: "terra1janh9rs6pme3tdwhyag2lmsr2xv6wzhcrjz0xx",
          total_ust: "83000000000",
        });
        const _sums: Sums = {};
        const tcaDonors = data!;
        res.donors.forEach((donor) => {
          const {
            name = defaultName,
            icon = defaultIcon,
            iconLight,
          } = tcaDonors[donor.address] || {};
          //init details
          _sums[name] ||= { icon, iconLight, amount: Number.MIN_VALUE };
          //increment if existing
          _sums[name].amount &&= _sums[name].amount! + +donor.total_ust / 1e6;
        });
        //cast to desired types
        const entries = Object.entries(_sums);
        //in-place sort based on donation amount
        entries.sort((prev, next) => next[1].amount! - prev[1].amount!);

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
        console.error(err);
        setLoading(false);
        setError("Failed to get donation data. Please try again later");
      }
    })();
    //eslint-disable-next-line
  }, [flag]);

  function refresh() {
    localStorage.removeItem(storage_key);
    setFlag((prev) => prev + 1);
  }

  return {
    error: !isLoading && error,
    isReady: !isLoading && !error,
    isLoading: isLoading || donorLoading || isFetching,
    sums,
    refresh,
    lastUpdate,
  };
}
